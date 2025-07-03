import { test, expect } from "@playwright/test";




test("Valid keyword", async ({ page }) => {
   await page.goto('https://www.sas.am/');
   const searchBox = page.locator('.search__input');
   const searchBtn = page.locator('.search__btn');
   await searchBox.fill('ararat');
   await searchBtn.click();
  
 

  



});
