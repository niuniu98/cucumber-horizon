"use strict";
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
const cucumber_1 = require("cucumber");
const webPage = __importStar(require("../bdd/webPage"));
const commonData_1 = require("../data/commonData");
const mainFlow_1 = require("../bdd/mainFlow");
cucumber_1.Given(/^a email registered user$/, () => __awaiter(this, void 0, void 0, function* () {
    yield mainFlow_1.registerAndActive('receiveEmail');
}));
cucumber_1.Given(/^a registered user$/, () => __awaiter(this, void 0, void 0, function* () {
    yield mainFlow_1.registerAndActive('notReceiveEmail');
}));
cucumber_1.Given(/^a registered user open "([^"]*)" page$/, (pageName) => __awaiter(this, void 0, void 0, function* () {
    yield mainFlow_1.registerIfNeed('default');
    yield webPage.loadPage(pageName);
    yield mainFlow_1.login(commonData_1.userEmail, commonData_1.password);
    yield webPage.addCookie("bt_auth", commonData_1.token);
    if (pageName.toLowerCase() !== 'home')
        yield webPage.loadPage(pageName);
}));
cucumber_1.Given(/^a registered user open "([^"]*)""([^"]*)"$/, (pageName, url) => __awaiter(this, void 0, void 0, function* () {
    yield mainFlow_1.registerIfNeed('default');
    yield webPage.loadPage(pageName, url);
    yield mainFlow_1.login(commonData_1.userEmail, commonData_1.password);
    yield webPage.addCookie("bt_auth", commonData_1.token);
}));
//# sourceMappingURL=RegisterSteps.js.map