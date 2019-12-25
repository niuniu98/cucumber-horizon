import xpathParser from '../util/xpathParser';
import BasePage from '../pages/basepage';
import { browser, By, promise, WebElementPromise } from 'protractor';
import deviceInfo from '../config/deviceInfo';
import cookies from '../config/cookies';
import { setRawHar } from '../data/commonData';
import { until, IWebDriverOptionsCookie, WebDriver, WebElement, ByHash } from 'selenium-webdriver';
import MyWebElement from './webElement';
import { currentDomain } from '../config/siteInfo';
import { logInfo } from "../util/logger";
import { getFileName } from "../util/util";

const elementMap: Map<string, MyWebElement> = new xpathParser(browser.params.xpathFilesDir).getElementMap();

const SCROLL_FILTER =
    'filter-attribute,srp-map-v2,srp-map-location-tooltip,la imagen,icon-entertainment';

const FILE_IDENTIFIER = getFileName(__filename);

let driver = browser.driver;
const params = browser.params;
const site = browser.params.site.toLowerCase() + '-';
const prekey = params.device === 'desktop'
    ? site + params.device + '-'
    : site + deviceInfo[browser.params.mobileName].platform + '-';

/**
 * open a page by page name
 * @param pageName
 * @param url child url
 */
export async function loadPage(pageName: string, url = ''): Promise<void> {
    const {
        default: Page
    }: { default: typeof BasePage } = await import(`../pages/${pageName.toLowerCase()}page`);
    await new Page().load(url);
}

/**
 * open a page by a specific url
 * @param url
 */
export function openPage(url: string): PromiseLike<void> {
    return browser.driver.get(url);
}

/**
 * check page is loaded
 * @param pageName
 */
export async function isPageLoaded(pageName: string): Promise<boolean> {
    const {
        default: Page
    }: { default: typeof BasePage } = await import(`../pages/${pageName.toLowerCase()}page`);

    return new Page().isPageLoaded();
}

/**
 * check element is visible to the user
 * @param elementName
 */
export async function isElementDisplayed(elementName: string): Promise<boolean> {
    const elems = await getElementsByName(elementName);
    if (elems.length < 1) {
        return false;
    }
    else {
        const element = await getElementByName(elementName);
        return element.isDisplayed();
    }
}

/**
 * check element is exists on the current page, can be used to look for hidden elements
 * @param elementName
 */
export async function isElementPresent(elementName: string): Promise<boolean>{
    const elems = await getElementsByName(elementName);
    if (elems.length < 1) return false;
    else return true;
}

/**
 * check element is enable
 * @param elementName
 */
export async function isElementEnabled(elementName: string): Promise<boolean> {
    const element = await getElementByName(elementName);
    return element.isEnabled();
}

/**
 * wait on current page
 * @param time
 */
export function waitWebPage(time: number): PromiseLike<void> {
    return browser.sleep(time * 1000);
}

/**
 * scroll to the end of the page
 */
export function scrollToEnd(): PromiseLike<void> {
    return browser.executeScript(
        'window.scrollTo(0, document.body.scrollHeight - 150)',
        ''
    );
}

/**
 * scroll element into the visible area
 * @param webElement
 */
export function scrollElementIntoView(webElement: WebElement | WebElementPromise) {
    return driver.executeScript(
        // tslint:disable-next-line: max-line-length
        'var offset = document.documentElement.clientHeight/6;arguments[0].scrollIntoView(); window.scrollBy(0,-offset)',
        webElement
    );
}


/**
 * scroll element into the visible area by xpath
 * @param xpath
 */
export async function scrollElementIntoViewByXpath(xpath: string): Promise<WebElement> {
    const webElement = driver.findElement(By.xpath(xpath));
    if (!goScroll(xpath)) return webElement;
    await scrollElementIntoView(webElement);
    return webElement;
}

/**
 * scroll element into the visible area by name
 * @param elementName
 */
export async function scrollElementIntoViewByName(
    elementName: string
): Promise<WebElement> {
    const webElement = await getElementByName(elementName);
    await scrollElementIntoView(webElement);
    return webElement;
}

/**
 * check element need to be scrolled
 * @param elementName
 */
export function goScroll(elementName: string) {
    return SCROLL_FILTER.indexOf(elementName) < 0;
}

/**
 * get a webelement by elementname which named in xpath file
 * @param elementName
 */
export function getElementByName(elementName: string): PromiseLike<WebElement> {
    const element: MyWebElement | undefined = elementMap.get(prekey + elementName.toLowerCase());
    logInfo("", "element name:" + elementName + " by:" + element!.elementBy.toString());
    return driver.findElement(element!.elementBy);
}

/**
 * get a webelements by elementname which named in locator file
 * @param elementName
 */
export function getElementsByName(elementName: string): promise.Promise<WebElement[]> {
    return driver.findElements(
        elementMap.get(prekey + elementName.toLowerCase())!.elementBy
    );
}

/**
 * get a webelement by xpath
 * @param elementXpath
 */
export function getElementByXpath(elementXpath: string): WebElementPromise {
    return driver.findElement(By.xpath(elementXpath));
}

/**
 * get a webelement by tag name
 * @param elementTag
 */
export function getElementByTagName(elementTag: string) {
    return driver.findElement(By.tagName(elementTag));
}

/**
 * get page title
 */
export function getPageTitle() {
    return driver.getTitle();
}

// TODO Clean up this function. The hard code is suspicious.
/**
 * get page description
 */
export async function getPageDescription(): Promise<string> {
    const element = await getElementByName('srp_lblSEODescription');
    return element.getAttribute('content');
}

/**
 * get element Locator xpath, css, etc.
 * @param label locator
 */
function getElementDescriptor(label: string) {
    return elementMap.get(prekey + label.toLowerCase());
}

/**
 * add cookie on current page
 * @param cookieName
 * @param cookieValue
 */
export async function addCookie(cookieName: string, cookieValue: string): Promise<void> {
    if (cookieName === "bt_auth") {
        cookieValue = '"' + cookieValue + '"';
    }
    const cookie: IWebDriverOptionsCookie = {
        name: cookieName, value: cookieValue,
        path: "/", domain: currentDomain, secure: true, httpOnly: false
    };
    await driver.manage().addCookie(cookie);
}

/**
 * delete all cookie of current page
 */
export async function delectAllCookie(): Promise<void> {
    await driver.manage().deleteAllCookies();
}

// export async function addCookieByName(cookieName: string): Promise<void> {
//     await loadPage("home");
//     const cookie: IWebDriverOptionsCookie = {
//         name: cookieName, value: cookies[cookieName],
//         path: "/", domain: currentDomain, secure: true, httpOnly: false
//     };
//     await driver.manage().addCookie(cookie);
// }

/**
 * get all cookie on current page
 */
export async function getCookies(): Promise<IWebDriverOptionsCookie[]> {
    const cookies = await driver.manage().getCookies();
    for (const cookie of cookies) {
        logInfo(FILE_IDENTIFIER, 'cookie:' + JSON.stringify(cookie));
    }
    return cookies;
}

/**
 * get local storage
 * @param key
 */
export function getLocalStorageByKey<T>(key: string): promise.Promise<T> {
    return driver.executeScript(`return window.localStorage.getItem("${key}");`);
}

/**
 * check current screen type to identify mobile, desktop or tablet
 */
export async function checkScreenType(): Promise<'portrait' | 'landscape'> {
    const height = (await driver
        .manage()
        .window()
        .getSize()).height;
    const width = (await driver
        .manage()
        .window()
        .getSize()).width;

    if (width < height) {
        return 'portrait';
    } else {
        return 'landscape';
    }
}

/**
 * to check required screen type matching current page
 * @param screenType
 */
export async function isScreenType(screenType: string): Promise<boolean> {
    if (screenType === 'both') {
        return Promise.resolve(true);
    }
    const currentScreenType = await checkScreenType();
    return currentScreenType === screenType;
}

/**
 * get browser log from chrome only
 * NOTE only for chrome
 */
export async function getHarLog(): Promise<void> {
    const logs = await driver
        .manage()
        .logs()
        .get('performance');
    // for(const i of logs){
    //     console.log("msg:"+i.message);
    // }
    setRawHar(logs);
}

/**
 * refresh current page
 */
export function refresh(): PromiseLike<void> {
    return driver.navigate().refresh();
}

/**
 * get current page url
 */
export function getPageUrl() {
    return driver.getCurrentUrl();
}

/**
 * get webdriver
 */
export function getWebdriver() {
    return driver;
}

/**
 * clear all browser data
 */
export async function resetBrowser() {
    await browser.restart();
    driver = browser.driver;
}

/**
 * find elements with wait time
 * @param by
 * @param timeout
 * @param notFoundException
 */
function elementsFinderFactory(by: KeyofUnion<ByHash>, timeout: number, notFoundException: boolean) {
    return async (criteria: string) => {
        const locator = By[by](criteria);

        try {
            await driver.wait(until.elementLocated(locator), timeout, `Element located by '${by}' with criteria '${criteria}' cannot be found`);
        } catch (e) {
            if (notFoundException) {
                throw e;
            } else {
                return [];
            }
        }

        return driver.findElements(locator);
    };
}

interface ElementFinderOptions {
    by: Parameters<typeof elementsFinderFactory>[0];
    timeout?: number;
    notFoundException?: boolean;
}

/**
 *
 * find element
 * @param criteria
 * @param by
 * @param timeout
 * @param notFoundException
 */
async function elementFinder(criteria: string, {
    by,
    timeout = 3000,
    notFoundException = false
}: ElementFinderOptions) {
    const finder = elementsFinderFactory(by, timeout, notFoundException);

    const elements = await finder(criteria);

    return elements;
}

interface FindElementsByLabelOptions {
    timeout?: number;
    notFoundException?: boolean;
}

/**
 * find element by label
 * @param label
 * @param options
 */
async function findElementsByLabel(label: string, options?: FindElementsByLabelOptions) {
    const descriptor = getElementDescriptor(label);

    if (descriptor === undefined) {
        throw new Error('element descriptor not found, this could be due to xpath csv file bad format');
    }

    return await elementFinder(descriptor.value, {
        by: descriptor.elementByType as KeyofUnion<ByHash>,
        ...options
    });
}

/**
 * find elements currently
 * @param labels
 * @param options
 */
export async function findElements(labels: string | string[], options?: FindElementsByLabelOptions) {
    if (typeof labels === 'string') {

        return findElementsByLabel(labels, options);
    } else if (Array.isArray(labels)) {
        const elementsList = await Promise.all(labels.map(label => {
            return findElementsByLabel(label, options);
        }));

        const elements = elementsList.reduce((acc, cur) => {
            return acc.concat(cur);
        }, []);

        return elements;
    } else {
        throw new Error('the argument must be of type string or string[]');
    }
}

/**
 * wait element until it can be clicked
 * @param element
 * @param timeout
 */
export async function waitUntilElementIsClickable(element: WebElement, timeout: number = 3000) {
    await waitWebPage(2);

    await Promise.all([
        driver.wait(until.elementIsVisible(element), timeout),
        driver.wait(until.elementIsEnabled(element), timeout)
    ]);
}
