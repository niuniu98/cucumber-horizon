'use strict';

import { Then } from "cucumber";
import { expect } from "chai";
import * as webPage from "../bdd/webPage";
import { get } from "request-promise";
import { browser, By, element, WebElement } from "protractor";

const VENDOR_LIST_URL = 'https://vendorlist.consensu.org/vendorlist.json';

Then(
    /^the cmp cookie should be existed$/,
    async () => {
        const gdprValue = await webPage.getLocalStorageByKey('gdprConsent');
        const googleValue = await webPage.getLocalStorageByKey('googleConsentKey');
        expect(gdprValue).to.not.be.null;
        expect(googleValue).to.not.be.null;
    }
);

Then(
    /^the version of vendor list should be the newest version$/,
    async () => {
        const result = await get(VENDOR_LIST_URL) as string;
        const vendorJson = JSON.parse(result);
        const newVersion: number = vendorJson.vendorListVersion;
        const currentVersion: number = Number(
            await webPage.getElementByXpath('//input[@name="vendorListVersion"]')
            .getAttribute("value"));
        expect(newVersion).is.within(currentVersion, currentVersion + 1);
    }
);

Then(
    /^the sort of content selection vendors should be alphabetic$/,
    async () => {
        const elements: WebElement[] = await browser.driver
        .findElements(By.xpath(`//div[@id='contentSelection']//div[@class='vendor-name']`));
        const itemArray: string[] = await Promise.all(elements.map(element => element.getText()));
        const newItemArray: string[] = [...itemArray];
        newItemArray.sort();
        expect(newItemArray).is.eql(itemArray);
    }
);

Then(
    /^all the toggle is off$/,
    async () => {
        const elements: WebElement[] = await browser.driver
        .findElements(By.xpath(`//div[@id='contentSelection']//div[@class='toggle-tool']/div[@class='toggle-container turn-on']`));
        expect(elements).is.empty;
    }
);

Then(
    /^all the toggle is on$/,
    async () => {
        const elements: WebElement[] = await browser.driver
            .findElements(By.xpath(`//div[@id='contentSelection']//div[@class='toggle-tool']/div[@class='toggle-container turn-off']`));
        expect(elements).is.empty;
    }
);

Then(
    /^the length of google partner is (\d+)$/,
    async (vendorLength: number) => {
        const elements: WebElement[] = await browser.driver
        .findElements(By.xpath(`//*[@id="google"]//div[@class='vendor-item']`));
        expect(elements.length).is.eql(vendorLength);
    }
);

Then(
    /^some features detail (.*) can be seen behind vendor name$/,
    async (feature: string) => {
        const elements: WebElement[] = await browser.driver
            .findElements(By.xpath(`//div[@id='contentSelection']//div[@class='vendor-feature']`));
        const itemArray: string[] = await Promise.all(elements.map(element => element.getText()));
        const flag = itemArray.some(item => item.startsWith(feature));
        expect(flag).to.be.true;
    }
);
