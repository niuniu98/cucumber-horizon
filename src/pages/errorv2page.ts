import BasePage from './basepage';

const Identifier = "//div[@class='error-code']";

class Errorv2page extends BasePage {

    constructor() {
        super();
        this.url = '/a-';
        this.Identifier = Identifier;
    }
}

export default Errorv2page;
