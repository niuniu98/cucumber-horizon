import { browser } from 'protractor';
import { securityBaseUrl, siteLocal, siteBase } from '../config/siteInfo';
import {createRandom, getFileName} from '../util/util';
import {logConsole, logError, logInfo} from "../util/logger";

const RequestClient = require('reqclient').RequestClient;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const FILE_IDENTIFIER = getFileName(__filename);

const header = {
    headers: {
        'X-BOLT-APPS-ID': 'BOLT',
        'X-BOLT-SITE-LOCALE': siteLocal,
        'Content-Type': 'application/json',
        'X-BOLT-USER-AGENT':
            'Mozilla/5.0 (Macintosh; U; PPC Mac OS X Mach-O; en-US; rv:1.7a)',
        'X-BOLT-MACHINE-ID': 'f9781729-ddbe-416a-a214-2c011ba91a96-15339352594',
        'Accept-Language': 'es,en',
        'X-Credential-Username':'',
        Authorization: ''
    },
    fullResponse: true
};

const url = 'http://api.bolt.ecg.ebay.com.' + browser.params.vm;

const client = new RequestClient({
    baseUrl: url,
    debugRequest: true,
    debugResponse: true,
    timeout: 10000
});

const securityClient = new RequestClient({
    baseUrl: securityBaseUrl,
    debugRequest: true,
    debugResponse: true,
    timeout: 10000,
    auth: {
        user: 'nniu@ebay.com',
        pass: 'vmiscool'
    },
    fullResponse: true
});

/**
 * call bapi for register a user
 * @export
 * @param {string} userType
 * @returns {(Promise<{
 *     email: string;
 *     password: string;
 *     response: RequestResponse
 * } | void>)}
 */
export async function register(userType: string): Promise<{
    email: string;
    password: string;
    response: RequestResponse;
}> {
    let type = '';
    switch (userType) {
        case 'receiveEmail':
            type =  '@receive.com';
            break;
        default:
            type = '@domain.com';
            break;
    }
    const email = 'email' + createRandom() + type;
    logInfo(FILE_IDENTIFIER,'register user name is:'+email);
    const password = 'kijijiji';
    const registerInfo = {
        email,
        password,
        displayName: 'integrationtest',
        redirectUri: siteBase + '.' + browser.params.vm
    };
    const response: RequestResponse = await client.post(
        'boltapi/v1/users',
        registerInfo,
        header
    );
    return { email, password, response };
}

/**
 * call bapi to active a user
 * @export
 * @param {string} token
 * @returns {(Promise<RequestResponse<{ token: string }> | void>)}
 */
export async function active(
    token: string
): Promise<RequestResponse<{ token: string }>> {
    const resp: RequestResponse<{ token: string }> = await client.post(
        'boltapi/v1/users/actions/activate',
        { token },
        header
    );
    return resp;
}

/**
 * login
 * @export
 * @param {string} email
 * @param {string} password
 * @returns {(Promise<string | void>)}
 */
export async function login(
    email: string,
    password: string
): Promise<string> {
    const loginInfo = { email, password };
    const resp: RequestResponse = await securityClient.post(
        'login',
        loginInfo,
        header
    );
    const cookies = resp.headers['set-cookie'].toString().split(';');
    let auth = '';
    for (const cookie of cookies) {
        logConsole(FILE_IDENTIFIER,'cookie:' + cookie);
        if (cookie.indexOf('bt_auth') !== -1) {
            auth = 'Bearer ' + cookie.split('bt_auth')[1].replace('=', '');
        }
    }
    return auth;
}

/**
 * post ad process
 * @export
 * @param {(object | string)} ad
 * @param {string} token
 * @param {string} [appID='BOLT']
 * @returns {(Promise<RequestResponse | void>)}
 */
export async function postAd(
    ad: object | string,
    token: string,
    appID = 'BOLT'
): Promise<RequestResponse | void> {
    header.headers['Authorization'] = 'Bearer ' + token;
    header.headers['X-BOLT-APPS-ID'] = appID;
    let resp: RequestResponse;
    if (typeof ad === 'string') {
        resp = await client.get('boltapi/v1/ads/', ad, header);
    } else {
        resp = await client.post('boltapi/v1/ads', ad, header);
    }
    return resp;
}

/**
 * post ad with mock features
 * @param ad
 * @param token
 * @param appID
 */
export async function postFeaturedAd(ad: string, token: string, appID = 'PROTOOL'): Promise<RequestResponse | void> {
    header.headers['X-Credential-Username'] = 'gait';
    return await postAd(ad, token, appID);
}

/**
 * post partner
 * @param ad
 * @param token
 * @param appID
 */
export async function postPartnerAd(ad: string, token: string, appID = 'PROTOOL'): Promise<RequestResponse | void> {
    header.headers['X-Credential-Username'] = 'gait';
    return await postAd(ad, token, appID);
}

/**
 * create an feature order process
 * @export
 * @param {(object | string)} orderBody
 * @param {string} [token='']
 * @returns {(Promise<RequestResponse | void>)}
 */
export async function createOrderApi(
    orderBody: object | string,
    token = ''
): Promise<RequestResponse | void> {
    let resp: RequestResponse;
    if (typeof orderBody === 'string') {
        resp = await client.get('boltapi/v1/orders', orderBody, header);
    } else {
        resp = await client.post('boltapi/v1/orders', orderBody, header);
    }
    return resp;
}

/**
 * create a feature order process with mock features
 * @param orderBody
 * @param token
 */
export async function createdFeaturedOrder(orderBody: object | string, token = ''): Promise<RequestResponse | void> {
    header.headers['X-Credential-Username'] = 'gait';
    header.headers['Authorization'] = 'Bearer ' + token;
    return createOrderApi(orderBody,token);
}

/**
 * active mock features
 * @param orderID
 */
export async function activeOrder(orderID: string): Promise<RequestResponse> {
    header.headers['X-Credential-Username'] = 'gait';
    const bapiUrl: string = 'boltapi/v1/payment/orders/{orderId}/actions/pay';
    return await client.post(bapiUrl.replace('{orderId}', orderID), '',header);
}

/**
 * create a payment process
 * @export
 * @param {(object | string)} paymentBody
 * @param {string} [token='']
 * @returns {(Promise<RequestResponse | void>)}
 */
export async function createPaymentApi(
    paymentBody: object | string,
    token: string
): Promise<RequestResponse | void> {
    header.headers['Authorization'] = 'Bearer ' + token;
    let resp: RequestResponse;
    if (typeof paymentBody === 'string') {
        resp = await client.get('boltapi/v1/payment/payments', paymentBody, header);
    } else {
        resp = await client.post('boltapi/v1/payment/payments', paymentBody, header);
    }
    return resp;
}

/**
 * get ad features
 * @export
 * @param {string} adId
 * @returns {Promise<string[][]>}
 */
export async function getAdFeatures(adId: string) {
    header.headers['X-BOLT-APPS-ID'] = 'BOLT';

    const response = await client.get(`boltapi/v1/ads/${adId}/features`, header);

    const body = response.body;

    const adFeatures: any[] = (typeof body === 'string' && JSON.parse(body) || body).features;

    return adFeatures.map(feature => feature.name);
}
