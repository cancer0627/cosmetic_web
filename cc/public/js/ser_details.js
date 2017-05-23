(function () {
    var mylocal = document.getElementById('mylocal');
    var details_pic_big = document.getElementById('details_pic_big');
    var title = document.getElementById('title');
    var details_pic1 = document.getElementById('details_pic1');
    var details_pic2 = document.getElementById('details_pic2');
    var details_pic3 = document.getElementById('details_pic3');
    var details_pic4 = document.getElementById('details_pic4');
    var details_goods_name = document.getElementById('details_goods_name');
    var details_goods_describe = document.getElementById('details_goods_describe');
    var details_goods_price = document.getElementById('details_goods_price');
    var details_goods_buynum = document.getElementById('details_goods_buynum');
    var details_local1 = document.getElementById('details_local1');
    var details_local2 = document.getElementById('details_local2');
    var details_yunfei = document.getElementById('details_yunfei');
    var details_youhui = document.getElementById('details_youhui');
    var details_style = document.getElementById('details_style');
    var dec_btn = document.getElementById('dec_btn');
    var details_buy_num_val = document.getElementById('details_buy_num_val');
    var inc_btn = document.getElementById('inc_btn');
    var details_num = document.getElementById('details_num');
    var cart_add_btn = document.getElementById('cart_add_btn');
    var dingdan_add__btn = document.getElementById('dingdan_add__btn');
    /*详细信息*/
    var goods_name = document.getElementById('goods_name');
    var goods_brand = document.getElementById('goods_brand');
    var goods_effect = document.getElementById('goods_effect');
    var goods_style = document.getElementById('goods_style');
    var goods_lastname = document.getElementById('goods_lastname');
    var goods_local = document.getElementById('goods_local');
    var goods_pic = document.getElementById('goods_pic');
    var goods_suit = document.getElementById('goods_suit');
    /*搜索框*/
    var search_btn = document.getElementById('search_btn');
    var search_input = document.getElementById('search_input');
    var search_list = document.getElementsByClassName('search_list');
    /*tuijian*/
    var tuijian_mod = document.getElementById('tuijian_mod');
    var tuijian_img = document.getElementsByClassName('tuijian_img');
    var tuijian_link = document.getElementsByClassName('tuijian_link');
    var tuijian_article_mod=document.getElementById('tuijian_article_mod');
    /*commment*/
    var comment_list = document.getElementById('comment_list');
    var comment_inp = document.getElementById('comment_inp');
    var comment_inp_btn = comment_inp.getElementsByTagName('a')[0];
    var comment_inp_text = comment_inp.getElementsByTagName('textarea')[0];
    /*定义变量*/
    var url = 'http://127.0.0.1:3000/', i, com_list;
    /*---------------------------------------------------------------------------------------------------------------*/
    details_pic1.onmouseover = function () {
        details_pic_big.src = details_pic1.src;
    };
    details_pic2.onmouseover = function () {
        details_pic_big.src = details_pic2.src;
    };
    details_pic3.onmouseover = function () {
        details_pic_big.src = details_pic3.src;
    };
    $.post(url + 'details', {
        goodsid: sessionStorage.goodsid,
        userid: sessionStorage.userid
    }, function (data, status) {
        console.log(data);
        title.innerHTML = data.goods.gname;
        mylocal.innerHTML = '我的位置>底妆>' + data.goods.gname;
        details_pic_big.src = 'img/goods/' + data.goods.url;
        details_pic1.src = 'img/goods/' + data.goods.url;
        details_pic2.src = 'img/goods/' + data.goods.url1;
        details_pic3.src = 'img/goods/' + data.goods.url2;
        details_goods_name.innerHTML = data.goods.gname;
        details_goods_describe.innerHTML = data.goods.describe;
        details_goods_price.innerHTML = data.goods.price;
        details_goods_buynum.innerHTML = data.goods.bnum + '人购买';
        details_goods_name.innerHTML = data.goods.gname;
        details_local2.innerHTML = data.goods.local + '直邮<em id="details_yunfei">' + data.goods.freight + '</em>元';
        details_style.innerHTML = '<span>' + data.goods.style + '</span>';
        details_num.innerHTML = '(库存' + data.goods.num + '件)';
        /*------------------*/
        goods_name.innerHTML = '产品名称：' + data.goods.gname;
        goods_brand.innerHTML = '规格品牌：' + data.goods.brand;
        goods_effect.innerHTML = '功效：' + data.goods.tag;
        goods_style.innerHTML = '颜色分类：' + data.goods.style;
        goods_local.innerHTML = '产地：' + data.goods.local;
        goods_suit.innerHTML = '适合肤质：' + data.goods.suit;
        var dingdanid;
        cart_add_btn.onclick = function () {
            $.post(url + 'cart_add', {
                goodsid: data.goods.ID,
                userid: sessionStorage.userid,
                price: data.goods.price,
                bnum: details_buy_num_val.value
            }, function (data, status) {
                if (data.result) {
                    alert('加入购物车成功！！！');
                }
                else {
                    alert('加入购物车失败！！！');
                }
            })
        };
        for (i = 0; i < search_list.length; i++) {
            (function (i) {
                search_list[i].onclick = function () {
                    sessionStorage.setItem('fenlei', $.trim(search_list[i].innerHTML));
                    location.href = 'list.html';
                }
            })(i)
        }
        search_btn.onclick = function () {
            sessionStorage.setItem('sel', $.trim(search_input.value));
            location.href = 'list.html';
        };
        dec_btn.onclick = function () {
            if (details_buy_num_val.value == 1) {
                alert('商品数量不能为0！！！');
                details_buy_num_val.value = 1
            }
            else {
                details_buy_num_val.value--;
            }
        };
        inc_btn.onclick = function () {
            if (details_buy_num_val.value == data.goods.num) {
                alert('已经达到库存数量！！！');
                details_buy_num_val.value = data.goods.num;
            }
            else {
                details_buy_num_val.value++;
            }
        };
        dingdan_add__btn.onclick = function () {
            dingdanid = new Date().getTime() + "" + Math.floor(Math.random() * 899 + 100);
            $.post(url + 'dingdan_add', {
                dingdanid: dingdanid,
                goodsid: sessionStorage.goodsid,
                userid: sessionStorage.userid,
                date: new Date().toLocaleDateString(),
                bnum: details_buy_num_val.value,
                status: '待支付',
                price: data.goods.price,
                address: '',
                time: ''
            }, function (data, status) {
                sessionStorage.setItem('dingdanid', dingdanid);
                if (data.result) {
                    //alert('订单生成！！！');
                    location.href = 'dingdan.html';
                }
                else {
                    alert('订单生成失败！！！');
                }
            });
        }
    });
    $.post(url + 'like_update_l', {
        goodsid: sessionStorage.goodsid,
        userid: sessionStorage.userid
    }, function (data, status) {
        if (data.result) {
            //alert(11111111)
        }
    });
    $.post(url + 'tuijian', {
        userid: sessionStorage.userid
    }, function (data, satus) {
        console.log(data);
        var goods_list = data.goods;
        tuijian_mod.innerHTML = '';
        for (var i = 0; i < goods_list.length; i++) {
            var div = document.createElement('div');
            div.className = 'tuijian_list';
            tuijian_mod.appendChild(div);
            div.innerHTML = '<img class="tuijian_img" width="239" height="239" src="../img/goods/' + goods_list[i].url + '">' +
                '<p class="tuijian_name goodsname" style="font-size: 12px;color: #343434;">' + goods_list[i].gname + '</p>' +
                '<p style="font-size: 12px;color: #9f0404;">¥<em class="tuijian_price" style="color: #9f0404;font-size: 30px">' + goods_list[i].price + '</em></p>';
            (function (i) {
                tuijian_img[i].onclick = function () {
                    sessionStorage.setItem('goodsid', goods_list[i].ID);
                    window.open('details.html');
                };
            })(i)
        }
    });
    $.post(url + 'tuijian_article', {
        goodsid: sessionStorage.goodsid
    }, function (data, satus) {
        console.log(data);
        var article_list = data.article;
        tuijian_article_mod.innerHTML = '';
        for (var i = 0; i < article_list.length; i++) {
            var div = document.createElement('div');
            div.className = 'article_list';
            tuijian_article_mod.appendChild(div);
            div.innerHTML = 'A：<a href="../article.html?id='+article_list[i].ID+'">'+article_list[i].aname+'</a><span>'+article_list[i].tag+'</span>';
        }
    });
    $.post(url + 'comment_sel', {
        goodsid: sessionStorage.goodsid
    }, function (data, status) {
        console.log(data);
        com_list = data.comment;
        comment_list.innerHTML = '';
        for (var j = 0; j < com_list.length; j++) {
            var li = document.createElement('li');
            li.className = 'comment_list';
            comment_list.appendChild(li);
            li.innerHTML = '<p><span class="comment_user">用户' + com_list[j].uid + '</span><span class="comment_date">（' + com_list[j].date + '）</span></p>' +
                '<p class="comment">' + com_list[j].comment + '</p>'
        }
    });
    comment_inp_btn.onclick = function () {
        $.post(url + 'comment_add', {
            comment: comment_inp_text.value,
            goodsid: sessionStorage.goodsid,
            userid: sessionStorage.userid,
            date: new Date().toLocaleDateString()
        }, function (data, status) {
            if (data.result) {
                alert('评论提交成功！！！');
                $.post(url + 'comment_sel', {
                    goodsid: sessionStorage.goodsid
                }, function (data, status) {
                    console.log(data);
                    com_list = data.comment;
                    comment_list.innerHTML = '';
                    for (var j = 0; j < com_list.length; j++) {
                        var li = document.createElement('li');
                        li.className = 'comment_list';
                        comment_list.appendChild(li);
                        li.innerHTML = '<p><span class="comment_user">用户' + com_list[j].uid + '</span><span class="comment_date">（' + com_list[j].date + '）</span></p>' +
                            '<p class="comment">' + com_list[j].comment + '</p>'
                    }
                });
            }
            else {
                alert('评论提交失败！！！');
            }
        });
    }
})();