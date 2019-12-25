import {getFileName, getDateFormat} from "./util";
import {LocationInfo} from "../interface";
import {userEmail} from "../data/commonData";
import { Builder,parseString, parseStringPromise} from "xml2js";
import fs from "fs";

/**
 * a collection of ad util
 */

const FILE_IDENTIFIER = getFileName(__filename);

export const findAd = async (site: string, adName = 'post_ad') => {
    const { default: ad }: { default: { [index: string ]: string } } = await import('../../ads/' + site + '/' + adName);
    return JSON.parse(JSON.stringify(ad));
};

export const findDefaultAd = async (site: string) => {
    return await findAd(site, undefined);
};

export const findAdByType = async (site: string, adType: string) => {
    return await findAd(site, 'postad_' + adType);
};

export const findAdByTypeAndLocation = async (site: string, adType: string, location: LocationInfo = {
    "address": "Bryanston",
    "latitude": -26.0563986,
    "longitude": 28.0244639,
    "radius": 0
}) => {
    const ad = await findAd(site, `postad_${adType}`);
    // @ts-ignore
    ad.location = location;
    return ad;
};

// export const findAdByTypeAndTableInfo = async (site: string, adType: string, table: {[index: string ]: string }) =>{
//     table = {"title": "test",'name':'Email','value':'test'};
//     const ad = await findAd(site,`postad_${adType}`);
//     console.log(JSON.stringify(ad));
// }

export const findAdByTypeAndAttribute = async (site: string, adType: string, attribute: {[index: string ]: string }) =>{
    const ad = await findAd(site,`postad_${adType}`);
    console.log(JSON.stringify(ad));
    // @ts-ignore
    const attArray: {[index: string ]: string }[] = ad.categoryAttributes;
    attArray.push(attribute);
    return ad;
};

export const findDefaultCapiAd = async (site: string) => {
    return await findCapiAdByType(site, undefined);
};

export const findCapiAdByType = async (site: string, adName = 'post_ad') => {
    const builder = new Builder();
    const result = await parseStringPromise(await fs.readFileSync('ads/' + site + '/' + adName+'.xml'));
    result["ad:ad"]["ad:email"] = userEmail;
    result["ad:ad"]["ad:title"] = result["ad:ad"]["ad:title"]+' '+ getDateFormat();
    let adAttribute= JSON.stringify(result["ad:ad"]["attr:attributes"]);
    adAttribute = adAttribute.replace(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z/, getDateFormat());
    result["ad:ad"]["attr:attributes"] = JSON.parse(adAttribute);
    return builder.buildObject(result);
};

