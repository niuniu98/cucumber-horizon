'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const storyList = ['features/test.feature'];
const deviceName = 'Macbook Pro';
const platformName = 'OSX';
const arg = [''];
arg[0] = '--window-size=' + '1400,800';
const browsers = {
    chromeCapabilities: {
        'browserName': 'chrome',
        'loggingPrefs': {
            'browser': 'ALL',
            'driver': 'ALL',
            'performance': 'ALL'
        },
        'chromeOptions': {
            'args': arg,
            'perfLoggingPrefs': {
                'traceCategories': 'v8,blink.console,disabled-by-default-devtools.timeline'
            }
        },
        'metadata': {
            browser: {
                name: 'chrome',
                version: '61'
            },
            device: deviceName,
            platform: {
                name: platformName,
                version: '10.13.6'
            }
        },
        'maxInstances': 1,
        'specs': storyList,
        'shardTestFiles': true
    },
    firefoxCapabilities: {
        'browserName': 'firefox',
        'acceptInsecureCerts': true,
        'firefoxOptions': {
            'args': arg
        },
        'specs': storyList,
        'metadata': {
            browser: {
                name: 'firefox',
                version: '64.0'
            },
            device: deviceName,
            platform: {
                name: platformName,
                version: '10.13.6'
            }
        },
        'maxInstances': 1,
        'shardTestFiles': true,
        'moz-firefoxOptions': {
            'args': ['no-sandbox']
        }
    },
    safariCapabilities: {
        'browserName': 'safari',
        'safariOptions': {
            'args': arg
        },
        'specs': storyList,
        'metadata': {
            browser: {
                name: 'safari',
                version: '61'
            },
            device: deviceName,
            platform: {
                name: platformName,
                version: '10.13.6'
            }
        },
        'maxInstances': 1,
        'shardTestFiles': true
    }
};
exports.default = browsers;
//# sourceMappingURL=browserInfo.js.map