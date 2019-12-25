"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const webPage = __importStar(require("../../bdd/webPage"));
const protractor_1 = require("protractor");
const cucumber_1 = require("cucumber");
const commonData_1 = require("../../data/commonData");
const mainFlow_1 = require("../../bdd/mainFlow");
const chai_1 = require("chai");
const util_1 = require("../../util/util");
const logger_1 = require("../../util/logger");
const FILE_IDENTIFIER = util_1.getFileName(__filename);
cucumber_1.When(/^user scroll "([^"]*)" into view on "([^"]*)" screen$/, (ele, screen) => __awaiter(this, void 0, void 0, function* () {
    yield webPage.scrollElementIntoViewByName(ele);
}));
cucumber_1.When(/^user scroll down till end$/, () => __awaiter(this, void 0, void 0, function* () {
    yield webPage.scrollToEnd();
}));
cucumber_1.When(/^user fetch the har log$/, () => __awaiter(this, void 0, void 0, function* () {
    yield webPage.waitWebPage(3);
    yield webPage.getHarLog();
}));
cucumber_1.When(/^user select option "([^"]*)" of "([^"]*)" on page$/, (option, xpathId) => __awaiter(this, void 0, void 0, function* () {
    yield webPage.waitWebPage(1);
    const element = yield webPage.getElementByName(xpathId);
    yield element.click();
    yield webPage.waitWebPage(2);
    yield webPage.getElementByXpath('//option[contains(text(),\'' + option + '\')]').click();
}));
cucumber_1.When(/^user click "([^"]*)" on "([^"]*)" screen$/, (xpathId, screen) => __awaiter(this, void 0, void 0, function* () {
    if (screen === 'both' || (yield webPage.checkScreenType()) === screen) {
        const elem = (yield webPage.findElements(xpathId, {
            notFoundException: true
        }))[0];
        yield webPage.waitWebPage(0.5);
        yield webPage.scrollElementIntoView(elem);
        yield elem.click();
        yield webPage.waitWebPage(3);
    }
}));
cucumber_1.When(/^user open "([^"]*)"$/, (url) => __awaiter(this, void 0, void 0, function* () {
    yield webPage.openPage(url);
}));
cucumber_1.When(/^user open "([^"]*)""([^"]*)" page$/, (pageName, url) => __awaiter(this, void 0, void 0, function* () {
    yield webPage.loadPage(pageName, url);
}));
cucumber_1.When(/^user wait for "([^"]*)" secs$/, (waitTime) => __awaiter(this, void 0, void 0, function* () {
    yield webPage.waitWebPage(waitTime);
}));
cucumber_1.When(/^user wait for ad active$/, () => __awaiter(this, void 0, void 0, function* () {
    yield webPage.waitWebPage(5);
}));
cucumber_1.When(/^user type text "([^"]*)" in field "([^"]*)" on both screen$/, (content, xpathId) => __awaiter(this, void 0, void 0, function* () {
    const elem = yield webPage.getElementByName(xpathId);
    yield elem.sendKeys(content);
}));
cucumber_1.When(/^user type key "([^"]*)" in field "([^"]*)" on both screen$/, (keyName, xpathId) => __awaiter(this, void 0, void 0, function* () {
    const elem = yield webPage.getElementByName(xpathId);
    yield elem.sendKeys(protractor_1.Key[keyName]);
}));
cucumber_1.When(/^user upload 1 of default pictures to Post page$/, () => __awaiter(this, void 0, void 0, function* () {
    const elem = webPage.getElementByXpath('//input[contains(@class,\'file-input\') and @type=\'file\']');
    yield elem.sendKeys(protractor_1.browser.params.uploadImagePath + '1.jpg');
    yield webPage.waitWebPage(3);
    logger_1.logConsole(FILE_IDENTIFIER, 'upload finish');
}));
cucumber_1.When(/^user switch to next window on "([^"]*)" screen$/, (screen) => __awaiter(this, void 0, void 0, function* () {
    const type = yield webPage.checkScreenType();
    if (screen === 'both' || type === screen) {
        const allhandles = yield protractor_1.browser.driver.getAllWindowHandles();
        yield protractor_1.browser.driver.switchTo().window(allhandles[allhandles.length - 1]);
    }
}));
cucumber_1.When(/^user open current ad's VIP$/, () => __awaiter(this, void 0, void 0, function* () {
    const adId = commonData_1.ad.getId();
    const url = "/a-//" + adId;
    logger_1.logInfo(FILE_IDENTIFIER, 'current VIP url is ' + url);
    yield webPage.loadPage("home", url);
}));
cucumber_1.When(/^user force browser to click "([^"]*)" on "([^"]*)" screen$/, (xpathId, screen) => __awaiter(this, void 0, void 0, function* () {
    if (screen === 'both' || webPage.checkScreenType() === screen) {
        yield webPage.waitWebPage(1);
        const elem = yield webPage.getElementByName(xpathId);
        yield protractor_1.browser.driver.executeScript("arguments[0].click();", elem);
    }
}));
cucumber_1.When(/^user open payment page with features "([^"]*)"$/, (features) => __awaiter(this, void 0, void 0, function* () {
    const adId = commonData_1.ad.getId();
    const featureList = features.split(",");
    let featureBody = "";
    let newBody;
    for (const feature of featureList) {
        featureBody += "\"" + feature.trim() + "\"" + ",";
        logger_1.logInfo(FILE_IDENTIFIER, featureBody);
    }
    if (featureList.length > 0) {
        featureBody = featureBody.substring(0, featureBody.length - 1);
    }
    newBody = "{\"adFeaturesGroups\":[{\"features\":[" + featureBody + "],\"adId\":\"" + adId + "\"}]}";
    const response = yield mainFlow_1.createOrder(JSON.parse(newBody));
    const orderId = response.split(",")[1].split(":")[2];
    let secureToken = response.split(",")[2].split(":")[1];
    secureToken = secureToken.substring(1, secureToken.length - 2);
    webPage.loadPage("payment2dot0", "?orderId=" + orderId + "&token=" + secureToken);
}));
cucumber_1.When(/^ad finish payment with features "([^"]*)"$/, (features) => __awaiter(this, void 0, void 0, function* () {
    const adId = commonData_1.ad.getId();
    yield webPage.waitWebPage(1);
    const featureList = features.split(",");
    let featureBody = "";
    let newBody;
    let paymentBody;
    for (const feature of featureList) {
        featureBody += "\"" + feature.trim() + "\"" + ",";
        logger_1.logInfo(FILE_IDENTIFIER, featureBody);
    }
    if (featureList.length > 0) {
        featureBody = featureBody.substring(0, featureBody.length - 1);
    }
    newBody = "{\"adFeaturesGroups\":[{\"features\":[" + featureBody + "],\"adId\":\"" + adId + "\"}]}";
    let response = yield mainFlow_1.createOrder(JSON.parse(newBody));
    const orderId = response.split(",")[1].split(":")[2];
    let secureToken = response.split(",")[2].split(":")[1];
    secureToken = secureToken.substring(1, secureToken.length - 2);
    paymentBody = "{\"paymentServiceProvider\": \"ADYEN\",\"orderId\":\"" + orderId + "\",\"secureToken\":\"" + secureToken + "\"}";
    response = yield mainFlow_1.createPayment(JSON.parse(paymentBody));
}));
cucumber_1.When(/^user save "([^"]*)" of "([^"]*)" to param on "([^"]*)" screen$/, (type, element, screen) => __awaiter(this, void 0, void 0, function* () {
    if (screen === 'both' || webPage.checkScreenType() === screen) {
        yield webPage.waitWebPage(1);
        const elem = yield webPage.getElementByName(element);
        switch (type) {
            case 'text':
                const text = yield elem.getText();
                commonData_1.setPageData(text);
                break;
            default:
                chai_1.expect.fail('Operate not support!');
                break;
        }
    }
}));
cucumber_1.When(/^user refresh the current page$/, () => __awaiter(this, void 0, void 0, function* () {
    yield webPage.refresh();
}));
cucumber_1.When(/^user move mouse "([^"]*)" on "([^"]*)" screen$/, (xpathId, screen) => __awaiter(this, void 0, void 0, function* () {
    if (screen === 'both' || (yield webPage.checkScreenType()) === screen) {
        const elem = yield webPage.getElementByName(xpathId);
        yield protractor_1.browser.actions().mouseMove(elem).perform();
        yield webPage.waitWebPage(1);
    }
}));
//# sourceMappingURL=commonWhenSteps.js.map