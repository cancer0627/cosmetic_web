(function () {
    var username = document.getElementById('username');
    /*地址设置*/
    var local_list = document.getElementById('local_list');
    var local_add_btn = document.getElementById('local_add_btn');
    var local_add_inp = document.getElementById('local_add_inp');
    var local_list_det = document.getElementsByClassName('local_list_det');
    var local_ch = document.getElementsByName('local_ch');
    var moren_local_btn = document.getElementsByClassName('moren_local_btn');
    var update_local_btn = document.getElementsByClassName('update_local_btn');
    var local_inp = document.getElementsByClassName('local_inp');
    var local_span = document.getElementsByClassName('local_span');
    /*确认商品清单*/
    var queren_list = document.getElementById('queren_list');
    var queren_goods_list = document.getElementsByClassName('queren_goods_list');
    var queren_goods_pic = document.getElementsByClassName('queren_goods_pic');
    var queren_goods_name = document.getElementsByClassName('queren_goods_name');
    var queren_goods_brand = document.getElementsByClassName('queren_goods_brand');
    var queren_goods_buynum = document.getElementsByClassName('queren_goods_buynum');
    var queren_goods_price = document.getElementsByClassName('queren_goods_price');
    var queren_goods_price_zong = document.getElementsByClassName('queren_goods_price_zong');
    var queren_goods_yunfei = document.getElementById('queren_goods_yunfei');
    var goods_num = document.getElementById('goods_num');
    var goods_price_zong = document.getElementById('goods_price_zong');
    var goods_yunfei_zong = document.getElementById('goods_yunfei_zong');
    var price_zong1 = document.getElementById('price_zong1');
    var price_zong2 = document.getElementById('price_zong2');
    var queren_zhifu_btn = document.getElementById('queren_zhifu_btn');

    var i, j, gd, url = 'http://127.0.0.1:3000/';

    username.innerHTML = '用户' + sessionStorage.username;
    for (i = 0; i < local_list_det.length; i++) {
        if (local_ch[i].checked) {
            local_list_det[i].style.backgroundImage = 'url("img/personal/local.png")';
        }
    }
    act_local();
    local_add_btn.onclick = function () {
        local_add_inp.style.display = 'inline-block'
    };
    local_add_inp.onchange = function () {
        local_add_inp.style.display = 'none';
        var li = document.createElement('li');
        li.className = 'local_list_det';
        local_list.appendChild(li);
        li.innerHTML = '<input type="radio" name="local_ch" checked><input class="local_inp"><span class="local_span">' + local_add_inp.value + '</span>' +
            '<a class="moren_local_btn" href="#" style="right: 150px">默认地址</a><a class="update_local_btn" href="#" style="right: 50px">修改本地址</a>'
        for (i = 0; i < local_list_det.length; i++) {
            local_list_det[i].style.backgroundImage = '';
        }
        li.style.backgroundImage = 'url("img/personal/local.png")';
        act_local();
    };
    $.post(url + 'dingdan_sel', {
        id: sessionStorage.dingdanid
    }, function (data, status) {
        console.log(data);
        gd = data.goods;
        var yunfei = 0, sum = 0, num = 0;
        for (i = 0; i < gd.length; i++) {
            var li = document.createElement('li');
            li.className = 'queren_goods_list';
            queren_list.appendChild(li);
            li.innerHTML = '<div><img class="queren_goods_pic" width="105" height="105" src="">' +
                '<p class="queren_goods_name" style="top: 20px">###########</p>' +
                '<p class="queren_goods_brand" style="top: 60px">###########</p></div>' +
                '<span class="queren_goods_buynum" style="left: 452px;top:40px">0</span>' +
                '<span class="queren_goods_price" style="left: 607px;top:40px">￥0</span>' +
                '<span class="queren_goods_price_zong" style="left: 760px;top:40px">￥0</span>';
        }
        for (i = 0; i < queren_goods_list.length; i++) {
            queren_goods_pic[i].src = "img/goods/" + gd[i].Url;
            queren_goods_name[i].innerHTML = '商品名称：' + gd[i].Name;
            queren_goods_brand[i].innerHTML = '品牌：' + gd[i].Brand;
            queren_goods_buynum[i].innerHTML = gd[i].Buynum;
            queren_goods_price[i].innerHTML = '￥' + gd[i].Price;
            queren_goods_price_zong[i].innerHTML = '￥' + gd[i].Price * gd[i].Buynum;
            yunfei = 5;
            sum += gd[i].Price * gd[i].Buynum;
            num += gd[i].Buynum;
        }
        queren_goods_yunfei.innerHTML = '配送费：￥' + yunfei;
        goods_num.innerHTML = '共计' + num + '件商品，总金额：';
        goods_price_zong.innerHTML = '￥' + sum;
        goods_yunfei_zong.innerHTML = '￥' + yunfei;
        price_zong1.innerHTML = '￥' + (sum + yunfei);
        price_zong2.innerHTML = '￥' + (sum + yunfei);
    });
    queren_zhifu_btn.onclick = function () {
        if (gd.length) {
            location.href = 'zhifu.html';
        }
        else {
            alert('还没有商品，赶紧去购买吧！！！')
        }
    };
    function act_local() {
        for (i = 0; i < local_list_det.length; i++) {
            (function (i) {
                local_list_det[i].onmouseover = function () {
                    moren_local_btn[i].style.display = 'initial';
                    update_local_btn[i].style.display = 'initial';
                };
                local_list_det[i].onmouseout = function () {
                    moren_local_btn[i].style.display = 'none';
                    update_local_btn[i].style.display = 'none';
                };
                update_local_btn[i].onclick = function () {
                    local_inp[i].style.display = 'initial';
                    local_span[i].style.display = 'none';
                    local_inp[i].focus();
                };
                local_inp[i].onchange = function () {
                    local_span[i].innerHTML = local_inp[i].value;
                    local_inp[i].style.display = 'none';
                    local_span[i].style.display = 'initial';
                };
                local_ch[i].onclick = function () {
                    for (j = 0; j < local_list_det.length; j++) {
                        local_list_det[j].style.backgroundImage = '';
                    }
                    local_list_det[i].style.backgroundImage = 'url("img/personal/local.png")';
                }
            })(i)
        }
    }
})();