
import BasePage from "./basepage";

const Identifier = "//*[@id='srpContent' or @class='SearchPageV1' or contains(@class,'ResultsSearch')]";

class SRPPage extends BasePage {

    constructor() {
        super();
        this.url = '/s-all-the-ads/v1b0p1';
        this.Identifier = Identifier;
    }
}

export default SRPPage;
