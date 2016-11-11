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

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.post('/login', function (req, res) {
    res.contentType('json');
    //console.log(req.body);
    var params = {
        username: req.body.username,
        userpwd: req.body.userpwd
    };
    action('login', params.username, params.userpwd, function (result, id) {
        params.result = result;
        params.userid = id;
        console.log(params);
        res.send(JSON.stringify(params));//给客户端返回一个json格式的数据
        res.end();
    });
});
/*router.post('/personal', function (req, res) {
 res.contentType('json');
 connection.query('SELECT * from users where Id="' + userid + '"', function (error, rows, fields) {
 var params = {
 userid: rows[0].Id,
 username: rows[0].UserName
 };
 console.log(params);
 res.send(JSON.stringify(params));//给客户端返回一个json格式的数据
 res.end();
 })
 });*/
module.exports = router;

function action(ty, name, pwd, callback) {
    var sqlCmd;
    if (ty == 'login') {
        sqlCmd = 'SELECT * from users where UserName="' + name + '" and UserPwd="' + pwd + '"';
        connection.query(sqlCmd, function (error, rows, fields) {
            if (rows.length) {
                //根据用户名和密码查找到匹配的数据
                var userid = rows[0].Id;
                callback(true, userid);
                //console.log(rows[0]);
            } else {
                //没有匹配的数据
                callback(false);
            }
        });
    }
    else {
        console.log('############');
    }
}