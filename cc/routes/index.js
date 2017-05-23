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
        userpassword: req.body.userpassword
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
        tel: req.body.tel,
        username: req.body.username,
        userpassword: req.body.userpassword,
        email: req.body.email
    };
    userDao.reg(params, function (result, id) {
        params.result = result;
        params.userid = id;
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
router.post('/goods_order', function (req, res) {
    res.contentType('json');
    var params = {
        userid: req.body.userid,
        order: req.body.order,
        goods: new Array()
    };
    userDao.goods_order(params, function () {
        res.send(JSON.stringify(params));
        res.end();
    });
});
router.post('/list_sel_all', function (req, res) {
    res.contentType('json');
    var params = req.body;
    userDao.list_sel_all(params, function () {
        res.send(JSON.stringify(params));
        res.end();
    });
});
router.post('/list_sel_order', function (req, res) {
    res.contentType('json');
    var params = req.body;
    userDao.list_sel_order(params, function () {
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
router.post('/cart_add', function (req, res) {
    res.contentType('json');
    var params = req.body;
    userDao.cart_add(params, function (result) {
            params.result = result;
            res.send(JSON.stringify(params));
            res.end();
        }
    );
});
router.post('/cart_sel', function (req, res) {
    res.contentType('json');
    var params = req.body;
    userDao.cart_sel(params, function (goods) {
        params.goods = goods;
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
    var params = {
        userid: req.body.userid,
        gid: req.body.goodsid
    }
    userDao.cart_del_s(params, function (result) {
        params.result = result;
        res.send(JSON.stringify(params));
        res.end();
    })
});
router.post('/dingdan_add', function (req, res) {
    res.contentType('json');
    var params = req.body;
    userDao.dingdan_add(params, function (result) {
            params.result = result;
            res.send(JSON.stringify(params));
            res.end();
        }
    );
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
router.post('/dingdan_shouhuo', function (req, res) {
    res.contentType('json');
    var params = req.body;
    userDao.dingdan_shouhuo(params, function (result) {
        params.result = result;
        res.send(JSON.stringify(params));
        res.end();
    })
});
router.post('/goods_update', function (req, res) {
    res.contentType('json');
    var params = req.body;
    userDao.goods_update(params, function (result) {
        params.result = result;
        res.send(JSON.stringify(params));
        res.end();
    })
});
router.post('/comment_sel', function (req, res) {
    res.contentType('json');
    var params = req.body;
    userDao.comment_sel(params, function () {
        console.log(params);
        res.send(JSON.stringify(params));
        res.end();
    })
});
router.post('/comment_add', function (req, res) {
    res.contentType('json');
    var params = req.body;
    userDao.comment_add(params, function (result) {
        //console.log(params);
        params.result = result;
        res.send(JSON.stringify(params));
        res.end();
    })
});
router.post('/like_add', function (req, res) {
    res.contentType('json');
    var params = req.body;
    userDao.like_add(params, function (result) {
        //console.log(params);
        params.result = result;
        res.send(JSON.stringify(params));
        res.end();
    })
});
router.post('/like_update_act', function (req, res) {
    res.contentType('json');
    var params = req.body;
    userDao.like_update_act(params, function (result) {
        //console.log(params);
        params.result = result;
        res.send(JSON.stringify(params));
        res.end();
    })
});

router.post('/like_update_l', function (req, res) {
    res.contentType('json');
    var params = req.body;
    userDao.like_update_l(params, function (result) {
        //console.log(params);
        params.result = result;
        res.send(JSON.stringify(params));
        res.end();
    })
});
router.post('/like_update_b', function (req, res) {
    res.contentType('json');
    var params = req.body;
    userDao.like_update_b(params, function (result) {
        //console.log(params);
        params.result = result;
        res.send(JSON.stringify(params));
        res.end();
    })
});
router.post('/like_sel_act', function (req, res) {
    res.contentType('json');
    var params = req.body;
    userDao.like_sel_act(params, function (result) {
        //console.log(params);
        //params.result = result;
        res.send(JSON.stringify(params));
        res.end();
    })
});
router.post('/tuijian', function (req, res) {
    res.contentType('json');
    var params = req.body;
    userDao.tuijian(params, function (result) {
        //console.log(params);
        //params.result = result;
        res.send(JSON.stringify(params));
        res.end();
    })
});
router.post('/tuijian_article', function (req, res) {
    res.contentType('json');
    var params = req.body;
    userDao.tuijian_article(params, function (result) {
        //console.log(params);
        //params.result = result;
        res.send(JSON.stringify(params));
        res.end();
    })
});
module.exports = router;
