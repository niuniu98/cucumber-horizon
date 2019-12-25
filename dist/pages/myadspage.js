"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const basepage_1 = __importDefault(require("./basepage"));
const Identifier = '//section[@class=\'my-ads-page\']';
class MyAdsPage extends basepage_1.default {
    constructor() {
        super();
        this.url = '/my/ads';
        this.Identifier = Identifier;
    }
}
exports.default = MyAdsPage;
//# sourceMappingURL=myadspage.js.map