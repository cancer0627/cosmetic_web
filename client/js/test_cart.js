/**
 * Created by Administrator on 2016/11/9 0009.
 */
//复选框
var quanxuan_ch1 = document.getElementById('quanxuan_ch1');
var quanxuan_ch2 = document.getElementById('quanxuan_ch2');
var all_goods_ch = document.getElementsByName('all_goods_ch');
var num = 0;
for (var i = 0; i < all_goods_ch.length; i++) {
    (function (i) {
        all_goods_ch[i].onclick = function () {
            if (all_goods_ch[i].checked) {
                num++;
            }
            else {
                num--;
            }
            if (num == parseInt(all_goods_ch.length)) {
                quanxuan_ch1.checked = true;
                quanxuan_ch2.checked = true;
            }
            else {
                quanxuan_ch2.checked = false;
                quanxuan_ch1.checked = false;
            }
        }
    })(i)
}
quanxuan_ch1.onclick = function () {
    if (quanxuan_ch1.checked) {
        quanxuan_ch2.checked = true;
        for (var i = 0; i < all_goods_ch.length; i++) {
            all_goods_ch[i].checked = true;
        }
    }
    else {
        quanxuan_ch2.checked = false;
        for (var i = 0; i < all_goods_ch.length; i++) {
            all_goods_ch[i].checked = false;
        }
    }
};
quanxuan_ch2.onclick = function () {
    if (quanxuan_ch2.checked) {
        quanxuan_ch1.checked = true;
        for (var i = 0; i < all_goods_ch.length; i++) {
            all_goods_ch[i].checked = true;
        }
    }
    else {
        quanxuan_ch1.checked = false;
        for (var i = 0; i < all_goods_ch.length; i++) {
            all_goods_ch[i].checked = false;
        }
    }
};
//加减数量
var btn_decrease = document.getElementById('btn_decrease');
var btn_increase = document.getElementById('btn_increase');
btn_decrease.onclick = function () {
    btn_decrease.nextSibling.nextSibling.value = parseInt(btn_decrease.nextSibling.nextSibling.value) - 1;
    if (btn_decrease.nextSibling.nextSibling.value < 1) {
        alert('商品数量至少为1');
        btn_decrease.nextSibling.nextSibling.value = 1;
    }
};
btn_increase.onclick = function () {
    btn_decrease.nextSibling.nextSibling.value = parseInt(btn_decrease.nextSibling.nextSibling.value) + 1;
};