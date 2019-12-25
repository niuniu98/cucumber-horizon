'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class MyWebElement {
    constructor(elementLabel, elementDescription, elementByType, elementBy, value) {
        this.elementLabel = elementLabel;
        this.elementDescription = elementDescription;
        this.elementByType = elementByType;
        this.elementBy = elementBy;
        this.value = value;
        this.elementLabel = elementLabel;
        this.elementDescription = elementDescription;
        this.elementByType = elementByType;
        this.elementBy = elementBy;
        this.value = value;
    }
    toString() {
        return 'label ' + this.elementLabel + ', description ' + this.elementDescription + ', by ' + this.elementBy.toString();
    }
}
exports.default = MyWebElement;
//# sourceMappingURL=webElement.js.map