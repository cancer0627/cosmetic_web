/**
 * Created by Administrator on 2016/11/15 0015.
 */
var user = {
    queryAll: 'select * from users',
    login: 'select * from users where UserName=? and UserPwd=?',
    req_sel: 'select * from users where UserName=? or Tel=? or Email=?',
    req_ins: 'insert into users (Tel,UserName,UserPwd,Email) values (?,?,?,?)',
    fenlei_sel: 'select * from goods where Fenlei=? or Name like ?',
    jiage_sel:'select * from goods where Price between ? and ?',
    details_sel: 'select * from goods where Id=?',
    index_sel: 'select * from goods where Module like ?',
    cart_sel: 'select * from cart where UserId=?',
    cart_ins: 'insert into cart (UserId,GoodsId,GoodsName,GoodsUrl,GoodsBrand,GoodsEffect,Num,BuyNum,Price) values(?,?,?,?,?,?,?,?,?)',
    cart_del: 'delete from cart where UserId=? and GoodsId =?',
    dingdan_add: 'insert into dingdan (Id,Date,GoodsId,UserId,Name,Url,Price,Buynum,Youhui,Status,Brand) values (?,?,?,?,?,?,?,?,?,?,?)',
    dingdan_sel: 'select * from dingdan where Id=?',
    dingdan_sel_byuser:'select * from dingdan where UserId=? and Status=?',
    dingdan_update:'update dingdan set Local=? , Time=? , Status=? , PriceZong=? where Id=?'
};
module.exports = user;