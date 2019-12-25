"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
const util_1 = require("../util/util");
const logger_1 = require("../util/logger");
const FILE_IDENTIFIER = util_1.getFileName(__filename);
const sites = {
    all: 'za,ie,sg,pl,mx_vns',
    phx: 'mx_vns',
    ams: 'za,pl,ie,sg',
    en: 'za,ie,sg',
    es: 'mx_vns'
};
const platforms = {
    all: 'desktop,mobile_ios,mobile_android,tablet_landscape,tablet_portrait',
    mobile: 'mobile_ios,mobile_android',
    tablet: 'tablet_landscape,tablet_portrait',
    portrait: 'mobile_ios,mobile_android,tablet_portrait',
    landscape: 'tablet_landscape,desktop'
};
const domain = {
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
const site = domain[protractor_1.browser.params.site];
exports.getSite = (site) => {
    const arr = new Set();
    for (const s of site.split(',')) {
        if (sites.all.indexOf(s.toLowerCase()) !== -1) {
            arr.add(s);
        }
        else if (sites[s] !== undefined) {
            for (const ss of sites[s].split(',')) {
                arr.add(ss);
            }
        }
        else {
            logger_1.logConsole(FILE_IDENTIFIER, 'site is not supported: ' + site);
        }
    }
    return arr;
};
exports.getPlatform = (platform) => {
    const arr = new Set();
    for (const p of platform.split(',')) {
        if (platforms[p] !== undefined) {
            for (const pp of platforms[p].split(',')) {
                arr.add(pp);
            }
        }
        else if (platforms.all.indexOf(p.toLowerCase()) !== -1) {
            arr.add(p);
        }
        else {
            logger_1.logConsole(FILE_IDENTIFIER, 'platform is not supported: ' + platform);
        }
    }
    return arr;
};
let url = 'http://' + site['base'];
if (util_1.trim(protractor_1.browser.params.vm))
    url = url + '.' + protractor_1.browser.params.vm;
exports.baseUrl = url;
exports.securityBaseUrl = 'https://' + site['base'] + '.' + protractor_1.browser.params.vm;
exports.siteBase = site['base'];
exports.siteLocal = site['locale'];
exports.currentDomain = exports.siteBase.replace('www', '') + '.' + protractor_1.browser.params.vm;
//# sourceMappingURL=siteInfo.js.map