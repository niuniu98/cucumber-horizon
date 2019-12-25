'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("cucumber");
const util_1 = require("../util/util");
const logger_1 = require("../util/logger");
const FILE_IDENTIFIER = util_1.getFileName(__filename);
cucumber_1.Given(/^a background step$/, () => {
    logger_1.logInfo(FILE_IDENTIFIER, 'background');
});
cucumber_1.Given(/^a test int value (\d+)$/, (param) => {
    logger_1.logInfo(FILE_IDENTIFIER, 'test int:' + param);
});
cucumber_1.Given(/^a test string value "([^"]*)"$/, (param) => {
    logger_1.logInfo(FILE_IDENTIFIER, 'test string:' + param);
});
cucumber_1.Given(/^another string value (.*)$/, (param) => {
    logger_1.logInfo(FILE_IDENTIFIER, 'test string again:' + param);
});
cucumber_1.Given(/^a test doc string value:$/, (docstring) => {
    logger_1.logInfo(FILE_IDENTIFIER, 'test doc string:' + docstring);
});
cucumber_1.Given(/^a double value "([^"]*)"$/, (double) => {
    logger_1.logInfo(FILE_IDENTIFIER, 'test double:' + double);
});
cucumber_1.Given(/^a double value (.*) for test$/, (double) => {
    logger_1.logInfo(FILE_IDENTIFIER, 'test double:' + double);
});
cucumber_1.Given(/^a double value (\d+).(\d+)$/, (double, value) => {
    logger_1.logInfo(FILE_IDENTIFIER, 'test double again:' + double);
});
cucumber_1.Given(/^a test data table:$/, (table) => {
    logger_1.logInfo(FILE_IDENTIFIER, '---------------------------------:' + table.rows());
});
cucumber_1.When(/^value A (.*) equal B (.*)$/, (a, b) => {
    logger_1.logInfo(FILE_IDENTIFIER, 'when a:' + a + ' b:' + b);
});
cucumber_1.Then(/the result is (.*)/, (value) => {
});
//# sourceMappingURL=gherkinExampleSteps.js.map