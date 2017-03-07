'use strict';

var passport = require('koa-passport');
var signToken = require('../service').signToken;

// Passport Configuration
require('./passport').setup();

module.exports = function* (next) {
    var me = this;
    yield passport.authenticate('cas', function* (err, user, info) {
        var error = err || info;
        if (error) {
            me.throw(401, error);
            return;
        }
        if (!user) {
            me.throw(404, 'Something went wrong, please try again.');
            return;
        }

        var token = signToken(user._id, user.role);
        me.body = { token: token };
    }).bind(me)(next);
}
