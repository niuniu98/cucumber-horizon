"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require('mysql2/promise');
const protractor_1 = require("protractor");
const util_1 = require("./util");
const logger_1 = require("./logger");
const DBUsername = 'bolt';
const DBPassword = 'bolt';
const connectionConfig = { host: protractor_1.browser.params.vm, user: DBUsername, password: DBPassword, port: 3306 };
const FILE_IDENTIFIER = util_1.getFileName(__filename);
function dbTest() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < 4; i++) {
            yield queryByFilter(undefined, 'bolt_shard_' + i, 'user', ['email="email68091548047396620@domain.com"']);
        }
    });
}
exports.dbTest = dbTest;
function getConnection(host = protractor_1.browser.params.vm, database) {
    return __awaiter(this, void 0, void 0, function* () {
        connectionConfig.host = host;
        if (database) {
            connectionConfig.database = database;
        }
        return mysql.createConnection(connectionConfig);
    });
}
exports.getConnection = getConnection;
function updateTable(database, table, values) {
    return __awaiter(this, void 0, void 0, function* () {
        return update(undefined, database, table, values);
    });
}
exports.updateTable = updateTable;
function update(vm = protractor_1.browser.params.vm, database, table, values) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield getConnection(vm, database);
        const sql = 'UPDATE ' + table + ' SET ? WHERE ?';
        const query = yield connection.query(sql, values);
        logger_1.logConsole(FILE_IDENTIFIER, 'update in ' + database + ', sql: ' + sql);
        return query[0].affectedRows;
    });
}
exports.update = update;
function queryInTable(database, table, values) {
    return __awaiter(this, void 0, void 0, function* () {
        return query(undefined, database, table, values);
    });
}
exports.queryInTable = queryInTable;
function query(vm = protractor_1.browser.params.vm, database, table, values) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield getConnection(vm, database);
        const sqlStr = 'SELECT * FROM ' + table + ' WHERE ?';
        const query = yield connection.query(sqlStr, values);
        logger_1.logConsole(FILE_IDENTIFIER, 'query in ' + database + ', sql is ' + sqlStr);
        return query[0];
    });
}
exports.query = query;
function queryByFilter(vm = protractor_1.browser.params.vm, database, table, filters) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield getConnection(vm, database);
        const filterLength = filters.length;
        let sqlStr = 'SELECT *';
        sqlStr = sqlStr + ' FROM ' + table + ' WHERE ';
        for (let filter = 0; filter < filterLength; filter++) {
            sqlStr = sqlStr + filters[0];
            if (filter < filterLength - 1)
                sqlStr = sqlStr + ' AND ';
        }
        logger_1.logConsole(FILE_IDENTIFIER, 'query by filter in ' + database + ', sql is ' + sqlStr);
        const query = yield connection.query(sqlStr);
        return query[0];
    });
}
exports.queryByFilter = queryByFilter;
//# sourceMappingURL=dbConnection.js.map