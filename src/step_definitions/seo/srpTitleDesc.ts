'use strict';
import * as webPage from '../../bdd/webPage';

import { expect } from 'chai';
import { Then } from 'cucumber';


Then(
    /^the page seo title is "([^"]*)"$/,
    async (title: string) => {
        await webPage.waitWebPage(2);
        const pageTitle = await webPage.getPageTitle();
        expect(pageTitle).to.equal(title);
    }
);

Then(
    /^the page seo description is "([^"]*)"$/,
    async (description: string) => {
        const pageDescription = await webPage.getPageDescription();
        expect(pageDescription).to.equal(description);
    }
);
