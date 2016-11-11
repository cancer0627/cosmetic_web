/**
 * Created by Administrator on 2016/11/11 0011.
 */
var sales_bang = document.getElementById('sales_bang');
var bangs = document.getElementsByClassName('bangs');
console.log(bangs)
sales_bang.childNodes[1].childNodes[1].onclick = function () {
    sales_bang.childNodes[1].childNodes[2].className = '';
    sales_bang.childNodes[1].childNodes[1].className = 'listed';
    for (var i = 0; i < bangs.length; i++) {
        bangs[i].classList.remove('bangs_listed');
    }
    bangs[1].classList.add('bangs_listed');
};
sales_bang.childNodes[1].childNodes[2].onclick = function () {
    sales_bang.childNodes[1].childNodes[1].className = '';
    sales_bang.childNodes[1].childNodes[2].className = 'listed';
    for (var i = 0; i < bangs.length; i++) {
        bangs[i].classList.remove('bangs_listed');
    }
    bangs[0].classList.add('bangs_listed');
};