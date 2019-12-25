"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const basepage_1 = __importDefault(require("./basepage"));
const Identifier = "//div[@class='postad-upselling']";
class PostUpsellPage extends basepage_1.default {
    constructor() {
        super();
        this.url = "/post";
        this.Identifier = Identifier;
    }
}
exports.default = PostUpsellPage;
//# sourceMappingURL=postupsellpage.js.map