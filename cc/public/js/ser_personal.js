(function () {
    var person_details = document.getElementById('person_details');
    var per_username = document.getElementById('per_username');
    var per_userid = document.getElementById('per_userid');
    /*模块选择*/
    var goods_nav = document.getElementById('goods_nav');
    var goods_nav_daifukuan = document.getElementById('goods_nav_daifukuan');
    var goods_nav_daishouhuo = document.getElementById('goods_nav_daishouhuo');
    var goods_nav_daipingjia = document.getElementById('goods_nav_daipingjia');
    var daifukuan_mod = document.getElementById('daifukuan_mod');
    var daishouhuo_mod = document.getElementById('daishouhuo_mod');
    var daipingjia_mod = document.getElementById('daipingjia_mod');
    /*搜索框*/
    var search_btn = document.getElementById('search_btn');
    var search_input = document.getElementById('search_input');
    var search_list = document.getElementsByClassName('search_list');
    /*待付款订单*/
    var daifukuan_dingdan_date = document.getElementsByClassName('daifukuan_dingdan_date');
    var daifukuan_dingdan_num = document.getElementsByClassName('daifukuan_dingdan_num');
    var daifukuan_dingdan_name = document.getElementsByClassName('daifukuan_dingdan_name');
    var daifukuan_dingdan_price = document.getElementsByClassName('daifukuan_dingdan_price');
    var daifukuan_dingdan_buynum = document.getElementsByClassName('daifukuan_dingdan_buynum');
    var daifukuan_dingdan_status = document.getElementsByClassName('daifukuan_dingdan_status');
    var daifukuan_dingdan_pic = document.getElementsByClassName('daifukuan_dingdan_pic');
    var daifukuan_goods = document.getElementsByClassName('daifukuan_goods');
    var daifukuan_dingdan_zhifu_btn = document.getElementsByClassName('daifukuan_dingdan_zhifu_btn');
    var daifukuan_ch = document.getElementsByName('daifukuan_ch');
    /*待收货订单*/
    var daishouhuo_dingdan_date = document.getElementsByClassName('daishouhuo_dingdan_date');
    var daishouhuo_dingdan_num = document.getElementsByClassName('daishouhuo_dingdan_num');
    var daishouhuo_dingdan_name = document.getElementsByClassName('daishouhuo_dingdan_name');
    var daishouhuo_dingdan_price = document.getElementsByClassName('daishouhuo_dingdan_price');
    var daishouhuo_dingdan_buynum = document.getElementsByClassName('daishouhuo_dingdan_buynum');
    var daishouhuo_dingdan_status = document.getElementsByClassName('daishouhuo_dingdan_status');
    var daishouhuo_dingdan_pic = document.getElementsByClassName('daishouhuo_dingdan_pic');
    var daishouhuo_goods = document.getElementsByClassName('daishouhuo_goods');
    var daishouhuo_dingdan_zhifu_btn = document.getElementsByClassName('daishouhuo_dingdan_zhifu_btn');
    var daishouhuo_ch = document.getElementsByName('daishouhuo_ch');
    /*待收货订单*/
    var daipingjia_dingdan_date = document.getElementsByClassName('daipingjia_dingdan_date');
    var daipingjia_dingdan_num = document.getElementsByClassName('daipingjia_dingdan_num');
    var daipingjia_dingdan_name = document.getElementsByClassName('daipingjia_dingdan_name');
    var daipingjia_dingdan_price = document.getElementsByClassName('daipingjia_dingdan_price');
    var daipingjia_dingdan_buynum = document.getElementsByClassName('daipingjia_dingdan_buynum');
    var daipingjia_dingdan_status = document.getElementsByClassName('daipingjia_dingdan_status');
    var daipingjia_dingdan_pic = document.getElementsByClassName('daipingjia_dingdan_pic');
    var daipingjia_goods = document.getElementsByClassName('daipingjia_goods');
    var daipingjia_dingdan_zhifu_btn = document.getElementsByClassName('daipingjia_dingdan_zhifu_btn');
    var daipingjia_ch = document.getElementsByName('daipingjia_ch');
    /*热卖单品*/
    /*var hot_goods_mod = document.getElementById('hot_goods_mod');
    var hot_goods_list = document.getElementsByClassName('hot_goods_list');
    var hot_goods_pic = document.getElementsByClassName('hot_goods_pic');
    var hot_goods_name = document.getElementsByClassName('hot_goods_name');
    var hot_goods_buynum = document.getElementsByClassName('hot_goods_buynum');
    var hot_goods_price = document.getElementsByClassName('hot_goods_price');*/
    /*定义变量*/
    var url = 'http://127.0.0.1:3000/', i;
    /*---------------------------------------------------------------------------------------------------------------*/
    if (sessionStorage.username == undefined) {
        alert('未登录，请先登录！！！');
        //location.href = 'login.html';
    }
    else {
        per_username.innerHTML = '用户：' + sessionStorage.username;
        per_userid.innerHTML = '用户ID：' + sessionStorage.userid;
        /*模块切换效果*/
        goods_nav_daifukuan.onclick = function () {
            for (i = 0; i < goods_nav.childNodes.length; i++) {
                if (goods_nav.childNodes[i].tagName == 'SPAN') {
                    goods_nav.childNodes[i].style.color = '#343434';
                }
            }
            goods_nav_daifukuan.style.color = '#d41a39';
            daifukuan_mod.className = 'checked_mod';
            daishouhuo_mod.className = 'unchecked_mod';
            daipingjia_mod.className = 'unchecked_mod';
            $.post(url + 'dingdan_sel_byuser', {
                userid: sessionStorage.userid,
                type: '待支付'
            }, function (data, status) {
                var goods_list = data.goods;
                console.log(goods_list);
                daifukuan_list.innerHTML='';
                for (i = 0; i < goods_list.length; i++) {
                    var li = document.createElement('li');
                    li.className = 'daifukuan_goods';
                    daifukuan_list.appendChild(li);
                    li.innerHTML = '<span class="daifukuan_dingdan_date"></span> ' +
                        ' <span class="daifukuan_dingdan_num"></span><div><span class="daifukuan_dingdan_name" style="left: 0;top: 25px"></span>' +
                        ' <span class="daifukuan_dingdan_price" style="left: 270px;top: 25px"></span>' +
                        ' <span class="daifukuan_dingdan_buynum" style="left: 0;top: 85px"></span><span class="daifukuan_dingdan_status" style="left: 0;top: 140px"></span>' +
                        ' <button class="daifukuan_dingdan_zhifu_btn">确认支付</button></div> ' +
                        ' <img class="daifukuan_dingdan_pic" width="170" src="">';
                    daifukuan_dingdan_date[i].innerHTML = '购买日期：' + goods_list[i].ddate;
                    daifukuan_dingdan_num[i].innerHTML = '订单编号：' + goods_list[i].ID;
                    daifukuan_dingdan_name[i].innerHTML = goods_list[i].goods.gname;
                    daifukuan_dingdan_price[i].innerHTML = '单价：￥' + goods_list[i].goods.price;
                    daifukuan_dingdan_buynum[i].innerHTML = '购买数量：' + goods_list[i].num;
                    daifukuan_dingdan_status[i].innerHTML = '订单状态：' + goods_list[i].status;
                    daifukuan_dingdan_pic[i].src = 'img/goods/' + goods_list[i].goods.url;
                }
                for (var j = 0; j < daifukuan_dingdan_zhifu_btn.length; j++) {
                    (function (j) {
                        daifukuan_dingdan_zhifu_btn[j].onclick = function () {
                            sessionStorage.setItem('dingdanid', goods_list[j].ID);
                            location.href = '../dingdan.html';
                        }
                    })(j)
                }
            });
        };
        goods_nav_daishouhuo.onclick = function () {
            for (i = 0; i < goods_nav.childNodes.length; i++) {
                if (goods_nav.childNodes[i].tagName == 'SPAN') {
                    goods_nav.childNodes[i].style.color = '#343434';
                }
            }
            goods_nav_daishouhuo.style.color = '#d41a39';
            daifukuan_mod.className = 'unchecked_mod';
            daishouhuo_mod.className = 'checked_mod';
            daipingjia_mod.className = 'unchecked_mod';
            $.post(url + 'dingdan_sel_byuser', {
                userid: sessionStorage.userid,
                type: '待收货'
            }, function (data, status) {
                var goods_list = data.goods;
                daishouhuo_list.innerHTML='';
                for (i = 0; i < goods_list.length; i++) {
                    var li = document.createElement('li');
                    li.className = 'daishouhuo_goods';
                    daishouhuo_list.appendChild(li);
                    li.innerHTML = '<span class="daishouhuo_dingdan_date"></span> ' +
                        ' <span class="daishouhuo_dingdan_num"></span><div><span class="daishouhuo_dingdan_name" style="left: 0;top: 25px"></span>' +
                        ' <span class="daishouhuo_dingdan_price" style="left: 270px;top: 25px"></span><span class="daishouhuo_dingdan_youhui" style="left: 400px;top: 25px"></span>' +
                        ' <span class="daishouhuo_dingdan_buynum" style="left: 0;top: 85px"></span><span class="daishouhuo_dingdan_status" style="left: 0;top: 140px"></span>' +
                        ' <button class="daishouhuo_dingdan_zhifu_btn">确认收货</button></div> ' +
                        ' <img class="daishouhuo_dingdan_pic" width="170" src="">';
                    daishouhuo_dingdan_date[i].innerHTML = '购买日期：' + goods_list[i].ddate;
                    daishouhuo_dingdan_num[i].innerHTML = '订单编号：' + goods_list[i].ID;
                    daishouhuo_dingdan_name[i].innerHTML = goods_list[i].goods.gname;
                    daishouhuo_dingdan_price[i].innerHTML = '单价：￥' + goods_list[i].goods.price;
                    daishouhuo_dingdan_buynum[i].innerHTML = '购买数量：' + goods_list[i].num;
                    daishouhuo_dingdan_status[i].innerHTML = '订单状态：' + goods_list[i].status;
                    daishouhuo_dingdan_pic[i].src = 'img/goods/' + goods_list[i].goods.url;
                }
                for (var j = 0; j < daishouhuo_dingdan_zhifu_btn.length; j++) {
                    (function (j) {
                        daishouhuo_dingdan_zhifu_btn[j].onclick = function () {
                            $.post(url + 'dingdan_shouhuo', {
                                dingdanid: goods_list[j].ID,
                                goodsid: goods_list[j].dgid
                            }, function (data, status) {
                                console.log(data);
                                if (data.result) {
                                    daishouhuo_list.removeChild(daishouhuo_goods[j]);
                                    alert('已收货，记得去评价！');
                                }
                                else {
                                    alert('收货失败。。。');
                                }
                            });
                            //sessionStorage.setItem('dingdanid',goods_list[j].ID);
                            //location.href='../dingdan.html';
                        }
                    })(j)
                }
            });
        };
        goods_nav_daipingjia.onclick = function () {
            for (i = 0; i < goods_nav.childNodes.length; i++) {
                if (goods_nav.childNodes[i].tagName == 'SPAN') {
                    goods_nav.childNodes[i].style.color = '#343434';
                }
            }
            goods_nav_daipingjia.style.color = '#d41a39';
            daifukuan_mod.className = 'unchecked_mod';
            daishouhuo_mod.className = 'unchecked_mod';
            daipingjia_mod.className = 'checked_mod';
            $.post(url + 'dingdan_sel_byuser', {
                userid: sessionStorage.userid,
                type: '待评价'
            }, function (data, status) {
                var goods_list = data.goods;
                daipingjia_list.innerHTML='';
                for (i = 0; i < goods_list.length; i++) {

                    var li = document.createElement('li');
                    li.className = 'daipingjia_goods';
                    daipingjia_list.appendChild(li);
                    li.innerHTML = '<span class="daipingjia_dingdan_date"></span> ' +
                        ' <span class="daipingjia_dingdan_num"></span><div><span class="daipingjia_dingdan_name" style="left: 0;top: 25px"></span>' +
                        ' <span class="daipingjia_dingdan_price" style="left: 270px;top: 25px"></span><span class="daipingjia_dingdan_youhui" style="left: 400px;top: 25px"></span>' +
                        ' <span class="daipingjia_dingdan_buynum" style="left: 0;top: 85px"></span><span class="daipingjia_dingdan_status" style="left: 0;top: 140px"></span>' +
                        ' <button class="daipingjia_dingdan_zhifu_btn">去评价</button></div> ' +
                        ' <img class="daipingjia_dingdan_pic" width="170" src="">';
                    daipingjia_dingdan_date[i].innerHTML = '购买日期：' + goods_list[i].ddate;
                    daipingjia_dingdan_num[i].innerHTML = '订单编号：' + goods_list[i].ID;
                    daipingjia_dingdan_name[i].innerHTML = goods_list[i].goods.gname;
                    daipingjia_dingdan_price[i].innerHTML = '单价：￥' + goods_list[i].goods.price;
                    daipingjia_dingdan_buynum[i].innerHTML = '购买数量：' + goods_list[i].num;
                    daipingjia_dingdan_status[i].innerHTML = '订单状态：' + goods_list[i].status;
                    daipingjia_dingdan_pic[i].src = 'img/goods/' + goods_list[i].goods.url;
                }
                for (var j = 0; j < daipingjia_dingdan_zhifu_btn.length; j++) {
                    (function (j) {
                        daipingjia_dingdan_zhifu_btn[j].onclick = function () {
                            /*$.post(url + 'dingdan_shouhuo', {
                             dingdanid: goods_list[j].ID,
                             goodsid: goods_list[j].dgid
                             }, function (data, status) {
                             console.log(data);
                             if (data.result) {
                             daishouhuo_list.removeChild(daishouhuo_goods[j]);
                             alert('已收货，记得去评价！');
                             }
                             else {
                             alert('收货失败。。。');
                             }
                             });*/
                            sessionStorage.setItem('dingdanid',goods_list[j].dgid);
                            location.href='../details.html';
                        }
                    })(j)
                }
            })
        };
        /*$.post(url + 'index_sel', {
         userid: sessionStorage.userid,
         module: 'hot'
         }, function (data, status) {
         for (i = 0; i < data.goods.length; i++) {
         var li = document.createElement('li');
         li.className = 'hot_goods_list';
         hot_goods_mod.appendChild(li);
         li.innerHTML = '<img class="hot_goods_pic" width="239" height="239" src="">' +
         '<p class="hot_goods_name" style="color: #343434"></p>' +
         '<p class="hot_goods_buynum" style="color: #9d9c9c"></p>' +
         '<span>￥<em class="hot_goods_price" style="color: #9f0404;font-size: 30px;"></em></span>';
         }
         for (i = 0; i < hot_goods_list.length; i++) {
         hot_goods_pic[i].src = '../img/goods/' + data.goods[i].Url;
         hot_goods_name[i].innerHTML = data.goods[i].Name;
         hot_goods_buynum[i].innerHTML = data.goods[i].BuyNum + '人已购买';
         hot_goods_price[i].innerHTML = data.goods[i].Price;
         (function (i) {
         hot_goods_pic[i].onclick = function () {
         sessionStorage.setItem('goodsid', data.goods[i].Id);
         window.open('details.html');
         }
         })(i)
         }
         });*/
        $.post(url + 'dingdan_sel_byuser', {
            userid: sessionStorage.userid,
            type: '待支付'
        }, function (data, status) {
            var goods_list = data.goods;
            console.log(goods_list);
            daifukuan_list.innerHTML='';
            for (i = 0; i < goods_list.length; i++) {
                var li = document.createElement('li');
                li.className = 'daifukuan_goods';
                daifukuan_list.appendChild(li);
                li.innerHTML = '<span class="daifukuan_dingdan_date"></span> ' +
                    ' <span class="daifukuan_dingdan_num"></span><div><span class="daifukuan_dingdan_name" style="left: 0;top: 25px"></span>' +
                    ' <span class="daifukuan_dingdan_price" style="left: 270px;top: 25px"></span>' +
                    ' <span class="daifukuan_dingdan_buynum" style="left: 0;top: 85px"></span><span class="daifukuan_dingdan_status" style="left: 0;top: 140px"></span>' +
                    ' <button class="daifukuan_dingdan_zhifu_btn">确认支付</button></div> ' +
                    ' <img class="daifukuan_dingdan_pic" width="170" src="">';
                daifukuan_dingdan_date[i].innerHTML = '购买日期：' + goods_list[i].ddate;
                daifukuan_dingdan_num[i].innerHTML = '订单编号：' + goods_list[i].ID;
                daifukuan_dingdan_name[i].innerHTML = goods_list[i].goods.gname;
                daifukuan_dingdan_price[i].innerHTML = '单价：￥' + goods_list[i].goods.price;
                daifukuan_dingdan_buynum[i].innerHTML = '购买数量：' + goods_list[i].num;
                daifukuan_dingdan_status[i].innerHTML = '订单状态：' + goods_list[i].status;
                daifukuan_dingdan_pic[i].src = 'img/goods/' + goods_list[i].goods.url;
            }
            for (var j = 0; j < daifukuan_dingdan_zhifu_btn.length; j++) {
                (function (j) {
                    daifukuan_dingdan_zhifu_btn[j].onclick = function () {
                        sessionStorage.setItem('dingdanid', goods_list[j].ID);
                        location.href = '../dingdan.html';
                    }
                })(j)
            }
        });
        /*$.post(url + 'dingdan_sel_byuser', {
            userid: sessionStorage.userid,
            type: '待收货'
        }, function (data, status) {
            var goods_list = data.goods;
            for (i = 0; i < goods_list.length; i++) {
                var li = document.createElement('li');
                li.className = 'daishouhuo_goods';
                daishouhuo_list.appendChild(li);
                li.innerHTML = '<span class="daishouhuo_dingdan_date"></span> ' +
                    ' <span class="daishouhuo_dingdan_num"></span><div><span class="daishouhuo_dingdan_name" style="left: 0;top: 25px"></span>' +
                    ' <span class="daishouhuo_dingdan_price" style="left: 270px;top: 25px"></span><span class="daishouhuo_dingdan_youhui" style="left: 400px;top: 25px"></span>' +
                    ' <span class="daishouhuo_dingdan_buynum" style="left: 0;top: 85px"></span><span class="daishouhuo_dingdan_status" style="left: 0;top: 140px"></span>' +
                    ' <button class="daishouhuo_dingdan_zhifu_btn">确认收货</button></div> ' +
                    ' <img class="daishouhuo_dingdan_pic" width="170" src="">';
                daishouhuo_dingdan_date[i].innerHTML = '购买日期：' + goods_list[i].ddate;
                daishouhuo_dingdan_num[i].innerHTML = '订单编号：' + goods_list[i].ID;
                daishouhuo_dingdan_name[i].innerHTML = goods_list[i].goods.gname;
                daishouhuo_dingdan_price[i].innerHTML = '单价：￥' + goods_list[i].goods.price;
                daishouhuo_dingdan_buynum[i].innerHTML = '购买数量：' + goods_list[i].num;
                daishouhuo_dingdan_status[i].innerHTML = '订单状态：' + goods_list[i].status;
                daishouhuo_dingdan_pic[i].src = 'img/goods/' + goods_list[i].goods.url;
            }
            for (var j = 0; j < daishouhuo_dingdan_zhifu_btn.length; j++) {
                (function (j) {
                    daishouhuo_dingdan_zhifu_btn[j].onclick = function () {
                        $.post(url + 'dingdan_shouhuo', {
                            dingdanid: goods_list[j].ID,
                            goodsid: goods_list[j].dgid
                        }, function (data, status) {
                            console.log(data);
                            if (data.result) {
                                daishouhuo_list.removeChild(daishouhuo_goods[j]);
                                alert('已收货，记得去评价！');
                            }
                            else {
                                alert('收货失败。。。');
                            }
                        });
                        //sessionStorage.setItem('dingdanid',goods_list[j].ID);
                        //location.href='../dingdan.html';
                    }
                })(j)
            }
        });
        $.post(url + 'dingdan_sel_byuser', {
            userid: sessionStorage.userid,
            type: '待评价'
        }, function (data, status) {
            var goods_list = data.goods;
            for (i = 0; i < goods_list.length; i++) {
                var li = document.createElement('li');
                li.className = 'daipingjia_goods';
                daipingjia_list.appendChild(li);
                li.innerHTML = '<span class="daipingjia_dingdan_date"></span> ' +
                    ' <span class="daipingjia_dingdan_num"></span><div><span class="daipingjia_dingdan_name" style="left: 0;top: 25px"></span>' +
                    ' <span class="daipingjia_dingdan_price" style="left: 270px;top: 25px"></span><span class="daipingjia_dingdan_youhui" style="left: 400px;top: 25px"></span>' +
                    ' <span class="daipingjia_dingdan_buynum" style="left: 0;top: 85px"></span><span class="daipingjia_dingdan_status" style="left: 0;top: 140px"></span>' +
                    ' <button class="daipingjia_dingdan_zhifu_btn">去评价</button></div> ' +
                    ' <img class="daipingjia_dingdan_pic" width="170" src="">';
                daipingjia_dingdan_date[i].innerHTML = '购买日期：' + goods_list[i].ddate;
                daipingjia_dingdan_num[i].innerHTML = '订单编号：' + goods_list[i].ID;
                daipingjia_dingdan_name[i].innerHTML = goods_list[i].goods.gname;
                daipingjia_dingdan_price[i].innerHTML = '单价：￥' + goods_list[i].goods.price;
                daipingjia_dingdan_buynum[i].innerHTML = '购买数量：' + goods_list[i].num;
                daipingjia_dingdan_status[i].innerHTML = '订单状态：' + goods_list[i].status;
                daipingjia_dingdan_pic[i].src = 'img/goods/' + goods_list[i].goods.url;
            }
            for (var j = 0; j < daipingjia_dingdan_zhifu_btn.length; j++) {
                (function (j) {
                    daipingjia_dingdan_zhifu_btn[j].onclick = function () {
                        /!*$.post(url + 'dingdan_shouhuo', {
                            dingdanid: goods_list[j].ID,
                            goodsid: goods_list[j].dgid
                        }, function (data, status) {
                            console.log(data);
                            if (data.result) {
                                daishouhuo_list.removeChild(daishouhuo_goods[j]);
                                alert('已收货，记得去评价！');
                            }
                            else {
                                alert('收货失败。。。');
                            }
                        });*!/
                        sessionStorage.setItem('dingdanid',goods_list[j].dgid);
                        location.href='../details.html';
                    }
                })(j)
            }
        })*/
    }
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
})();
