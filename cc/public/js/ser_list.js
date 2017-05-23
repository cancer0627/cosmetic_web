(function () {
    /*选择列表*/
    var select_div = document.getElementById('select_div');
    var pinpai_sel1 = select_div.childNodes[1].childNodes[3].childNodes;
    //var pinpai_sel2 = select_div.childNodes[1].childNodes[5].childNodes;
    var gongxiao_sel1 = select_div.childNodes[3].childNodes[3].childNodes;
    //var gongxiao_sel2 = select_div.childNodes[3].childNodes[5].childNodes;
    var fuzhi_sel = select_div.childNodes[5].childNodes[3].childNodes;
    var jiage_sel = select_div.childNodes[7].childNodes[3].childNodes;
    var paixv_sel = select_div.childNodes[9].childNodes[3].childNodes;
    var pinpai_btn = select_div.childNodes[1].lastChild.previousSibling;
    var gongxiao_btn = select_div.childNodes[3].lastChild.previousSibling;
    /*搜索框*/
    var search_btn = document.getElementById('search_btn');
    var search_input = document.getElementById('search_input');
    var search_list = document.getElementsByClassName('search_list');
    /*列表*/
    var goods_div = document.getElementById('goods_div');
    var goods_list = document.getElementsByClassName('goods_list');
    var goods_img = document.getElementsByClassName('goods_img');
    var goods_name = document.getElementsByClassName('goods_name');
    var goods_price = document.getElementsByClassName('goods_price');
    var goods_buy_num = document.getElementsByClassName('goods_buy_num');
    var cart_add_btn = document.getElementsByClassName('cart_add_btn');
    var goods_buy_btn = document.getElementsByClassName('goods_buy_btn');
    /*定义变量*/
    var url = "http://127.0.0.1:3000/";
    var pinpai = '', gongxiao = '', fuzhi = '', jiage = [0, 10000], jiage_arr, order = '', order_arr, kind = '', i, j, k, gds, dingdanid;
    /*---------------------------------------------------------------------------------------------------------------*/
    /*品牌*/
    for (i = 0; i < pinpai_sel1.length; i++) {
        (function (i) {
            pinpai_sel1[i].onclick = function () {
                for (j = 0; j < pinpai_sel1.length; j++) {
                    pinpai_sel1[j].className = '';
                }
                pinpai_sel1[i].classList.toggle('selected');
                pinpai = pinpai_sel1[i].innerHTML;
                goods_div.innerHTML = '';
                $.post(url + 'list_sel_order', {
                    userid: sessionStorage.userid,
                    brand: pinpai,
                    kind: kind,
                    tag: gongxiao,
                    suit: fuzhi,
                    min: parseInt(jiage[0]),
                    max: parseInt(jiage[1]),
                    order: order
                }, act)
            }
        })(i);
    }
    /*功效*/
    for (i = 0; i < gongxiao_sel1.length; i++) {
        (function (i) {
            gongxiao_sel1[i].onclick = function () {
                for (j = 0; j < gongxiao_sel1.length; j++) {
                    gongxiao_sel1[j].className = '';
                }
                gongxiao_sel1[i].classList.toggle('selected');
                gongxiao = gongxiao_sel1[i].innerHTML;
                goods_div.innerHTML = '';
                $.post(url + 'list_sel_order', {
                    userid: sessionStorage.userid,
                    brand: pinpai,
                    kind: kind,
                    tag: gongxiao,
                    suit: fuzhi,
                    min: parseInt(jiage[0]),
                    max: parseInt(jiage[1]),
                    order: order
                }, act)
            }
        })(i);
    }
    /*肤质*/
    for (i = 0; i < fuzhi_sel.length; i++) {
        (function (i) {
            if (fuzhi_sel[i].tagName == 'SPAN') {
                fuzhi_sel[i].onclick = function () {
                    for (j = 0; j < fuzhi_sel.length; j++) {
                        fuzhi_sel[j].className = '';
                    }
                    fuzhi_sel[i].classList.toggle('selected');
                    fuzhi = fuzhi_sel[i].innerHTML;
                    goods_div.innerHTML = '';
                    $.post(url + 'list_sel_order', {
                        userid: sessionStorage.userid,
                        brand: pinpai,
                        kind: kind,
                        tag: gongxiao,
                        suit: fuzhi,
                        min: parseInt(jiage[0]),
                        max: parseInt(jiage[1]),
                        order: order
                    }, act)
                }
            }
        })(i);
    }
    /*价格*/
    for (i = 0; i < jiage_sel.length; i++) {
        (function (i) {
            if (jiage_sel[i].tagName == 'SPAN') {
                jiage_sel[i].onclick = function () {
                    jiage_arr = ['0,99', '99,199', '199,399', '399,559', '560,10000'];
                    jiage = jiage_arr[(i - 1) / 2].split(',');
                    for (j = 0; j < jiage_sel.length; j++) {
                        jiage_sel[j].className = '';
                    }
                    jiage_sel[i].classList.toggle('selected');
                    goods_div.innerHTML = '';
                    $.post(url + 'list_sel_order', {
                        userid: sessionStorage.userid,
                        brand: pinpai,
                        kind: kind,
                        tag: gongxiao,
                        suit: fuzhi,
                        min: parseInt(jiage[0]),
                        max: parseInt(jiage[1]),
                        order: order
                    }, act)
                }
            }
        })(i);
    }
    /*排序*/
    for (i = 0; i < paixv_sel.length; i++) {
        (function (i) {
            if (paixv_sel[i].tagName == 'SPAN') {
                paixv_sel[i].onclick = function () {
                    for (j = 0; j < paixv_sel.length; j++) {
                        paixv_sel[j].className = '';
                    }
                    paixv_sel[i].className = 'selected';
                    order_arr = ['', 'price', 'bnum', 'lnum', 'sdate'];
                    order = order_arr[(i - 1) / 2];
                    console.log(order);
                    goods_div.innerHTML = '';
                    $.post(url + 'list_sel_order', {
                        userid: sessionStorage.userid,
                        brand: pinpai,
                        kind: kind,
                        tag: gongxiao,
                        suit: fuzhi,
                        min: parseInt(jiage[0]),
                        max: parseInt(jiage[1]),
                        order: order
                    }, act)
                }
            }
        })(i);
    }
    /*---------------------------------------------------------------------------------------------------------------*/
    if (sessionStorage.username) {
        goods_div.innerHTML = '';
        if (sessionStorage.sel) {
            $.post(url + 'list_sel_all', {
                userid: sessionStorage.userid,
                sel: sessionStorage.sel
            }, act)
        }
        else if (sessionStorage.fenlei) {
            kind = sessionStorage.fenlei;
            $.post(url + 'list_sel_order', {
                userid: sessionStorage.userid,
                brand: pinpai,
                kind: kind,
                tag: gongxiao,
                suit: fuzhi,
                min: parseInt(jiage[0]),
                max: parseInt(jiage[1]),
                order: order
            }, act);
        }
        else {
            kind = '';
            $.post(url + 'list_sel_order', {
                userid: sessionStorage.userid,
                brand: pinpai,
                kind: kind,
                tag: gongxiao,
                suit: fuzhi,
                min: parseInt(jiage[0]),
                max: parseInt(jiage[1]),
                order: order
            }, act);
        }

        for (i = 0; i < search_list.length; i++) {
            (function (i) {
                search_list[i].onclick = function () {
                    goods_div.innerHTML = '';
                    $.post(url + 'list_sel_order', {
                        userid: sessionStorage.userid,
                        brand: pinpai,
                        kind: $.trim(search_list[i].innerHTML),
                        tag: gongxiao,
                        suit: fuzhi,
                        min: parseInt(jiage[0]),
                        max: parseInt(jiage[1]),
                        order: order
                    }, act)
                }
            })(i)
        }
        search_btn.onclick = function () {
            goods_div.innerHTML = '';
            $.post(url + 'list_sel_all', {
                userid: sessionStorage.userid,
                sel: $.trim(search_input.value)
            }, act)
        };
    }
    else {
        location.href = 'login.html';
    }
    function act(data, status) {
        gds = data;
        for (var i = 0; i < data.goods.length; i++) {
            var li = document.createElement('li');
            li.className = 'goods_list';
            goods_div.appendChild(li);
            li.innerHTML = '<img class="goods_img" width="239" height="239" src=""><p class="goods_name goodsname"></p><div>' +
                '<p>¥<em class="goods_price" style="color: #9f0404;font-size: 30px"></em></p><div><p class="goods_buy_num"></p>' +
                '<img src="../img/list/list_xing.png"></div></div><div> ' +
                '<button class="cart_add_btn">加入购物车</button><button class="goods_buy_btn">立即购买</button></div>';
            goods_img[i].src = '../img/goods/' + data.goods[i].url;
            goods_name[i].innerHTML = data.goods[i].gname;
            goods_price[i].innerHTML = data.goods[i].price;
            goods_buy_num[i].innerHTML = data.goods[i].bnum + '人已购买';
            if (gds.goods[i].num == 0) {
                cart_add_btn[i].style.backgroundColor = '#ccc';
                goods_buy_btn[i].style.backgroundColor = '#ccc';
            }
            (function (i) {
                goods_img[i].onclick = function () {
                    sessionStorage.setItem('goodsid', gds.goods[i].ID);
                    window.open('details.html');
                };
                cart_add_btn[i].onclick = function () {
                    if (gds.goods[i].num == 0) {
                        alert('库存不足！！！');
                    }
                    else {
                        $.post(url + 'cart_add', {
                            goodsid: gds.goods[i].ID,
                            userid: sessionStorage.userid,
                            price: gds.goods[i].price,
                            bnum: 1
                        }, function (data, status) {
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
                    /*sessionStorage.setItem('dingdanid', new Date().getTime() + "" + Math.floor(Math.random() * 899 + 100));
                     sessionStorage.setItem('userid', sessionStorage.userid);
                     sessionStorage.setItem('goodsid', gds.goods[i].ID);
                     sessionStorage.setItem('price', gds.goods[i].price);
                     sessionStorage.setItem('freight', gds.goods[i].freight);
                     sessionStorage.setItem('url', gds.goods[i].url);
                     sessionStorage.setItem('brand', gds.goods[i].brand);
                     sessionStorage.setItem('goodsname', gds.goods[i].gname);
                     sessionStorage.setItem('date', new Date().toLocaleDateString());
                     sessionStorage.setItem('status', '待支付');
                     location.href = 'dingdan.html';*/
                    dingdanid = new Date().getTime() + "" + Math.floor(Math.random() * 899 + 100);
                    $.post(url + 'dingdan_add', {
                        dingdanid: dingdanid,
                        goodsid: gds.goods[i].ID,
                        userid: sessionStorage.userid,
                        date: new Date().toLocaleDateString(),
                        bnum: 1,
                        status: '待支付',
                        price: gds.goods[i].price,
                        address: '',
                        time: ''
                    }, function (data, status) {
                        //sessionStorage.setItem('date', new Date().toLocaleDateString());
                        sessionStorage.setItem('dingdanid', dingdanid);
                        if (data.result) {
                            //alert('订单生成！！！');
                            location.href = 'dingdan.html';
                        }
                        else {
                            alert('订单生成失败！！！');
                        }
                        /*$.post(url + 'goods_update', {
                         goodsid: data.goodsid,
                         bnum: data.bnum
                         }, function (data, status) {
                         if (data.result) {
                         alert('############订单生成############');
                         location.href = 'dingdan.html';
                         }
                         });*/
                    });
                }
            })(i)
        }
    }
})();