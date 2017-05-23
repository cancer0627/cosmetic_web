(function () {
    var search_btn = document.getElementById('search_btn');
    var search_input = document.getElementById('search_input');
    var search_list = document.getElementsByClassName('search_list');
    var question_list = document.getElementById('question_list');
    var step = document.getElementsByClassName('step');
    var sub_btn = document.getElementById('sub_btn');
    var result_des = document.getElementById('result_des');
    var url = "http://127.0.0.1:3000/";
    var i, user_obj;
    /*---------------------------------------------------------------------------------------------------------------*/
    for (i = 0; i < search_list.length; i++) {
        (function (i) {
            search_list[i].onclick = function () {
                sessionStorage.setItem('fenlei', $.trim(search_list[i].innerHTML));
                location.href = 'list.html';
            }
        })(i)
    }
    $.post(url + 'like_sel_act', {
        userid: sessionStorage.userid
    }, function (data, status) {
        console.log(data);
        result_des.innerText = '你的肤质——' + JSON.parse(data.like.skin).join();
    });
    //result_des.innerText = '你的肤质为D（干性）R（耐受性）N（非色素沉着性）';
    search_btn.onclick = function () {
        sessionStorage.setItem('fenlei', $.trim(search_input.value));
        location.href = 'list.html';
    };
    sub_btn.onclick = function () {
        var sum = [];
        var ans;
        var que_list = step[0].getElementsByClassName('que_list');
        user_obj = {
            id: sessionStorage.userid,
            age: document.getElementById('age').value,
            price: document.getElementById('price').value,
            need: document.getElementById('effect_need').value
        };
        for (var i = 1; i < step.length; i++) {
            que_list = step[i].getElementsByClassName('que_list');
            sum[i] = {};
            sum[i].val = 0;
            for (j = 0; j < que_list.length; j++) {
                ans = que_list[j].getElementsByTagName('select')[0];
                sum[i].val += parseFloat(ans.value);
            }
        }
        console.log(sum);
        if (sum[1].val >= 11 && sum[1].val < 27) {
            sum[1].res = 'D';
            sum[1].des = '干性';
        }
        else {
            sum[1].res = 'O';
            sum[1].des = '油性';
        }
        if (sum[2].val >= 17 && sum[2].val < 29) {
            sum[2].res = 'R';
            sum[2].des = '耐受性';
        }
        else {
            sum[2].res = 'S';
            sum[2].des = '敏感性';
        }
        if (sum[3].val >= 11 && sum[3].val < 27) {
            sum[3].res = 'N';
            sum[3].des = '非色素沉着性';
        }
        else {
            sum[3].res = 'P';
            sum[3].des = '色素沉着性';
        }
        user_obj.skin = JSON.stringify([sum[1].des, sum[2].des, sum[3].des]);
        /*user_obj.skin = [
         {res: sum[1].res, des: sum[1].des},
         {res: sum[2].res, des: sum[2].des},
         {res: sum[3].res, des: sum[3].des}];*/
        var result = '你的肤质为' + sum[1].res + '（' + sum[1].des + '）' + sum[2].res + '（' + sum[2].des + '）' + sum[3].res + '（' + sum[3].des + '）';
        //console.log(user_obj);
        $.post(url + 'like_update_act', user_obj, function (data, status) {
            console.log(data);
            if (data.result) {
                //alert(result);
                $.post(url + 'like_sel_act', {
                    userid: sessionStorage.userid
                }, function (data, status) {
                    console.log(data);
                    result_des.innerText = '你的肤质——' + JSON.parse(data.like.skin).join();
                    alert(result_des.innerText);
                });
            }
            else {
            }
        })
    }
})();