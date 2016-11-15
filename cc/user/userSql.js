/**
 * Created by Administrator on 2016/11/15 0015.
 */
var user = {
    queryAll: 'select * from users',
    login: 'select * from users where UserName=? and UserPwd=?',
    req_sel: 'select * from users where UserName=? or Tel=? or Email=?',
    req_ins: 'insert into users (Tel,UserName,UserPwd,Email) values (?,?,?,?)',
    fenlei_sel: 'select * from goods where Fenlei=?',
    details_sel: 'select * from goods where Id=?',
    index_sel: 'select * from goods where Module like ?'
};
module.exports = user;