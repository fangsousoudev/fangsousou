// var cas = require('koa-cas');
var auth = require('../auth/service');
var casAuth = require('../service/auth');

var kk = function* () {
    this.body = 'll'
}

var bb = function* () {
    console.log(this.query);
    this.body = 'bb';
}

var cc = function* (a) {
    console.log(this.query);
    this.body = 'cc';
}


kk.isAuth = true;
exports.kk = kk;
exports.bb = bb;
exports.cc = cc;

exports.testbb = {
    url: '/fuck/:aa/test',
    method: 'get',
    use: ['aa',auth.isAuthenticated(), function* () {
       this.body = this.params;
    }]
}

exports.testaa = {
    method: 'get',
    isAuth: true,
    use: ['aa', 'bb2', casAuth, function* () {
        // data = yield tcManagementDao.getAll('测试的数据');
        this.body = "ok";
    }]
}
