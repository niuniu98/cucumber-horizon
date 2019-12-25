
import BasePage from './basepage';

const Identifier = '//div[@class=\'payment-page-content\']';

class Payment2dot0Page extends BasePage {
    constructor() {
        super();
        this.url = '/payment/payment.html';
        this.Identifier = Identifier;
    }
}

export default Payment2dot0Page;
