// tslint:disable: max-line-length

import csv from 'csvtojson/v2';
import MyWebElement from '../bdd/webElement';
import fs from 'fs';
import { trim } from './util';
import { By } from 'protractor';
import { By as eBy } from 'selenium-webdriver';
const readdir = require('util').promisify(fs.readdir);
const siteInfo = require('../config/siteInfo');

const xpathMap = new Map();

interface Method {
    /**
     * webdriver Locators
     * @param param
     */
    by(param: string): eBy;
}

const ByType: {[index: string]: Method} = {
    className: {
        by(byString: string) {
            return By.className(byString);
        }
    },
    css: {
        by(byString: string) {
            return By.css(byString);
        }
    },
    id: {
        by(byString: string) {
            return By.id(byString);
        }
    },
    linkText: {
        by(byString: string) {
            return By.linkText(byString);
        }
    },
    name: {
        by(byString: string) {
            return By.name(byString);
        }
    },
    partialLinkText: {
        by(byString: string) {
            return By.partialLinkText(byString);
        }
    },
    tagName: {
        by(byString: string) {
            return By.tagName(byString);
        }
    },
    xpath: {
        by(byString: string) {
            return By.xpath(byString);
        }
    }
};

/**
 *
 * webElement initialization
 * @param {string} label
 * @param {string} description
 * @param {string} byType
 * @param {string} byValue
 * @returns {MyWebElement}
 */
function initializeElement(label: string, description: string, byType: string, byValue: string): MyWebElement {
    return new MyWebElement(label, description, byType, ByType[byType].by(byValue), byValue);
}
/**
 *
 */
class XpathParser {
    constructor(csvFolder: string) {
        this.init(csvFolder);
    }

    /**
     *
     * init xpath map
     * @param {string} csvFolder
     * @memberof XpathParser
     */
    async init(csvFolder: string) {
        const files = await readdir(csvFolder);

        if (files && files.length) {
            for (const file of files) {
                const jsonArrRes = await csv().fromFile(csvFolder + '/' + file);
                for (let x = 0; x < jsonArrRes.length; x++) {
                    const site = jsonArrRes[x].Site;
                    const platform = jsonArrRes[x].Platform;
                    // key: site-platform-elementName
                    for (const s of siteInfo.getSite(site.toLowerCase())) {
                        for (const p of siteInfo.getPlatform(
                            platform.toLowerCase()
                        )) {
                            const key =
                                trim(s).toLowerCase() +
                                '-' +
                                trim(p).toLowerCase() +
                                '-' +
                                trim(jsonArrRes[x].Label).toLowerCase();
                            if (xpathMap.get(key) === undefined) {
                                xpathMap.set(
                                    key,
                                    initializeElement(
                                        jsonArrRes[x].Label,
                                        jsonArrRes[x].Description,
                                        jsonArrRes[x].ByType,
                                        jsonArrRes[x].By
                                    )
                                );
                            }
                        }
                    }
                }
            }
        }
    }

    /**
     *
     * xpathMap contain all xpath
     * @return {Map}
     */
    getElementMap() {
        return xpathMap;
    }
}

export default XpathParser;
