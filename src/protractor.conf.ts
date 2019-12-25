import browserInfo from './config/browserInfo';
import deviceInfo from './config/deviceInfo';
import config from '../config.json';
import { getFileName } from "./util/util";
import { logConsole } from "./util/logger";
import * as path from 'path';

const cwd = require('app-root-path');
//const cwd = process.cwd();
const FILE_IDENTIFIER = getFileName(__filename);
const argv = require('yargs')
    .default('storyList', config.storyList)
    .default('file', '')
    .default('folder', config.folder)
    .default('browser', config.browser)
    .default('device', config.device)
    .default('mobileName', config.mobileName)
    .default('maxInstances', config.maxInstances)
    .default('windowSize', config.windowSize)
    .default('tags', config.tags)
    .default('retry', config.retry)
    .default('grid', config.grid)
    .default('vm', config.vm)
    .default('site', config.site)
    .default('direct', config.connect)
    .default('ENV', 'local')
    .default('driverLocation',config.chromeDriver)
    .default('timeout', config.timeout)
    .default('meta_id', '')
    .default('meta_label', '').argv;

logConsole(FILE_IDENTIFIER, 'BOLT BDD IS RUN ON :' + argv.ENV);
logConsole(FILE_IDENTIFIER,"cwd:"+cwd);
logConsole(FILE_IDENTIFIER, __filename);
logConsole(FILE_IDENTIFIER,path.resolve(__dirname,'../package.json'));

const defaultConfig = {
    // Custom parameters can be specified here
    seleniumAddress: argv.grid,
    // chromeDriver:cwd+argv.driverLocation,
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
    // set to 'custom' instead of cucumber
    framework: 'custom',
    // The path relative to the current argv file
    frameworkPath: '../node_modules/protractor-cucumber-framework',
    //frameworkPath: 'protractor-cucumber-framework',
    // Options to be passed to cucumber
    cucumberOpts: {
        // test: 'test',
        format: ['json:report/result.json'],
        // Required step definitions
        require: ['./step_definitions/**/*.ts', './step_definitions/**/*.js'],
        // filter case with tags
        tags: [''],
        strict: true
    },
    allScriptsTimeout: argv.timeout * 1000,
    // comment directConnect when test on safari
    directConnect: true,
    // Capabilities to be passed to the webdriver instance, will be overwrote
    capabilities: {
        browserName: 'chrome',
        shardTestFiles: true,
        maxInstances: 1,
        specs: ['features/test.feature']
    },
    // Cucumber report configuration
    plugins: [
        {
            // package: 'node_modules/protractor-multiple-cucumber-html-reporter-plugin',
            // package: require.resolve('protractor-multiple-cucumber-html-reporter-plugin'),
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

const cap = browserInfo[argv.browser + 'Capabilities'];
cap.maxInstances = argv.maxInstances;
const list = [];
if (argv.file !== '') {
    list.push('../' + argv.file);
} else {
    for (const i of argv.storyList.toString().split(',')) {
        if (i.indexOf('.feature') === -1) {
            list.push('../features/' + argv.folder + '/' + i + '.feature');
        } else {
            list.push('../features/' + argv.folder + '/' + i);
        }
    }
}
cap.specs = list;
const device = argv.device;
const args = [];
if (device === 'mobile') {
    args.push('--window-size=' +
        deviceInfo[argv.mobileName].browserWindowSize.replace('x', ',')
    );
    args.push('--user-agent=' + deviceInfo[argv.mobileName].userAgent);
} else {
    args.push('--window-size=' + argv.windowSize);
}
if (argv.browser === 'chrome' && argv.grid === '') {
    logConsole(FILE_IDENTIFIER, 'DEFAULT CONFIG use browser with no sandbox');
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
logConsole(FILE_IDENTIFIER, 'DEFAULT CONFIG tags:' + tagStr);
defaultConfig.cucumberOpts.tags = tagStr;
module.exports.config = defaultConfig;
