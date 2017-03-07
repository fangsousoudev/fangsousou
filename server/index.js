var koa = require('koa');

//配置文件
var config = require('./config/config');
// 总路由
var appRouter = require('./router');

var bodyparser = require('koa-bodyparser');

var mongoose = require('mongoose');
var fs = require('fs');
// Connect to MongoDB
mongoose.Promise = require('bluebird');
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function (err) {
    console.error('MongoDB connection error: ' + err);
    process.exit(-1);
});

fs.readdirSync(config.modelDir).forEach(function (file) {
    if (/(.*)\.(js$|coffee$)/.test(file)) {
        require(config.modelDir + '/' + file);
    }
});
// 总入口
var app = new koa();

app.use(function *(next){
    var start = new Date;
    yield next;
    var ms = new Date - start;
    console.log('%s %s - %s', this.method, this.url, ms);
});

app.use(bodyparser());


var render = require('koa-ejs');

render(app, {
    //配置模板目录
    root: config.viewDir,
    layout: false,
    viewExt: 'html',
    debug: false,
    cache: true
});

//静态文件
var staticCache = require('koa-static-cache');
var staticDir = config.staticDir;
app.use(staticCache(staticDir));


// response
app.use(appRouter.routes());

app.listen(3000);
