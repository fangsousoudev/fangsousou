var passport = require('koa-passport');
var co = require('co');


exports.setup = function () {
    passport.use(new (require('koa-passport-cas').Strategy)({
      ssoBaseURL: 'http://sso.mysnail.com/',
      serverBaseURL: 'http://localhost:3000',
      successRedirect: '/test'
    }, function(login, done) {
      // User.findOne({login: login}, function (err, user) {
      //   if (err) {
      //     return done(err);
      //   }
      //   if (!user) {
      //     return done(null, false, {message: 'Unknown user'});
      //   }
      //   return done(null, user);
      // });
        console.log(login);
        return done(null, {name:"chenyang"});
    }));
}
