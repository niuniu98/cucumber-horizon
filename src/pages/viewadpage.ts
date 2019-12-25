
import BasePage from './basepage';

const Identifier =
// tslint:disable-next-line: max-line-length
    "//div[@class='vip-seller-forms-container' or @class='seller-profile-container' or @class='nd-content' or @class='reply-form' or @class='revip-details' or @class='seller-info-message']";

class ViewAdPage extends BasePage {

    constructor() {
        super();
        this.url = '/post';
        this.Identifier = Identifier;
    }
}
export default ViewAdPage;
