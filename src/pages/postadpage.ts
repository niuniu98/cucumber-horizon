'use strict';

import BasePage from './basepage';

const Identifier = '//section[@class=\'my-ads-page\']';

class PostAdPage extends BasePage {

    constructor() {
        super();
        this.url = '/post';
        this.Identifier = Identifier;
    }
}

export default PostAdPage;
