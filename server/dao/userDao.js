var dbHelper = require('../db/mysql');

// 根据域账号获取用户
exports.getUserByNt = function *(ntAccount) {
    return yield dbHelper.getObject('tc_user', {nt_account: ntAccount});
}

// 根据Id修改账号信息
exports.updateUserById = function *(id, params) {
    return yield dbHelper.updateObject('tc_user', params, id);
}

// 分页获取用户列表
exports.queryPage = function *(condition, page, pageSize) {
    return yield dbHelper.queryPage('SELECT * FROM `tc_user`', condition, page, pageSize);
}

// 根据Id获取用户信息
exports.getById = function *(id) {
    return yield dbHelper.getById('tc_user', id);
}

// 添加用户信息
exports.addObject = function *(params) {
    return yield dbHelper.addObject('tc_user', params);
}

exports.deleteObject = function *(params) {
    return yield dbHelper.deleteObject('tc_user', params);
}
