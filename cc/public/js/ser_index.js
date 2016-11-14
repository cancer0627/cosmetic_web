/**
 * Created by Administrator on 2016/11/13 0013.
 */
(function () {
    var optimal_list = document.getElementsByClassName('optimal_list');
    var optimal_goods_name = document.getElementsByClassName('optimal_goods_name');
    var optimal_goods_describe = document.getElementsByClassName('optimal_goods_describe');
    var optimal_goods_baoyou = document.getElementsByClassName('optimal_goods_baoyou');
    var optimal_goods_fuwu = document.getElementsByClassName('optimal_goods_fuwu');
    var optimal_goods_style = document.getElementsByClassName('optimal_goods_style');
    var optimal_goods_price = document.getElementsByClassName('optimal_goods_price');
    var optimal_goods_buynum = document.getElementsByClassName('optimal_goods_buynum');
    var url = 'http://127.0.0.1:3000/';
    console.log(sessionStorage.length);
    if (sessionStorage.length == 0) {
        location.href = 'login.html';
    }
    else {
        $.post(url + 'optimal', {
            userid: sessionStorage.userid
        }, function (data, status) {
            console.log(data);
            for (var i = 0; i < optimal_list.length; i++) {
                optimal_list[i].style.backgroundImage = "url('../img/goods/" + data.goods[i].Url + "')";
                optimal_goods_name[i].innerHTML = data.goods[i].Name;
                optimal_goods_describe[i].innerHTML = data.goods[i].LongDescribe;
                optimal_goods_baoyou[i].innerHTML = '包邮政策：' + data.goods[i].Baoyou;
                optimal_goods_fuwu[i].innerHTML = '服务政策：' + data.goods[i].Fuwu;
                optimal_goods_style[i].innerHTML = '<p>商品型号：</p> <p>' + data.goods[i].Style + '</p>';
                optimal_goods_price[i].innerHTML = data.goods[i].Price;
                optimal_goods_buynum[i].innerHTML = data.goods[i].BuyNum;
            }
        })
    }
})();