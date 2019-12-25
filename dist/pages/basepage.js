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
const protractor_1 = require("protractor");
const siteInfo_1 = require("../config/siteInfo");
const logger_1 = require("../util/logger");
class BasePage {
    constructor() {
        this.baseUrl = siteInfo_1.baseUrl;
        this.driver = protractor_1.browser.driver;
        this.url = '';
        this.Identifier = '';
    }
    load(url = '') {
        logger_1.logInfo('', this.baseUrl + this.url + url);
        return this.driver.get(this.baseUrl + this.url + url);
    }
    isPageLoaded(Identifier = this.Identifier) {
        return __awaiter(this, void 0, void 0, function* () {
            const elements = yield this.driver.findElements(protractor_1.By.xpath(Identifier));
            return elements.length > 0;
        });
    }
    getElementByName(name) {
        return this.driver.findElement(name);
    }
}
exports.default = BasePage;
//# sourceMappingURL=basepage.js.map