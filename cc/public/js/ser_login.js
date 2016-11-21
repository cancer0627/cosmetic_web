(function () {
    var login_btn = document.getElementById('login_btn');
    var userName = document.getElementById('login_input').childNodes[1].childNodes[3];
    var userPwd = document.getElementById('login_input').childNodes[3].childNodes[3];
    var url = "http://127.0.0.1:3000/";
    /*---------------------------------------------------------------------------------------------------------------*/
    function sendCmd(type) {
        var u = url + type;
        $.post(u, {
            username: userName.value,
            userpwd: userPwd.value
        }, function (data, status) {
            if (data.result) {
                sessionStorage.setItem('userid', data.userid);
                sessionStorage.setItem('username', data.username);
                alert('登录成功！！！');
                location.href = 'personal.html';
            }
            else {
                alert('登录失败！！！');
            }
        });
    }
    login_btn.onclick = function () {
        sendCmd('login');
    };
})();
