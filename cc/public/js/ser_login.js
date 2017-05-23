(function () {
    var login_btn = document.getElementById('sub_btn');
    var login_input = document.getElementById('login_input');
    var username = login_input.getElementsByTagName('input')[0];
    var userpassword = login_input.getElementsByTagName('input')[1];
    var url = "http://127.0.0.1:3000/";
    /*---------------------------------------------------------------------------------------------------------------*/
    function sendCmd(type) {
        var u = url + type;
        $.post(u, {
            username: username.value,
            userpassword: userpassword.value
        }, function (data, status) {
            if (data.result) {
                sessionStorage.setItem('userid', data.userid);
                sessionStorage.setItem('username', data.username);
                //alert('登录成功！！！');
                location.href = 'index.html';
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
