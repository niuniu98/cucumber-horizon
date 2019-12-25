"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const basepage_1 = __importDefault(require("./basepage"));
const Identifier = "//div[@class='sectionMenuWrapper' or @class='galleryWrapper' or @class='hp-list-wrapper' or @class='intentions-menu-title' or @class='homepage-gallery-wrapper']";
class HomePage extends basepage_1.default {
    constructor() {
        super();
        this.url = '/';
        this.Identifier = Identifier;
    }
}
exports.default = HomePage;
//# sourceMappingURL=homepage.js.map