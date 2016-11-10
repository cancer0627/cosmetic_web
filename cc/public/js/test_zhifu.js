/**
 * Created by Administrator on 2016/11/9 0009.
 */
var card_sel = document.getElementById('card_sel');
var web_sel = document.getElementById('web_sel');
var card_sel_btn = document.getElementById('card_sel_btn');
var web_sel_btn = document.getElementById('web_sel_btn');
card_sel.lastChild.previousSibling.style.display = 'none';
web_sel.lastChild.previousSibling.style.display = 'none';
card_sel_btn.onclick = function () {
    if (card_sel.lastChild.previousSibling.style.display == 'none') {
        card_sel.lastChild.previousSibling.style.display = 'block';
    }
    else {
        card_sel.lastChild.previousSibling.style.display = 'none';
    }
};
web_sel_btn.onclick = function () {
    if (web_sel.lastChild.previousSibling.style.display == 'none') {
        web_sel.lastChild.previousSibling.style.display = 'block';
    }
    else {
        web_sel.lastChild.previousSibling.style.display = 'none';
    }
};