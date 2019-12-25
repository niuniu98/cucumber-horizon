import {getFileName} from "./util";
import {logConsole, logInfo} from "./logger";

const report = require('multiple-cucumber-html-reporter');
const cwd = require('app-root-path');
const FILE_IDENTIFIER = getFileName(__filename);
try{
    report.generate({
        jsonDir: cwd+'/report',
        reportPath: cwd+'/report/report',
        saveCollectedJSON: true
    });
} catch (e) {
    logConsole(FILE_IDENTIFIER,'generate report:'+e);
}
process.exit();
