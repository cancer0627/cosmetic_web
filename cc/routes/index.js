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
})

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