import { Given } from 'cucumber';
import {
    buyFeaures,
    createOrder,
    postAd,
    postAdByTypeAndLocation, postCapiAd, postFeaturedAdByType,
    postPartnerAdByType, postSkipTns
} from '../bdd/mainFlow';
import {LocationExample} from "../interface";
import {ad} from "../data/commonData";
import {postFeaturedAd} from "../bapi/bapiFlow";

const locationExample: LocationExample = {
    "Adelaide": {
        address: "Adelaide",
        latitude: -32.5706576,
        longitude: 26.3249438,
        radius: 0
    }
};

Given(
    /^a live Ad$/,
    async () => {
        await postAd();
    }
);

Given(/^a live car Ad for "([^"]*)"$/, async (usage: string) => {
        if (usage === 'search') usage = 'srp_search';
        await postAd(`car_${usage}`);
        // await postSpecifyAd(`car_${usage}`);
    }
);

Given(/^a live car Ad for "([^"]*)" with location "([^"]*)"$/, async (usage: string, location: string) => {
    if (usage === 'search') usage = 'srp_search';
    // await postSpecifyAdWithLocation(`car_${usage}`, locationExample[location]);
    await postAdByTypeAndLocation(`car_${usage}`,locationExample[location]);
});

Given(
    /^a live "([^"]*)" Ad$/,
    async (adType: string) => {
        await postAd(adType);
    }
);


Given(/^a live capi Ad$/, async() =>{
    await postCapiAd();
});
Given(/^a live "([^"]*)" capi Ad$/,
    async(adType: string) => {
        await postCapiAd(adType);
    });

Given(
    /^a live "([^"]*)" Ad without TNS check$/,
    async (adType: string) => {
        await postSkipTns(adType);
    }
);

Given(
    /^a "([^"]*)" Ad with location$/,
    async (adType: string) => {
        await postAdByTypeAndLocation(adType);
    }
);

Given(
    /^"([^"]+)" live (?:"([^"]+)" )?Ads?$/i,
    async (adNumStr: string, adType?: string) => {
        const adNum = parseInt(adNumStr, 10);

        if (Number.isNaN(adNum) || adNum <= 0) {
            throw new Error('the first parameter must be a positive number');
        }

        const posting = adType ? postAd.bind(undefined, adType) : postAd;

        for (let i = 0; i < adNum; i++) {
            await posting();
        }
    }
);

Given(
    /^"([^"]*)" partner "([^"]*)" Ads$/,
    async(adNum: number, adType: string) => {
        for(let i = 0; i < adNum; i++){
            await postPartnerAdByType(adType);
        }
    }
);

Given(
    /^"([^"]*)" partner "([^"]*)" Ads with features "([^"]*)"$/,
    async(adNum: number, adType: string, features: string) => {
        for(let i = 0; i < adNum; i++){
            await postFeaturedAdByType(adType);
            await buyFeaures(ad!.getId(), features);
        }
    }
);
