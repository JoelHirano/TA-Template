import { Page } from '@playwright/test';
const xpaths = require('./xpaths');

export const cookie = async (page:Page) => {
    const cookieUsageStart = await page.locator('text=No, rather not');
      if (cookieUsageStart && await cookieUsageStart.isVisible()) {
        await cookieUsageStart.click();
      }
      await page.waitForTimeout(500);
    const cookieUsageGiftshop = await page.locator("xpath=//p[@class='title' and contains(text(), 'COOKIE USAGE')]");
      if(cookieUsageGiftshop && await cookieUsageGiftshop.isVisible()) {
        await page.locator("xpath=//a[contains(@class,'cookie-permission--accept-button')]").click();
      }
  }