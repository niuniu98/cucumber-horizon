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
const util_1 = require("../util/util");
const xml2js_1 = require("xml2js");
const request = require('request-promise');
const FILE_IDENTIFIER = util_1.getFileName(__filename);
function postAd(ad) {
    return __awaiter(this, void 0, void 0, function* () {
        const options = {
            method: 'POST',
            url: 'http://ecg-api.vivanuncios.com.mx.' + protractor_1.browser.params.vm + '/api/ads',
            body: ad,
            headers: {
                authorization: 'Basic ' + Buffer.from('bolt_qa:bolt_qa').toString('base64'),
                'content-type': 'application/xml'
            }
        };
        return JSON.stringify(yield xml2js_1.parseStringPromise(yield request(options)));
    });
}
exports.postAd = postAd;
//# sourceMappingURL=capiFlow.js.map