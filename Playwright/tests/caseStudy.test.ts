import { test, expect, request, } from '@playwright/test';
import { fail } from 'assert';
import { login } from './login';
import { cookie } from './home';
import { deleteArtSet, uploadNewProfilePic, validateProfilePicUpload } from './myprofile';
import { fillFormAdvanceSearch, searchArt, searchResultsLikeArt } from './search';
import { addToCollectionIf, closePopUp, createNewSet, needToLoginToSaveThisWork } from './popups';
import { addXAdultTicket, fillInPersonalDetail, selectNextAvailableTime } from './shop';
const xpaths = require('./xpaths');
const { DateTime } = require('luxon');

type searchResults = {
  count: number;
}

test('task1_1_UI', async ({ page }) => {
  let anzahl;
  await page.goto(process.env.URL_MUSEUM_HOME!);
  await cookie(page);
  await searchArt(page, 'Maker Rembrandt van Rijn');
  const searchResult = await page.locator(xpaths.search_results).textContent();
  const match = searchResult?.match(/\((\d+)\s+results\)/);
  if(match) {
    anzahl = parseInt(match[1]);
  }
  if(anzahl < 10){
    console.error('Die Suche hat weniger als 10 Resultate ergeben.')
    fail('Die Suche hat weniger als 10 Resultate ergeben.');
  }
});

test('task1_1_API', async ({ request }) => {
  const status = await request.get('https://www.rijksmuseum.nl/api/nl/collection?key=7mzKrt0r&involvedMaker=Rembrandt+van+Rijn');
  const response = JSON.parse(await status.text());
  expect(status.ok()).toBeTruthy();
  if(response.count < 10) {
    console.error('Die Suche hat weniger als 10 Resultate ergeben.')
    fail('Die Suche hat weniger als 10 Resultate ergeben.');
  }
});

test('task1_2_UI', async ({ page }) => {
  await page.goto(process.env.URL_MUSEUM_HOME!);
  await cookie(page);
  await searchArt(page, 'Hilversum')
  await page.locator(xpaths.search_results_view_all).click();
  await page.getByText('Advanced search').click();
  await fillFormAdvanceSearch(page, '1600', '1700', 'canvas');
  await page.getByText('The Feast of St Nicholas').click();
});

test('task1_2_API', async ({ request }) => {
  const status = await request.get('https://www.rijksmuseum.nl/api/en/collection?key=7mzKrt0r&material=canvas&q=Hilversum&f.dating.period=17');
  const response = JSON.parse(await status.text());
  expect(status.ok()).toBeTruthy();
  if(response.artObjects[0].longTitle != 'The Feast of St Nicholas, Jan Havicksz. Steen, 1665 - 1668') {
    console.error('Das gesuchte Bild wurde nicht gefunden')
    fail('Das Kunstwerk The Feast of St Nicholas, Jan Havicksz. Steen, 1665 - 1668 wurde nicht gefunden');
  }
});

test('task2_UI', async ({ page }) => {
  const newSetName = 'Xebia';
  await page.goto(process.env.URL_MUSEUM_HOME!);
  await page.waitForLoadState('domcontentloaded');
  await cookie(page);
  await searchArt(page, 'Maker Rembrandt van Rijn');
  await page.locator(xpaths.search_results_view_all).click();
  let k = true;
  for(let i = 0; i <= 2; ++i) { //Dieser For Loop soll sicherstellen, dass 3 Kunstobjekte einer deiner Sammlungen hinzugefügt wird.
    await page.waitForLoadState('domcontentloaded');
    if(k === false) {
      await searchResultsLikeArt(page, i);
    }
    while (k) { //Diese While Schlaufe wurde eingebaut, da der Klick auf den "Like" Knopf für das erste Kunstobjekt manchmal nicht reagiert. In so einem fall soll dies sollange probiert werden, bis es funktioniert 
      await searchResultsLikeArt(page, i); 
      // Warten auf das Erscheinen des h1-Elements
      await page.waitForSelector(xpaths.Rijksstudio_account_login_title, { timeout: 1000 }).catch(err => {
        // Dieser Block wird ausgeführt, wenn das Element nach 1 Sekunden nicht gefunden wurde
        true;
      });
      // Überprüfen, ob das h1-Element sichtbar ist
      const h1Element = await page.locator(xpaths.Rijksstudio_account_login_title);
      const isH1Visible = await h1Element.isVisible();
      if (isH1Visible) {
        // Das h1-Element ist sichtbar, die Schleife beenden
        k = false;
        break;
      }
    }
    if(i === 0){
      await needToLoginToSaveThisWork(page);
      await createNewSet(page, newSetName)
    }
    await closePopUp(page);    
    await addToCollectionIf(page, newSetName);
  }
  await page.reload();
  await page.waitForLoadState('domcontentloaded');
  const profilAvatar = await page.locator("xpath=//li[@class='user-profile']");
  if (!(await profilAvatar.isVisible())) {
    await profilAvatar.click();
  }
  const works = await page.locator("//p[@class='text-subtle']//span[contains(text(),'3 works')]");
  if(works) {
    await page.waitForLoadState('domcontentloaded');
    await page.reload();
    // await page.locator("xpath=//button[text()='Get started']").click();
    await page.locator("xpath=//a[contains(@href,'collections/"+newSetName.toLowerCase()+"') and (text()='"+newSetName+"')]").click();
    await deleteArtSet(page);
    await console.log('Test sucessfull');
  } else {
    fail('The test has failed');
  }
  });

test('task3_addProductToShoppingCart', async ({ page }) => {
  await page.goto(process.env.URL_MUSEUM_HOME!);
  await cookie(page);
  await page.locator(xpaths.open_giftshop_home).click();
  await cookie(page);
  await page.locator(xpaths.select_mizuno_category_giftshop).click();
  await page.locator(xpaths.open_product_mizuno_wave_rider_27).click();
  await page.locator(xpaths.add_product_to_shopping_cart).click();
  await page.locator(xpaths.view_shopping_cart).click();
  await page.locator("xpath=//div[contains(text(),'€171.75')]").isVisible();
});

test('task3_addTicketToShoppingCart', async ({ page }) => {
  await page.goto(process.env.URL_MUSEUM_HOME!);
  await cookie(page);
  await page.locator(xpaths.select_ticketshop_button).click();
  await addXAdultTicket(page, 1);
  await page.locator(xpaths.select_ticket_tour_option).click();
  const currentDate = await DateTime.now().toLocaleString({ weekday: 'long', month: 'long', day: '2-digit', year: 'numeric' });
  await page.locator("xpath=//button[@aria-label='"+currentDate+"']").click();
  await selectNextAvailableTime(page);
  await page.locator(xpaths.continue_Button_TicketShop).click();
  await fillInPersonalDetail(page);
  await page.locator(xpaths.continue_Button_TicketShop).click();
  await page.locator(xpaths.title_Payment_Methods).isVisible();
});

test('task3_uploadProfilePicture', async ({ page }) => {
  const profilePicName = 'xebia-logo-2.png';
  const profilePicNameDefault = 'sheldon.png'
  await login(page, 'Home');
  await uploadNewProfilePic(page, profilePicName);
  await validateProfilePicUpload(page, profilePicName);
  await uploadNewProfilePic(page, profilePicNameDefault);
  await validateProfilePicUpload(page, profilePicNameDefault);
});