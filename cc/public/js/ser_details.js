(function () {
    var url = 'http://127.0.0.1:3000/';
    console.log(sessionStorage.goodsid);
    $.post(url + 'details', {
        goodsid: sessionStorage.goodsid
    }, function (data, status) {
        console.log(data);
    })
})();