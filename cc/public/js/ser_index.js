(function () {
    /*搜索框*/
    var search_input = document.getElementById('search_input');
    var search_btn = document.getElementById('search_btn');
    var search_list = document.getElementsByClassName('search_list');
    /*optimal*/
    var optimal_list = document.getElementsByClassName('optimal_list');
    var optimal_goods_name = document.getElementsByClassName('optimal_goods_name');
    var optimal_goods_describe = document.getElementsByClassName('optimal_goods_describe');
    var optimal_goods_baoyou = document.getElementsByClassName('optimal_goods_baoyou');
    var optimal_goods_fuwu = document.getElementsByClassName('optimal_goods_fuwu');
    var optimal_goods_style = document.getElementsByClassName('optimal_goods_style');
    var optimal_goods_price = document.getElementsByClassName('optimal_goods_price');
    var optimal_goods_buynum = document.getElementsByClassName('optimal_goods_buynum');
    var optimal_goods_buy_btn = document.getElementsByClassName('optimal_goods_buy_btn');
    var optimal_goods_pic = document.getElementsByClassName('optimal_goods_pic');
    var module_Optimal = document.getElementById('module_Optimal');
    /*special*/
    var special_list = document.getElementsByClassName('special_list');
    var special_goods_name = document.getElementsByClassName('special_goods_name');
    var special_goods_describe = document.getElementsByClassName('special_goods_describe');
    var special_goods_price = document.getElementsByClassName('special_goods_price');
    var special_goods_price_original = document.getElementsByClassName('special_goods_price_original');
    var special_goods_buy_btn = document.getElementsByClassName('special_goods_buy_btn');
    var module_Special = document.getElementById('module_Special');
    var special_goods_pic = document.getElementsByClassName('special_goods_pic');
    /*bangs*/
    var bangs1 = document.getElementById('bangs1');
    var bangs2 = document.getElementById('bangs2');
    var xiaoliang_bangs = document.getElementsByClassName('xiaoliang_bangs');
    var xiaoliang_bangs_img = document.getElementsByClassName('xiaoliang_bangs_img');
    var xiaoliang_bangs_name = document.getElementsByClassName('xiaoliang_bangs_name');
    var xiaoliang_bangs_fuwu = document.getElementsByClassName('xiaoliang_bangs_fuwu');
    var xiaoliang_bangs_price = document.getElementsByClassName('xiaoliang_bangs_price');
    var xiaoliang_bangs_btn = document.getElementsByClassName('xiaoliang_bangs_btn');
    var shoucang_bangs = document.getElementsByClassName('shoucang_bangs');
    var shoucang_bangs_img = document.getElementsByClassName('shoucang_bangs_img');
    var shoucang_bangs_name = document.getElementsByClassName('shoucang_bangs_name');
    var shoucang_bangs_fuwu = document.getElementsByClassName('shoucang_bangs_fuwu');
    var shoucang_bangs_price = document.getElementsByClassName('shoucang_bangs_price');
    var shoucang_bangs_btn = document.getElementsByClassName('shoucang_bangs_btn');
    /*样式*/
    var sales_bang = document.getElementById('sales_bang');
    var bangs = document.getElementsByClassName('bangs');
    /*定义变量*/
    var url = 'http://127.0.0.1:3000/';
    var i, j, gd_special, gd_optimal, gd_xiaoliang, gd_shoucang;
    /*---------------------------------------------------------------------------------------------------------------*/
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
    /*---------------------------------------------------------------------------------------------------------------*/
    if (sessionStorage.length == 0) {
        location.href = 'login.html';
    }
    else {
        for (i = 0; i < search_list.length; i++) {
            (function (i) {
                search_list[i].onclick = function () {
                    sessionStorage.setItem('fenlei', $.trim(search_list[i].innerHTML));
                    location.href = 'list.html';
                }
            })(i)
        }
        search_btn.onclick = function () {
            sessionStorage.setItem('fenlei', $.trim(search_input.value));
            location.href = 'list.html';
        };
        $.post(url + 'index_sel', {
            userid: sessionStorage.userid,
            module: 'special'
        }, function (data, status) {
            gd_special = data;
            for (i = 0; i < data.goods.length; i++) {
                var li = document.createElement('li');
                li.className = 'special_list';
                module_Special.appendChild(li);
                li.innerHTML = '<ul><li class="special_goods_name" style="font-size: 18px"></li><li class="special_goods_describe" style="font-size: 14px"></li><img class="special_goods_pic" width="200" height="200" src="">' +
                    '<li style="font-size: 14px"><em style="color: #9f0404">¥</em><em class="special_goods_price" style="color: #9f0404;font-size: 30px"></em>' +
                    '<em class="special_goods_price_original" style="text-decoration: line-through">￥</em></li><li><a class="special_goods_buy_btn" href="#">点击疯抢</a></li></ul>';
            }
            for (i = 0; i < special_list.length; i++) {
                special_goods_pic[i].src = '../img/goods/' + gd_special.goods[i].Url;
                special_goods_name[i].innerHTML = gd_special.goods[i].Name;
                special_goods_describe[i].innerHTML = gd_special.goods[i].ShortDescribe;
                special_goods_price[i].innerHTML = gd_special.goods[i].Price;
                special_goods_price_original[i].innerHTML = gd_special.goods[i].OriginalPrice;
                (function (i) {
                    special_goods_buy_btn[i].onclick = function () {
                        sessionStorage.setItem('goodsid', gd_special.goods[i].Id);
                        window.open('details.html');
                    }
                })(i)
            }
        });
        $.post(url + 'index_sel', {
            userid: sessionStorage.userid,
            module: 'optimal'
        }, function (data, status) {
            gd_optimal = data;
            for (var i = 0; i < data.goods.length; i++) {
                var li = document.createElement('li');
                li.className = 'optimal_list';
                module_Optimal.appendChild(li);
                li.innerHTML = '<ul><li class="optimal_goods_name" style="text-align: center;font-size: 18px;color: #6c6c6c"></li>' +
                    '<li class="optimal_goods_describe" style="font-size: 14px;line-height: 30px;color: #6c6c6c"></li>' +
                    '<li><div><p class="optimal_goods_baoyou"></p><p class="optimal_goods_fuwu" style="color: #7e7e7e"></p></div>' +
                    '<div class="optimal_goods_style"></div></li><img width="500" height="500" class="optimal_goods_pic" src="">' +
                    '<li style="margin-top:160px;color: #9f0404;font-size: 18px">￥<em class="optimal_goods_price" style="font-size: 48px;color: #9f0404"></em></li>' +
                    '<li style="font-size: 14px"><em class="optimal_goods_buynum" style="color: #ff7e00"></em>人已购买</li>' +
                    '<li><a class="optimal_goods_buy_btn" href="#">去看看</a></li></ul>';
            }
            for (i = 0; i < optimal_list.length; i++) {
                optimal_goods_pic[i].src = '../img/goods/' + gd_optimal.goods[i].Url;
                optimal_goods_name[i].innerHTML = gd_optimal.goods[i].Name;
                optimal_goods_describe[i].innerHTML = gd_optimal.goods[i].LongDescribe;
                optimal_goods_baoyou[i].innerHTML = '包邮政策：' + gd_optimal.goods[i].Baoyou;
                optimal_goods_fuwu[i].innerHTML = '服务政策：' + gd_optimal.goods[i].Fuwu;
                optimal_goods_style[i].innerHTML = '<p>商品型号：</p> <p>' + gd_optimal.goods[i].Style + '</p>';
                optimal_goods_price[i].innerHTML = gd_optimal.goods[i].Price;
                optimal_goods_buynum[i].innerHTML = gd_optimal.goods[i].BuyNum;
                (function (i) {
                    optimal_goods_buy_btn[i].onclick = function () {
                        sessionStorage.setItem('goodsid', gd_optimal.goods[i].Id);
                        window.open('details.html');
                    }
                })(i)
            }
        });
        $.post(url + 'index_sel', {
            userid: sessionStorage.userid,
            module: 'bangs1'
        }, function (data, status) {
            gd_xiaoliang = data;
            for (var i = 0; i < data.goods.length; i++) {
                var li = document.createElement('li');
                li.className = 'xiaoliang_bangs';
                bangs1.appendChild(li);
                li.innerHTML = '<img class="xiaoliang_bangs_img" width="239" height="239" src="">' +
                    '<p class="xiaoliang_bangs_name" style="font-size: 12px;color: #343434;"></p>' +
                    '<p class="xiaoliang_bangs_fuwu" style="font-size: 12px;color: #757474;"></p>' +
                    '<p style="font-size: 12px;color: #9f0404;">¥<em class="xiaoliang_bangs_price" style="color: #9f0404;font-size: 30px"></em></p>' +
                    '<button class="xiaoliang_bangs_btn">加入购物车</button>';
            }
            for (i = 0; i < xiaoliang_bangs.length; i++) {
                xiaoliang_bangs_img[i].src = "../img/goods/" + gd_xiaoliang.goods[i].Url;
                xiaoliang_bangs_name[i].innerHTML = gd_xiaoliang.goods[i].Name;
                xiaoliang_bangs_fuwu[i].innerHTML = gd_xiaoliang.goods[i].Fuwu;
                xiaoliang_bangs_price[i].innerHTML = gd_xiaoliang.goods[i].Price;
                (function (i) {
                    xiaoliang_bangs_img[i].onclick = function () {
                        sessionStorage.setItem('goodsid', gd_xiaoliang.goods[i].Id);
                        window.open('details.html');
                    };
                    xiaoliang_bangs_btn[i].onclick = function () {
                        $.post(url + 'cart_add', {
                            goods_id: gd_xiaoliang.goods[i].Id,
                            user_id: sessionStorage.userid
                        }, function (data, status) {
                            if (data.result) {
                                alert('加入购物车成功！！！');
                            }
                            else {
                                alert('加入购物车失败！！！');
                            }
                        })
                    }
                })(i)
            }
        });
        $.post(url + 'index_sel', {
            userid: sessionStorage.userid,
            module: 'bangs2'
        }, function (data, status) {
            gd_shoucang = data;
            for (var i = 0; i < data.goods.length; i++) {
                var li = document.createElement('li');
                li.className = 'shoucang_bangs';
                bangs2.appendChild(li);
                li.innerHTML = '<img class="shoucang_bangs_img" width="239" height="239" src="">' +
                    '<p class="shoucang_bangs_name" style="font-size: 12px;color: #343434;">兰蔻奇迹BB气垫粉底23/PA++</p>' +
                    '<p class="shoucang_bangs_fuwu" style="font-size: 12px;color: #757474;">7天拆封无理由退货</p>' +
                    '<p style="font-size: 12px;color: #9f0404;">¥<em class="shoucang_bangs_price" style="color: #9f0404;font-size: 30px">299</em></p>' +
                    '<button class="shoucang_bangs_btn">加入购物车</button>';
            }
            for (i = 0; i < shoucang_bangs.length; i++) {
                shoucang_bangs_img[i].src = "../img/goods/" + gd_shoucang.goods[i].Url;
                shoucang_bangs_name[i].innerHTML = gd_shoucang.goods[i].Name;
                shoucang_bangs_fuwu[i].innerHTML = gd_shoucang.goods[i].Fuwu;
                shoucang_bangs_price[i].innerHTML = gd_shoucang.goods[i].Price;
                (function (i) {
                    shoucang_bangs_img[i].onclick = function () {
                        sessionStorage.setItem('goodsid', gd_shoucang.goods[i].Id);
                        window.open('details.html');
                    };
                    shoucang_bangs_btn[i].onclick = function () {
                        console.log(gd_shoucang.goods[i].Id);
                        $.post(url + 'cart_add', {
                            goods_id: gd_shoucang.goods[i].Id,
                            user_id: sessionStorage.userid
                        }, function (data, status) {
                            if (data.result) {
                                alert('加入购物车成功！！！');
                            }
                            else {
                                alert('加入购物车失败！！！');
                            }
                        })
                    }
                })(i)
            }
        })
    }
})();