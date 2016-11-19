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
    var search_input = document.getElementById('search_input');
    var search_btn = document.getElementById('search_btn');
    var url = 'http://127.0.0.1:3000/';
    console.log(sessionStorage.goodsid);
    $.post(url + 'details', {
        goodsid: sessionStorage.goodsid
    }, function (data, status) {
        console.log(data);
        //console.log(body);
        title.innerHTML = data.goods.Name;
        mylocal.innerHTML = '我的位置>底妆>' + data.goods.Name;
        details_pic_big.src = 'img/goods/' + data.goods.Url;
        details_pic1.src = 'img/goods/' + data.goods.Url;
        details_pic2.src = 'img/goods/' + data.goods.Url;
        details_pic3.src = 'img/goods/' + data.goods.Url;
        details_pic4.src = 'img/goods/' + data.goods.Url;
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
        cart_add_btn.onclick = function () {
            $.post(url + 'cart_add', {
                goods_id: data.goods.Id,
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
        };
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
            //details_buy_num_val.value=parseInt(details_buy_num_val.value)-1;
        }
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
                console.log(data)
                sessionStorage.setItem('dingdanid',data.id);
                alert('############订单生成############')
                location.href = 'dingdan.html';
            });
        }
    })
})();