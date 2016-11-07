/**
 * Created by Administrator on 2016/11/7 0007.
 */
var select_div = document.getElementById('select_div');
var pinpai_sel1 = select_div.childNodes[1].childNodes[3].childNodes;
var pinpai_sel2 = select_div.childNodes[1].childNodes[5].childNodes;
var gongxiao_sel1 = select_div.childNodes[3].childNodes[3].childNodes;
var gongxiao_sel2 = select_div.childNodes[3].childNodes[5].childNodes;
var fuzhi_sel = select_div.childNodes[5].childNodes[3].childNodes;
var jiage_sel = select_div.childNodes[7].childNodes[3].childNodes;
var paixv_sel = select_div.childNodes[9].childNodes[3].childNodes;
var pinpai_btn = select_div.childNodes[1].lastChild.previousSibling;
var gongxiao_btn = select_div.childNodes[3].lastChild.previousSibling;
var pinpai = '';
var gongxiao = '';
//品牌效果
for (var i = 0; i < pinpai_sel1.length; i++) {
    (function (i) {
        pinpai_sel1[i].onclick = function () {
            pinpai_sel1[i].classList.toggle('selected');
            pinpai += pinpai_sel1[i].innerHTML;
        }
    })(i);
}
for (var i = 0; i < pinpai_sel2.length; i++) {
    (function (i) {
        pinpai_sel2[i].onclick = function () {
            pinpai_sel2[i].classList.toggle('selected');
            pinpai += pinpai_sel2[i].innerHTML;
        }
    })(i);
}
pinpai_btn.onclick = function () {
    if (select_div.childNodes[1].childNodes[5].style.display == 'none') {
        select_div.childNodes[1].childNodes[5].style.display = 'inline-block';
        pinpai_btn.innerHTML = '展开▲';
    }
    else {
        select_div.childNodes[1].childNodes[5].style.display = 'none'
        pinpai_btn.innerHTML = '展开▼';
    }
    //console.log(pinpai);
};
//功效效果
for (var i = 0; i < gongxiao_sel1.length; i++) {
    (function (i) {
        gongxiao_sel1[i].onclick = function () {
            gongxiao_sel1[i].classList.toggle('selected');
            gongxiao += gongxiao_sel1[i].innerHTML;
        }
    })(i);
}
for (var i = 0; i < gongxiao_sel2.length; i++) {
    (function (i) {
        gongxiao_sel2 [i].onclick = function () {
            gongxiao_sel2 [i].classList.toggle('selected');
            gongxiao += gongxiao_sel2 [i].innerHTML;
        }
    })(i);
}
gongxiao_btn.onclick = function () {
    if (select_div.childNodes[3].childNodes[5].style.display == 'none') {
        select_div.childNodes[3].childNodes[5].style.display = 'inline-block';
        pinpai_btn.innerHTML = '展开▲';
    }
    else {
        select_div.childNodes[3].childNodes[5].style.display = 'none'
        pinpai_btn.innerHTML = '展开▼';
    }
};
//肤质
for (var i = 0; i < fuzhi_sel.length; i++) {
    (function (i) {
        if (fuzhi_sel[i].tagName == 'SPAN') {
            fuzhi_sel[i].onclick = function () {
                fuzhi_sel[i].classList.toggle('selected');
            }
        }
    })(i);
}
//价格
for (var i = 0; i < jiage_sel.length; i++) {
    (function (i) {
        if (jiage_sel[i].tagName == 'SPAN') {
            jiage_sel[i].onclick = function () {
                jiage_sel[i].classList.toggle('selected');
            }
        }
    })(i);
}
//排序
for (var i = 0; i < paixv_sel.length; i++) {
    (function (i) {
        if (paixv_sel[i].tagName == 'SPAN') {
            paixv_sel[i].onclick = function () {
                for (var j = 2; j < paixv_sel.length; j++) {
                    paixv_sel[j].className = '';
                }
                paixv_sel[i].className = 'selected';
            }
        }
    })(i);
}