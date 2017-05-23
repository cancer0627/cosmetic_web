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
        connection.query(sql.login, [par.username, par.username, par.username, par.userpassword], function (error, rows, fields) {
            if (rows.length) {
                var userid = rows[0].ID;
                var username = rows[0].uname;
                callback(true, userid, username);
            } else {
                callback(false);
            }
        });
    },
    reg: function (par, callback) {
        connection.query(sql.req_sel, [par.username, par.tel, par.email], function (error, rows, fields) {
            if (!rows.length) {
                connection.query(sql.req_ins, [par.tel, par.username, par.userpassword, par.email], function (error, rows, fields) {
                    var userid = rows.insertId;
                    callback(true, userid);
                });
            } else {
                callback(false);
            }
        });
    },
    list_sel_all: function (par, callback) {
        //var sqls = sql['list_sel_' + par.sel];
        connection.query(sql.list_sel_all, ['%' + par.sel + '%', '%' + par.sel + '%', '%' + par.sel + '%'], function (error, rows, fields) {
            if (rows.length) {
                par.goods = rows;
                callback();
            }
        })
    },
    list_sel_order: function (par, callback) {
        //console.log(par)
        var sqls = sql['list_sel_' + par.order];
        console.log(['%' + par.brand + '%', '%' + par.kind + '%', '%' + par.tag + '%', '%' + par.suit + '%', par.min, par.max])
        connection.query(sqls, ['%' + par.brand + '%', '%' + par.kind + '%', '%' + par.tag + '%', '%' + par.suit + '%', par.min, par.max], function (error, rows, fields) {
            if (rows.length) {
                par.goods = rows;
                callback();
            }
        })
    },
    details: function (par, callback) {
        connection.query(sql.details_update_l, [par.goodsid], function (error, rows, fields) {
            connection.query(sql.details_sel, [par.goodsid], function (error, rows, fields) {
                if (rows.length) {
                    par.goods = rows[0];
                    callback();
                }
            })
        });
    },
    index_sel: function (par, callback) {
        connection.query(sql.index_sel, ['%' + par.module + '%'], function (error, rows, fields) {
            if (rows.length) {
                par.goods = rows;
                callback();
            }
        })
    },
    goods_order: function (par, callback) {
        var sqls = sql['goods_order_' + par.order];
        connection.query(sqls, function (error, rows, fields) {
            //console.log(sqls);
            //console.log(par.order);
            if (rows.length) {
                //console.log(rows);
                par.goods = rows;
                callback();
            }
        })
    },
    cart_add: function (par, callback) {
        connection.query(sql.cart_ins, [par.userid, par.goodsid, par.bnum, par.bnum * par.price], function (error, rows, fields) {
            if (rows) {
                callback(true);
            }
            else {
                callback(false);
            }
        })
    },
    cart_sel: function (par, callback) {
        connection.query(sql.cart_sel, [par.userid], function (error, rows, fields) {
            if (rows.length) {
                var array = rows;
                //console.log(array);
                var j = 0;
                for (var i = 0; i < array.length; i++) {
                    var gid = array[i].gid;
                    goods_sel(gid, array, function (re) {
                        array[j].goods = re;
                        if (j == array.length - 1) {
                            //console.log(array);
                            callback(array);
                        }
                        else {
                            j++;
                        }
                    });
                }
            }
        })
    },
    cart_del: function (par, callback) {
        connection.query(sql.cart_del, [par.user_id, par.goods_id], function (error, rows, fields) {
            callback();
        });
    },
    cart_del_s: function (par, callback) {
        var arr = JSON.parse(par.gid);
        console.log(arr);
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
        connection.query(sql.dingdan_add, [par.dingdanid, par.userid, par.goodsid, par.date, par.bnum, par.status, par.bnum * par.price, par.address, par.time], function (error, rows, fields) {
                if (rows) {
                    callback(true);
                }
                else {
                    callback(false);
                }
            }
        )
    },
    dingdan_add_bycart: function (par, callback) {
        var array = JSON.parse(par.goods);
        var arr = new Array();
        console.log(par);
        var j = 0;
        for (var i = 0; i < array.length; i++) {
            act(par, array, i, function (re) {
                if (re) {
                    callback(true)
                }
                else {
                    callback(false)
                }
            });
        }
    },
    dingdan_sel_byuser: function (par, callback) {
        connection.query(sql.dingdan_sel_byuser, [par.userid, par.type], function (error, rows, fields) {
            var array = rows;
            var j = 0;
            for (var i = 0; i < array.length; i++) {
                var gid = array[i].dgid;
                goods_sel(gid, array, function (re) {
                    array[j].goods = re;
                    if (j == array.length - 1) {
                        callback(array);
                    }
                    else {
                        j++;
                    }
                });
            }
        })
    },
    dingdan_sel: function (par, callback) {
        connection.query(sql.dingdan_sel, [par.id], function (error, rows, fields) {
            var array = rows;
            var j = 0;
            for (var i = 0; i < array.length; i++) {
                var gid = array[i].dgid;
                goods_sel(gid, array, function (re) {
                    array[j].goods = re;
                    if (j == array.length - 1) {
                        callback(array);
                    }
                    else {
                        j++;
                    }
                });
            }
        })
    },
    dingdan_update: function (par, callback) {
        connection.query(sql.dingdan_update, [par.local, par.time, '待收货', par.id], function (error, rows, fields) {
            if (rows) {
                callback(true);
            }
            else {
                callback(false);
            }
        })
    },
    dingdan_shouhuo: function (par, callback) {
        connection.query(sql.dingdan_shouhuo, ['待评价', par.dingdanid, par.goodsid], function (error, rows, fields) {
            if (rows) {
                callback(true);
            }
            else {
                callback(false);
            }
        })
    },
    goods_update: function (par, callback) {
        //console.log(par)
        var arr = JSON.parse(par.goodsarr);
        for (var i = 0; i < arr.length; i++) {
            goods_update(arr, i, function (re) {
                if (re) {
                    callback(true)
                }
                else {
                    callback(false)
                }
            });
        }
    },
    comment_sel: function (par, callback) {
        connection.query(sql.comment_sel, [par.goodsid], function (error, rows, fields) {
            if (rows.length) {
                par.comment = rows;
                callback();
            }
        })
    },
    comment_add: function (par, callback) {
        connection.query(sql.comment_add, [par.goodsid, par.userid, par.date, par.comment], function (error, rows, fields) {
            if (rows) {
                callback(true);
            }
            else {
                callback(false);
            }
        })
    },
    like_add: function (par, callback) {
        //console.log(par);
        connection.query(sql.like_add, [par.userid], function (error, rows, fields) {
            if (rows) {
                callback(true);
            }
            else {
                callback(false);
            }
        })
    },
    like_update_act: function (par, callback) {
        connection.query(sql.like_update_act, [par.age, par.price, par.need, par.skin, par.id], function (error, rows, fields) {
            //console.log(rows);
            if (rows) {
                callback(true);
            }
            else {
                callback(false);
            }
        })
    },
    tuijian: function (par, callback) {
        //console.log([' ' + par.goodsid, par.userid]);
        connection.query(sql.like_sel_act, [par.userid], function (error, rows, fields) {
            var para = {
                need: rows[0].need.split(','),
                price: rows[0].price.split('-'),
                skin: JSON.parse(rows[0].skin)
            };
            //console.log(['%' + para.need[Math.floor(Math.random() * para.need.length)] + '%', '%' + para.skin[Math.floor(Math.random() * para.skin.length)] + '%', para.price[0], para.price[1]]);
            connection.query(sql.goods_sel, ['%' + para.need[Math.floor(Math.random() * para.need.length)] + '%', '%' + para.skin[Math.floor(Math.random() * para.skin.length)] + '%', para.price[0], para.price[1]], function (error, rows, fields) {
                //console.log(rows);
                if (rows.length) {
                    par.goods = rows;
                    callback();
                }
            })
        })
    },
    tuijian_article: function (par, callback) {
        connection.query(sql.details_sel, [par.goodsid], function (error, rows, fields) {
            var tag_arr = rows[0].kind.split(',');
            console.log(tag_arr);
            //console.log(['%' + para.need[Math.floor(Math.random() * para.need.length)] + '%', '%' + para.skin[Math.floor(Math.random() * para.skin.length)] + '%', para.price[0], para.price[1]]);
            connection.query(sql.article_sel, ['%' + tag_arr[Math.floor(Math.random() * tag_arr.length)] + '%'], function (error, rows, fields) {
                //console.log(rows);
                if (rows.length) {
                    par.article = rows;
                    callback();
                }
            })
        })
    },
    like_update_l: function (par, callback) {
        //console.log([' ' + par.goodsid, par.userid]);
        connection.query(sql.like_sel_act, [par.userid], function (error, rows, fields) {
            console.log(rows[0]);
            var arr;
            if (!rows[0].lgid) {
                arr = [];
            }
            else {
                arr = JSON.parse(rows[0].lgid);
            }
            arr.push(par.goodsid);
            console.log(arr);
            connection.query(sql.like_update_l, [JSON.stringify(arr), par.userid], function (error, rows, fields) {
                //console.log(rows);
                if (rows) {
                    callback(true);
                }
                else {
                    callback(false);
                }
            })
        })
    },
    like_update_b: function (par, callback) {
        console.log(par);
        var id_arr = JSON.parse(par.goodsid);
        connection.query(sql.like_sel_act, [par.userid], function (error, rows, fields) {
            console.log(rows[0]);
            var arr;
            if (!rows[0].bgid) {
                arr = [];
            }
            else {
                arr = JSON.parse(rows[0].bgid);
            }
            for (var i = 0; i < id_arr.length; i++) {
                arr.push(id_arr[i]);
            }
            //arr.push(par.goodsid);
            console.log(arr);
            connection.query(sql.like_update_b, [JSON.stringify(arr), par.userid], function (error, rows, fields) {
                //console.log(rows);
                if (rows) {
                    callback(true);
                }
                else {
                    callback(false);
                }
            })
        })
    },
    like_sel_act: function (par, callback) {
        connection.query(sql.like_sel_act, [par.userid], function (error, rows, fields) {
            if (rows.length) {
                par.like = rows[0];
                callback();
            }
        })
    }
};
function goods_update(arr, i, cb) {
    connection.query(sql.goods_update, [arr[i].num, arr[i].num, arr[i].id], function (error, rows, fields) {
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
function goods_sel(gid, array, cb) {
    connection.query(sql.details_sel, gid, function (error, rows, fields) {
        if (rows) {
            cb(rows[0]);
        }
    })
}
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
        buynum: arr[i].buynum,
        price: arr[i].price
    };
    connection.query(sql.dingdan_add, [par.id, par.userid, para.goodsid, par.date, para.buynum, '待支付', parseInt(para.buynum) * para.price, '', ''], function (error, rows, fields) {
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