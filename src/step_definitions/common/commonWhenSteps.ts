import * as webPage from '../../bdd/webPage';
import { browser, Key } from "protractor";
import { When } from 'cucumber';
import { ad, orderId, setPageData } from "../../data/commonData";
import { createOrder, createPayment } from '../../bdd/mainFlow';
import { expect } from "chai";
import { getFileName } from "../../util/util";
import { logConsole, logInfo } from "../../util/logger";

const FILE_IDENTIFIER = getFileName(__filename);

When(
    /^user scroll "([^"]*)" into view on "([^"]*)" screen$/,
    async (ele: string, screen: string) => {
        await webPage.scrollElementIntoViewByName(ele);
    }
);

When(
    /^user scroll down till end$/,
    async () => {
        await webPage.scrollToEnd();
    }
);

When(
    /^user fetch the har log$/,
    async () => {
        await webPage.waitWebPage(3);
        await webPage.getHarLog();
    }
);

When(
    /^user select option "([^"]*)" of "([^"]*)" on page$/,
    async (option, xpathId) => {
        await webPage.waitWebPage(1);
        const element = await webPage.getElementByName(xpathId);
        await element.click();
        await webPage.waitWebPage(2);
        await webPage.getElementByXpath('//option[contains(text(),\'' + option + '\')]').click();
    }
);

When(
    /^user click "([^"]*)" on "([^"]*)" screen$/,
    async (xpathId, screen) => {
        if (screen === 'both' || await webPage.checkScreenType() === screen) {
            const elem = (await webPage.findElements(xpathId, {
                notFoundException: true
            }))[0];
            await webPage.waitWebPage(0.5);
            await webPage.scrollElementIntoView(elem);
            await elem.click();
            await webPage.waitWebPage(3);
        }
    }
);

When(
    /^user open "([^"]*)"$/,
    async (url: string) => {
        await webPage.openPage(url);
    }
);

When(
    /^user open "([^"]*)""([^"]*)" page$/,
    async (pageName, url) => {
        await webPage.loadPage(pageName, url);
    }
);

When(
    /^user wait for "([^"]*)" secs$/,
    async (waitTime: number) => {
        await webPage.waitWebPage(waitTime);
    }
);

When(
    /^user wait for ad active$/,
    async () => {
        await webPage.waitWebPage(5);
    }
);

When(
    /^user type text "([^"]*)" in field "([^"]*)" on both screen$/,
    async (content, xpathId) => {
        const elem = await webPage.getElementByName(xpathId);
        await elem.sendKeys(content);
    }
);

When(
    /^user type key "([^"]*)" in field "([^"]*)" on both screen$/,
    async (keyName, xpathId) => {
        const elem = await webPage.getElementByName(xpathId);
        await elem.sendKeys((Key as any)[keyName]);
    }
);

When(
    /^user upload 1 of default pictures to Post page$/,
    async () => {
        const elem = webPage.getElementByXpath('//input[contains(@class,\'file-input\') and @type=\'file\']');
        await elem.sendKeys(browser.params.uploadImagePath + '1.jpg');
        await webPage.waitWebPage(3);
        logConsole(FILE_IDENTIFIER, 'upload finish');
    }
);

When(
    /^user switch to next window on "([^"]*)" screen$/,
    async (screen: string) => {
        const type = await webPage.checkScreenType();
        if (screen === 'both' || type === screen) {
            const allhandles = await browser.driver.getAllWindowHandles();
            await browser.driver.switchTo().window(allhandles[allhandles.length - 1]);
        }
    }
);

When(
    /^user open current ad's VIP$/,
    async () => {
        const adId = ad!.getId();
        const url = "/a-//" + adId;
        logInfo(FILE_IDENTIFIER, 'current VIP url is ' + url);
        await webPage.loadPage("home", url);
    }
);

When(
    /^user force browser to click "([^"]*)" on "([^"]*)" screen$/,
    async (xpathId, screen) => {
        if (screen === 'both' || webPage.checkScreenType() === screen) {
            await webPage.waitWebPage(1);
            const elem = await webPage.getElementByName(xpathId);
            await browser.driver.executeScript("arguments[0].click();", elem);
        }
    }
);

When(
    /^user open payment page with features "([^"]*)"$/,
    async (features: string) => {
        const adId = ad!.getId();
        const featureList: string[] = features.split(",");
        let featureBody: string = "";
        let newBody: object | string;
        for (const feature of featureList) {
            featureBody += "\"" + feature.trim() + "\"" + ",";
            logInfo(FILE_IDENTIFIER, featureBody);
        }

        if (featureList.length > 0) {

            featureBody = featureBody.substring(0, featureBody.length - 1);
        }

        newBody = "{\"adFeaturesGroups\":[{\"features\":[" + featureBody + "],\"adId\":\"" + adId + "\"}]}";

        const response: string = await createOrder(JSON.parse(newBody));
        const orderId = response.split(",")[1].split(":")[2];
        let secureToken: string = response.split(",")[2].split(":")[1];
        secureToken = secureToken.substring(1, secureToken.length - 2);
        webPage.loadPage("payment2dot0", "?orderId=" + orderId + "&token=" + secureToken);
    }
);


When(
    /^ad finish payment with features "([^"]*)"$/,
    async (features: string) => {
        const adId = ad!.getId();
        await webPage.waitWebPage(1);
        const featureList: string[] = features.split(",");
        let featureBody: string = "";
        let newBody: object | string;
        let paymentBody: object | string;
        for (const feature of featureList) {
            featureBody += "\"" + feature.trim() + "\"" + ",";
            logInfo(FILE_IDENTIFIER, featureBody);
        }

        if (featureList.length > 0) {

            featureBody = featureBody.substring(0, featureBody.length - 1);
        }

        newBody = "{\"adFeaturesGroups\":[{\"features\":[" + featureBody + "],\"adId\":\"" + adId + "\"}]}";

        let response: string = await createOrder(JSON.parse(newBody));
        const orderId = response.split(",")[1].split(":")[2];
        let secureToken: string = response.split(",")[2].split(":")[1];
        secureToken = secureToken.substring(1, secureToken.length - 2);

        paymentBody = "{\"paymentServiceProvider\": \"ADYEN\",\"orderId\":\""+ orderId + "\",\"secureToken\":\""+ secureToken +"\"}";

        response = await createPayment(JSON.parse(paymentBody));

    }
);

When(
    /^user save "([^"]*)" of "([^"]*)" to param on "([^"]*)" screen$/,
    async (type, element, screen) => {
        if (screen === 'both' || webPage.checkScreenType() === screen) {
            await webPage.waitWebPage(1);
            const elem = await webPage.getElementByName(element);
            switch (type) {
                case 'text':
                    const text = await elem.getText();
                    setPageData(text);
                    break;
                default:
                    expect.fail('Operate not support!');
                    break;
            }
        }
    }
);

When(
    /^user refresh the current page$/,
    async () => {
        await webPage.refresh();
    }
);

When(
    /^user move mouse "([^"]*)" on "([^"]*)" screen$/,
    async (xpathId, screen) => {
        if (screen === 'both' || await webPage.checkScreenType() === screen) {
            const elem = await webPage.getElementByName(xpathId);
            await browser.actions().mouseMove(elem).perform();
            await webPage.waitWebPage(1);
        }
    }
);
