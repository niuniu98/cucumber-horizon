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
const util_1 = require("../util/util");
const logger_1 = require("../util/logger");
const RequestClient = require('reqclient').RequestClient;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const FILE_IDENTIFIER = util_1.getFileName(__filename);
const header = {
    headers: {
        'X-BOLT-APPS-ID': 'BOLT',
        'X-BOLT-SITE-LOCALE': siteInfo_1.siteLocal,
        'Content-Type': 'application/json',
        'X-BOLT-USER-AGENT': 'Mozilla/5.0 (Macintosh; U; PPC Mac OS X Mach-O; en-US; rv:1.7a)',
        'X-BOLT-MACHINE-ID': 'f9781729-ddbe-416a-a214-2c011ba91a96-15339352594',
        'Accept-Language': 'es,en',
        'X-Credential-Username': '',
        Authorization: ''
    },
    fullResponse: true
};
const url = 'http://api.bolt.ecg.ebay.com.' + protractor_1.browser.params.vm;
const client = new RequestClient({
    baseUrl: url,
    debugRequest: true,
    debugResponse: true,
    timeout: 10000
});
const securityClient = new RequestClient({
    baseUrl: siteInfo_1.securityBaseUrl,
    debugRequest: true,
    debugResponse: true,
    timeout: 10000,
    auth: {
        user: 'nniu@ebay.com',
        pass: 'vmiscool'
    },
    fullResponse: true
});
function register(userType) {
    return __awaiter(this, void 0, void 0, function* () {
        let type = '';
        switch (userType) {
            case 'receiveEmail':
                type = '@receive.com';
                break;
            default:
                type = '@domain.com';
                break;
        }
        const email = 'email' + util_1.createRandom() + type;
        logger_1.logInfo(FILE_IDENTIFIER, 'register user name is:' + email);
        const password = 'kijijiji';
        const registerInfo = {
            email,
            password,
            displayName: 'integrationtest',
            redirectUri: siteInfo_1.siteBase + '.' + protractor_1.browser.params.vm
        };
        const response = yield client.post('boltapi/v1/users', registerInfo, header);
        return { email, password, response };
    });
}
exports.register = register;
function active(token) {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield client.post('boltapi/v1/users/actions/activate', { token }, header);
        return resp;
    });
}
exports.active = active;
function login(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const loginInfo = { email, password };
        const resp = yield securityClient.post('login', loginInfo, header);
        const cookies = resp.headers['set-cookie'].toString().split(';');
        let auth = '';
        for (const cookie of cookies) {
            logger_1.logConsole(FILE_IDENTIFIER, 'cookie:' + cookie);
            if (cookie.indexOf('bt_auth') !== -1) {
                auth = 'Bearer ' + cookie.split('bt_auth')[1].replace('=', '');
            }
        }
        return auth;
    });
}
exports.login = login;
function postAd(ad, token, appID = 'BOLT') {
    return __awaiter(this, void 0, void 0, function* () {
        header.headers['Authorization'] = 'Bearer ' + token;
        header.headers['X-BOLT-APPS-ID'] = appID;
        let resp;
        if (typeof ad === 'string') {
            resp = yield client.get('boltapi/v1/ads/', ad, header);
        }
        else {
            resp = yield client.post('boltapi/v1/ads', ad, header);
        }
        return resp;
    });
}
exports.postAd = postAd;
function postFeaturedAd(ad, token, appID = 'PROTOOL') {
    return __awaiter(this, void 0, void 0, function* () {
        header.headers['X-Credential-Username'] = 'gait';
        return yield postAd(ad, token, appID);
    });
}
exports.postFeaturedAd = postFeaturedAd;
function postPartnerAd(ad, token, appID = 'PROTOOL') {
    return __awaiter(this, void 0, void 0, function* () {
        header.headers['X-Credential-Username'] = 'gait';
        return yield postAd(ad, token, appID);
    });
}
exports.postPartnerAd = postPartnerAd;
function createOrderApi(orderBody, token = '') {
    return __awaiter(this, void 0, void 0, function* () {
        let resp;
        if (typeof orderBody === 'string') {
            resp = yield client.get('boltapi/v1/orders', orderBody, header);
        }
        else {
            resp = yield client.post('boltapi/v1/orders', orderBody, header);
        }
        return resp;
    });
}
exports.createOrderApi = createOrderApi;
function createdFeaturedOrder(orderBody, token = '') {
    return __awaiter(this, void 0, void 0, function* () {
        header.headers['X-Credential-Username'] = 'gait';
        header.headers['Authorization'] = 'Bearer ' + token;
        return createOrderApi(orderBody, token);
    });
}
exports.createdFeaturedOrder = createdFeaturedOrder;
function activeOrder(orderID) {
    return __awaiter(this, void 0, void 0, function* () {
        header.headers['X-Credential-Username'] = 'gait';
        const bapiUrl = 'boltapi/v1/payment/orders/{orderId}/actions/pay';
        return yield client.post(bapiUrl.replace('{orderId}', orderID), '', header);
    });
}
exports.activeOrder = activeOrder;
function createPaymentApi(paymentBody, token) {
    return __awaiter(this, void 0, void 0, function* () {
        header.headers['Authorization'] = 'Bearer ' + token;
        let resp;
        if (typeof paymentBody === 'string') {
            resp = yield client.get('boltapi/v1/payment/payments', paymentBody, header);
        }
        else {
            resp = yield client.post('boltapi/v1/payment/payments', paymentBody, header);
        }
        return resp;
    });
}
exports.createPaymentApi = createPaymentApi;
function getAdFeatures(adId) {
    return __awaiter(this, void 0, void 0, function* () {
        header.headers['X-BOLT-APPS-ID'] = 'BOLT';
        const response = yield client.get(`boltapi/v1/ads/${adId}/features`, header);
        const body = response.body;
        const adFeatures = (typeof body === 'string' && JSON.parse(body) || body).features;
        return adFeatures.map(feature => feature.name);
    });
}
exports.getAdFeatures = getAdFeatures;
//# sourceMappingURL=bapiFlow.js.map