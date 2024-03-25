import { Page } from '@playwright/test';
const xpaths = require('./xpaths');

export const searchArt = async (page:Page, searchObject) => {

}

export const addXAdultTicket = async (page:Page, anzahlTicket) => {
    anzahlTicket = anzahlTicket-1;
    for(let i = 0; i <= anzahlTicket; ++i){
        await page.locator(xpaths.add_adult_ticket_button).click();
    }
    await page.locator(xpaths.continue_Button_TicketShop).click();
}

export const fillInPersonalDetail = async (page:Page) => {
  await page.locator(xpaths.input_FirstName_TicketForm).fill('Guenter');
  await page.locator(xpaths.input_LastName_TicketForm).fill('Jauch');
  await page.locator(xpaths.input_Email_TicketForm).fill('guenter.jauch@yopmail.com');
  await page.locator(xpaths.input_Email_Conf_TicketForm).fill('guenter.jauch@yopmail.com');
  await page.locator(xpaths.checkBox_Terms_Conditions).click({ position: { x: 0, y: 0 } });
}

export const selectNextAvailableTime = async (page:Page) => {
  let elementFound: boolean = false;
  let timeslot = 0;
  while (!elementFound) {
    const elements = await page.$$("//input[not(@disabled) and @id='block-time-option-"+timeslot+"']/following-sibling::label[1]");
    if (elements.length > 0) {
        // await page.screenshot({ path: 'screenshot.png', fullPage: true });
        await page.locator("//input[not(@disabled) and @id='block-time-option-"+timeslot+"']/following-sibling::label[1]").click();
        elementFound = true;
        await console.log(timeslot);
    }
    timeslot++;
  }
}