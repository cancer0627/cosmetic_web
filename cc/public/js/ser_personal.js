(function () {
    var person_details = document.getElementById('person_details');
    var per_username = person_details.childNodes[1].childNodes[3];
    var per_userid = person_details.childNodes[1].childNodes[5];
    var dingdan_date = document.getElementsByClassName('dingdan_date');
    var dingdan_num = document.getElementsByClassName('dingdan_num');
    var dingdan_name = document.getElementsByClassName('dingdan_name');
    var dingdan_price = document.getElementsByClassName('dingdan_price');
    var dingdan_youhui = document.getElementsByClassName('dingdan_youhui');
    var dingdan_buynum = document.getElementsByClassName('dingdan_buynum');
    var dingdan_status = document.getElementsByClassName('dingdan_status');
    var dingdan_pic = document.getElementsByClassName('dingdan_pic');
    var daishouhuo_goods = document.getElementsByClassName('daishouhuo_goods');
    var dingdan_zhifu_btn = document.getElementsByClassName('dingdan_zhifu_btn');
    var daishouhuo_ch = document.getElementsByName('daishouhuo_ch');
    var url = 'http://127.0.0.1:3000/';
    var gd;

    console.log(sessionStorage);
    if (sessionStorage.username == undefined) {
        alert('未登录，请先登录！！！');
        location.href = 'login.html';
    }
    else {
        per_username.innerHTML = '用户：' + sessionStorage.username;
        per_userid.innerHTML = '用户ID：' + sessionStorage.userid;
        $.post(url + 'dingdan_sel_byuser', {
            userid: sessionStorage.userid
        }, function (data, status) {
            console.log(data);
            gd = data;
            for (var i = 0; i < gd.goods.length; i++) {
                var li = document.createElement('li');
                li.className = 'daishouhuo_goods';
                daishouhuo_list.appendChild(li);
                li.innerHTML = '<input type="checkbox" name="daishouhuo_ch"> <span class="dingdan_date">购买日期：2016-11-11</span> ' +
                    ' <span class="dingdan_num">订单编号：1584523697848584572</span> <div> <span class="dingdan_name" style="left: 0;top: 25px">凯筣丝汀净颜立体五色遮瑕膏5g*5</span>' +
                    ' <span class="dingdan_price" style="left: 270px;top: 25px">单价：￥39.9</span> <span class="dingdan_youhui" style="left: 400px;top: 25px">优惠：￥60</span>' +
                    ' <span class="dingdan_buynum" style="left: 0;top: 85px">购买数量：1</span> <span class="dingdan_status" style="left: 0;top: 140px">订单状态：物流运输中</span>' +
                    ' <a href="#" style="left: 270px;top: 140px">退货/换货</a> <button class="dingdan_zhifu_btn">确认支付</button> </div> ' +
                    ' <img class="dingdan_pic" width="170" src="">';
                dingdan_date[i].innerHTML = '购买日期：' + gd.goods[i].Date;
                dingdan_num[i].innerHTML = '订单编号：' + gd.goods[i].Id;
                dingdan_name[i].innerHTML = gd.goods[i].Name;
                dingdan_price[i].innerHTML = '单价：￥' + gd.goods[i].Price;
                dingdan_youhui[i].innerHTML = '优惠：￥' + gd.goods[i].Youhui;
                dingdan_buynum[i].innerHTML = '购买数量：' + gd.goods[i].Buynum;
                dingdan_status[i].innerHTML = '订单状态：' + gd.goods[i].Status;
                dingdan_pic[i].src = 'img/goods/' + gd.goods[i].Url;
            }
            for (i = 0; i < gd.goods.length; i++) {
                (function (i) {
                    dingdan_zhifu_btn[i].onclick = function () {
                        var num = 0, sum = 0;
                        for (var j = 0; j < daishouhuo_ch.length; j++) {
                            if (daishouhuo_ch[j].checked) {
                                sum += gd.goods[j].Price * gd.goods[j].Buynum;
                                num += gd.goods[j].Buynum;
                            }
                        }
                        alert('商品总价：' + sum + '\n' +'购买数量：'+num)
                    }
                })(i)
            }
        })
    }
})();
