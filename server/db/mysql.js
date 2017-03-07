var mysql = require('koa-mysql');
var config = require('../config/config');

// 创建MYSQL数据连接池
var pool = mysql.createPool(config.mysql);

// 执行查询语句
var execQuery = function*(sql, params) {
	try {
		// 执行
		var rows = yield pool.query(sql, params);
		return rows;
	} catch (err) {
		// 500 Internal Server Error
		console.log(err);
	}
}

// 执行更新语句
var execUpdate = function*(sql, values) {
	var result = yield execQuery(sql, values);
	return result;
}

//查询对象
exports.getObject = function*(tablename, values) {
	var sql = values ? 'SELECT * FROM ?? WHERE ?' : 'SELECT * FROM ??';
	var result = yield execQuery(sql, [tablename, values]);
	return result;
}

//执行sql语句，返回影响条数
exports.update = function*(sql, values) {
	return yield execUpdate(sql, values);
}

//查询分页
exports.queryPage = function*(sql, values, page, size) {
	if (page > 0) {
		page--;
	} else {
		page = 0;
	}

	var rresult = yield execQuery(sql + ' LIMIT ' + page * size + ',' + size, values);
	var index = sql.toLocaleUpperCase().lastIndexOf(' FROM');
	sql = 'SELECT COUNT(*) count ' + sql.substring(index);
	var cresult = yield execQuery(sql, values);
	var pagenum = cresult[0].count / size;
	if (cresult[0].count % size > 0) {
		pagenum++;
	}

	return {
		count: pagenum,
		rows: rresult
	};
}

// 根据ID查询
exports.getById = function*(tablename, id) {
	var values = {
		id: id
	};
	var sql = 'select * from ?? where ?';
	return yield execQuery(sql, [tablename, values]);
}

//添加一条记录
exports.addObject = function*(tablename, values) {
	var sql = 'INSERT INTO ?? SET ?';
	return yield execUpdate(sql, [tablename, values]);
}

//更新记录
exports.updateObject = function*(tablename, values, id) {
	var sql = 'UPDATE ?? SET ? WHERE ?';
	return yield execUpdate(sql, [tablename, values, id]);
}

//删除记录
exports.deleteObject = function*(tablename, values) {
	var sql = 'DELETE FROM ?? WHERE ?';
	return yield execUpdate(sql, [tablename, values]);
}
