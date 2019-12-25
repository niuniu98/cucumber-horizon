'use strict';

import { Given, When, Then } from "cucumber";
import {getFileName} from "../util/util";
import {logInfo} from "../util/logger";
const FILE_IDENTIFIER = getFileName(__filename);
// background step
Given(/^a background step$/, () => {
    logInfo(FILE_IDENTIFIER,'background');
});
// int value step
Given(/^a test int value (\d+)$/, (param: number) => {
    logInfo(FILE_IDENTIFIER,'test int:' + param);
});
// string value step
Given(/^a test string value "([^"]*)"$/, (param: string) => {
    logInfo(FILE_IDENTIFIER,'test string:' + param);
});
// string value step
Given(/^another string value (.*)$/, (param: string) => {
    logInfo(FILE_IDENTIFIER,'test string again:' + param);
});
// doc string value step
Given(/^a test doc string value:$/,(docstring: string) => {
    // Doc Strings, Data Tables will be passed to the step definition as the last argument
    logInfo(FILE_IDENTIFIER,'test doc string:' + docstring);
});
// double string value step
Given(/^a double value "([^"]*)"$/,(double: string) => {
    logInfo(FILE_IDENTIFIER,'test double:' + double);
});
Given(/^a double value (.*) for test$/,(double: string) => {
    logInfo(FILE_IDENTIFIER,'test double:'+ double);
});
// double value step
Given(/^a double value (\d+).(\d+)$/,(double: number, value: number) => {
    logInfo(FILE_IDENTIFIER,'test double again:' + double);
});

Given(/^a test data table:$/,(table: any) => {
    // without column headers
    // table.hashes() returns an array of objects where each row is converted to an object
    // table.rows() returns the table as a 2-D array, without the first row
    // with column headers
    // table.raw() returns the table as a 2-D array
    // table.rowsHash returns an object where each row corresponds to an entry,
    // rowsHash can only be called on a data table where all rows have exactly two columns
    logInfo(FILE_IDENTIFIER,'---------------------------------:'+table.rows());
});

When(/^value A (.*) equal B (.*)$/,(a: string, b: string) => {
    logInfo(FILE_IDENTIFIER,'when a:'+ a + ' b:'+b);
});
Then(/the result is (.*)/, (value: number) => {
  // ..

});
