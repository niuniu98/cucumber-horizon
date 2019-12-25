import BasePage from './basepage';

const Identifier =
    // tslint:disable-next-line: max-line-length
    "//div[@class='sectionMenuWrapper' or @class='galleryWrapper' or @class='hp-list-wrapper' or @class='intentions-menu-title' or @class='homepage-gallery-wrapper']";

class HomePage extends BasePage {

    constructor() {
        super();
        this.url = '/';
        this.Identifier = Identifier;
    }
}

export default HomePage;
