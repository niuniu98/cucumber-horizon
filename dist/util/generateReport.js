"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
const logger_1 = require("./logger");
const report = require('multiple-cucumber-html-reporter');
const cwd = require('app-root-path');
const FILE_IDENTIFIER = util_1.getFileName(__filename);
try {
    report.generate({
        jsonDir: cwd + '/report',
        reportPath: cwd + '/report/report',
        saveCollectedJSON: true
    });
}
catch (e) {
    logger_1.logConsole(FILE_IDENTIFIER, 'generate report:' + e);
}
process.exit();
//# sourceMappingURL=generateReport.js.map