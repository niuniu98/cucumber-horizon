
import BasePage from "./basepage";

const Identifier = "//div[@class='reply-form' or @class='vip-container ad-info']";

class VIPPage extends BasePage {

    constructor() {
        super();
        this.url = '/';
        this.Identifier = Identifier;
    }
}

export default VIPPage;
