/**
 * Created by Administrator on 2016/11/15 0015.
 */
var mysql = require('mysql');
var conf = require('../conf/db');
var sql = require('./userSql');

var jsonWrite = function (res, ret) {
    if (typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};
var connection = mysql.createConnection(conf.mysql);
connection.connect();
module.exports = {
    login: function (par, callback) {
        connection.query(sql.login, [par.username, par.userpwd], function (error, rows, fields) {
            if (rows.length) {
                var userid = rows[0].Id;
                var username = rows[0].UserName;
                callback(true, userid, username);
            } else {
                callback(false);
            }
        });
    },
    reg: function (par, callback) {
        connection.query(sql.req_sel, [par.username, par.usertel, par.usermail], function (error, rows, fields) {
            if (!rows.length) {
                connection.query(sql.req_ins, [par.usertel, par.username, par.userpwd, par.usermail], function (error, rows, fields) {
                    var userid = rows.insertId;
                    callback(true, userid);
                });
            } else {
                callback(false);
            }
        });
    },
    list_fenlei_sel: function (par, callback) {
        connection.query(sql.fenlei_sel, [par.sel], function (error, rows, fields) {
            if (rows.length) {
                par.goods = rows;
                callback();
            }
        })
    },
    details: function (par, callback) {
        connection.query(sql.details_sel, [par.goodsid], function (error, rows, fields) {
            if (rows.length) {
                par.goods = rows[0];
                callback();
            }
        })
    },
    index_sel: function (par, callback) {
        connection.query(sql.index_sel, ['%'+par.module+'%'], function (error, rows, fields) {
            if (rows.length) {
                par.goods = rows;
                callback();
            }
        })
    }
    //goods_sel: function (par, callback) {
    //    connection.query(sql.fenlei_sel, [par.fenlei], function (error, rows, fields) {
    //        if(rows.length){
    //            par.goods = rows;
    //            callback();
    //        }
    //    })
    //}
};