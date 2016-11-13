(function () {
    var person_details = document.getElementById('person_details');
    var per_username = person_details.childNodes[1].childNodes[3];
    var per_userid = person_details.childNodes[1].childNodes[5];

    console.log(sessionStorage);
    if (sessionStorage.username == undefined) {
        alert('未登录，请先登录！！！');
        location.href = 'login.html';
    }
    else {
        per_username.innerHTML = '用户：' + sessionStorage.username;
        per_userid.innerHTML = '用户ID：' + sessionStorage.userid;
    }

})();
