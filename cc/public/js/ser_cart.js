(function () {
    var username = document.getElementById('username');
    /*购物车*/
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
    var goods_buy_btn = document.getElementById('goods_buy_btn');
    /*浏览商品*/
    var liulan_goods_mod = document.getElementById('liulan_goods_mod');
    var liulan_goods_list = document.getElementsByClassName('liulan_goods_list');
    var liulan_goods_pic = document.getElementsByClassName('liulan_goods_pic');
    var liulan_goods_name = document.getElementsByClassName('liulan_goods_name');
    var liulan_goods_buynum = document.getElementsByClassName('liulan_goods_buynum');
    var liulan_goods_price = document.getElementsByClassName('liulan_goods_price');
    /*定义变量*/
    var gd, i, j, arr_goods, arr;
    var url = 'http://127.0.0.1:3000/';
    /*---------------------------------------------------------------------------------------------------------------*/
    if (sessionStorage.username == undefined) {
        alert('未登录，请先登录！！！');
        location.href = 'login.html';
    }
    else {
        username.innerHTML = sessionStorage.username;
        /*$.post(url + 'index_sel', {
         userid: sessionStorage.userid,
         module: 'liulan'
         }, function (data, status) {
         console.log(data);
         for (i = 0; i < data.goods.length; i++) {
         var li = document.createElement('li');
         li.className = 'liulan_goods_list';
         liulan_goods_mod.appendChild(li);
         li.innerHTML = '<img class="liulan_goods_pic" width="239" src="">' +
         '<p class="liulan_goods_name" style="color: #343434"></p>' +
         '<p class="liulan_goods_buynum" style="color: #9d9c9c"></p>' +
         '<span>￥<em class="liulan_goods_price" style="color: #9f0404;font-size: 30px;"></em></span>'
         }
         for (i = 0; i < liulan_goods_list.length; i++) {
         liulan_goods_pic[i].src = '../img/goods/' + data.goods[i].url;
         liulan_goods_name[i].innerHTML = data.goods[i].gname;
         liulan_goods_buynum[i].innerHTML = data.goods[i].bnum + '人已购买';
         liulan_goods_price[i].innerHTML = data.goods[i].price;
         (function (i) {
         liulan_goods_pic[i].onclick = function () {
         sessionStorage.setItem('goodsid', data.goods[i].ID);
         window.open('details.html');
         }
         })(i)
         }
         });*/
        $.post(url + 'cart_sel', {
            userid: sessionStorage.userid
        }, function (data, status) {
            arr_goods = data.goods;
            arr = [];
            console.log(data);
            if (arr_goods.length == 0) {
                var div = document.createElement('div');
                all_goods_list.appendChild(div);
                div.style.textAlign = 'center';
                div.style.padding = '50px';
                div.innerHTML = '购物车无商品！！！';
            }
            else {
                var k = 0;
                var num = arr_goods.length;
                arr.push(arr_goods[0]);
                arr_goods.shift();
                for (i = 1; i < num; i++) {
                    for (k = 0; k < arr.length; k++) {
                        if (arr_goods[0]) {
                            if (arr[k].gid != arr_goods[0].gid) {
                                arr.push(arr_goods[0]);
                                arr_goods.shift();
                            }
                            else {
                                arr[k].num += arr_goods[0].num;
                                arr[k].price += arr_goods[0].price;
                                arr_goods.shift();
                            }
                        }
                    }
                }
                console.log(arr);
                for (i = 0; i < arr.length; i++) {
                    var li = document.createElement('li');
                    all_goods_list.appendChild(li);
                    li.className = 'cart_list';
                    li.innerHTML = '<div> <input type="checkbox" name="all_goods_ch"> <span style="left: 45px">选择订单</span> <span style="left: 575px">购买数量</span> <span style="left: 695px">购买单价</span> <span style="left: 795px">小计</span> <span style="left: 890px">操作</span> </div>' +
                        ' <div> <img class="cart_list_goods_pic" width="105" height="105" src=""> <span class="cart_list_goods_name" style="left:120px;top: 10px"></span>' +
                        ' <span class="cart_list_goods_brand" style="left:120px;top: 50px"></span> <span class="cart_list_goods_effect" style="left:120px;top: 90px"></span>' +
                        ' <div> <button class="btn_decrease">－ </button> <input class="num_inp" type="text" value="1"> <button class="btn_increase">＋</button> </div> <span class="cart_list_goods_price" style="left: 665px;top: 50px">￥</span> <span class="cart_list_goods_price_zong" style="left: 755px;top: 50px">￥</span> <button class="cart_delete_btn"> <img src="../img/icon/delete.png"> </button> </div>'
                    cart_list_goods_pic[i].src = 'img/goods/' + arr[i].goods.url;
                    cart_list_goods_name[i].innerHTML = '商品名称：' + arr[i].goods.gname;
                    cart_list_goods_brand[i].innerHTML = '品&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;牌：' + arr[i].goods.brand;
                    cart_list_goods_effect[i].innerHTML = '功&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;效：' + arr[i].goods.tag;
                    cart_list_goods_price[i].innerHTML = '￥' + arr[i].goods.price;
                    cart_list_goods_price_zong[i].innerHTML = '￥' + arr[i].price;
                    num_inp[i].value = arr[i].num;
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
                for (j = 0; j < all_goods_ch.length; j++) {
                    (function (j) {
                        cart_list_goods_pic[j].onclick = function () {
                            sessionStorage.setItem('goodsid', arr[j].gid);
                            window.open('details.html');
                        };
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
                            if (num_inp[j].value < 1 || num_inp[j].value > arr[j].goods.num) {
                                num_inp[j].value = 1;
                                alert('请输入0-' + arr[j].goods.num + '之间的数字');
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
                            if (num_inp[j].value == arr[j].goods.num) {
                                alert('已经达到库存数量！！！');
                                num_inp[j].value = arr[j].goods.num;
                            }
                            else {
                                num_inp[j].value++;
                                act_price1();
                                act_price2();
                            }
                        };
                    })(j)
                }
                function del() {
                    for (j = 0; j < cart_list.length; j++) {
                        (function (j) {
                            cart_delete_btn[j].onclick = function () {
                                $.post(url + 'cart_del', {
                                    user_id: sessionStorage.userid,
                                    goods_id: arr[j].gid
                                }, function (data, status) {
                                    all_goods_list.removeChild(cart_list[j]);
                                    act_price1();
                                    del();
                                })
                            }
                        })(j)
                    }
                }

                del();
            }
        });
    }
    all_goods_delete_btn.onclick = function () {
        var arr_del = new Array();
        var p = 0;
        for (i = 0; i < all_goods_ch.length; i++) {
            if (all_goods_ch[i].checked) {
                arr_del[p] = arr[i].gid;
                p++;
            }
        }
        console.log(arr_del);
        $.post(url + 'cart_del_s', {
            userid: sessionStorage.userid,
            goodsid: JSON.stringify(arr_del)
        }, function (data, status) {
            function del_s() {
                for (i = 0; i < all_goods_ch.length; i++) {
                    if (all_goods_ch[i].checked) {
                        all_goods_list.removeChild(cart_list[i]);
                        del_s();
                    }
                }
            }

            del_s();
        })
    };
    goods_buy_btn.onclick = function () {
        var obj = new Object();
        var arr_d = new Array();
        obj.date = new Date().toLocaleDateString();
        obj.id = new Date().getTime() + "" + Math.floor(Math.random() * 899 + 100);
        obj.userid = sessionStorage.userid;
        var k = 0, num = 0;
        for (j = 0; j < all_goods_ch.length; j++) {
            if (all_goods_ch[j].checked) {
                arr_d[k] = {
                    goodsid: arr[j].gid,
                    buynum: num_inp[j].value,
                    price: arr[j].goods.price
                };
                k++;
                num++;
            }
        }
        obj.num = num;
        obj.goods = JSON.stringify(arr_d);
        console.log(obj);
        $.post(url + 'dingdan_add_bycart', obj, function (data, status) {
            sessionStorage.setItem('date', new Date().toLocaleDateString());
            sessionStorage.setItem('dingdanid', data.id);
            sessionStorage.setItem('by', 'cart');
            alert('订单生成！！！');
            location.href = 'dingdan.html';
        });
    };
    function chushihua() {

    }

    function act_price1() {
        var price_sum1 = 0;
        for (var i = 0; i < cart_list.length; i++) {
            cart_list_goods_price_zong[i].innerHTML = '￥' + arr[i].goods.price * num_inp[i].value;
            price_sum1 += arr[i].goods.price * num_inp[i].value;
        }
        cart_goods_price.innerHTML = '￥' + price_sum1;
    }

    function act_price2() {
        var price_sum2 = 0, goods_num = 0;
        for (i = 0; i < all_goods_ch.length; i++) {
            if (all_goods_ch[i].checked) {
                price_sum2 += arr[i].goods.price * num_inp[i].value;
                goods_num += parseInt(num_inp[i].value);
            }
        }
        all_goods_price.innerHTML = '￥' + price_sum2;
        all_goods_num.innerHTML = goods_num;
    }
})();