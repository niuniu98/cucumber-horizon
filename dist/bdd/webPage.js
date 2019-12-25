"use strict";
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const xpathParser_1 = __importDefault(require("../util/xpathParser"));
const protractor_1 = require("protractor");
const deviceInfo_1 = __importDefault(require("../config/deviceInfo"));
const commonData_1 = require("../data/commonData");
const selenium_webdriver_1 = require("selenium-webdriver");
const siteInfo_1 = require("../config/siteInfo");
const logger_1 = require("../util/logger");
const util_1 = require("../util/util");
const elementMap = new xpathParser_1.default(protractor_1.browser.params.xpathFilesDir).getElementMap();
const SCROLL_FILTER = 'filter-attribute,srp-map-v2,srp-map-location-tooltip,la imagen,icon-entertainment';
const FILE_IDENTIFIER = util_1.getFileName(__filename);
let driver = protractor_1.browser.driver;
const params = protractor_1.browser.params;
const site = protractor_1.browser.params.site.toLowerCase() + '-';
const prekey = params.device === 'desktop'
    ? site + params.device + '-'
    : site + deviceInfo_1.default[protractor_1.browser.params.mobileName].platform + '-';
function loadPage(pageName, url = '') {
    return __awaiter(this, void 0, void 0, function* () {
        const { default: Page } = yield Promise.resolve().then(() => __importStar(require(`../pages/${pageName.toLowerCase()}page`)));
        yield new Page().load(url);
    });
}
exports.loadPage = loadPage;
function openPage(url) {
    return protractor_1.browser.driver.get(url);
}
exports.openPage = openPage;
function isPageLoaded(pageName) {
    return __awaiter(this, void 0, void 0, function* () {
        const { default: Page } = yield Promise.resolve().then(() => __importStar(require(`../pages/${pageName.toLowerCase()}page`)));
        return new Page().isPageLoaded();
    });
}
exports.isPageLoaded = isPageLoaded;
function isElementDisplayed(elementName) {
    return __awaiter(this, void 0, void 0, function* () {
        const elems = yield getElementsByName(elementName);
        if (elems.length < 1) {
            return false;
        }
        else {
            const element = yield getElementByName(elementName);
            return element.isDisplayed();
        }
    });
}
exports.isElementDisplayed = isElementDisplayed;
function isElementPresent(elementName) {
    return __awaiter(this, void 0, void 0, function* () {
        const elems = yield getElementsByName(elementName);
        if (elems.length < 1)
            return false;
        else
            return true;
    });
}
exports.isElementPresent = isElementPresent;
function isElementEnabled(elementName) {
    return __awaiter(this, void 0, void 0, function* () {
        const element = yield getElementByName(elementName);
        return element.isEnabled();
    });
}
exports.isElementEnabled = isElementEnabled;
function waitWebPage(time) {
    return protractor_1.browser.sleep(time * 1000);
}
exports.waitWebPage = waitWebPage;
function scrollToEnd() {
    return protractor_1.browser.executeScript('window.scrollTo(0, document.body.scrollHeight - 150)', '');
}
exports.scrollToEnd = scrollToEnd;
function scrollElementIntoView(webElement) {
    return driver.executeScript('var offset = document.documentElement.clientHeight/6;arguments[0].scrollIntoView(); window.scrollBy(0,-offset)', webElement);
}
exports.scrollElementIntoView = scrollElementIntoView;
function scrollElementIntoViewByXpath(xpath) {
    return __awaiter(this, void 0, void 0, function* () {
        const webElement = driver.findElement(protractor_1.By.xpath(xpath));
        if (!goScroll(xpath))
            return webElement;
        yield scrollElementIntoView(webElement);
        return webElement;
    });
}
exports.scrollElementIntoViewByXpath = scrollElementIntoViewByXpath;
function scrollElementIntoViewByName(elementName) {
    return __awaiter(this, void 0, void 0, function* () {
        const webElement = yield getElementByName(elementName);
        yield scrollElementIntoView(webElement);
        return webElement;
    });
}
exports.scrollElementIntoViewByName = scrollElementIntoViewByName;
function goScroll(elementName) {
    return SCROLL_FILTER.indexOf(elementName) < 0;
}
exports.goScroll = goScroll;
function getElementByName(elementName) {
    const element = elementMap.get(prekey + elementName.toLowerCase());
    logger_1.logInfo("", "element name:" + elementName + " by:" + element.elementBy.toString());
    return driver.findElement(element.elementBy);
}
exports.getElementByName = getElementByName;
function getElementsByName(elementName) {
    return driver.findElements(elementMap.get(prekey + elementName.toLowerCase()).elementBy);
}
exports.getElementsByName = getElementsByName;
function getElementByXpath(elementXpath) {
    return driver.findElement(protractor_1.By.xpath(elementXpath));
}
exports.getElementByXpath = getElementByXpath;
function getElementByTagName(elementTag) {
    return driver.findElement(protractor_1.By.tagName(elementTag));
}
exports.getElementByTagName = getElementByTagName;
function getPageTitle() {
    return driver.getTitle();
}
exports.getPageTitle = getPageTitle;
function getPageDescription() {
    return __awaiter(this, void 0, void 0, function* () {
        const element = yield getElementByName('srp_lblSEODescription');
        return element.getAttribute('content');
    });
}
exports.getPageDescription = getPageDescription;
function getElementDescriptor(label) {
    return elementMap.get(prekey + label.toLowerCase());
}
function addCookie(cookieName, cookieValue) {
    return __awaiter(this, void 0, void 0, function* () {
        if (cookieName === "bt_auth") {
            cookieValue = '"' + cookieValue + '"';
        }
        const cookie = {
            name: cookieName, value: cookieValue,
            path: "/", domain: siteInfo_1.currentDomain, secure: true, httpOnly: false
        };
        yield driver.manage().addCookie(cookie);
    });
}
exports.addCookie = addCookie;
function delectAllCookie() {
    return __awaiter(this, void 0, void 0, function* () {
        yield driver.manage().deleteAllCookies();
    });
}
exports.delectAllCookie = delectAllCookie;
function getCookies() {
    return __awaiter(this, void 0, void 0, function* () {
        const cookies = yield driver.manage().getCookies();
        for (const cookie of cookies) {
            logger_1.logInfo(FILE_IDENTIFIER, 'cookie:' + JSON.stringify(cookie));
        }
        return cookies;
    });
}
exports.getCookies = getCookies;
function getLocalStorageByKey(key) {
    return driver.executeScript(`return window.localStorage.getItem("${key}");`);
}
exports.getLocalStorageByKey = getLocalStorageByKey;
function checkScreenType() {
    return __awaiter(this, void 0, void 0, function* () {
        const height = (yield driver
            .manage()
            .window()
            .getSize()).height;
        const width = (yield driver
            .manage()
            .window()
            .getSize()).width;
        if (width < height) {
            return 'portrait';
        }
        else {
            return 'landscape';
        }
    });
}
exports.checkScreenType = checkScreenType;
function isScreenType(screenType) {
    return __awaiter(this, void 0, void 0, function* () {
        if (screenType === 'both') {
            return Promise.resolve(true);
        }
        const currentScreenType = yield checkScreenType();
        return currentScreenType === screenType;
    });
}
exports.isScreenType = isScreenType;
function getHarLog() {
    return __awaiter(this, void 0, void 0, function* () {
        const logs = yield driver
            .manage()
            .logs()
            .get('performance');
        commonData_1.setRawHar(logs);
    });
}
exports.getHarLog = getHarLog;
function refresh() {
    return driver.navigate().refresh();
}
exports.refresh = refresh;
function getPageUrl() {
    return driver.getCurrentUrl();
}
exports.getPageUrl = getPageUrl;
function getWebdriver() {
    return driver;
}
exports.getWebdriver = getWebdriver;
function resetBrowser() {
    return __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.browser.restart();
        driver = protractor_1.browser.driver;
    });
}
exports.resetBrowser = resetBrowser;
function elementsFinderFactory(by, timeout, notFoundException) {
    return (criteria) => __awaiter(this, void 0, void 0, function* () {
        const locator = protractor_1.By[by](criteria);
        try {
            yield driver.wait(selenium_webdriver_1.until.elementLocated(locator), timeout, `Element located by '${by}' with criteria '${criteria}' cannot be found`);
        }
        catch (e) {
            if (notFoundException) {
                throw e;
            }
            else {
                return [];
            }
        }
        return driver.findElements(locator);
    });
}
function elementFinder(criteria, { by, timeout = 3000, notFoundException = false }) {
    return __awaiter(this, void 0, void 0, function* () {
        const finder = elementsFinderFactory(by, timeout, notFoundException);
        const elements = yield finder(criteria);
        return elements;
    });
}
function findElementsByLabel(label, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const descriptor = getElementDescriptor(label);
        if (descriptor === undefined) {
            throw new Error('element descriptor not found, this could be due to xpath csv file bad format');
        }
        return yield elementFinder(descriptor.value, Object.assign({ by: descriptor.elementByType }, options));
    });
}
function findElements(labels, options) {
    return __awaiter(this, void 0, void 0, function* () {
        if (typeof labels === 'string') {
            return findElementsByLabel(labels, options);
        }
        else if (Array.isArray(labels)) {
            const elementsList = yield Promise.all(labels.map(label => {
                return findElementsByLabel(label, options);
            }));
            const elements = elementsList.reduce((acc, cur) => {
                return acc.concat(cur);
            }, []);
            return elements;
        }
        else {
            throw new Error('the argument must be of type string or string[]');
        }
    });
}
exports.findElements = findElements;
function waitUntilElementIsClickable(element, timeout = 3000) {
    return __awaiter(this, void 0, void 0, function* () {
        yield waitWebPage(2);
        yield Promise.all([
            driver.wait(selenium_webdriver_1.until.elementIsVisible(element), timeout),
            driver.wait(selenium_webdriver_1.until.elementIsEnabled(element), timeout)
        ]);
    });
}
exports.waitUntilElementIsClickable = waitUntilElementIsClickable;
//# sourceMappingURL=webPage.js.map