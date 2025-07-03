import { Locator, Page } from "@playwright/test";
import { basePage } from "../basePage";
import { homePageLocatorsSas } from "./homePageLocatorsSas";


export class homePage extends basePage {

    readonly searchField: Locator;
    readonly searchIcon: Locator;

constructor (page: Page) {
    super(page);
    this.searchField = page.locator(homePageLocatorsSas.searchField);
    this.searchIcon = page.locator(homePageLocatorsSas.searchIcon);

}

async doSearch(searchKey: string) {
    await this.searchField.fill(searchKey);
    await this.searchIcon.click();
}
}