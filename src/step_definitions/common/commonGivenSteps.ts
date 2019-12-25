'use strict';

// const {Given} = require('cucumber');
import * as webPage from '../../bdd/webPage';
import { Given } from 'cucumber';

Given(
    /^open "([^"]*)" page$/,
    async (pageName: string) => {
        await webPage.loadPage(pageName);
    }
);

Given(
    /^"([^"]*)" page is opened$/,
    async (pageName: string) => {
        await webPage.loadPage(pageName);
    }
);

Given(
    /^user a cookie with name "([^"]*)" and value "([^"]*)" on the site$/,
    async (cookieName: string, cookieValue: string) => {
        await webPage.addCookie(cookieName, cookieValue);
    }
);
