"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const basepage_1 = __importDefault(require("./basepage"));
const Identifier = "//div[@class='error-code']";
class Errorv2page extends basepage_1.default {
    constructor() {
        super();
        this.url = '/a-';
        this.Identifier = Identifier;
    }
}
exports.default = Errorv2page;
//# sourceMappingURL=errorv2page.js.map