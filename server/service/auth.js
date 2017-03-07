var userDao = require('../dao/userDao');

// 根据域账号获取用户信息
exports.getUserByNt = function *(ntAccount) {
    return yield userDao.getUserByNt(ntAccount);
}

// 根据Id更新数据
exports.updateUserById = function *(id, params) {
    return yield userDao.updateUserById(id, params);

}

// 分页获取用户信息
exports.queryPage = function *(condition, page, pageSize) {
    return yield userDao.queryPage(condition, page, pageSize);

}

// 根据ID获取数据
exports.getById = function *(id) {
    return yield userDao.getById(id);

}

// 添加数据
exports.addObject = function *(params) {
    return yield userDao.addObject(params);

}

// 根据条件删除数据
exports.deleteObject = function *(params) {
    return yield userDao.deleteObject(params);
}
