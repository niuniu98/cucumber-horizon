"use strict";

import BasePage from "./basepage";

const Identifier = "//div[@class='postad-upselling']";

class PostUpsellPage extends BasePage {

    constructor() {
        super();
        this.url = "/post";
        this.Identifier = Identifier;
    }
}

export default PostUpsellPage;
