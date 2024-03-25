import { Page } from '@playwright/test';
const xpaths = require('./xpaths');

export const searchArt = async (page:Page, searchObject) => {
    await page.getByLabel('Search').click();
    await page.waitForLoadState('domcontentloaded');
    await page.getByPlaceholder('For info, artist, guided tour or more').fill(searchObject);
    await page.keyboard.press('Enter');
  }

export const searchResultsLikeArt = async (page:Page, i) => {
    await page.locator("xpath=//figure[@data-item-index="+i+"]").hover();
    await page.locator("xpath=//figure[@data-item-index="+i+"]//following-sibling::a[@data-button='button-icon button-fav-no']").click();
}

  export const fillFormAdvanceSearch = async (page:Page, startDate, endDate, material) => {
    // const inputvalue = 0;
    // while (inputvalue !== '1600') {
    //   await page.getByPlaceholder('Start year').fill(startDate);
    //   await page.getByPlaceholder('End year').fill(endDate);
    //   await page.locator(xpaths.advanced_search_material).click();
    //   await page.keyboard.type(material);
    //   await page.waitForTimeout(1000);
    //   await page.keyboard.press('Enter');
    //   await page.locator(xpaths.advanced_search_searchbar).focus();
    //   await page.keyboard.press('Enter');
    //   const inputvalue = await page.getByPlaceholder('Start year').inputValue();
    //   if(inputvalue !== '1600') {
    //     await page.reload();
    //   }
    // }
    while (true) {
      await page.getByPlaceholder('Start year').fill(startDate);
      await page.getByPlaceholder('End year').fill(endDate);
      await page.locator(xpaths.advanced_search_material).click();
      await page.keyboard.type(material);
      await page.waitForTimeout(1000);
      await page.keyboard.press('Enter');
      await page.locator(xpaths.advanced_search_searchbar).focus();
      await page.keyboard.press('Enter');
      // const inputvalue = await page.getByPlaceholder('Start year').inputValue();
      if(!(await page.locator(xpaths.advanced_search_material).isVisible())) {
        break;
      }
      await page.goto(process.env.URL_MUSEUM_HOME!);
      await page.waitForTimeout(2000);
      await searchArt(page, 'Hilversum');
      await page.locator(xpaths.search_results_view_all).click();
      await page.getByText('Advanced search').click();
    }
  }