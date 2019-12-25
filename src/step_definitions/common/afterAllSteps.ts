import { AfterAll } from 'cucumber';
import { browser } from 'protractor';

AfterAll(async () => {
    await browser.quit();
});
