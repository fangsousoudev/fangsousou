// var User = require('../model/user');
var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.register = function *() {
    var user = new User({name: 'zhuyunxiang'});
    yield user.add();

    console.log(user);
}
