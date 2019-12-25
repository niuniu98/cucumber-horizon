'use strict';

// import { By } from "protractor";

import { By } from 'selenium-webdriver';

/**
 *
 *
 * @class MyWebElement
 */
class MyWebElement {

    constructor(
        private elementLabel: string,
        private elementDescription: string,
        public elementByType: string,
        public elementBy: By,
        public value: string
        ) {
        this.elementLabel = elementLabel;
        this.elementDescription = elementDescription;
        this.elementByType = elementByType;
        this.elementBy = elementBy;
        this.value = value;
    }

    /**
     * to string
     */
    toString() {
        // tslint:disable-next-line: max-line-length
        return 'label ' + this.elementLabel + ', description ' + this.elementDescription + ', by ' + this.elementBy.toString();
    }
}

export default MyWebElement;
