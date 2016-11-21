var mysql = require('mysql');
var conf = require('../conf/db');
var sql = require('./userSql');
/*-------------------------------------------------------------------------------------------------------------------*/
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
/*-------------------------------------------------------------------------------------------------------------------*/
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
        connection.query(sql.fenlei_sel, [par.sel, '%' + par.sel + '%'], function (error, rows, fields) {
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
        connection.query(sql.index_sel, ['%' + par.module + '%'], function (error, rows, fields) {
            if (rows.length) {
                par.goods = rows;
                callback();
            }
        })
    },
    cart_add: function (par, callback) {
        connection.query(sql.details_sel, [par.goodsid], function (error, rows, fields) {
            var para = rows[0];
            console.log(par)
            connection.query(sql.cart_ins, [par.userid, par.goodsid, para.Name, para.Url, para.Brand, para.Effect, para.Num, para.Price], function (error, rows, fields) {
                if (rows) {
                    callback(true);
                }
                else {
                    callback(false);
                }
            })
        })
    },
    cart_sel: function (par, callback) {
        connection.query(sql.cart_sel, [par.userid], function (error, rows, fields) {
            if (rows.length) {
                par.num = rows.length;
                par.goods = rows;
            }
            else {
                par.num = 0;
            }
            callback();
        })
    },
    cart_del: function (par, callback) {
        connection.query(sql.cart_del, [par.user_id, par.goods_id], function (error, rows, fields) {
            callback();
        });
    },
    cart_del_s: function (par, callback) {
        var arr = JSON.parse(par.goodsid);
        for (var i = 0; i < arr.length; i++) {
            act_del(par, arr, i, function (re) {
                if (re) {
                    callback(true)
                }
                else {
                    callback(false)
                }
            });
        }
    },
    dingdan_add: function (par, callback) {
        connection.query(sql.details_sel, [par.goodsid], function (error, rows, fields) {
            if (rows.length) {
                connection.query(sql.dingdan_add, [parseInt(par.id), par.date, par.goodsid, par.userid, rows[0].Name, rows[0].Url, rows[0].Price, par.buynum, rows[0].Perferential, '待付款', rows[0].Brand], function (error, rows, fields) {
                    if (rows) {
                        connection.query(sql.dingdan_sel, [rows.insertId], function (error, rows, fields) {
                            callback(rows[0])
                        })
                    }
                });
            }
        });
    },
    dingdan_add_bycart: function (par, callback) {
        var array = JSON.parse(par.goods);
        var arr = new Array();
        var j = 0;
        for (var i = 0; i < array.length; i++) {
            act(par, array, i, function (re) {
                arr[j] = re;
                if (j == array.length - 1) {
                    callback(arr);
                }
                else {
                    j++;
                }
            });
        }
    },
    dingdan_sel_byuser: function (par, callback) {
        connection.query(sql.dingdan_sel_byuser, [par.userid, par.type], function (error, rows, fields) {
            callback(rows);
        })
    },
    dingdan_sel: function (par, callback) {
        connection.query(sql.dingdan_sel, [par.id], function (error, rows, fields) {
            callback(rows);
        })
    },
    dingdan_update: function (par, callback) {
        connection.query(sql.dingdan_update, [par.local, par.time, '待收货', par.price, par.id], function (error, rows, fields) {
            if (rows) {
                callback(true);
            }
            else {
                callback(false);
            }
        })
    },
    goods_update: function (par, callback) {
        connection.query(sql.details_sel, [par.goodsid], function (error, rows, fields) {
            if (rows.length) {
                connection.query(sql.goods_update, [(rows[0].Num - parseInt(par.buynum)), (rows[0].BuyNum + parseInt(par.buynum)), par.goodsid], function (error, rows, fields) {
                    if (rows) {
                        callback(true);
                    }
                    else {
                        callback(false);
                    }
                })
            }
            else {
                callback(false);
            }
        })
    }
};
function act_del(par, arr, i, cb) {
    connection.query(sql.cart_del, [par.userid, arr[i]], function (error, rows, fields) {
        if (i == arr.length - 1) {
            if (rows) {
                cb(true);
            }
            else {
                cb(false);
            }
        }
    });
}
function act(par, arr, i, cb) {
    var para = {
        goodsid: arr[i].goodsid,
        buynum: arr[i].buynum
    };
    connection.query(sql.details_sel, [para.goodsid], function (error, rows, fields) {
        if (rows.length) {
            connection.query(sql.dingdan_add, [parseInt(par.id), par.date, rows[0].Id, par.userid, rows[0].Name, rows[0].Url, rows[0].Price, para.buynum, rows[0].Perferential, '待付款', rows[0].Brand], function (error, rows, fields) {
            });
            connection.query(sql.goods_update, [(rows[0].Num - parseInt(para.buynum)), (rows[0].BuyNum + parseInt(para.buynum)), para.goodsid], function (error, rows, fields) {
            });
            cb(rows[0])
        }
    });
}