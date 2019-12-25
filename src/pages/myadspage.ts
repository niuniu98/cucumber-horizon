
import BasePage from './basepage';

const Identifier = '//section[@class=\'my-ads-page\']';

class MyAdsPage extends BasePage {

    constructor() {
        super();
        this.url = '/my/ads';
        this.Identifier = Identifier;
    }
}

export default MyAdsPage;
