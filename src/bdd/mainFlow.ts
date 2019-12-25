import * as api from '../bapi/bapiFlow';
import * as capiApi from "../bapi/capiFlow";
import { userEmail, setToken, setUserEmail, setPassword, password, token, setAd,
    ad,setOrderId } from '../data/commonData';
import {
    findAdByType,
    findDefaultAd,
    findAdByTypeAndLocation,
    findAd,
    findAdByTypeAndAttribute,
    findDefaultCapiAd, findCapiAdByType
} from '../util/adsUtil';
import Ad from '../data/ad';
import { browser } from 'protractor';
import {getFileName} from "../util/util";
import {logConsole, logError, logInfo} from "../util/logger";
import {LocationInfo} from "../interface";
import Order from "../data/order";

const FILE_IDENTIFIER = getFileName(__filename);

/**
 * do register if no exist user
 * @export
 * @param {string} userType
 * @returns {(Promise<any> | void)}
 */
export function registerIfNeed(userType: string): Promise<any> | void {
    if (userEmail === '') {
        return registerAndActive(userType);
    } else {
        logError(FILE_IDENTIFIER,'use existent user: '+userEmail);
    }
}

/**
 * register a user first then active him
 * @export
 * @param {string} userType
 * @returns {(Promise<RequestResponse<{ token: string }>)}
 */
export async function registerAndActive(userType: string): Promise<RequestResponse<{ token: string }>> {
    const resp = await register(userType);
    const result = await active(resp.body.activationCode);
    setToken(result.body.token);
    logInfo(FILE_IDENTIFIER,'token:' + result.body.token);
    return result;
}

/**
 * set register user info a global value
 * @export
 * @returns {(Promise<RequestResponse | false>)}
 */
export async function register(userType: string): Promise<RequestResponse> {
    const resp = await api.register(userType);
    if (resp && resp.response.statusCode === 200) {
        setUserEmail(resp.email);
        setPassword(resp.password);
        return resp.response;
    } else {
        throw new Error('register failed, response code is: '+resp.response.statusCode);
    }
}

/**
 * active user
 * @export
 * @param {string} token
 * @returns
 */
export async function active(token: string) {
    const resp = await api.active(token);
    if (!(resp && resp.statusCode === 200)) {
        throw new Error('active user failed, response code is: ' + resp.statusCode);
    } else {
        return resp;
    }
}

/**
 * login
 * @export
 * @param {string} username
 * @param {string} password
 * @returns {Promise<string>}
 */
export async function login(username: string, password: string): Promise<string> {
    logConsole(FILE_IDENTIFIER,'start login');
    return api.login(username, password);
}

/**
 * give a user to post ad
 * @export
 * @param {string} adType
 * @returns {Promise<any>}
 */
export async function postAd(adType ?: string): Promise<void> {
    await registerIfNeed('default');
    let ad;
    if(adType) ad = await findAdByType(browser.params.site, adType);
    else ad = await findDefaultAd(browser.params.site);
    await post(ad);
}

/**
 * post capi ad
 * @param adType
 */
export async function postCapiAd(adType ?: string): Promise<void> {
    await registerIfNeed('default');
    let ad;
    if(adType) ad = await findCapiAdByType(browser.params.site, adType);
    else ad = await findDefaultCapiAd(browser.params.site);
    await capiAdPost(ad);
}

/**
 * give a user to post a partner ad
 * @param adType
 * @param table
 */
export async function postPartnerAdByType(adType: string, table ?: {[index: string ]: string }): Promise<void> {
    await registerIfNeed('default');
    const ad = await findAdByTypeAndAttribute(browser.params.site, adType, {'name':'Email','value':userEmail});
    await partnerPost(ad);
}

/**
 * give a user to post a featured ad
 * @param adType
 * @param table
 */
export async function postFeaturedAdByType(adType: string, table ?: {[index: string ]: string }): Promise<void> {
    await registerIfNeed('default');
    const ad = await findAdByTypeAndAttribute(browser.params.site, adType, {'name':'Email','value':userEmail});
    await featureAdPost(ad);
}

/**
 * post a normal ad with a specific location
 * @export
 * @returns {Promise<any>}
 * @param adType
 * @param location
 */
export async function postAdByTypeAndLocation(adType: string, location?: LocationInfo): Promise<void> {
    await registerIfNeed('default');
    const ad = await findAdByTypeAndLocation(browser.params.site, adType, location);
    await post(ad);
}

/**
 * basic post normal ad with skipping tns check
 * @param ad
 */
export async function postSkipTns(ad: any): Promise<void> {
    ad.syncGeoCodeForTesting=true;
    await post(ad);
}

/**
 * basic post normal ad process
 * @param ad
 */
async function post(ad: any): Promise<void> {
    const resp = await api.postAd(ad, token);
    if (resp && resp.statusCode === 201) {
        const ad = new Ad(resp.body.id);
        logConsole(FILE_IDENTIFIER,'AD id:' + resp.body.id);
        setAd(ad);
    }
}

/**
 * basic post partner ad process
 * @param ad
 */
async function partnerPost(ad: any): Promise<void> {
    const resp = await api.postPartnerAd(ad, token);
    if(resp && resp.statusCode === 201) {
        const ad = new Ad(resp.body.id);
        logConsole(FILE_IDENTIFIER,'partner AD id:' + resp.body.id);
        setAd(ad);
    }
}

/**
 * basic post partner ad with feature process
 * @param ad
 */
async function featureAdPost(ad: any): Promise<void> {
    const resp = await api.postFeaturedAd(ad, token);
    if(resp && resp.statusCode === 201) {
        const ad = new Ad(resp.body.id);
        logConsole(FILE_IDENTIFIER,'partner AD id:' + resp.body.id);
        setAd(ad);
    }
}

/**
 * post capi ad and save post response
 * @param adTemple
 */
async function capiAdPost(adTemple: any): Promise<void> {
    const resp = await capiApi.postAd(adTemple);
    const seoUrl = resp.split("self-public-website\",\"href\":\"")[1].split("\"")[0].split("/");
    const ad = new Ad(seoUrl[seoUrl.length-1]);
    setAd(ad);
}

/**
 * create an empty order
 * @param orderBody
 */
export async function createOrder(orderBody: object | string): Promise<string> {
    const resp = await api.createOrderApi(orderBody, token);
    return JSON.stringify(resp);
}

/**
 * create an order which can be active
 * @param orderBody
 */
export async function createFeatureOrder(orderBody: object | string): Promise<string>{
    return JSON.stringify(await api.createdFeaturedOrder(orderBody, token));
}

/**
 * active the order
 * @param orderID
 */
export async function activeOrder(orderID: string): Promise<void> {
    await api.activeOrder(orderID);
}

/**
 * buy features for ad by ad id
 * @param adID
 * @param features
 */
export async function buyFeaures(adID: string, features: string): Promise<Order> {
    const featureList: string[] = features.split(",");
    let featureBody: string = "";
    let newBody: object | string;
    for (const feature of featureList) {
        featureBody += "\"" + feature.trim() + "\"" + ",";
    }
    if (featureList.length > 0) {
        featureBody = featureBody.substring(0, featureBody.length - 1);
    }
    newBody = "{\"adFeaturesGroups\":[{\"features\":[" + featureBody + "],\"adId\":\"" + adID + "\"}]}";
    const response: string = await createFeatureOrder(JSON.parse(newBody));
    const orderId = response.split(",")[1].split(":")[2];
    let secureToken: string = response.split(",")[2].split(":")[1];
    secureToken = secureToken.substring(1, secureToken.length - 2);
    logInfo(FILE_IDENTIFIER,"orderid:"+orderId+" stoken:"+secureToken);
    await activeOrder(orderId);
    return new Order(orderId, secureToken);
}

/**
 * create a payment process
 * @param paymentBody
 */
export async function createPayment(paymentBody: object | string): Promise<string> {
    logConsole(FILE_IDENTIFIER,'start create payment');
    logConsole(FILE_IDENTIFIER,typeof paymentBody);
    const resp = await api.createPaymentApi(paymentBody, token);
    return JSON.stringify(resp);
}

export const getAdFeatures = api.getAdFeatures;
