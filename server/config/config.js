//应用配置文件
var path = require('path');
var local = require('./local');
var _ = require('underscore');
var config = {
    "title": "",
    //默认生产环境
    "env": "production",
    "appName": "KoaServer",
    //端口号配置
    "port": 3000,
    //模板所在的目录
    "viewDir": path.join(__dirname, '..', 'view'),
    //log所在的目录
    "logDir": path.join(__dirname, '..', 'log'),
    //静态文件所在的目录
    "staticDir": path.join(__dirname, '..', 'public'),

    "controllerDir": path.join(__dirname, '..', 'controller'),

    "modelDir": path.join(__dirname, '..', 'model'),
    
    'secrets_session': 'koaDemo.sid',

    mongo: {
        uri: process.env.MONGOLAB_URI ||
        process.env.MONGOHQ_URL ||
        'mongodb://localhost/KoaDev',
        options: {
            db: {
                safe: true
            }
        }
    },
    mysql: {
        user: 'root',
        password: '',
        database: 'new_tc',
        host: 'localhost'
    }

};

//当NODE_ENV环境变量值为local时
//本地调试环境
if (process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'development') {
    config = _.extend(config, local);
}

module.exports = config;
