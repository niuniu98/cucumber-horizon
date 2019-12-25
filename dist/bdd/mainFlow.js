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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api = __importStar(require("../bapi/bapiFlow"));
const capiApi = __importStar(require("../bapi/capiFlow"));
const commonData_1 = require("../data/commonData");
const adsUtil_1 = require("../util/adsUtil");
const ad_1 = __importDefault(require("../data/ad"));
const protractor_1 = require("protractor");
const util_1 = require("../util/util");
const logger_1 = require("../util/logger");
const order_1 = __importDefault(require("../data/order"));
const FILE_IDENTIFIER = util_1.getFileName(__filename);
function registerIfNeed(userType) {
    if (commonData_1.userEmail === '') {
        return registerAndActive(userType);
    }
    else {
        logger_1.logError(FILE_IDENTIFIER, 'use existent user: ' + commonData_1.userEmail);
    }
}
exports.registerIfNeed = registerIfNeed;
function registerAndActive(userType) {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield register(userType);
        const result = yield active(resp.body.activationCode);
        commonData_1.setToken(result.body.token);
        logger_1.logInfo(FILE_IDENTIFIER, 'token:' + result.body.token);
        return result;
    });
}
exports.registerAndActive = registerAndActive;
function register(userType) {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield api.register(userType);
        if (resp && resp.response.statusCode === 200) {
            commonData_1.setUserEmail(resp.email);
            commonData_1.setPassword(resp.password);
            return resp.response;
        }
        else {
            throw new Error('register failed, response code is: ' + resp.response.statusCode);
        }
    });
}
exports.register = register;
function active(token) {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield api.active(token);
        if (!(resp && resp.statusCode === 200)) {
            throw new Error('active user failed, response code is: ' + resp.statusCode);
        }
        else {
            return resp;
        }
    });
}
exports.active = active;
function login(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.logConsole(FILE_IDENTIFIER, 'start login');
        return api.login(username, password);
    });
}
exports.login = login;
function postAd(adType) {
    return __awaiter(this, void 0, void 0, function* () {
        yield registerIfNeed('default');
        let ad;
        if (adType)
            ad = yield adsUtil_1.findAdByType(protractor_1.browser.params.site, adType);
        else
            ad = yield adsUtil_1.findDefaultAd(protractor_1.browser.params.site);
        yield post(ad);
    });
}
exports.postAd = postAd;
function postCapiAd(adType) {
    return __awaiter(this, void 0, void 0, function* () {
        yield registerIfNeed('default');
        let ad;
        if (adType)
            ad = yield adsUtil_1.findCapiAdByType(protractor_1.browser.params.site, adType);
        else
            ad = yield adsUtil_1.findDefaultCapiAd(protractor_1.browser.params.site);
        yield capiAdPost(ad);
    });
}
exports.postCapiAd = postCapiAd;
function postPartnerAdByType(adType, table) {
    return __awaiter(this, void 0, void 0, function* () {
        yield registerIfNeed('default');
        const ad = yield adsUtil_1.findAdByTypeAndAttribute(protractor_1.browser.params.site, adType, { 'name': 'Email', 'value': commonData_1.userEmail });
        yield partnerPost(ad);
    });
}
exports.postPartnerAdByType = postPartnerAdByType;
function postFeaturedAdByType(adType, table) {
    return __awaiter(this, void 0, void 0, function* () {
        yield registerIfNeed('default');
        const ad = yield adsUtil_1.findAdByTypeAndAttribute(protractor_1.browser.params.site, adType, { 'name': 'Email', 'value': commonData_1.userEmail });
        yield featureAdPost(ad);
    });
}
exports.postFeaturedAdByType = postFeaturedAdByType;
function postAdByTypeAndLocation(adType, location) {
    return __awaiter(this, void 0, void 0, function* () {
        yield registerIfNeed('default');
        const ad = yield adsUtil_1.findAdByTypeAndLocation(protractor_1.browser.params.site, adType, location);
        yield post(ad);
    });
}
exports.postAdByTypeAndLocation = postAdByTypeAndLocation;
function postSkipTns(ad) {
    return __awaiter(this, void 0, void 0, function* () {
        ad.syncGeoCodeForTesting = true;
        yield post(ad);
    });
}
exports.postSkipTns = postSkipTns;
function post(ad) {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield api.postAd(ad, commonData_1.token);
        if (resp && resp.statusCode === 201) {
            const ad = new ad_1.default(resp.body.id);
            logger_1.logConsole(FILE_IDENTIFIER, 'AD id:' + resp.body.id);
            commonData_1.setAd(ad);
        }
    });
}
function partnerPost(ad) {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield api.postPartnerAd(ad, commonData_1.token);
        if (resp && resp.statusCode === 201) {
            const ad = new ad_1.default(resp.body.id);
            logger_1.logConsole(FILE_IDENTIFIER, 'partner AD id:' + resp.body.id);
            commonData_1.setAd(ad);
        }
    });
}
function featureAdPost(ad) {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield api.postFeaturedAd(ad, commonData_1.token);
        if (resp && resp.statusCode === 201) {
            const ad = new ad_1.default(resp.body.id);
            logger_1.logConsole(FILE_IDENTIFIER, 'partner AD id:' + resp.body.id);
            commonData_1.setAd(ad);
        }
    });
}
function capiAdPost(adTemple) {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield capiApi.postAd(adTemple);
        const seoUrl = resp.split("self-public-website\",\"href\":\"")[1].split("\"")[0].split("/");
        const ad = new ad_1.default(seoUrl[seoUrl.length - 1]);
        commonData_1.setAd(ad);
    });
}
function createOrder(orderBody) {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield api.createOrderApi(orderBody, commonData_1.token);
        return JSON.stringify(resp);
    });
}
exports.createOrder = createOrder;
function createFeatureOrder(orderBody) {
    return __awaiter(this, void 0, void 0, function* () {
        return JSON.stringify(yield api.createdFeaturedOrder(orderBody, commonData_1.token));
    });
}
exports.createFeatureOrder = createFeatureOrder;
function activeOrder(orderID) {
    return __awaiter(this, void 0, void 0, function* () {
        yield api.activeOrder(orderID);
    });
}
exports.activeOrder = activeOrder;
function buyFeaures(adID, features) {
    return __awaiter(this, void 0, void 0, function* () {
        const featureList = features.split(",");
        let featureBody = "";
        let newBody;
        for (const feature of featureList) {
            featureBody += "\"" + feature.trim() + "\"" + ",";
        }
        if (featureList.length > 0) {
            featureBody = featureBody.substring(0, featureBody.length - 1);
        }
        newBody = "{\"adFeaturesGroups\":[{\"features\":[" + featureBody + "],\"adId\":\"" + adID + "\"}]}";
        const response = yield createFeatureOrder(JSON.parse(newBody));
        const orderId = response.split(",")[1].split(":")[2];
        let secureToken = response.split(",")[2].split(":")[1];
        secureToken = secureToken.substring(1, secureToken.length - 2);
        logger_1.logInfo(FILE_IDENTIFIER, "orderid:" + orderId + " stoken:" + secureToken);
        yield activeOrder(orderId);
        return new order_1.default(orderId, secureToken);
    });
}
exports.buyFeaures = buyFeaures;
function createPayment(paymentBody) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.logConsole(FILE_IDENTIFIER, 'start create payment');
        logger_1.logConsole(FILE_IDENTIFIER, typeof paymentBody);
        const resp = yield api.createPaymentApi(paymentBody, commonData_1.token);
        return JSON.stringify(resp);
    });
}
exports.createPayment = createPayment;
exports.getAdFeatures = api.getAdFeatures;
//# sourceMappingURL=mainFlow.js.map