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
const webPage = __importStar(require("../../bdd/webPage"));
const mainFlow = __importStar(require("../../bdd/mainFlow"));
const chai_1 = require("chai");
const cucumber_1 = require("cucumber");
const commonData_1 = require("../../data/commonData");
const protractor_1 = require("protractor");
cucumber_1.Then(/^element "([^"]*)" is displayed on "([^"]*)" screen$/, (elementName, screen) => __awaiter(this, void 0, void 0, function* () {
    const isScreenMatch = yield webPage.isScreenType(screen);
    if (isScreenMatch) {
        chai_1.expect(yield webPage.isElementDisplayed(elementName)).to.equal(true);
    }
}));
cucumber_1.Then(/^elements "([^"]*)" are displayed on "([^"]*)" screen$/, (elements, screen) => __awaiter(this, void 0, void 0, function* () {
    const isScreenMatch = yield webPage.isScreenType(screen);
    if (isScreenMatch) {
        for (const ele of elements.split(',')) {
            chai_1.expect(yield webPage.isElementDisplayed(ele)).to.equal(true);
        }
    }
}));
cucumber_1.Then(/^element "([^"]*)" is not displayed on "([^"]*)" screen$/, (elementName, screen) => __awaiter(this, void 0, void 0, function* () {
    const isScreenMatch = yield webPage.isScreenType(screen);
    if (isScreenMatch) {
        chai_1.expect(yield webPage.isElementDisplayed(elementName)).to.equal(false);
    }
}));
cucumber_1.Then(/^elements? "([^"]+)" should (not )?be visible on "([^"]+)" screen$/i, (labels, negative, screenDirection) => __awaiter(this, void 0, void 0, function* () {
    const isScreenMatch = yield webPage.isScreenType(screenDirection);
    if (isScreenMatch) {
        const labelList = labels.split(',').map(criteria => criteria.trim());
        const elements = yield webPage.findElements(labelList);
        negative === undefined && chai_1.expect(elements.length).to.be.at.least(labelList.length);
        yield Promise.all(elements.map((element) => __awaiter(this, void 0, void 0, function* () {
            chai_1.expect(yield element.isDisplayed()).to.equal(negative === undefined);
        })));
    }
}));
cucumber_1.Then(/^element "([^"]*)" is not existed on "([^"]*)" screen$/, (elementName, screen) => __awaiter(this, void 0, void 0, function* () {
    const isScreenMatch = yield webPage.isScreenType(screen);
    if (isScreenMatch) {
        chai_1.expect(yield webPage.getElementsByName(elementName)).is.empty;
    }
}));
cucumber_1.Then(/^the web page should navigate to "([^"]*)" page$/, (pageName) => __awaiter(this, void 0, void 0, function* () {
    chai_1.expect(yield webPage.isPageLoaded(pageName)).to.equal(true);
}));
cucumber_1.Then(/^the web page should navigate to "([^"]*)"$/, (expectedUrl) => __awaiter(this, void 0, void 0, function* () {
    const url = yield protractor_1.browser.driver.getCurrentUrl();
    chai_1.expect(url).contains(expectedUrl);
}));
cucumber_1.Then(/^user should (not )?see text "([^"]*)" of the element "([^"]*)" on "([^"]*)" screen$/, (negative, content, elementName, screen) => __awaiter(this, void 0, void 0, function* () {
    const isScreenMatch = yield webPage.isScreenType(screen);
    if (isScreenMatch) {
        yield webPage.waitWebPage(1);
        const ele = yield webPage.getElementByName(elementName);
        chai_1.expect((yield ele.getText()) === content).to.equal(negative === undefined);
    }
}));
cucumber_1.Then(/^page should send "([^"]*)" of "([^"]*)" event on both screen$/, (param, event) => {
    let count = 0;
    commonData_1.rawHar.forEach((entry) => {
        const entryMsgJson = JSON.parse(entry.message);
        if (entryMsgJson.message.params.request) {
            if (JSON.stringify(entryMsgJson.message.params.request).indexOf(event) !== -1) {
                count++;
            }
        }
    });
    chai_1.expect(count).to.equal(parseInt(param, 10));
});
cucumber_1.Then(/^check "([^"]*)" of the element "([^"]*)" should "([^"]*)" content (.*) on "([^"]*)" screen$/, (attr, element, operate, content, screen) => __awaiter(this, void 0, void 0, function* () {
    const isScreenMatch = yield webPage.isScreenType(screen);
    if (isScreenMatch) {
        yield webPage.waitWebPage(1);
        const ele = yield webPage.getElementByName(element);
        const txt = yield ele.getAttribute(attr);
        switch (operate) {
            case 'contains':
                chai_1.expect(txt).to.include(content);
                break;
            case 'equals':
                chai_1.expect(txt).to.equal(content);
                break;
            case 'notContains':
                chai_1.expect(txt).to.not.include(content);
                break;
            default:
                chai_1.expect.fail('Operate not support!');
                break;
        }
    }
}));
cucumber_1.Then(/^user should see message "([^"]*)" on page on "([^"]*)" screen$/, (content, screen) => __awaiter(this, void 0, void 0, function* () {
    const isScreenMatch = yield webPage.isScreenType(screen);
    if (isScreenMatch) {
        yield webPage.waitWebPage(1);
        const ele = webPage.getElementByTagName('body');
        chai_1.expect(yield ele.getText()).to.include(content);
    }
}));
cucumber_1.Then(/^the web page url contains text "([^"]*)" on "([^"]*)" screen$/, (text, screen) => __awaiter(this, void 0, void 0, function* () {
    const isScreenMatch = yield webPage.isScreenType(screen);
    if (isScreenMatch) {
        yield webPage.waitWebPage(1);
        chai_1.expect(yield webPage.getPageUrl()).to.include(text);
    }
}));
cucumber_1.Then(/^the number of "([^"]*)" should "([^"]*)" (.*) on "([^"]*)" screen$/, (element, compare, num, screen) => __awaiter(this, void 0, void 0, function* () {
    const isScreenMatch = yield webPage.isScreenType(screen);
    num = Number(num);
    if (isScreenMatch) {
        let count = 0;
        const elems = yield webPage.getElementsByName(element);
        for (let i = 0; i < elems.length; i++) {
            if (yield elems[i].isDisplayed()) {
                count = count + 1;
            }
        }
        let flag = false;
        switch (compare) {
            case ">":
                flag = count > num;
                break;
            case "<":
                flag = count < num;
                break;
            case "=":
                flag = count === num;
                break;
            default:
                chai_1.expect.fail('Operate not support!');
                return;
        }
        chai_1.expect(flag).to.be.true;
    }
}));
cucumber_1.Then(/^the user should the "([^"]*)" of "([^"]*)" content is "([^"]*)" with saved one on "([^"]*)" screen$/, (type, element, compare, screen) => __awaiter(this, void 0, void 0, function* () {
    const isScreenMatch = yield webPage.isScreenType(screen);
    const savedValue = commonData_1.pageData;
    let currentValue = null;
    if (isScreenMatch) {
        const ele = yield webPage.getElementByName(element);
        switch (type) {
            case "text":
                currentValue = yield ele.getText();
                break;
            default:
                chai_1.expect.fail('Operate not support!');
                break;
        }
        switch (compare) {
            case "same":
                chai_1.expect(currentValue).to.equal(savedValue);
                break;
            case "different":
                chai_1.expect(currentValue).not.equal(savedValue);
                break;
            default:
                chai_1.expect.fail('Operate not support!');
                break;
        }
    }
}));
cucumber_1.Then(/^get all cookies$/, () => __awaiter(this, void 0, void 0, function* () {
    yield webPage.getCookies();
}));
cucumber_1.Then(/^ads "([^"]*)" should have features "([^"]*)"$/, (labels, features) => __awaiter(this, void 0, void 0, function* () {
    const labelList = labels.split(',').map(criteria => criteria.trim());
    const featureList = features.split(',').map(feature => feature.trim());
    const elements = yield webPage.findElements(labelList);
    const adIds = yield Promise.all(elements.map((element, index) => {
        const adId = element.getAttribute('data-adid');
        if (!adId) {
            throw new Error(`${labelList[index]} is not a standard ad, for it has no ad-id attribute.`);
        }
        return adId;
    }));
    const adFeaturesList = yield Promise.all(adIds.map(adId => {
        return mainFlow.getAdFeatures(adId);
    }));
    adFeaturesList.forEach(adFeatures => {
        featureList.forEach(feature => {
            chai_1.expect(adFeatures).to.include(feature);
        });
    });
}));
//# sourceMappingURL=commonThenSteps.js.map