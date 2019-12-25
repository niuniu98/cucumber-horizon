'use strict';

import * as webPage from '../../bdd/webPage';
import * as mainFlow from '../../bdd/mainFlow';
import { expect } from 'chai';
import { Then } from 'cucumber';
import { pageData, rawHar } from '../../data/commonData';
import { browser, By, element, ExpectedConditions, until } from "protractor";
import elementIsNotVisible = until.elementIsNotVisible;

Then(
    /^element "([^"]*)" is displayed on "([^"]*)" screen$/,
    async (elementName: string, screen: string) => {
        const isScreenMatch = await webPage.isScreenType(screen);
        if (isScreenMatch) {
            expect(await webPage.isElementDisplayed(elementName)).to.equal(true);
        }
    }
);

Then(
    /^elements "([^"]*)" are displayed on "([^"]*)" screen$/,
    async (elements: string, screen: string) => {
        const isScreenMatch = await webPage.isScreenType(screen);
        if (isScreenMatch) {
            for (const ele of elements.split(',')) {
                expect(await webPage.isElementDisplayed(ele)).to.equal(true);
            }
        }
    }
);

Then(
    /^element "([^"]*)" is not displayed on "([^"]*)" screen$/,
    async (elementName: string, screen: string) => {
        const isScreenMatch = await webPage.isScreenType(screen);
        if (isScreenMatch) {
            expect(await webPage.isElementDisplayed(elementName)).to.equal(false);
        }
    }
);

Then(
    /^elements? "([^"]+)" should (not )?be visible on "([^"]+)" screen$/i,
    async (labels: string, negative: string, screenDirection: string) => {
        const isScreenMatch = await webPage.isScreenType(screenDirection);

        if (isScreenMatch) {
            const labelList = labels.split(',').map(criteria => criteria.trim());

            const elements = await webPage.findElements(labelList);

            negative === undefined && expect(elements.length).to.be.at.least(labelList.length);

            await Promise.all(elements.map(async element => {
                expect(await element.isDisplayed()).to.equal(negative === undefined);
            }));
        }
    }
);

Then(
    /^element "([^"]*)" is not existed on "([^"]*)" screen$/,
    async (elementName: string, screen: string) => {
        const isScreenMatch = await webPage.isScreenType(screen);
        if (isScreenMatch) {
            expect(await webPage.getElementsByName(elementName)).is.empty;
        }
    }
);

Then(
    /^the web page should navigate to "([^"]*)" page$/,
    async (pageName: string) => {
        expect(await webPage.isPageLoaded(pageName)).to.equal(true);
    }
);

Then(
    /^the web page should navigate to "([^"]*)"$/,
    async (expectedUrl: string) => {
        const url: string = await browser.driver.getCurrentUrl();
        expect(url).contains(expectedUrl);
    }
);

Then(
    /^user should (not )?see text "([^"]*)" of the element "([^"]*)" on "([^"]*)" screen$/,
    async (negative: string, content: string, elementName: string, screen: string) => {
        const isScreenMatch = await webPage.isScreenType(screen);
        if (isScreenMatch) {
            await webPage.waitWebPage(1);
            const ele = await webPage.getElementByName(elementName);
            expect(await ele.getText() === content).to.equal(negative === undefined);
        }
    }
);

Then(
    /^page should send "([^"]*)" of "([^"]*)" event on both screen$/,
    (param: string, event: string) => {
        let count = 0;
        rawHar.forEach((entry: any) => {
            const entryMsgJson = JSON.parse(entry.message);
            if (entryMsgJson.message.params.request) {
                if (JSON.stringify(entryMsgJson.message.params.request).indexOf(event) !== -1) {
                    count++;
                }
            }
        });
        expect(count).to.equal(parseInt(param, 10));
    }
);

Then(
    /^check "([^"]*)" of the element "([^"]*)" should "([^"]*)" content (.*) on "([^"]*)" screen$/,
    async (attr: string, element: string, operate: string, content: string, screen: string) => {
        const isScreenMatch = await webPage.isScreenType(screen);
        if (isScreenMatch) {
            await webPage.waitWebPage(1);
            const ele = await webPage.getElementByName(element);
            const txt = await ele.getAttribute(attr);

            switch (operate) {
                case 'contains':
                    expect(txt).to.include(content);
                    break;
                case 'equals':
                    expect(txt).to.equal(content);
                    break;
                case 'notContains':
                    expect(txt).to.not.include(content);
                    break;
                default:
                    expect.fail('Operate not support!');
                    break;
            }
        }
    }
);

Then(
    /^user should see message "([^"]*)" on page on "([^"]*)" screen$/,
    async (content: string, screen: string) => {
        const isScreenMatch = await webPage.isScreenType(screen);

        if (isScreenMatch) {
            await webPage.waitWebPage(1);
            const ele = webPage.getElementByTagName('body');
            expect(await ele.getText()).to.include(content);

        }
    }
);

Then(
    /^the web page url contains text "([^"]*)" on "([^"]*)" screen$/,
    async (text: string, screen: string) => {
        const isScreenMatch = await webPage.isScreenType(screen);
        if (isScreenMatch) {
            await webPage.waitWebPage(1);
            expect(await webPage.getPageUrl()).to.include(text);
        }
    }
);

Then(
    /^the number of "([^"]*)" should "([^"]*)" (.*) on "([^"]*)" screen$/,
    async (element: string, compare: string, num: number, screen: string) => {
        const isScreenMatch = await webPage.isScreenType(screen);
        num =Number(num);
        if (isScreenMatch) {
            let count = 0;
            const elems = await webPage.getElementsByName(element);
            for (let i = 0; i < elems.length; i++) {
                if (await elems[i].isDisplayed()) {
                    count = count + 1;
                }
            }
            let flag = false;
            switch (compare) {
                case ">":
                    flag = count > num;
                    break;
                case "<":
                    flag = count < num;
                    break;
                case "=":
                    flag = count === num;
                    break;
                default:
                    expect.fail('Operate not support!');
                    return;
            }
            expect(flag).to.be.true;
        }
    }
);

Then(
    /^the user should the "([^"]*)" of "([^"]*)" content is "([^"]*)" with saved one on "([^"]*)" screen$/,
    async (type, element, compare, screen) => {
        const isScreenMatch = await webPage.isScreenType(screen);
        const savedValue = pageData;
        let currentValue = null;
        if (isScreenMatch) {
            const ele = await webPage.getElementByName(element);
            switch (type) {
                case "text":
                    currentValue = await ele.getText();
                    break;
                default:
                    expect.fail('Operate not support!');
                    break;
            }
            switch (compare) {
                case "same":
                    expect(currentValue).to.equal(savedValue);
                    break;
                case "different":
                    expect(currentValue).not.equal(savedValue);
                    break;
                default:
                    expect.fail('Operate not support!');
                    break;
            }
        }
    }
);

Then(
    /^get all cookies$/,
    async () => {
        await webPage.getCookies();
    }
);

Then(
    /^ads "([^"]*)" should have features "([^"]*)"$/,
    async (labels: string, features: string) => {
        const labelList = labels.split(',').map(criteria => criteria.trim());

        const featureList = features.split(',').map(feature => feature.trim());

        const elements = await webPage.findElements(labelList);

        const adIds = await Promise.all(elements.map((element, index) => {
            const adId = element.getAttribute('data-adid');

            if (!adId) {
                throw new Error(`${labelList[index]} is not a standard ad, for it has no ad-id attribute.`);
            }

            return adId;
        }));

        const adFeaturesList = await Promise.all(adIds.map(adId => {
            return mainFlow.getAdFeatures(adId);
        }));

        adFeaturesList.forEach(adFeatures => {
            featureList.forEach(feature => {
                expect(adFeatures).to.include(feature);
            });
        });
    }
);
