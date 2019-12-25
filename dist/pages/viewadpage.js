"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const basepage_1 = __importDefault(require("./basepage"));
const Identifier = "//div[@class='vip-seller-forms-container' or @class='seller-profile-container' or @class='nd-content' or @class='reply-form' or @class='revip-details' or @class='seller-info-message']";
class ViewAdPage extends basepage_1.default {
    constructor() {
        super();
        this.url = '/post';
        this.Identifier = Identifier;
    }
}
exports.default = ViewAdPage;
//# sourceMappingURL=viewadpage.js.map