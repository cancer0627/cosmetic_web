(function () {
    var pic = document.querySelector('#pic');
    var temp;
    /*图片轮播*/
    function pic_act() {
        var pic_src = pic.childNodes[1].src;
        if (pic_src.match('banner1')) {
            pic.childNodes[1].src = 'img/banner2.jpg';
        }
        else if (pic_src.match('banner2')) {
            pic.childNodes[1].src = 'img/banner3.jpg';
        }
        else {
            pic.childNodes[1].src = 'img/banner1.jpg';
        }
    }
    temp = setInterval(pic_act, 4000);
    pic.childNodes[1].onmouseover = function () {
        clearInterval(temp);
    };
    pic.childNodes[1].onmouseout = function () {
        temp = setInterval(pic_act, 4000);
    }
})();