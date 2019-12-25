
import { Given } from 'cucumber';
import * as webPage from '../bdd/webPage';
import { userEmail, password, token } from '../data/commonData';
import { registerAndActive, registerIfNeed, login } from '../bdd/mainFlow';

Given(/^a email registered user$/, async () => {
    await registerAndActive('receiveEmail');
});

Given(/^a registered user$/, async () => {
    await registerAndActive('notReceiveEmail');
});


Given(/^a registered user open "([^"]*)" page$/, async (pageName: string) => {
    await registerIfNeed('default');
    await webPage.loadPage(pageName);
    await login(userEmail, password);
    await webPage.addCookie("bt_auth", token);
    if(pageName.toLowerCase() !== 'home') await webPage.loadPage(pageName);
});

Given(/^a registered user open "([^"]*)""([^"]*)"$/, async (pageName: string, url: string) => {
    await registerIfNeed('default');
    await webPage.loadPage(pageName, url);
    await login(userEmail, password);
    await webPage.addCookie("bt_auth", token);
});
