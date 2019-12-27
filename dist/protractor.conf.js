"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const browserInfo_1 = __importDefault(require("./config/browserInfo"));
const deviceInfo_1 = __importDefault(require("./config/deviceInfo"));
const config_json_1 = __importDefault(require("../config.json"));
const util_1 = require("./util/util");
const logger_1 = require("./util/logger");
const path = __importStar(require("path"));
const cwd = require('app-root-path');
const FILE_IDENTIFIER = util_1.getFileName(__filename);
const argv = require('yargs')
    .default('storyList', config_json_1.default.storyList)
    .default('file', '')
    .default('folder', config_json_1.default.folder)
    .default('browser', config_json_1.default.browser)
    .default('device', config_json_1.default.device)
    .default('mobileName', config_json_1.default.mobileName)
    .default('maxInstances', config_json_1.default.maxInstances)
    .default('windowSize', config_json_1.default.windowSize)
    .default('tags', config_json_1.default.tags)
    .default('retry', config_json_1.default.retry)
    .default('grid', config_json_1.default.grid)
    .default('vm', config_json_1.default.vm)
    .default('site', config_json_1.default.site)
    .default('direct', config_json_1.default.connect)
    .default('ENV', 'local')
    .default('driverLocation', config_json_1.default.chromeDriver)
    .default('timeout', config_json_1.default.timeout)
    .default('meta_id', '')
    .default('meta_label', '').argv;
logger_1.logConsole(FILE_IDENTIFIER, 'BOLT BDD IS RUN ON :' + argv.ENV);
logger_1.logConsole(FILE_IDENTIFIER, "cwd:" + cwd);
logger_1.logConsole(FILE_IDENTIFIER, __filename);
logger_1.logConsole(FILE_IDENTIFIER, path.resolve(__dirname, '../package.json'));
const defaultConfig = {
    seleniumAddress: argv.grid,
    ignoreUncaughtExceptions: true,
    params: {
        vm: argv.vm,
        site: argv.site,
        device: argv.device,
        mobileName: argv.mobileName,
        testCaseTimeout: argv.timeout,
        uploadImagePath: cwd + `/images/`,
        xpathFilesDir: cwd + `/element_xpath/`,
        screenshotPath: cwd + `/report/screenshot/`,
        deviceSize: {
            width: 1400,
            height: 800
        },
        protocol: 'http',
        failuresRetryCount: argv.retry,
        bapiFailuresRetryCount: 2
    },
    framework: 'custom',
    frameworkPath: cwd + '/node_modules/protractor-cucumber-framework',
    cucumberOpts: {
        format: ['json:report/result.json'],
        require: ['./step_definitions/**/*.ts', './step_definitions/**/*.js'],
        tags: [''],
        strict: true
    },
    allScriptsTimeout: argv.timeout * 1000,
    directConnect: true,
    capabilities: {
        browserName: 'chrome',
        shardTestFiles: true,
        maxInstances: 1,
        specs: ['features/test.feature']
    },
    plugins: [
        {
            package: 'protractor-multiple-cucumber-html-reporter-plugin',
            options: {
                jsonOutputPath: 'report',
                automaticallyGenerateReport: (argv.ENV === 'local'),
                removeExistingJsonReportFile: true,
                openReportInBrowser: true,
                removeOriginalJsonReportFile: true
            }
        }
    ]
};
const cap = browserInfo_1.default[argv.browser + 'Capabilities'];
cap.maxInstances = argv.maxInstances;
const list = [];
if (argv.file !== '') {
    list.push('../' + argv.file);
}
else {
    for (const i of argv.storyList.toString().split(',')) {
        if (i.indexOf('.feature') === -1) {
            list.push('../features/' + argv.folder + '/' + i + '.feature');
        }
        else {
            list.push('../features/' + argv.folder + '/' + i);
        }
    }
}
cap.specs = list;
const device = argv.device;
const args = [];
if (device === 'mobile') {
    args.push('--window-size=' +
        deviceInfo_1.default[argv.mobileName].browserWindowSize.replace('x', ','));
    args.push('--user-agent=' + deviceInfo_1.default[argv.mobileName].userAgent);
}
else {
    args.push('--window-size=' + argv.windowSize);
}
if (argv.browser === 'chrome' && argv.grid === '') {
    logger_1.logConsole(FILE_IDENTIFIER, 'DEFAULT CONFIG use browser with no sandbox');
    args.push('--no-sandbox');
}
if (argv.browser === 'safari' || argv.direct === 'false' || argv.direct === false || argv.grid !== '') {
    defaultConfig.directConnect = false;
}
cap[argv.browser + 'Options'].args = args;
cap.metadata.pandaren = {
    id: argv.meta_id,
    label: argv.meta_label
};
defaultConfig.capabilities = cap;
const tagStr = [];
if (argv.ENV === 'local') {
    tagStr.push('@' + argv.site);
    tagStr.push('@' + argv.device);
}
if (argv.tags !== '') {
    for (const tag of argv.tags.toString().split(',')) {
        tagStr.push(tag);
    }
}
logger_1.logConsole(FILE_IDENTIFIER, 'DEFAULT CONFIG tags:' + tagStr);
defaultConfig.cucumberOpts.tags = tagStr;
module.exports.config = defaultConfig;
//# sourceMappingURL=protractor.conf.js.map