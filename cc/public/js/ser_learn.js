/**
 * Created by Administrator on 2017/5/20 0020.
 */
(function (){
    /*搜索框*/
    var search_btn = document.getElementById('search_btn');
    var search_input = document.getElementById('search_inp');
    var search_list = document.getElementsByClassName('search_list');
    var url = "http://127.0.0.1:3000/";
    if (sessionStorage.username){
        for (i = 0; i < search_list.length; i++) {
            (function (i) {
                search_list[i].onclick = function () {
                    sessionStorage.setItem('fenlei', $.trim(search_list[i].innerHTML));
                    location.href = 'list.html';
                }
            })(i)
        }
        search_btn.onclick = function () {
            sessionStorage.setItem('sel', $.trim(search_input.value));
            location.href = 'list.html';
        };
    }
    else{
        alert("请登录！！！");
        location.href = 'login.html';
    }
})();