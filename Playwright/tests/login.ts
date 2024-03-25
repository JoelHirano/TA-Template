import { Page } from '@playwright/test';
import { cookie } from './home';
const xpaths = require('./xpaths');

export const login = async (page:Page, whereAmI) => {
    if(whereAmI === 'Home'){
      await page.goto(process.env.URL_MUSEUM_HOME!);
      await cookie(page);
      await page.waitForLoadState('domcontentloaded');
      await page.locator(xpaths.login_home_header).click();
      await page.waitForSelector(xpaths.login_submit_button);
      await fillInLogin(page);
      await page.locator(xpaths.login_submit_button).click();
      await page.waitForURL(process.env.URL_MUSEUM_HOME!);
    } else if (whereAmI === 'Rijksstudio') {
      await fillInLogin(page);
      await page.locator(xpaths.login_submit_button_Rijksstudio).click();
    }
  }

const fillInLogin = async (page:Page) => {
await page.locator(xpaths.login_email_input).fill(process.env.LOGIN_MAIL!);
await page.locator(xpaths.login_password_input).fill(process.env.LOGIN_PASSWORD!);
}