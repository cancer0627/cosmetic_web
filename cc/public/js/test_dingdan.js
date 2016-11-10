/**
 * Created by Administrator on 2016/11/9 0009.
 */
var local_list = document.getElementById('local_list');

for (var i = 1; i < local_list.childNodes.length; i = i + 2) {
    (function (i) {
        local_list.childNodes[i].childNodes[1].onclick = function () {
            if (local_list.childNodes[i].childNodes[1].checked) {
                for (var j = 1; j < local_list.childNodes.length; j = j + 2) {
                    local_list.childNodes[j].style.backgroundImage = 'url("")';
                    local_list.childNodes[j].lastChild.previousSibling.style.display='none';
                }
                local_list.childNodes[i].style.backgroundImage = 'url("img/personal/local.png")';
                local_list.childNodes[i].lastChild.previousSibling.style.display='inline-block';
            }
        }
    })(i)
}