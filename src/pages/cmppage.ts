import BasePage from './basepage';


const Identifier =
    "//html[contains(@class,'Consent')]";


class CmpPage extends BasePage {

    constructor() {
        super();
        this.url = '/consent';
        this.Identifier = Identifier;
    }
}

export default CmpPage;
