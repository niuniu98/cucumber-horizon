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
Object.defineProperty(exports, "__esModule", { value: true });
const v2_1 = __importDefault(require("csvtojson/v2"));
const webElement_1 = __importDefault(require("../bdd/webElement"));
const fs_1 = __importDefault(require("fs"));
const util_1 = require("./util");
const protractor_1 = require("protractor");
const readdir = require('util').promisify(fs_1.default.readdir);
const siteInfo = require('../config/siteInfo');
const xpathMap = new Map();
const ByType = {
    className: {
        by(byString) {
            return protractor_1.By.className(byString);
        }
    },
    css: {
        by(byString) {
            return protractor_1.By.css(byString);
        }
    },
    id: {
        by(byString) {
            return protractor_1.By.id(byString);
        }
    },
    linkText: {
        by(byString) {
            return protractor_1.By.linkText(byString);
        }
    },
    name: {
        by(byString) {
            return protractor_1.By.name(byString);
        }
    },
    partialLinkText: {
        by(byString) {
            return protractor_1.By.partialLinkText(byString);
        }
    },
    tagName: {
        by(byString) {
            return protractor_1.By.tagName(byString);
        }
    },
    xpath: {
        by(byString) {
            return protractor_1.By.xpath(byString);
        }
    }
};
function initializeElement(label, description, byType, byValue) {
    return new webElement_1.default(label, description, byType, ByType[byType].by(byValue), byValue);
}
class XpathParser {
    constructor(csvFolder) {
        this.init(csvFolder);
    }
    init(csvFolder) {
        return __awaiter(this, void 0, void 0, function* () {
            const files = yield readdir(csvFolder);
            if (files && files.length) {
                for (const file of files) {
                    const jsonArrRes = yield v2_1.default().fromFile(csvFolder + '/' + file);
                    for (let x = 0; x < jsonArrRes.length; x++) {
                        const site = jsonArrRes[x].Site;
                        const platform = jsonArrRes[x].Platform;
                        for (const s of siteInfo.getSite(site.toLowerCase())) {
                            for (const p of siteInfo.getPlatform(platform.toLowerCase())) {
                                const key = util_1.trim(s).toLowerCase() +
                                    '-' +
                                    util_1.trim(p).toLowerCase() +
                                    '-' +
                                    util_1.trim(jsonArrRes[x].Label).toLowerCase();
                                if (xpathMap.get(key) === undefined) {
                                    xpathMap.set(key, initializeElement(jsonArrRes[x].Label, jsonArrRes[x].Description, jsonArrRes[x].ByType, jsonArrRes[x].By));
                                }
                            }
                        }
                    }
                }
            }
        });
    }
    getElementMap() {
        return xpathMap;
    }
}
exports.default = XpathParser;
//# sourceMappingURL=xpathParser.js.map