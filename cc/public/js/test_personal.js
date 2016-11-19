(function () {
    /*模块选择*/
    var goods_nav = document.getElementById('goods_nav');
    var goods_nav_daifukuan = document.getElementById('goods_nav_daifukuan');
    var goods_nav_daifahuo = document.getElementById('goods_nav_daifahuo');
    var goods_nav_daishouhuo = document.getElementById('goods_nav_daishouhuo');
    var goods_nav_daipingjia = document.getElementById('goods_nav_daipingjia');
    var goods_nav_tuikuan = document.getElementById('goods_nav_tuikuan');
    var daifukuan_mod = document.getElementById('daifukuan_mod');
    var daifahuo_mod = document.getElementById('daifahuo_mod');
    var daishouhuo_mod = document.getElementById('daishouhuo_mod');
    var daipingjia_mod = document.getElementById('daipingjia_mod');
    var tuikuan_mod = document.getElementById('tuikuan_mod');
    /*复选框*/
    var quanxuan_ch_daifukuan = document.getElementById('quanxuan_ch_daifukuan');
    var quanxuan_ch_daifahuo = document.getElementById('quanxuan_ch_daifahuo');
    var quanxuan_ch_daishouhuo = document.getElementById('quanxuan_ch_daishouhuo');
    var quanxuan_ch_daipingjia = document.getElementById('quanxuan_ch_daipingjia');
    var quanxuan_ch_tuikuan = document.getElementById('quanxuan_ch_tuikuan');

    var daishouhuo_ch = document.getElementsByName('daishouhuo_ch');
    var num1 = 0, num2 = 0, num3 = 0, num4 = 0, num5 = 0, i;
    /*---------------------------------------------------------------------------------------------------------------*/
    /*模块切换效果*/
    goods_nav_daifukuan.onclick = function () {
        for (i = 0; i < goods_nav.childNodes.length; i++) {
            if (goods_nav.childNodes[i].tagName == 'SPAN') {
                goods_nav.childNodes[i].style.color = '#343434';
            }
        }
        goods_nav_daifukuan.style.color = '#d41a39';
        daifukuan_mod.className = 'checked_mod';
        daifahuo_mod.className = 'unchecked_mod';
        daishouhuo_mod.className = 'unchecked_mod';
        daipingjia_mod.className = 'unchecked_mod';
        tuikuan_mod.className = 'unchecked_mod';
    };
    goods_nav_daifahuo.onclick = function () {
        for (i = 0; i < goods_nav.childNodes.length; i++) {
            if (goods_nav.childNodes[i].tagName == 'SPAN') {
                goods_nav.childNodes[i].style.color = '#343434';
            }
        }
        goods_nav_daifahuo.style.color = '#d41a39';
        daifukuan_mod.className = 'unchecked_mod';
        daifahuo_mod.className = 'checked_mod';
        daishouhuo_mod.className = 'unchecked_mod';
        daipingjia_mod.className = 'unchecked_mod';
        tuikuan_mod.className = 'unchecked_mod';
    };
    goods_nav_daishouhuo.onclick = function () {
        for (i = 0; i < goods_nav.childNodes.length; i++) {
            if (goods_nav.childNodes[i].tagName == 'SPAN') {
                goods_nav.childNodes[i].style.color = '#343434';
            }
        }
        goods_nav_daishouhuo.style.color = '#d41a39';
        daifukuan_mod.className = 'unchecked_mod';
        daifahuo_mod.className = 'unchecked_mod';
        daishouhuo_mod.className = 'checked_mod';
        daipingjia_mod.className = 'unchecked_mod';
        tuikuan_mod.className = 'unchecked_mod';
    };
    goods_nav_daipingjia.onclick = function () {
        for (i = 0; i < goods_nav.childNodes.length; i++) {
            if (goods_nav.childNodes[i].tagName == 'SPAN') {
                goods_nav.childNodes[i].style.color = '#343434';
            }
        }
        goods_nav_daipingjia.style.color = '#d41a39';
        daifukuan_mod.className = 'unchecked_mod';
        daifahuo_mod.className = 'unchecked_mod';
        daishouhuo_mod.className = 'unchecked_mod';
        daipingjia_mod.className = 'checked_mod';
        tuikuan_mod.className = 'unchecked_mod';
    };
    goods_nav_tuikuan.onclick = function () {
        for (i = 0; i < goods_nav.childNodes.length; i++) {
            if (goods_nav.childNodes[i].tagName == 'SPAN') {
                goods_nav.childNodes[i].style.color = '#343434';
            }
        }
        goods_nav_tuikuan.style.color = '#d41a39';
        daifukuan_mod.className = 'unchecked_mod';
        daifahuo_mod.className = 'unchecked_mod';
        daishouhuo_mod.className = 'unchecked_mod';
        daipingjia_mod.className = 'unchecked_mod';
        tuikuan_mod.className = 'checked_mod';
    };
    /*全选按钮效果*/
    for (i = 0; i < daishouhuo_ch.length; i++) {
        (function (i) {
            daishouhuo_ch[i].onclick = function () {
                if (daishouhuo_ch[i].checked) {
                    num++;
                }
                else {
                    num--;
                }
                if (num == parseInt(daishouhuo_ch.length)) {
                    quanxuan_ch_daishouhuo.checked = true;
                }
                else {
                    quanxuan_ch_daishouhuo.checked = false;
                }
            }
        })(i)
    }
    quanxuan_ch_daishouhuo.onclick = function () {
        if (quanxuan_ch_daishouhuo.checked) {
            for (i = 0; i < daishouhuo_ch.length; i++) {
                daishouhuo_ch[i].checked = true;
            }
        }
        else {
            for (i = 0; i < daishouhuo_ch.length; i++) {
                daishouhuo_ch[i].checked = false;
            }
        }
    };
})();