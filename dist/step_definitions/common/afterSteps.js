'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("cucumber");
const protractor_1 = require("protractor");
const fs_1 = __importDefault(require("fs"));
const util_1 = require("../../util/util");
const webPage_1 = require("../../bdd/webPage");
const cwd = require('app-root-path');
const FILE_IDENTIFIER = util_1.getFileName(__filename);
cucumber_1.After(function (scenario) {
    return __awaiter(this, void 0, void 0, function* () {
        if (scenario.result.status === cucumber_1.Status.FAILED) {
            return protractor_1.browser.takeScreenshot().then((png) => {
                const screenshotFile = '/report/screenshot/';
                fs_1.default.mkdir(cwd + screenshotFile, { recursive: true }, (err => {
                    if (err)
                        return console.log(err);
                }));
                const screenshotPath = screenshotFile + util_1.getFileName(scenario.sourceLocation.uri) + '_' + util_1.getTimestamp() + '.png';
                const decodedImage = new Buffer(png.replace(/^data:image\/png;base64,/, ''), 'base64');
                fs_1.default.writeFile(cwd + screenshotPath, decodedImage, (err => {
                    if (err)
                        return console.log(err);
                }));
                this.attach('<img src=' + cwd + screenshotPath + '>', 'text/html');
            });
        }
        yield webPage_1.resetBrowser();
    });
});
//# sourceMappingURL=afterSteps.js.map