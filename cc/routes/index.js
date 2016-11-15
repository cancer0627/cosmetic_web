var express = require('express');
var router = express.Router();
var userDao = require('../user/userDao');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

/* login. */
router.post('/login', function (req, res) {
    res.contentType('json');
    var params = {
        username: req.body.username,
        userpwd: req.body.userpwd
    };
    userDao.login(params, function (result, id, name) {
        params.result = result;
        params.userid = id;
        params.username = name;
        res.send(JSON.stringify(params));
        res.end();
    })
});
/* register. */
router.post('/reg', function (req, res) {
    res.contentType('json');
    var params = {
        usertel: req.body.usertel,
        username: req.body.username,
        userpwd: req.body.userpwd,
        usermail: req.body.usermail
    };
    userDao.reg(params, function (result, id) {
        params.result = result;
        params.userid = id;
        res.send(JSON.stringify(params));
        res.end();
    });
});
/* list select. */
router.post('/list_sel', function (req, res) {
    res.contentType('json');
    var params = {
        userid: req.body.user_id,
        sel: req.body.sel
    };
    userDao.list_fenlei_sel(params, function () {
        res.send(JSON.stringify(params));
        res.end();
    });
});
/* goods details. */
router.post('/details', function (req, res) {
    res.contentType('json');
    var params = {
        goodsid: req.body.goodsid
    };
    userDao.details(params, function () {
        res.send(JSON.stringify(params));
        res.end();
    });
});
/* index select. */
router.post('/index_sel', function (req, res) {
    res.contentType('json');
    console.log(req.body)
    var params = {
        userid: req.body.userid,
        module: req.body.module,
        goods: new Array()
    };
    userDao.index_sel(params, function () {
        res.send(JSON.stringify(params));
        res.end();
    });
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
            var sqlCmd = 'insert into cart (UserId,GoodsId,GoodsName,GoodsUrl,GoodsBrand,GoodsEffect,Num,BuyNum,Price) values (' + u_id + ',' + g_id + ',"' + para.Name +
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

module.exports = router;
