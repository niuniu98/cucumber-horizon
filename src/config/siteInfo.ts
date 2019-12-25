import { browser } from 'protractor';
import {getFileName, trim} from '../util/util';
import {logConsole} from "../util/logger";

const FILE_IDENTIFIER = getFileName(__filename);

interface IndexSignature {
    [index: string]: string;
}

const sites: IndexSignature = {
    all: 'za,ie,sg,pl,mx_vns',
    phx: 'mx_vns',
    ams: 'za,pl,ie,sg',
    en: 'za,ie,sg',
    es: 'mx_vns'
};
const platforms: IndexSignature = {
    all: 'desktop,mobile_ios,mobile_android,tablet_landscape,tablet_portrait',
    mobile: 'mobile_ios,mobile_android',
    tablet: 'tablet_landscape,tablet_portrait',
    portrait: 'mobile_ios,mobile_android,tablet_portrait',
    landscape: 'tablet_landscape,desktop'
};

interface DomainInfo {
    base: string;
    locale: string;
}

const domain: {[index: string]: DomainInfo} = {
    mx_vns: {
        base: 'www.vivanuncios.com.mx',
        locale: 'es_MX'
    },
    za: {
        base: 'www.gumtree.co.za',
        locale: 'en_ZA'
    },
    ie: {
        base: 'www.gumtree.ie',
        locale: 'en_IE'
    },
    pl: {
        base: 'www.gumtree.pl',
        locale: 'pl_PL'
    },
    sg: {
        base: 'www.gumtree.sg',
        locale: 'en_SG'
    }
};

const site = domain[browser.params.site];

export const getSite = (site: string) => {
    const arr = new Set();
    for (const s of site.split(',')) {
        if (sites.all.indexOf(s.toLowerCase()) !== -1) {
            arr.add(s);
        } else if (sites[s] !== undefined) {
            for (const ss of sites[s].split(',')) {
                arr.add(ss);
            }
        } else {
            logConsole(FILE_IDENTIFIER, 'site is not supported: ' + site);
        }
    }
    return arr;
};

export const getPlatform = (platform: string) => {
    const arr = new Set();
    for (const p of platform.split(',')) {
        if (platforms[p] !== undefined) {
            for (const pp of platforms[p].split(',')) {
                arr.add(pp);
            }
        } else if (platforms.all.indexOf(p.toLowerCase()) !== -1) {
            arr.add(p);
        } else {
            logConsole(FILE_IDENTIFIER,'platform is not supported: ' + platform);
        }
    }
    return arr;
};
let url = 'http://' + site['base'];
if (trim(browser.params.vm)) url = url + '.' + browser.params.vm;
export const baseUrl = url;
export const securityBaseUrl = 'https://' + site['base'] + '.' + browser.params.vm;

export const siteBase = site['base'];
export const siteLocal = site['locale'];

export const currentDomain = siteBase.replace('www', '') + '.' + browser.params.vm;

