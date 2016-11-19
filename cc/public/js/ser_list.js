(function () {
    var select_div = document.getElementById('select_div');
    var pinpai_sel1 = select_div.childNodes[1].childNodes[3].childNodes;
    var pinpai_sel2 = select_div.childNodes[1].childNodes[5].childNodes;
    var gongxiao_sel1 = select_div.childNodes[3].childNodes[3].childNodes;
    var gongxiao_sel2 = select_div.childNodes[3].childNodes[5].childNodes;
    var fuzhi_sel = select_div.childNodes[5].childNodes[3].childNodes;
    var jiage_sel = select_div.childNodes[7].childNodes[3].childNodes;
    var paixv_sel = select_div.childNodes[9].childNodes[3].childNodes;
    var pinpai_btn = select_div.childNodes[1].lastChild.previousSibling;
    var gongxiao_btn = select_div.childNodes[3].lastChild.previousSibling;
    var pinpai = '', gongxiao = '', i, j, gds;

    var goods_div = document.getElementById('goods_div');
    var goods_list = document.getElementsByClassName('goods_list');
    var goods_img = document.getElementsByClassName('goods_img');
    var goods_name = document.getElementsByClassName('goods_name');
    var goods_price = document.getElementsByClassName('goods_price');
    var goods_buy_num = document.getElementsByClassName('goods_buy_num');
    var cart_add_btn = document.getElementsByClassName('cart_add_btn');
    var goods_buy_btn = document.getElementsByClassName('goods_buy_btn');
    var search_btn = document.getElementById('search_btn');
    var search_input = document.getElementById('search_input');
    var url = "http://127.0.0.1:3000/";
//品牌效果
    for (i = 0; i < pinpai_sel1.length; i++) {
        (function (i) {
            pinpai_sel1[i].onclick = function () {
                pinpai_sel1[i].classList.toggle('selected');
                pinpai += pinpai_sel1[i].innerHTML;
            }
        })(i);
    }
    for (i = 0; i < pinpai_sel2.length; i++) {
        (function (i) {
            pinpai_sel2[i].onclick = function () {
                pinpai_sel2[i].classList.toggle('selected');
                pinpai += pinpai_sel2[i].innerHTML;
            }
        })(i);
    }
    pinpai_btn.onclick = function () {
        if (select_div.childNodes[1].childNodes[5].style.display == 'none') {
            select_div.childNodes[1].childNodes[5].style.display = 'inline-block';
            pinpai_btn.innerHTML = '展开▲';
        }
        else {
            select_div.childNodes[1].childNodes[5].style.display = 'none'
            pinpai_btn.innerHTML = '展开▼';
        }
    };
//功效效果
    for (i = 0; i < gongxiao_sel1.length; i++) {
        (function (i) {
            gongxiao_sel1[i].onclick = function () {
                gongxiao_sel1[i].classList.toggle('selected');
                gongxiao += gongxiao_sel1[i].innerHTML;
            }
        })(i);
    }
    for (i = 0; i < gongxiao_sel2.length; i++) {
        (function (i) {
            gongxiao_sel2 [i].onclick = function () {
                gongxiao_sel2 [i].classList.toggle('selected');
                gongxiao += gongxiao_sel2 [i].innerHTML;
            }
        })(i);
    }
    gongxiao_btn.onclick = function () {
        if (select_div.childNodes[3].childNodes[5].style.display == 'none') {
            select_div.childNodes[3].childNodes[5].style.display = 'inline-block';
            pinpai_btn.innerHTML = '展开▲';
        }
        else {
            select_div.childNodes[3].childNodes[5].style.display = 'none'
            pinpai_btn.innerHTML = '展开▼';
        }
    };
//肤质
    for (i = 0; i < fuzhi_sel.length; i++) {
        (function (i) {
            if (fuzhi_sel[i].tagName == 'SPAN') {
                fuzhi_sel[i].onclick = function () {
                    fuzhi_sel[i].classList.toggle('selected');
                }
            }
        })(i);
    }
//价格
    for (i = 0; i < jiage_sel.length; i++) {
        (function (i) {
            if (jiage_sel[i].tagName == 'SPAN') {
                jiage_sel[i].onclick = function () {
                    jiage_sel[i].classList.toggle('selected');
                }
            }
        })(i);
    }
//排序
    for (i = 0; i < paixv_sel.length; i++) {
        (function (i) {
            if (paixv_sel[i].tagName == 'SPAN') {
                paixv_sel[i].onclick = function () {
                    for (j = 0; j < paixv_sel.length; j++) {
                        paixv_sel[j].className = '';
                    }
                    paixv_sel[i].className = 'selected';
                }
            }
        })(i);
    }
    /*------------------------------------------------------------*/
    if (sessionStorage.username) {
        if (sessionStorage.fenlei) {
            for (var i = 0; i < goods_div.childNodes.length; i++) {
                goods_div.removeChild(goods_div.childNodes[0]);
            }
            $.post(url + 'list_sel', {
                user_id: sessionStorage.userid,
                sel: sessionStorage.fenlei
            }, act)
        }
        else {
            for (var i = 0; i < goods_div.childNodes.length; i++) {
                goods_div.removeChild(goods_div.childNodes[0]);
            }
            $.post(url + 'list_sel', {
                user_id: sessionStorage.userid,
                sel: '底妆'
            }, act)
        }
        search_btn.onclick = function () {
            var n = goods_div.childNodes.length;
            console.log(goods_div.childNodes.length)
            for (var i = 0; i < n; i++) {
                goods_div.removeChild(goods_div.childNodes[0]);
            }
            console.log(goods_div.childNodes.length)
            $.post(url + 'list_sel', {
                user_id: sessionStorage.userid,
                sel: $.trim(search_input.value)
            }, act)
        };
    }
    else {
        location.href = 'login.html';
    }
    function act(data, status) {
        gds = data;
        console.log(data);
        for (var i = 0; i < data.goods.length; i++) {
            var li = document.createElement('li');
            li.className = 'goods_list';
            goods_div.appendChild(li);
            li.innerHTML = '<img class="goods_img" width="239" height="233" src=""><p class="goods_name"></p><div>' +
                '<p>¥<em class="goods_price" style="color: #9f0404;font-size: 30px"></em></p><div><p class="goods_buy_num"></p>' +
                '<img src="../img/list/list_xing.png"></div></div><div> ' +
                '<button class="cart_add_btn">加入购物车</button><button class="goods_buy_btn">立即购买</button></div>';
            goods_img[i].src = '../img/goods/' + data.goods[i].Url;
            goods_name[i].innerHTML = data.goods[i].Name;
            goods_price[i].innerHTML = data.goods[i].Price;
            goods_buy_num[i].innerHTML = data.goods[i].BuyNum + '人已购买';

            if (gds.goods[i].Num == 0) {
                cart_add_btn[i].style.backgroundColor = '#ccc';
                goods_buy_btn[i].style.backgroundColor = '#ccc';
            }
            (function (i) {
                goods_img[i].onclick = function () {
                    sessionStorage.setItem('goodsid', gds.goods[i].Id);
                    window.open('details.html');
                };
                cart_add_btn[i].onclick = function () {
                    if (gds.goods[i].Num == 0) {
                        alert('库存不足！！！');
                    }
                    else {
                        $.post(url + 'cart_add', {
                            goods_id: gds.goods[i].Id,
                            user_id: sessionStorage.userid
                        }, function (data, status) {
                            console.log(data);
                            if (data.result) {
                                alert('加入购物车成功！！！');
                            }
                            else {
                                alert('加入购物车失败！！！');
                            }
                        })
                    }
                };
                goods_buy_btn[i].onclick = function () {
                    $.post(url + 'dingdan_add', {
                        id: new Date().getTime() + "" + Math.floor(Math.random() * 899 + 100),
                        date: new Date().toLocaleDateString(),
                        userid: sessionStorage.userid,
                        goodsid: gds.goods[i].Id,
                        buynum: 1
                    }, function (data, status) {
                        sessionStorage.setItem('date', new Date().toLocaleDateString());
                        console.log(data);
                        sessionStorage.setItem('dingdanid',data.id);
                        alert('############订单生成############');
                        location.href = 'dingdan.html';
                    });
                }
            })(i)
        }
    }
})();