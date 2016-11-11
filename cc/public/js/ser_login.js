/**
 * Created by Administrator on 2016/11/10 0010.
 */
var login_btn = document.getElementById('login_btn');
var userName = document.getElementById('login_input').childNodes[1].childNodes[3];
var userPwd = document.getElementById('login_input').childNodes[3].childNodes[3];

var url = "http://192.168.0.140:3000/";

function sendCmd(type) {
    var u = url + type;
    $.post(u, {
        username: userName.value,
        userpwd: userPwd.value
    }, function (data, status) {
        console.log(data);
        if (data.result) {
            sessionStorage.setItem('userid', data.userid);
            sessionStorage.setItem('username', data.username);
            alert('login success!!!');
            location.href = 'personal.html';
        }
        else {
            alert('login fail!!!');
        }
    });
}

login_btn.onclick = function () {
    sendCmd('login');
};