(function () {
    var person_details = document.getElementById('person_details');
    var search_btn = document.getElementById('search_btn');
    var search_input = document.getElementById('search_inp');
    var per_username = document.getElementById('per_username');
    var per_userid = document.getElementById('per_userid');
    /*待付款订单*/
    var daifukuan_dingdan_date = document.getElementsByClassName('daifukuan_dingdan_date');
    var daifukuan_dingdan_num = document.getElementsByClassName('daifukuan_dingdan_num');
    var daifukuan_dingdan_name = document.getElementsByClassName('daifukuan_dingdan_name');
    var daifukuan_dingdan_price = document.getElementsByClassName('daifukuan_dingdan_price');
    var daifukuan_dingdan_youhui = document.getElementsByClassName('daifukuan_dingdan_youhui');
    var daifukuan_dingdan_buynum = document.getElementsByClassName('daifukuan_dingdan_buynum');
    var daifukuan_dingdan_status = document.getElementsByClassName('daifukuan_dingdan_status');
    var daifukuan_dingdan_pic = document.getElementsByClassName('daifukuan_dingdan_pic');
    var daifukuan_daishouhuo_goods = document.getElementsByClassName('daifukuan_daishouhuo_goods');
    var daifukuan_dingdan_zhifu_btn = document.getElementsByClassName('daifukuan_dingdan_zhifu_btn');
    var daifukuan_ch = document.getElementsByName('daifukuan_ch');
    /*待收货订单*/
    var daishouhuo_dingdan_date = document.getElementsByClassName('daishouhuo_dingdan_date');
    var daishouhuo_dingdan_num = document.getElementsByClassName('daishouhuo_dingdan_num');
    var daishouhuo_dingdan_name = document.getElementsByClassName('daishouhuo_dingdan_name');
    var daishouhuo_dingdan_price = document.getElementsByClassName('daishouhuo_dingdan_price');
    var daishouhuo_dingdan_youhui = document.getElementsByClassName('daishouhuo_dingdan_youhui');
    var daishouhuo_dingdan_buynum = document.getElementsByClassName('daishouhuo_dingdan_buynum');
    var daishouhuo_dingdan_status = document.getElementsByClassName('daishouhuo_dingdan_status');
    var daishouhuo_dingdan_pic = document.getElementsByClassName('daishouhuo_dingdan_pic');
    var daishouhuo_daishouhuo_goods = document.getElementsByClassName('daishouhuo_daishouhuo_goods');
    var daishouhuo_dingdan_zhifu_btn = document.getElementsByClassName('daishouhuo_dingdan_zhifu_btn');
    var daishouhuo_ch = document.getElementsByName('daishouhuo_ch');
    /*热卖单品*/
    var hot_goods_mod = document.getElementById('hot_goods_mod');
    var hot_goods_list = document.getElementsByClassName('hot_goods_list');
    var hot_goods_pic = document.getElementsByClassName('hot_goods_pic');
    var hot_goods_name = document.getElementsByClassName('hot_goods_name');
    var hot_goods_buynum = document.getElementsByClassName('hot_goods_buynum');
    var hot_goods_price = document.getElementsByClassName('hot_goods_price');
    /*定义变量*/
    var url = 'http://127.0.0.1:3000/';
    /*---------------------------------------------------------------------------------------------------------------*/
    if (sessionStorage.username == undefined) {
        alert('未登录，请先登录！！！');
        location.href = 'login.html';
    }
    else {
        per_username.innerHTML = '用户：' + sessionStorage.username;
        per_userid.innerHTML = '用户ID：' + sessionStorage.userid;
        $.post(url + 'index_sel', {
            userid: sessionStorage.userid,
            module: 'hot'
        }, function (data, status) {
            for (i = 0; i < data.goods.length; i++) {
                var li = document.createElement('li');
                li.className = 'hot_goods_list';
                hot_goods_mod.appendChild(li);
                li.innerHTML = '<img class="hot_goods_pic" width="239" height="239" src="">' +
                    '<p class="hot_goods_name" style="color: #343434"></p>' +
                    '<p class="hot_goods_buynum" style="color: #9d9c9c"></p>' +
                    '<span>￥<em class="hot_goods_price" style="color: #9f0404;font-size: 30px;"></em></span>';
            }
            for (i = 0; i < hot_goods_list.length; i++) {
                hot_goods_pic[i].src = '../img/goods/' + data.goods[i].Url;
                hot_goods_name[i].innerHTML = data.goods[i].Name;
                hot_goods_buynum[i].innerHTML = data.goods[i].BuyNum+'人已购买';
                hot_goods_price[i].innerHTML = data.goods[i].Price;
                (function (i) {
                    hot_goods_pic[i].onclick = function () {
                        sessionStorage.setItem('goodsid', data.goods[i].Id);
                        window.open('details.html');
                    }
                })(i)
            }
        });
        $.post(url + 'dingdan_sel_byuser', {
            userid: sessionStorage.userid,
            type: '待付款'
        }, function (data, status) {
            console.log(data);
            for (var i = 0; i < data.goods.length; i++) {
                var li = document.createElement('li');
                li.className = 'daifukuan_goods';
                daifukuan_list.appendChild(li);
                li.innerHTML = '<input type="checkbox" name="daifukuan_ch"><span class="daifukuan_dingdan_date"></span> ' +
                    ' <span class="daifukuan_dingdan_num"></span><div><span class="daifukuan_dingdan_name" style="left: 0;top: 25px"></span>' +
                    ' <span class="daifukuan_dingdan_price" style="left: 270px;top: 25px"></span><span class="daifukuan_dingdan_youhui" style="left: 400px;top: 25px"></span>' +
                    ' <span class="daifukuan_dingdan_buynum" style="left: 0;top: 85px"></span><span class="daifukuan_dingdan_status" style="left: 0;top: 140px"></span>' +
                    ' <a href="#" style="left: 270px;top: 140px">退货/换货</a><button class="daifukuan_dingdan_zhifu_btn">确认支付</button></div> ' +
                    ' <img class="daifukuan_dingdan_pic" width="170" src="">';
                daifukuan_dingdan_date[i].innerHTML = '购买日期：' + data.goods[i].Date;
                daifukuan_dingdan_num[i].innerHTML = '订单编号：' + data.goods[i].Id;
                daifukuan_dingdan_name[i].innerHTML = data.goods[i].Name;
                daifukuan_dingdan_price[i].innerHTML = '单价：￥' + data.goods[i].Price;
                daifukuan_dingdan_youhui[i].innerHTML = '优惠：￥' + data.goods[i].Youhui;
                daifukuan_dingdan_buynum[i].innerHTML = '购买数量：' + data.goods[i].Buynum;
                daifukuan_dingdan_status[i].innerHTML = '订单状态：' + data.goods[i].Status;
                daifukuan_dingdan_pic[i].src = 'img/goods/' + data.goods[i].Url;
            }
        });
        $.post(url + 'dingdan_sel_byuser', {
            userid: sessionStorage.userid,
            type: '待收货'
        }, function (data, status) {
            console.log(data);
            gd = data;
            for (var i = 0; i < data.goods.length; i++) {
                var li = document.createElement('li');
                li.className = 'daishouhuo_goods';
                daishouhuo_list.appendChild(li);
                li.innerHTML = '<input type="checkbox" name="daishouhuo_ch"><span class="daishouhuo_dingdan_date"></span> ' +
                    ' <span class="daishouhuo_dingdan_num"></span><div><span class="daishouhuo_dingdan_name" style="left: 0;top: 25px"></span>' +
                    ' <span class="daishouhuo_dingdan_price" style="left: 270px;top: 25px"></span><span class="daishouhuo_dingdan_youhui" style="left: 400px;top: 25px"></span>' +
                    ' <span class="daishouhuo_dingdan_buynum" style="left: 0;top: 85px"></span><span class="daishouhuo_dingdan_status" style="left: 0;top: 140px"></span>' +
                    ' <a href="#" style="left: 270px;top: 140px">退货/换货</a><button class="daishouhuo_dingdan_zhifu_btn">确认收货</button></div> ' +
                    ' <img class="daishouhuo_dingdan_pic" width="170" src="">';
                daishouhuo_dingdan_date[i].innerHTML = '购买日期：' + data.goods[i].Date;
                daishouhuo_dingdan_num[i].innerHTML = '订单编号：' + data.goods[i].Id;
                daishouhuo_dingdan_name[i].innerHTML = data.goods[i].Name;
                daishouhuo_dingdan_price[i].innerHTML = '单价：￥' + data.goods[i].Price;
                daishouhuo_dingdan_youhui[i].innerHTML = '优惠：￥' + data.goods[i].Youhui;
                daishouhuo_dingdan_buynum[i].innerHTML = '购买数量：' + data.goods[i].Buynum;
                daishouhuo_dingdan_status[i].innerHTML = '订单状态：' + data.goods[i].Status;
                daishouhuo_dingdan_pic[i].src = 'img/goods/' + data.goods[i].Url;
            }
        })
    }
    search_btn.onclick = function () {
        sessionStorage.setItem('fenlei', $.trim(search_input.value));
        location.href = 'list.html';
    };
})();
