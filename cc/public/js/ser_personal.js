/**
 * Created by Administrator on 2016/11/10 0010.
 */
var person_details = document.getElementById('person_details');
var per_username = person_details.childNodes[1].childNodes[3];
var per_userid = person_details.childNodes[1].childNodes[5];

console.log(sessionStorage);
if (sessionStorage.userid.length < 8) {
    var t = '';
    for (var i = 0; i < 8 - sessionStorage.userid.length; i++) {
        t = t + '0';
    }
    sessionStorage.userid = t + sessionStorage.userid;
}
else {
}
per_username.innerHTML = '用户：' + sessionStorage.username;
per_userid.innerHTML = '用户ID：' + sessionStorage.userid;
/*
 $.post(url + "personal", {}, function (data, status) {
 var u_id = data.userid + '';
 if (u_id.length < 8) {
 var t = '';
 for (var i = 0; i < 8 - u_id.length; i++) {
 t = t + '0';
 }
 u_id = t + u_id;
 }
 else {
 }
 per_username.innerHTML = '用户：' + data.username;
 per_userid.innerHTML = '用户ID：' + u_id;
 });*/
