/**
 * Created by Administrator on 2016/11/9 0009.
 */
//复选框
var quanxuan_ch = document.getElementById('quanxuan_ch');
var daishouhuo_ch = document.getElementsByName('daishouhuo_ch');
var num = 0;
for (var i = 0; i < daishouhuo_ch.length; i++) {
    (function (i) {
        daishouhuo_ch[i].onclick = function () {
            if (daishouhuo_ch[i].checked) {
                num++;
            }
            else {
                num--;
            }
            if (num == parseInt(daishouhuo_ch.length)) {
                quanxuan_ch.checked = true;
            }
            else {
                quanxuan_ch.checked = false;
            }
        }
    })(i)
}
quanxuan_ch.onclick = function () {
    if (quanxuan_ch.checked) {
        for (var i = 0; i < daishouhuo_ch.length; i++) {
            daishouhuo_ch[i].checked = true;
        }
    }
    else {
        for (var i = 0; i < daishouhuo_ch.length; i++) {
            daishouhuo_ch[i].checked = false;
        }
    }
};
