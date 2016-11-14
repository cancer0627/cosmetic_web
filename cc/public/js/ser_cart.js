(function () {
    var username = document.getElementById('username');
    var cart_list = document.getElementsByClassName('cart_list');
    var cart_goods_price = document.getElementById('cart_goods_price');
    var all_goods_num = document.getElementById('all_goods_num');
    var all_goods_price = document.getElementById('all_goods_price');
    var all_goods_list = document.getElementById('all_goods_list');
    var cart_list_goods_pic = document.getElementsByClassName('cart_list_goods_pic');
    var cart_list_goods_name = document.getElementsByClassName('cart_list_goods_name');
    var cart_list_goods_effect = document.getElementsByClassName('cart_list_goods_effect');
    var cart_list_goods_brand = document.getElementsByClassName('cart_list_goods_brand');
    var cart_list_goods_price = document.getElementsByClassName('cart_list_goods_price');
    var cart_list_goods_price_zong = document.getElementsByClassName('cart_list_goods_price_zong');
    var num_inp = document.getElementsByClassName('num_inp');
    var btn_decrease = document.getElementsByClassName('btn_decrease');
    var btn_increase = document.getElementsByClassName('btn_increase');
    var all_goods_ch = document.getElementsByName('all_goods_ch');
    var quanxuan_ch2 = document.getElementById('quanxuan_ch2');
    var quanxuan_ch1 = document.getElementById('quanxuan_ch1');
    var all_goods_delete_btn = document.getElementById('all_goods_delete_btn');
    var cart_delete_btn = document.getElementsByClassName('cart_delete_btn');
    var gd, i, j;

    var url = 'http://127.0.0.1:3000/';
    if (sessionStorage.username == undefined) {
        alert('未登录，请先登录！！！');
        location.href = 'login.html';
    }
    else {
        username.innerHTML = sessionStorage.username;
    }

    $.post(url + 'cart_sel', {
        userid: sessionStorage.userid
    }, function (data, status) {
        gd = data;
        if (data.goods.length == 0) {
            var div = document.createElement('div');
            all_goods_list.appendChild(div);
            div.style.textAlign = 'center';
            div.style.padding = '50px';
            div.innerHTML = '购物车无商品！！！';
        }
        else {
            for (i = 0; i < data.num; i++) {
                var li = document.createElement('li');
                all_goods_list.appendChild(li);
                li.className = 'cart_list';
                li.innerHTML = '<div> <input type="checkbox" name="all_goods_ch"> <span style="left: 45px">选择订单</span> <span style="left: 575px">购买数量</span> <span style="left: 695px">购买单价</span> <span style="left: 795px">小计</span> <span style="left: 890px">操作</span> </div>' +
                    ' <div> <img class="cart_list_goods_pic" width="105" height="105" src=""> <span class="cart_list_goods_name" style="left:120px;top: 10px"></span>' +
                    ' <span class="cart_list_goods_brand" style="left:120px;top: 50px"></span> <span class="cart_list_goods_effect" style="left:120px;top: 90px"></span>' +
                    ' <div> <button class="btn_decrease">－ </button> <input class="num_inp" type="text" value="1"> <button class="btn_increase">＋</button> </div> <span class="cart_list_goods_price" style="left: 665px;top: 50px">￥</span> <span class="cart_list_goods_price_zong" style="left: 755px;top: 50px">￥</span> <button class="cart_delete_btn"> <img src="../img/icon/delete.png"> </button> </div>'
            }
            for (var i = 0; i < cart_list.length; i++) {
                cart_list_goods_pic[i].src = 'img/goods/' + data.goods[i].GoodsUrl;
                cart_list_goods_name[i].innerHTML = '商品名称：' + data.goods[i].GoodsName;
                cart_list_goods_brand[i].innerHTML = '品&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;牌：' + data.goods[i].GoodsBrand;
                cart_list_goods_effect[i].innerHTML = '功&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;效：' + data.goods[i].GoodsEffect;
                cart_list_goods_price[i].innerHTML = '￥' + data.goods[i].Price;
            }
            act_price1();
            act_price2();
            quanxuan_ch1.onclick = function () {
                if (quanxuan_ch1.checked) {
                    quanxuan_ch2.checked = true;
                    for (i = 0; i < all_goods_ch.length; i++) {
                        all_goods_ch[i].checked = true;
                    }
                }
                else {
                    quanxuan_ch2.checked = false;
                    for (i = 0; i < all_goods_ch.length; i++) {
                        all_goods_ch[i].checked = false;
                    }
                }
                act_price2();
            };
            quanxuan_ch2.onclick = function () {
                if (quanxuan_ch2.checked) {
                    quanxuan_ch1.checked = true;
                    for (i = 0; i < all_goods_ch.length; i++) {
                        all_goods_ch[i].checked = true;
                    }
                }
                else {
                    quanxuan_ch1.checked = false;
                    for (i = 0; i < all_goods_ch.length; i++) {
                        all_goods_ch[i].checked = false;
                    }
                }
                act_price2();
            };
            all_goods_delete_btn.onclick = function () {

            };
            for (j = 0; j < all_goods_ch.length; j++) {
                (function (j) {
                    all_goods_ch[j].onclick = function () {
                        var temp = 0;
                        for (var i = 0; i < all_goods_ch.length; i++) {
                            if (all_goods_ch[i].checked) {
                                temp++;
                            }
                            if (temp == all_goods_ch.length) {
                                quanxuan_ch2.checked = true;
                                quanxuan_ch1.checked = true;
                            }
                            else {
                                quanxuan_ch2.checked = false;
                                quanxuan_ch1.checked = false;
                            }
                        }
                        act_price2();
                    };
                    num_inp[j].onchange = function () {
                        if (num_inp[j].value < 1 || num_inp[j].value > data.goods[j].Num) {
                            num_inp[j].value = 1;
                            alert('请输入0-' + data.goods[j].Num + '之间的数字');
                            act_price1();
                            act_price2();
                        }
                    };
                    btn_decrease[j].onclick = function () {
                        if (num_inp[j].value == 1) {
                            alert('商品数量不能为0！！！');
                            num_inp[j].value = 1;
                        }
                        else {
                            num_inp[j].value--;
                            act_price1();
                            act_price2();
                        }
                    };
                    btn_increase[j].onclick = function () {
                        if (num_inp[j].value == data.goods[j].Num) {
                            alert('已经达到库存数量！！！');
                            num_inp[j].value = data.goods[j].Num;
                        }
                        else {
                            num_inp[j].value++;
                            act_price1();
                            act_price2();
                        }
                    };
                    cart_delete_btn[j].onclick = function () {
                        $.post(url + 'cart_del', {
                            user_id: sessionStorage.userid,
                            goods_id: data.goods[j].GoodsId
                        }, function (data, status) {
                            console.log(data);
                            //cart_list[j].style.display = 'none';
                            all_goods_list.removeChild(cart_list[j]);
                        })
                    }
                })(j)
            }
        }
    });

    function act_price1() {
        var price_sum1 = 0;
        for (var i = 0; i < cart_list.length; i++) {
            cart_list_goods_price_zong[i].innerHTML = '￥' + gd.goods[i].Price * num_inp[i].value;
            price_sum1 += gd.goods[i].Price * num_inp[i].value;
        }
        cart_goods_price.innerHTML = '￥' + price_sum1;
    }

    function act_price2() {
        console.log(gd);
        var price_sum2 = 0, goods_num = 0;
        for (i = 0; i < all_goods_ch.length; i++) {
            if (all_goods_ch[i].checked) {
                price_sum2 += gd.goods[i].Price * num_inp[i].value;
                goods_num += parseInt(num_inp[i].value);
            }
        }
        all_goods_price.innerHTML = '￥' + price_sum2;
        all_goods_num.innerHTML = goods_num;
    }
})();