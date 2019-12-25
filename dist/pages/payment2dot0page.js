"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const basepage_1 = __importDefault(require("./basepage"));
const Identifier = '//div[@class=\'payment-page-content\']';
class Payment2dot0Page extends basepage_1.default {
    constructor() {
        super();
        this.url = '/payment/payment.html';
        this.Identifier = Identifier;
    }
}
exports.default = Payment2dot0Page;
//# sourceMappingURL=payment2dot0page.js.map