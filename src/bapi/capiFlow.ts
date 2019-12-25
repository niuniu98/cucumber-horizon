import { browser } from 'protractor';
import { securityBaseUrl, siteLocal, siteBase, baseUrl as url } from '../config/siteInfo';
import {createRandom, getFileName} from '../util/util';
import {logConsole, logError, logInfo} from "../util/logger";
import {parseStringPromise} from "xml2js";
const request = require('request-promise');

const FILE_IDENTIFIER = getFileName(__filename);

/**
 * call capi to post ad
 * @param ad
 */
export async function postAd(ad: object): Promise<string>{
    const  options = {
        method: 'POST',
        url:'http://ecg-api.vivanuncios.com.mx.'+browser.params.vm+'/api/ads',
        body: ad,
        headers:{
            authorization: 'Basic ' + Buffer.from('bolt_qa:bolt_qa').toString('base64'),
            'content-type': 'application/xml'
        }
    };
    return JSON.stringify(await parseStringPromise(await request(options)));
}
