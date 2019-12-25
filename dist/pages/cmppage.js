"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const basepage_1 = __importDefault(require("./basepage"));
const Identifier = "//html[contains(@class,'Consent')]";
class CmpPage extends basepage_1.default {
    constructor() {
        super();
        this.url = '/consent';
        this.Identifier = Identifier;
    }
}
exports.default = CmpPage;
//# sourceMappingURL=cmppage.js.map