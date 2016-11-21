(function () {
    var mylocal = document.getElementById('mylocal');
    var details_pic_big = document.getElementById('details_pic_big');
    var title = document.getElementById('title');
    var details_pic1 = document.getElementById('details_pic1');
    var details_pic2 = document.getElementById('details_pic2');
    var details_pic3 = document.getElementById('details_pic3');
    var details_pic4 = document.getElementById('details_pic4');
    var details_goods_name = document.getElementById('details_goods_name');
    var details_goods_describe = document.getElementById('details_goods_describe');
    var details_goods_price = document.getElementById('details_goods_price');
    var details_goods_buynum = document.getElementById('details_goods_buynum');
    var details_local1 = document.getElementById('details_local1');
    var details_local2 = document.getElementById('details_local2');
    var details_yunfei = document.getElementById('details_yunfei');
    var details_youhui = document.getElementById('details_youhui');
    var details_style = document.getElementById('details_style');
    var dec_btn = document.getElementById('dec_btn');
    var details_buy_num_val = document.getElementById('details_buy_num_val');
    var inc_btn = document.getElementById('inc_btn');
    var details_num = document.getElementById('details_num');
    var cart_add_btn = document.getElementById('cart_add_btn');
    var dingdan_add__btn = document.getElementById('dingdan_add__btn');
    /*详细信息*/
    var goods_name = document.getElementById('goods_name');
    var goods_brand = document.getElementById('goods_brand');
    var goods_effect = document.getElementById('goods_effect');
    var goods_style = document.getElementById('goods_style');
    var goods_lastname = document.getElementById('goods_lastname');
    var goods_local = document.getElementById('goods_local');
    var goods_pic = document.getElementById('goods_pic');
    /*搜索框*/
    var search_btn = document.getElementById('search_btn');
    var search_input = document.getElementById('search_input');
    var search_list = document.getElementsByClassName('search_list');
    /*定义变量*/
    var url = 'http://127.0.0.1:3000/', i;
    /*---------------------------------------------------------------------------------------------------------------*/
    details_pic1.onmouseover = function () {
        details_pic_big.src = details_pic1.src;
    };
    details_pic2.onmouseover = function () {
        details_pic_big.src = details_pic2.src;
    };
    details_pic3.onmouseover = function () {
        details_pic_big.src = details_pic3.src;
    };
    details_pic4.onmouseover = function () {
        details_pic_big.src = details_pic4.src;
    };
    $.post(url + 'details', {
        goodsid: sessionStorage.goodsid
    }, function (data, status) {
        console.log(data);
        title.innerHTML = data.goods.Name;
        mylocal.innerHTML = '我的位置>底妆>' + data.goods.Name;
        details_pic_big.src = 'img/goods/' + data.goods.Url;
        details_pic1.src = 'img/goods/' + data.goods.Url;
        //details_pic2.src = 'img/goods/' + data.goods.Url;
        //details_pic3.src = 'img/goods/' + data.goods.Url;
        //details_pic4.src = 'img/goods/' + data.goods.Url;
        details_goods_name.innerHTML = data.goods.Name;
        details_goods_describe.innerHTML = data.goods.LongDescribe;
        details_goods_price.innerHTML = data.goods.Price;
        details_goods_buynum.innerHTML = data.goods.BuyNum + '人购买';
        details_goods_name.innerHTML = data.goods.Name;
        details_local1.innerHTML = data.goods.Local;
        details_local2.innerHTML = data.goods.Local + '直邮<em id="details_yunfei">' + data.goods.YunFei + '</em>元';
        details_youhui.innerHTML = '<span>' + data.goods.Perferential + '元</span>';
        details_style.innerHTML = data.goods.Style;
        details_num.innerHTML = '(库存' + data.goods.Num + '件)';
        /*------------------*/
        goods_name.innerHTML = '产品名称:' + data.goods.Name;
        goods_brand.innerHTML = '规格品牌:' + data.goods.Brand;
        goods_effect.innerHTML = '功效:' + data.goods.Effect;
        goods_style.innerHTML = '颜色分类:' + data.goods.Style;
        goods_lastname.innerHTML = '单品:' + data.goods.LastName;
        goods_local.innerHTML = '产地:' + data.goods.Local;
        //var img=document.createElement('img');
        goods_pic.innerHTML += '<img style="display: block" width="1010" src="../img/goods/' + data.goods.Url + '">' +
            '<img style="display: block" width="1010" src="../img/details/goods_details6.png">';
        cart_add_btn.onclick = function () {
            $.post(url + 'cart_add', {
                goods_id: data.goods.Id,
                user_id: sessionStorage.userid
            }, function (data, status) {
                if (data.result) {
                    alert('加入购物车成功！！！');
                }
                else {
                    alert('加入购物车失败！！！');
                }
            })
        };
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
        dec_btn.onclick = function () {
            if (details_buy_num_val.value == 1) {
                alert('商品数量不能为0！！！');
                details_buy_num_val.value = 1
            }
            else {
                details_buy_num_val.value--;
            }
        };
        inc_btn.onclick = function () {
            if (details_buy_num_val.value == data.goods.Num) {
                alert('已经达到库存数量！！！');
                details_buy_num_val.value = data.goods.Num;
            }
            else {
                details_buy_num_val.value++;
            }
        };
        dingdan_add__btn.onclick = function () {
            $.post(url + 'dingdan_add', {
                id: new Date().getTime() + "" + Math.floor(Math.random() * 899 + 100),
                date: new Date().toLocaleDateString(),
                userid: sessionStorage.userid,
                goodsid: sessionStorage.goodsid,
                buynum: details_buy_num_val.value
            }, function (data, status) {
                sessionStorage.setItem('date', new Date().toLocaleDateString());
                sessionStorage.setItem('dingdanid', data.id);
                $.post(url + 'goods_update', {
                    goodsid: data.goodsid,
                    buynum: data.buynum
                }, function (data, status) {
                    if (data.result) {
                        alert('############订单生成############');
                        location.href = 'dingdan.html';
                    }
                });
            });
        }
    })
})();