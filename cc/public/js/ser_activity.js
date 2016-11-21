(function () {
    var search_btn = document.getElementById('search_btn');
    var search_input = document.getElementById('search_input');
    var search_list = document.getElementsByClassName('search_list');
    var i;
    /*---------------------------------------------------------------------------------------------------------------*/
    for (i = 0; i < search_list.length; i++) {
        (function (i) {
            search_list[i].onclick = function () {
                sessionStorage.setItem('fenlei', $.trim(search_list[i].innerHTML));
                location.href = 'list.html';
            }
        })(i)
    }
    search_btn.onclick = function () {
        sessionStorage.setItem('fenlei', $.trim(search_input.value));
        location.href = 'list.html';
    };
})();