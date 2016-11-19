(function () {
    var username = document.getElementById('username');
    var price = document.getElementById('price');
    var local = document.getElementById('local');
    var time = document.getElementById('time');
    /*样式*/
    var card_sel = document.getElementById('card_sel');
    var web_sel = document.getElementById('web_sel');
    var card_sel_btn = document.getElementById('card_sel_btn');
    var web_sel_btn = document.getElementById('web_sel_btn');
    card_sel.lastChild.previousSibling.style.display = 'none';
    web_sel.lastChild.previousSibling.style.display = 'none';
    card_sel_btn.onclick = function () {
        if (card_sel.lastChild.previousSibling.style.display == 'none') {
            card_sel.lastChild.previousSibling.style.display = 'block';
        }
        else {
            card_sel.lastChild.previousSibling.style.display = 'none';
        }
    };
    web_sel_btn.onclick = function () {
        if (web_sel.lastChild.previousSibling.style.display == 'none') {
            web_sel.lastChild.previousSibling.style.display = 'block';
        }
        else {
            web_sel.lastChild.previousSibling.style.display = 'none';
        }
    };
    /*变量定义*/
    var url = 'http://127.0.0.1:3000/';
    /*---------------------------------------------------------------------------------------------------------------*/
    username.innerHTML = '用户' + sessionStorage.username;
    price.innerHTML = sessionStorage.price_zong;
    local.innerHTML = '收货信息：' + sessionStorage.local;
    time.innerHTML = '送货时间：' + sessionStorage.time;
    $.post(url + 'dingdan_update', {
        local: sessionStorage.local,
        time: sessionStorage.time,
        id: sessionStorage.dingdanid,
        price: parseInt(sessionStorage.price_zong.replace('￥', ''))
    }, function (data, status) {
        console.log(data);
        if (data.result) {
            alert('支付成功！！！');
        }
        else {
            alert('支付失败')
        }
    });
})();