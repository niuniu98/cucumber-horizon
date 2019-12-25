import { logging } from 'protractor';
import Ad from './ad.js';
import Order from './order';

export let userEmail = '';
export let password = '';
export let token = '';
export let rawHar: logging.Entry[] = [];
export let ad: Ad | undefined;
export let pageData = '';
export let orderId: Order | string;

export const setUserEmail = (value: string) => userEmail = value;
export const setPassword = (value: string) => password = value;
export const setAd = (value: Ad) => ad = value;
export const setRawHar = (value: logging.Entry[]) => rawHar = value;
export const setToken = (value: string) => token = value;
export const setPageData = (value: string) => pageData = value;
export const setOrderId = (value: string) => orderId = value;

