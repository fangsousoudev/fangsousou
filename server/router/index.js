var Router = require('koa-router'),
    router = new Router();
var config = require('../config/config');

var fs = require('fs');
var util = require('util');

// Controller文件夹路径
var fileFormat = config.controllerDir + '/%s';
// 同步加载Controller文件
fs.readdirSync(config.controllerDir)
    // 筛选所有JS文件
    .filter(function (filename) {
        return filename.match(/\.js$/);
    })
    // 解析出每个Controller及其文件中的所有Function
    .map(function (filename) {
        return {
            routerName: filename.match(/([^\/]+)\.js$/)[1],         // 路由名为文件名
            functions: require(util.format(fileFormat, filename))   // 取出所有Function
        };
    })
    // 为每个Controller中的每个Function构造Router
    .forEach(function (controller) {
        var routeUrl = ('/' + controller.routerName);
        router.use(routeUrl, generateRoute(controller.functions).routes());
    });

// 为每个Function构造子路由
// funtions: Obj或Function
function generateRoute(functions) {
    // 定义子路由
    var ChildRouter = new Router();
    // params不为空且不为Undefined
    if (!util.isNullOrUndefined(functions.params)) {
        // 遍历Params
        for (var key in functions.params) {
            ChildRouter.param(key, functions.params[key]);
        }
    }

    // Actions为不为空且不为Undefined
    if (!util.isNullOrUndefined(functions.actions)) {
        addAction(functions.actions, ChildRouter);
    } else if (util.isNullOrUndefined(functions.params)) {
        addAction(functions, ChildRouter);
    }

    return ChildRouter;
}

// 添加Action
function addAction(actions, ChildRouter) {
    // 遍历每个Action
    for (var key in actions) {
        var funcObj = actions[key];
        var method = 'get';                 // 路由类型
        var excuteFunc = null;              // 可执行Function
        var controllerUrl = ('/' + key);    // 匹配路由Url
        // 判断是否为Function
        if (util.isFunction(funcObj)) {
            excuteFunc = funcObj;
        // 判断是否为对象
        } else if (util.isObject(funcObj)) {
            method = funcObj.method;
            // 判断use是否为数组
            if (util.isArray(funcObj.use)) {
                // 分析Url参数
                var execObj = analysisUse(funcObj.use);
                controllerUrl += execObj.url;
                excuteFunc = execObj.execF;
            } else if (util.isFunction(funcObj.use)) {
                excuteFunc = funcObj.use;
            }
            if (util.isString(funcObj.url)) {
                controllerUrl = funcObj.url;
            }
        }
        if (util.isArray(excuteFunc)) {
            excuteFunc.unshift(controllerUrl);
            ChildRouter[method].apply(ChildRouter, Array.prototype.slice.call(excuteFunc));
        }

        // 可执行Function不为空
        else if (excuteFunc !== null) {
            ChildRouter[method](controllerUrl, excuteFunc)
        }
    }
}

// 分析是不是要加参数
function analysisUse(useArray) {
    var url = '';       // 路由URL
    var execF = [];   // 可执行Function
    // 遍历所有中间件
    useArray.forEach(function (item) {
        if (util.isString(item)) {
            url += '/:' + item;
        }
        if (util.isFunction(item)) {
            execF.push(item);
        }
    });
    return {
        url: url,
        execF: execF
    }
}

router.get('/api', function* () {
    yield this.render('dist/index');
})

router.get('/*', function* () {
    yield this.render('noFound');
})


module.exports = router;
