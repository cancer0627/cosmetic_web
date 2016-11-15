/**
 * Created by Administrator on 2016/11/15 0015.
 */
(function () {
    var search_btn=document.getElementById('search_btn');
    var search_input=document.getElementById('search_input');
    search_btn.onclick = function () {
        sessionStorage.setItem('fenlei', $.trim(search_input.value));
        location.href = 'list.html';
    };
})()