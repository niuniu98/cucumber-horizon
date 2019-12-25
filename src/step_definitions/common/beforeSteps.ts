'use strict';

import { browser } from 'protractor';
import {setDefaultTimeout, Before, World} from 'cucumber';
import {setContext, setScenario} from "../../data/context";
import {getFileName} from "../../util/util";
import {logConsole} from "../../util/logger";

const FILE_IDENTIFIER = getFileName(__filename);

Before(function (scenario) {
    setDefaultTimeout(browser.params.testCaseTimeout * 1000);
    setContext(this);
    setScenario(scenario);
});
