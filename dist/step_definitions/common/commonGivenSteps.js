'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const webPage = __importStar(require("../../bdd/webPage"));
const cucumber_1 = require("cucumber");
cucumber_1.Given(/^open "([^"]*)" page$/, (pageName) => __awaiter(this, void 0, void 0, function* () {
    yield webPage.loadPage(pageName);
}));
cucumber_1.Given(/^"([^"]*)" page is opened$/, (pageName) => __awaiter(this, void 0, void 0, function* () {
    yield webPage.loadPage(pageName);
}));
cucumber_1.Given(/^user a cookie with name "([^"]*)" and value "([^"]*)" on the site$/, (cookieName, cookieValue) => __awaiter(this, void 0, void 0, function* () {
    yield webPage.addCookie(cookieName, cookieValue);
}));
//# sourceMappingURL=commonGivenSteps.js.map