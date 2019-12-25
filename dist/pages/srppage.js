"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const basepage_1 = __importDefault(require("./basepage"));
const Identifier = "//*[@id='srpContent' or @class='SearchPageV1' or contains(@class,'ResultsSearch')]";
class SRPPage extends basepage_1.default {
    constructor() {
        super();
        this.url = '/s-all-the-ads/v1b0p1';
        this.Identifier = Identifier;
    }
}
exports.default = SRPPage;
//# sourceMappingURL=srppage.js.map