'use strict';
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
const cucumber_1 = require("cucumber");
const chai_1 = require("chai");
const webPage = __importStar(require("../bdd/webPage"));
const request_promise_1 = require("request-promise");
const protractor_1 = require("protractor");
const VENDOR_LIST_URL = 'https://vendorlist.consensu.org/vendorlist.json';
cucumber_1.Then(/^the cmp cookie should be existed$/, () => __awaiter(this, void 0, void 0, function* () {
    const gdprValue = yield webPage.getLocalStorageByKey('gdprConsent');
    const googleValue = yield webPage.getLocalStorageByKey('googleConsentKey');
    chai_1.expect(gdprValue).to.not.be.null;
    chai_1.expect(googleValue).to.not.be.null;
}));
cucumber_1.Then(/^the version of vendor list should be the newest version$/, () => __awaiter(this, void 0, void 0, function* () {
    const result = yield request_promise_1.get(VENDOR_LIST_URL);
    const vendorJson = JSON.parse(result);
    const newVersion = vendorJson.vendorListVersion;
    const currentVersion = Number(yield webPage.getElementByXpath('//input[@name="vendorListVersion"]')
        .getAttribute("value"));
    chai_1.expect(newVersion).is.within(currentVersion, currentVersion + 1);
}));
cucumber_1.Then(/^the sort of content selection vendors should be alphabetic$/, () => __awaiter(this, void 0, void 0, function* () {
    const elements = yield protractor_1.browser.driver
        .findElements(protractor_1.By.xpath(`//div[@id='contentSelection']//div[@class='vendor-name']`));
    const itemArray = yield Promise.all(elements.map(element => element.getText()));
    const newItemArray = [...itemArray];
    newItemArray.sort();
    chai_1.expect(newItemArray).is.eql(itemArray);
}));
cucumber_1.Then(/^all the toggle is off$/, () => __awaiter(this, void 0, void 0, function* () {
    const elements = yield protractor_1.browser.driver
        .findElements(protractor_1.By.xpath(`//div[@id='contentSelection']//div[@class='toggle-tool']/div[@class='toggle-container turn-on']`));
    chai_1.expect(elements).is.empty;
}));
cucumber_1.Then(/^all the toggle is on$/, () => __awaiter(this, void 0, void 0, function* () {
    const elements = yield protractor_1.browser.driver
        .findElements(protractor_1.By.xpath(`//div[@id='contentSelection']//div[@class='toggle-tool']/div[@class='toggle-container turn-off']`));
    chai_1.expect(elements).is.empty;
}));
cucumber_1.Then(/^the length of google partner is (\d+)$/, (vendorLength) => __awaiter(this, void 0, void 0, function* () {
    const elements = yield protractor_1.browser.driver
        .findElements(protractor_1.By.xpath(`//*[@id="google"]//div[@class='vendor-item']`));
    chai_1.expect(elements.length).is.eql(vendorLength);
}));
cucumber_1.Then(/^some features detail (.*) can be seen behind vendor name$/, (feature) => __awaiter(this, void 0, void 0, function* () {
    const elements = yield protractor_1.browser.driver
        .findElements(protractor_1.By.xpath(`//div[@id='contentSelection']//div[@class='vendor-feature']`));
    const itemArray = yield Promise.all(elements.map(element => element.getText()));
    const flag = itemArray.some(item => item.startsWith(feature));
    chai_1.expect(flag).to.be.true;
}));
//# sourceMappingURL=cmpCommonStep.js.map