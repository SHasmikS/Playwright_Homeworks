import { Locator, Page } from "@playwright/test";
import { basePage } from "../basePage";
import { homePageLocators } from "../homePage/homepageLocators";
import { searchResultsLocators } from "./searchResultsLocators";



export class searchResults extends basePage {

readonly product: Locator;
readonly productName: Locator;

constructor (page: Page) {
    super(page);
    this.product = page.locator(searchResultsLocators.product);
    this.productName = page.locator(searchResultsLocators.prouctName);

}

async selectNthProduct(index: number) {
  await this.product.nth(index).click();
}

async selectedProductName (name: string) {
   const productName = this.product.nth().locator('.product__name');
}
}