import { Locator, Page } from "@playwright/test";
import { homePageLocators6PM } from "../searchResults6PM/searchResultsLocators";
import { basePage } from "../../POM/basePage";


export class homePage extends basePage {

    readonly searchField: Locator;
    readonly searchIcon: Locator;

constructor (page: Page) {
    super(page);
    this.searchField = page.locator(homePageLocators6PM.searchField);
    this.searchIcon = page.locator(homePageLocators6PM.searchIcon);

}

async doSearch(searchKey: string) {
    await this.searchField.fill(searchKey);
    await this.searchIcon.click();
}
}