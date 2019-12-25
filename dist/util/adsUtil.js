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
const util_1 = require("./util");
const commonData_1 = require("../data/commonData");
const xml2js_1 = require("xml2js");
const fs_1 = __importDefault(require("fs"));
const FILE_IDENTIFIER = util_1.getFileName(__filename);
exports.findAd = (site, adName = 'post_ad') => __awaiter(this, void 0, void 0, function* () {
    const { default: ad } = yield Promise.resolve().then(() => __importStar(require('../../ads/' + site + '/' + adName)));
    return JSON.parse(JSON.stringify(ad));
});
exports.findDefaultAd = (site) => __awaiter(this, void 0, void 0, function* () {
    return yield exports.findAd(site, undefined);
});
exports.findAdByType = (site, adType) => __awaiter(this, void 0, void 0, function* () {
    return yield exports.findAd(site, 'postad_' + adType);
});
exports.findAdByTypeAndLocation = (site, adType, location = {
    "address": "Bryanston",
    "latitude": -26.0563986,
    "longitude": 28.0244639,
    "radius": 0
}) => __awaiter(this, void 0, void 0, function* () {
    const ad = yield exports.findAd(site, `postad_${adType}`);
    ad.location = location;
    return ad;
});
exports.findAdByTypeAndAttribute = (site, adType, attribute) => __awaiter(this, void 0, void 0, function* () {
    const ad = yield exports.findAd(site, `postad_${adType}`);
    console.log(JSON.stringify(ad));
    const attArray = ad.categoryAttributes;
    attArray.push(attribute);
    return ad;
});
exports.findDefaultCapiAd = (site) => __awaiter(this, void 0, void 0, function* () {
    return yield exports.findCapiAdByType(site, undefined);
});
exports.findCapiAdByType = (site, adName = 'post_ad') => __awaiter(this, void 0, void 0, function* () {
    const builder = new xml2js_1.Builder();
    const result = yield xml2js_1.parseStringPromise(yield fs_1.default.readFileSync('ads/' + site + '/' + adName + '.xml'));
    result["ad:ad"]["ad:email"] = commonData_1.userEmail;
    result["ad:ad"]["ad:title"] = result["ad:ad"]["ad:title"] + ' ' + util_1.getDateFormat();
    let adAttribute = JSON.stringify(result["ad:ad"]["attr:attributes"]);
    adAttribute = adAttribute.replace(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z/, util_1.getDateFormat());
    result["ad:ad"]["attr:attributes"] = JSON.parse(adAttribute);
    return builder.buildObject(result);
});
//# sourceMappingURL=adsUtil.js.map