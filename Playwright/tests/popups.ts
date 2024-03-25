import { Page } from '@playwright/test';
import { login } from './login';
const xpaths = require('./xpaths');

export const needToLoginToSaveThisWork = async (page:Page) => {
    await page.locator(xpaths.Rijksstudio_account_login_already_have_account).click();
    await page.waitForLoadState('domcontentloaded');
    await login(page, 'Rijksstudio');
  }

export const createNewSet = async (page:Page, setName) => {
await page.waitForLoadState('domcontentloaded');
await page.getByRole('button', { name: 'Add new set' }).click();
await page.getByPlaceholder('Name of new set').fill(setName);
await page.locator("xpath=//input[@value='Add']").click();
}
 
export const addToCollectionIf = async (page:Page, collectionName) => {
    const addToCollection = await page.locator("xpath=//a[text()='"+collectionName+"']");
    if(addToCollection && await addToCollection.isVisible()) {
      await page.locator("xpath=//a[text()='"+collectionName+"']").click();
      await page.waitForLoadState('domcontentloaded');
      await closePopUp(page);
      // const workAddedButton = await page.locator("xpath=//h2[contains(text(), 'The work is added')]");
      // if(workAddedButton && await workAddedButton.isVisible()) {
      //   await page.locator("xpath=//div[@class='box bg-lighter offset-parent']//following-sibling::button").click();
      //   // await addToCollectionIf(page);
      // }
    }
  }

export const closePopUp = async (page:Page) => {
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1000);
    // await addToCollectionIf(page);
    const loginBug = await page.locator("xpath=//h1[text()='To save this work you need a Rijksstudio account']");
    if(loginBug && await loginBug.isVisible()) {
      await page.locator("xpath=//img[@alt='Preview of Rijksstudio']/following::button[contains(text(),'Close')][1]").click();
      // await addToCollectionIf(page);
    }
    const shareCollection = await page.locator("xpath=//h2[contains(text(),'Share your collection My first collection')]");
    if(shareCollection && await shareCollection.isVisible()) {
      await page.locator("xpath=//h2[contains(text(),'Share your collection My first collection')]/../following::button[contains(text(),'Close')][1]").click();
      // await addToCollectionIf(page);
    }
    const welcomeToRijksstudio = await page.locator("xpath=//h2[contains(text(),'Welcome to Rijksstudio')]");
    if(welcomeToRijksstudio && await welcomeToRijksstudio.isVisible()) {
      await page.locator("xpath=//h2[contains(text(),'Welcome to Rijksstudio')]/../following::button[contains(text(),'Close')][1]").click();
    }
    const addedToSet = await page.locator("xpath=//h2[contains(text(),'work is added to the set')]");
    if(addedToSet && await addedToSet.isVisible()) {
      await page.getByRole('button', { name: 'Close' }).click();
    }
  }