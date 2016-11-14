var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/* Connect database. */
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    database: 'cosmetics_data'
});
connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
});
//connection.query("select * from users", function (error, rows, fields) {
//    console.log(rows)
//});

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.post('/login', function (req, res) {
    res.contentType('json');
    var params = {
        username: req.body.username,
        userpwd: req.body.userpwd
    };
    action_login(params.username, params.userpwd, function (result, id, name) {
        params.result = result;
        params.userid = id;
        params.username = name;
        console.log(params);
        res.send(JSON.stringify(params));//给客户端返回一个json格式的数据
        res.end();
    });
});
router.post('/reg', function (req, res) {
    res.contentType('json');
    var params = {
        usertel: req.body.usertel,
        username: req.body.username,
        userpwd: req.body.userpwd,
        usermail: req.body.usermail
    };
    action_reg(params.usertel, params.username, params.userpwd, params.usermail, function (result, id) {
        params.result = result;
        params.userid = id;
        console.log(params);
        res.send(JSON.stringify(params));//给客户端返回一个json格式的数据
        res.end();
    });
});
router.post('/optimal', function (req, res) {
    res.contentType('json');
    var params = {
        userid: req.body.userid,
        goods: new Array()
    };
    connection.query('select * from goods where Module = "optimal"', function (error, rows, fields) {
        if (rows.length) {
            //console.log(rows);
            var k = 1;
            for (var j = 0; j < 6; j++) {
                if (j == 0) {
                    params.goods[0] = rows[0];
                }
                else {
                    for (var i = k; i < rows.length; i++) {
                        if (rows[i].Name === params.goods[j - 1].Name) {
                        }
                        else {
                            params.goods[j] = rows[i];
                            k = i;
                            break;
                        }
                    }
                }
                if (params.goods[j]) {
                    continue;
                }
                else {
                    break;
                }
            }
            res.send(JSON.stringify(params));//给客户端返回一个json格式的数据
            res.end();
        }
    })
});
router.post('/cart_add', function (req, res) {
    res.contentType('json');
    var params = {
        goodsid: req.body.goods_id,
        userid: req.body.user_id
    };
    cart_add(params.goodsid, params.userid, function (result) {
            params.result = result;
            res.send(JSON.stringify(params));//给客户端返回一个json格式的数据
            res.end();
        }
    );
    function cart_add(g_id, u_id, callback) {
        connection.query('select * from goods where Id="' + g_id + '"', function (error, rows, fields) {
            var para = rows[0];
            //console.log(para);
            var sqlCmd='insert into cart (UserId,GoodsId,GoodsName,GoodsUrl,GoodsBrand,GoodsEffect,Num,BuyNum,Price) values (' + u_id + ',' + g_id + ',"' + para.Name +
                '","' + para.Url + '","' + para.Brand + '","' + para.Effect + '",' + para.Num + ',' + para.BuyNum + ',' + para.Price + ')';
            connection.query(sqlCmd, function (error, rows, fields) {
                //console.log(sqlCmd);
                //console.log(rows);
                if (rows) {
                    callback(true);
                }
                else {
                    callback(false);
                }
            })
        })
    }
});
router.post('/cart_sel', function (req, res) {
    res.contentType('json');
    var params = {
        userid: req.body.userid,
        goods: new Array()
    };
    connection.query('select * from cart where UserId="' + params.userid + '"', function (error, rows, fields) {
        if (rows.length) {
            console.log(rows.length);
            params.num = rows.length;
            for (var i = 0; i < rows.length; i++) {
                params.goods[i] = rows[i];
            }
            //console.log(params.goods[0].UserId);
        }
        else {
            params.num = 0;
        }
        res.send(JSON.stringify(params));//给客户端返回一个json格式的数据
        res.end();
    })
});
router.post('/cart_del', function (req, res) {
    res.contentType('json');
    var params = req.body;
    console.log(params.goods_id);
    connection.query('delete from cart where UserId="' + params.user_id + '" and GoodsId ="' + params.goods_id + '"', function (error, rows, fields) {
        console.log(rows);
    });
    res.send(JSON.stringify(params));//给客户端返回一个json格式的数据
    res.end();
});
router.post('/list_sel', function (req, res) {
    res.contentType('json');
    var params = {
        userid: req.body.user_id,
        sel: req.body.sel
    };
    console.log(params);
    connection.query('select * from goods where Fenlei="' + params.sel + '"', function (error, rows, fields) {
        if (rows.length) {
            params.goods = rows;
        }
        res.send(JSON.stringify(params));
        res.end();
    })
});

module.exports = router;

function action_login(name, pwd, callback) {
    var sqlCmd;
    sqlCmd = 'SELECT * from users where UserName="' + name + '" or Tel="' + name + '" or Email="' + name + '"';
    //console.log(sqlCmd);
    connection.query(sqlCmd, function (error, rows, fields) {
        if (rows.length) {
            //根据用户名和密码查找到匹配的数据
            var userid = rows[rows.length - 1].Id;
            var username = rows[rows.length - 1].UserName;
            //connection.query('insert into cart (UserId) values ("' + userid + '")', function (error, rows, fields) {
            //    console.log('rows')
            //});
            callback(true, userid, username);
            console.log(rows[rows.length - 1]);
        } else {
            //没有匹配的数据
            callback(false);
        }
    });
}
function action_reg(tel, name, pwd, mail, callback) {
    var sqlCmd;
    sqlCmd = 'SELECT * from users where UserName="' + name + '" or Tel="' + tel + '" or Email="' + mail + '"';
    connection.query(sqlCmd, function (error, rows, fields) {
        console.log(rows);
        if (!rows.length) {
            //当前用户未注册
            var insertCmd = 'insert into users (Tel,UserName,UserPwd,Email) values ("' + tel + '","' + name + '","' + pwd + '","' + mail + '")';
            connection.query(insertCmd, function () {
                connection.query(sqlCmd, function (error, rows, fields) {
                    console.log(rows[rows.length - 1]);
                    var userid = rows[rows.length - 1].Id;
                    callback(true, userid);
                })
            });
        } else {
            //当前用户已经注册
            callback(false);
        }
    });
}