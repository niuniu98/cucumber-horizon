'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
const cucumber_1 = require("cucumber");
const context_1 = require("../../data/context");
const util_1 = require("../../util/util");
const FILE_IDENTIFIER = util_1.getFileName(__filename);
cucumber_1.Before(function (scenario) {
    cucumber_1.setDefaultTimeout(protractor_1.browser.params.testCaseTimeout * 1000);
    context_1.setContext(this);
    context_1.setScenario(scenario);
});
//# sourceMappingURL=beforeSteps.js.map