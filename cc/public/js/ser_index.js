(function () {
    var search_input = document.getElementById('search_input');
    var search_btn = document.getElementById('search_btn');
    var url = 'http://127.0.0.1:3000/';

    var optimal_list = document.getElementsByClassName('optimal_list');
    var optimal_goods_name = document.getElementsByClassName('optimal_goods_name');
    var optimal_goods_describe = document.getElementsByClassName('optimal_goods_describe');
    var optimal_goods_baoyou = document.getElementsByClassName('optimal_goods_baoyou');
    var optimal_goods_fuwu = document.getElementsByClassName('optimal_goods_fuwu');
    var optimal_goods_style = document.getElementsByClassName('optimal_goods_style');
    var optimal_goods_price = document.getElementsByClassName('optimal_goods_price');
    var optimal_goods_buynum = document.getElementsByClassName('optimal_goods_buynum');
    var module_Optimal = document.getElementById('module_Optimal');

    var special_list = document.getElementsByClassName('special_list');
    var special_goods_name = document.getElementsByClassName('special_goods_name');
    var special_goods_describe = document.getElementsByClassName('special_goods_describe');
    var special_goods_price = document.getElementsByClassName('special_goods_price');
    var special_goods_price_original = document.getElementsByClassName('special_goods_price_original');
    var module_Special = document.getElementById('module_Special');

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
    //console.log(sessionStorage.length);
    if (sessionStorage.length == 0) {
        location.href = 'login.html';
    }
    else {
        search_btn.onclick = function () {
            sessionStorage.setItem('fenlei', $.trim(search_input.value));
            location.href = 'list.html';
        };
        $.post(url + 'index_sel', {
            userid: sessionStorage.userid,
            module: 'special'
        }, function (data, status) {
            console.log(data);
            for (var i = 0; i < data.goods.length; i++) {
                var li = document.createElement('li');
                li.className = 'special_list';
                module_Special.appendChild(li);
                li.innerHTML = '<ul> <li class="special_goods_name" style="font-size: 18px">珂莱欧（CLIO）气垫BB</li> <li class="special_goods_describe" style="font-size: 14px">素颜水光肌肤成就明星气质</li>' +
                    '<li style="font-size: 14px"> <em style="color: #9f0404">¥</em> <em class="special_goods_price" style="color: #9f0404;font-size: 30px">159</em>' +
                    '<em class="special_goods_price_original" style="text-decoration: line-through">￥179</em> </li><li><a href="#">点击疯抢</a></li> </ul>';
                special_list[i].style.backgroundImage = "url('../img/goods/" + data.goods[i].Url + "')";
                special_goods_name[i].innerHTML = data.goods[i].Name;
                special_goods_describe[i].innerHTML = data.goods[i].ShortDescribe;
                special_goods_price[i].innerHTML = data.goods[i].Price;
                special_goods_price_original[i].innerHTML = data.goods[i].OriginalPrice;
            }
        });
        $.post(url + 'index_sel', {
            userid: sessionStorage.userid,
            module: 'optimal'
        }, function (data, status) {
            console.log(data);
            for (var i = 0; i < data.goods.length; i++) {
                var li = document.createElement('li');
                li.className = 'optimal_list';
                module_Optimal.appendChild(li);
                li.innerHTML = '<ul> <li class="optimal_goods_name" style="text-align: center;font-size: 18px;color: #6c6c6c">CANMAKE双色立体修容粉 </li>' +
                    '<li class="optimal_goods_describe" style="font-size: 14px;line-height: 30px;color: #6c6c6c"> 拍照不再跪求P图也能拍出明星范！CANMAKE阴影+高光修容粉，解救你的缺陷。让你快速拥有混血娃娃的高粱鼻，双色立体修容粉，引发全民点高光！3D妆容、女神光，拍照不再跪求P图也能拍出明星范！高光+阴影2in1，量大到你想不到，妥妥用一年也用不完！解救亚洲人整体鼻梁不高的缺陷。</li>' +
                    '<li> <div> <p class="optimal_goods_baoyou">包邮政策： 满299元或2件包邮</p> <p class="optimal_goods_fuwu" style="color: #7e7e7e">服务政策：7天拆封无理由退货</p> </div>' +
                    '<div class="optimal_goods_style"> <p>商品型号：</p> <p>BR1扁平头，0.5g</p> <p>BR1扁平头，0.5g</p> </div> </li>' +
                    '<li style="margin-top:120px;color: #9f0404;font-size: 18px">￥<em class="optimal_goods_price" style="font-size: 48px;color: #9f0404">75</em></li>' +
                    '<li style="font-size: 14px"><em class="optimal_goods_buynum" style="color: #ff7e00">1587</em>人已购买</li> <li><a href="#">去看看</a></li> </ul>'
                optimal_list[i].style.backgroundImage = "url('../img/goods/" + data.goods[i].Url + "')";
                optimal_goods_name[i].innerHTML = data.goods[i].Name;
                optimal_goods_describe[i].innerHTML = data.goods[i].LongDescribe;
                optimal_goods_baoyou[i].innerHTML = '包邮政策：' + data.goods[i].Baoyou;
                optimal_goods_fuwu[i].innerHTML = '服务政策：' + data.goods[i].Fuwu;
                optimal_goods_style[i].innerHTML = '<p>商品型号：</p> <p>' + data.goods[i].Style + '</p>';
                optimal_goods_price[i].innerHTML = data.goods[i].Price;
                optimal_goods_buynum[i].innerHTML = data.goods[i].BuyNum;
            }
        });
        $.post(url + 'index_sel', {
            userid: sessionStorage.userid,
            module: 'bangs1'
        }, function (data, status) {
            for (var i = 0; i < data.goods.length; i++) {
                var li1 = document.createElement('li');
                li1.className = 'xiaoliang_bangs';
                bangs1.appendChild(li1);
                li1.innerHTML = '<img class="xiaoliang_bangs_img" width="239" height="233" src="">' +
                    '<p class="xiaoliang_bangs_name" style="font-size: 12px;color: #343434;">兰蔻奇迹BB气垫粉底23/PA++</p>' +
                    '<p class="xiaoliang_bangs_fuwu" style="font-size: 12px;color: #757474;">7天拆封无理由退货</p>' +
                    '<p style="font-size: 12px;color: #9f0404;">¥<em class="xiaoliang_bangs_price" style="color: #9f0404;font-size: 30px">299</em></p>' +
                    '<button class="xiaoliang_bangs_btn">加入购物车</button>';
                xiaoliang_bangs_img[i].src = "../img/goods/" + data.goods[i].Url;
                xiaoliang_bangs_name[i].innerHTML = data.goods[i].Name;
                xiaoliang_bangs_fuwu[i].innerHTML = data.goods[i].Fuwu;
                xiaoliang_bangs_price[i].innerHTML = data.goods[i].Price;
            }
        });
        $.post(url + 'index_sel', {
            userid: sessionStorage.userid,
            module: 'bangs2'
        }, function (data, status) {
            for (var i = 0; i < data.goods.length; i++) {
                var li2 = document.createElement('li');
                li2.className = 'shoucang_bangs';
                bangs2.appendChild(li2);
                li2.innerHTML = '<img class="shoucang_bangs_img" width="239" height="233" src="">' +
                    '<p class="shoucang_bangs_name" style="font-size: 12px;color: #343434;">兰蔻奇迹BB气垫粉底23/PA++</p>' +
                    '<p class="shoucang_bangs_fuwu" style="font-size: 12px;color: #757474;">7天拆封无理由退货</p>' +
                    '<p style="font-size: 12px;color: #9f0404;">¥<em class="shoucang_bangs_price" style="color: #9f0404;font-size: 30px">299</em></p>' +
                    '<button class="shoucang_bangs_btn">加入购物车</button>';
                shoucang_bangs_img[i].src = "../img/goods/" + data.goods[i].Url;
                shoucang_bangs_name[i].innerHTML = data.goods[i].Name;
                shoucang_bangs_fuwu[i].innerHTML = data.goods[i].Fuwu;
                shoucang_bangs_price[i].innerHTML = data.goods[i].Price;
            }
        })
    }
})();