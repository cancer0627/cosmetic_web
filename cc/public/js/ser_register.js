(function () {
    var phone_input = document.getElementById('phone_input');
    var yanz_phone_btn = document.getElementById('yanz_phone_btn');
    var yanz_input = document.getElementById('yanz_input');
    var name_input = document.getElementById('name_input');
    var name_btn = document.getElementById('name_btn');
    var pwd_input = document.getElementById('pwd_input');
    var safe = document.getElementsByClassName('safe')[0];
    var queren_pwd_input = document.getElementById('queren_pwd_input');
    var email_input = document.getElementById('email_input');
    var pic_input = document.getElementById('pic_input');
    var pic_yanzheng = document.getElementsByClassName('yanzheng')[0];
    var reg_btn = document.getElementById('reg_btn');

    safe.childNodes[1].style.display = 'none';
    safe.childNodes[3].style.display = 'none';
    safe.childNodes[5].style.display = 'none';

    var yanz_num;
    var temp = 0;
    var code; //在全局 定义验证码
    var inp = new Array();
    for (var i = 0; i < 7; i++) {
        inp[i] = 0;
    }
    var url = "http://127.0.0.1:3000/";

    yanz_phone_btn.onclick = function () {
        var phonenum = phone_input.value;
        var myreg = /^1(3[0-9]|4[57]|5[0-35-9]|7[0135678]|8[0-9])\d{8}$/;
        if (!myreg.test(phonenum)) {
            alert('请输入有效的手机号码！！！');
        } else {
            inp[1] = 1;
            yanz_num = parseInt(Math.random() * 900000 + 100000);
            alert(yanz_num);
        }
    };

    yanz_input.onblur = function () {
        if (yanz_input.value == yanz_num) {
            inp[2] = 1;
        }
        else {
            alert('验证码错误！！！')
        }
    };

    name_btn.onclick = function () {
        var Regx = /^[A-Za-z0-9]*$/;
        if (Regx.test(name_input.value)) {
            inp[3] = 1;
            alert('用户名可用！！！');
        }
        else {
            alert('用户名不可用！！！');
        }
    };

    pwd_input.onblur = function () {
        var lv = 0;
        var val = pwd_input.value;
        if (val.match(/[a-z]/g)) {
            lv++;
        }
        if (val.match(/[0-9]/g)) {
            lv++;
        }
        if (val.match(/(.[^a-z0-9])/g)) {
            lv++;
        }
        if (val.length < 6 || val.length > 16) {
            lv = 0;
        }
        if (lv > 3) {
            lv = 3;
        }
        if (lv == 1) {
            safe.childNodes[1].style.display = 'initial';
            safe.childNodes[3].style.display = 'none';
            safe.childNodes[5].style.display = 'none';
            inp[4] = 1;
        }
        else if (lv == 2) {
            safe.childNodes[1].style.display = 'initial';
            safe.childNodes[3].style.display = 'initial';
            safe.childNodes[5].style.display = 'none';
            inp[4] = 1;
        }
        else if (lv == 3) {
            safe.childNodes[1].style.display = 'initial';
            safe.childNodes[3].style.display = 'initial';
            safe.childNodes[5].style.display = 'initial';
            inp[4] = 1;
        }
        else {
            alert('密码不可用！！！');
            safe.childNodes[1].style.display = 'none';
            safe.childNodes[3].style.display = 'none';
            safe.childNodes[5].style.display = 'none';
        }
    };

    queren_pwd_input.onblur = function () {
        if (queren_pwd_input.value === pwd_input.value) {
            inp[5] = 1;
        }
        else {
            alert('两次输入密码不同！！！');
            pwd_input.value = '';
            queren_pwd_input.value = '';
        }
    };

    email_input.onblur = function () {
        var email = email_input.value;
        var pattern = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        if (pattern.test(email)) {
            inp[6] = 1;
        }
        else {
            alert('邮箱格式错误！！！')
        }
    };
    createCode();
    pic_input.onblur = validate;
    pic_yanzheng.childNodes[3].onclick = createCode;

    function createCode() {
        code = "";
        var codeLength = 6;//验证码的长度
        var selectChar = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z');
        for (var i = 0; i < codeLength; i++) {
            var charIndex = Math.floor(Math.random() * 36);
            code += selectChar[charIndex];
        }
        if (pic_yanzheng) {
            pic_yanzheng.childNodes[1].className = "code";
            pic_yanzheng.childNodes[1].innerHTML = code;
        }
    }

    function validate() {
        console.log(pic_input.value.length);
        if (pic_input.value.length <= 0) {
            alert("请输入验证码！");
        } else if (pic_input.value != code) {
            alert("验证码输入错误！");
            createCode();//刷新验证码
        } else {
            inp[7] = 1;
        }
    }

    reg_btn.onclick = function () {
        //sendCmd('reg');
        var s = 0;
        for (var i = 0; i < inp.length; i++) {
            s = s + inp[i];
        }
        console.log(inp);

        if (s == 7) {
            sendCmd('reg');
        }
        else {
            alert('信息填写不全或有误，请重新填写！！！');
        }
    };

    function sendCmd(type) {
        var u = url + type;
        console.log(u);
        $.post(u, {
            usertel: phone_input.value,
            username: name_input.value,
            userpwd: pwd_input.value,
            usermail: email_input.value
        }, function (data, status) {
            console.log(data);
            if (data.result) {
                sessionStorage.setItem('userid', data.userid);
                sessionStorage.setItem('username', data.username);
                alert('注册成功！！！');
                location.href = 'personal.html';
            }
            else {
                alert('注册失败！！！');
            }
        });
    }
})();