var localAuth = require('../auth/local');
var casAuth = require('../auth/sso');
var User = require('../model/user');
var jwt = require('jsonwebtoken');
var config = require('../config/config');
var passport = require('koa-passport');

exports.login = {
    method: 'post',
    use: localAuth
}

exports.cas = {
    method: 'get',
    use: casAuth
}

exports.test =  {
    method: 'get',
    use: [passport.authenticate('cas', function *(err, user) {
        console.log(user);
    }), function *() {
        this.body = '12312'
    }]
}

exports.create = {
    method: 'post',
    use: function* (next) {

        var newUser = new User(this.request.body);
        try {
            var user = yield newUser.saveAsync();
            var token = jwt.sign({ _id: user._id }, config.secrets_session, {
                expiresIn: 60 * 60 * 5
            });
            this.body = { token: token };

        } catch (error) {
            this.throw(422, error);
        }
    }

}
