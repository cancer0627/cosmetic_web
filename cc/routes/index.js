var express = require('express');
var router = express.Router();
var userDao = require('../user/userDao');
/*-------------------------------------------------------------------------------------------------------------------*/
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});
/*-------------------------------------------------------------------------------------------------------------------*/
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
router.post('/index_sel', function (req, res) {
    res.contentType('json');
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
    userDao.cart_add(params, function (result) {
            params.result = result;
            res.send(JSON.stringify(params));
            res.end();
        }
    );
});
router.post('/cart_sel', function (req, res) {
    res.contentType('json');
    var params = {
        userid: req.body.userid
    };
    userDao.cart_sel(params, function () {
        res.send(JSON.stringify(params));
        res.end();
    })
});
router.post('/cart_del', function (req, res) {
    res.contentType('json');
    var params = req.body;
    userDao.cart_del(params, function () {
        res.send(JSON.stringify(params));
        res.end();
    })
});
router.post('/cart_del_s', function (req, res) {
    res.contentType('json');
    var params = req.body;
    userDao.cart_del_s(params, function (result) {
        params.result=result;
        res.send(JSON.stringify(params));
        res.end();
    })
});
router.post('/dingdan_add', function (req, res) {
    res.contentType('json');
    var params = req.body;
    userDao.dingdan_add(params, function (goods) {
        params.goods = goods;
        res.send(JSON.stringify(params));
        res.end();
    })
});
router.post('/dingdan_add_bycart', function (req, res) {
    res.contentType('json');
    var params = req.body;
    userDao.dingdan_add_bycart(params, function (goods) {
        params.goods = goods;
        res.send(JSON.stringify(params));
        res.end();
    });
});
router.post('/dingdan_sel_byuser', function (req, res) {
    res.contentType('json');
    var params = req.body;
    userDao.dingdan_sel_byuser(params, function (goods) {
        params.goods = goods;
        res.send(JSON.stringify(params));
        res.end();
    });
});
router.post('/dingdan_sel', function (req, res) {
    res.contentType('json');
    var params = req.body;
    userDao.dingdan_sel(params, function (goods) {
        params.goods = goods;
        res.send(JSON.stringify(params));
        res.end();
    });
});
router.post('/dingdan_update', function (req, res) {
    res.contentType('json');
    var params = req.body;
    userDao.dingdan_update(params, function (result) {
        params.result = result;
        res.send(JSON.stringify(params));
        res.end();
    })
});
router.post('/goods_update',function (req,res){
    res.contentType('json');
    var params = req.body;
    userDao.goods_update(params, function (result) {
        params.result = result;
        res.send(JSON.stringify(params));
        res.end();
    })
});
module.exports = router;
