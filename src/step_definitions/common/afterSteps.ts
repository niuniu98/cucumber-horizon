'use strict';

import { After, Status } from "cucumber";
import { browser } from 'protractor';
import fs from 'fs';
import {getTimestamp,getFileName} from "../../util/util";
import {resetBrowser} from "../../bdd/webPage";

const cwd = require('app-root-path');

const FILE_IDENTIFIER = getFileName(__filename);

After(async function(scenario) {
    if (scenario.result.status === Status.FAILED) {
        return browser.takeScreenshot().then((png: string) => {
            const screenshotFile = '/report/screenshot/';
            fs.mkdir(cwd + screenshotFile,{ recursive: true },(err => {
                if(err) return console.log(err);
            }));
            const screenshotPath: string = screenshotFile + getFileName(scenario.sourceLocation.uri) + '_' + getTimestamp() + '.png';
            const decodedImage = new Buffer(png.replace(/^data:image\/png;base64,/, ''), 'base64');
            fs.writeFile(cwd + screenshotPath,decodedImage,(err => {
                if(err) return console.log(err);
            }));
            this.attach('<img src=' + cwd + screenshotPath + '>', 'text/html');
        });
    }
    await resetBrowser();
});
