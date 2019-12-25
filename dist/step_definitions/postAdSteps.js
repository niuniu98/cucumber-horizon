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
const cucumber_1 = require("cucumber");
const mainFlow_1 = require("../bdd/mainFlow");
const commonData_1 = require("../data/commonData");
const locationExample = {
    "Adelaide": {
        address: "Adelaide",
        latitude: -32.5706576,
        longitude: 26.3249438,
        radius: 0
    }
};
cucumber_1.Given(/^a live Ad$/, () => __awaiter(this, void 0, void 0, function* () {
    yield mainFlow_1.postAd();
}));
cucumber_1.Given(/^a live car Ad for "([^"]*)"$/, (usage) => __awaiter(this, void 0, void 0, function* () {
    if (usage === 'search')
        usage = 'srp_search';
    yield mainFlow_1.postAd(`car_${usage}`);
}));
cucumber_1.Given(/^a live car Ad for "([^"]*)" with location "([^"]*)"$/, (usage, location) => __awaiter(this, void 0, void 0, function* () {
    if (usage === 'search')
        usage = 'srp_search';
    yield mainFlow_1.postAdByTypeAndLocation(`car_${usage}`, locationExample[location]);
}));
cucumber_1.Given(/^a live "([^"]*)" Ad$/, (adType) => __awaiter(this, void 0, void 0, function* () {
    yield mainFlow_1.postAd(adType);
}));
cucumber_1.Given(/^a live capi Ad$/, () => __awaiter(this, void 0, void 0, function* () {
    yield mainFlow_1.postCapiAd();
}));
cucumber_1.Given(/^a live "([^"]*)" capi Ad$/, (adType) => __awaiter(this, void 0, void 0, function* () {
    yield mainFlow_1.postCapiAd(adType);
}));
cucumber_1.Given(/^a live "([^"]*)" Ad without TNS check$/, (adType) => __awaiter(this, void 0, void 0, function* () {
    yield mainFlow_1.postSkipTns(adType);
}));
cucumber_1.Given(/^a "([^"]*)" Ad with location$/, (adType) => __awaiter(this, void 0, void 0, function* () {
    yield mainFlow_1.postAdByTypeAndLocation(adType);
}));
cucumber_1.Given(/^"([^"]+)" live (?:"([^"]+)" )?Ads?$/i, (adNumStr, adType) => __awaiter(this, void 0, void 0, function* () {
    const adNum = parseInt(adNumStr, 10);
    if (Number.isNaN(adNum) || adNum <= 0) {
        throw new Error('the first parameter must be a positive number');
    }
    const posting = adType ? mainFlow_1.postAd.bind(undefined, adType) : mainFlow_1.postAd;
    for (let i = 0; i < adNum; i++) {
        yield posting();
    }
}));
cucumber_1.Given(/^"([^"]*)" partner "([^"]*)" Ads$/, (adNum, adType) => __awaiter(this, void 0, void 0, function* () {
    for (let i = 0; i < adNum; i++) {
        yield mainFlow_1.postPartnerAdByType(adType);
    }
}));
cucumber_1.Given(/^"([^"]*)" partner "([^"]*)" Ads with features "([^"]*)"$/, (adNum, adType, features) => __awaiter(this, void 0, void 0, function* () {
    for (let i = 0; i < adNum; i++) {
        yield mainFlow_1.postFeaturedAdByType(adType);
        yield mainFlow_1.buyFeaures(commonData_1.ad.getId(), features);
    }
}));
//# sourceMappingURL=postAdSteps.js.map