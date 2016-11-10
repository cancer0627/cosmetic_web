var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});
router.post('/login', function (req, res) {
    res.contentType('json');
    console.log(req.body);
    var params = {
        username: req.body.username,
        userpwd: req.body.userpwd
    };
    if (params.username == 'admin' && params.userpwd == 'admin') {
        params.result = true;
        res.send(JSON.stringify(params));
        res.end();
    }
});
module.exports = router;
