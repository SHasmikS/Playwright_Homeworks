import { Locator, Page } from "@playwright/test";
import { homePageLocators } from "./homepageLocators";
import { basePage } from "../basePage";



export class HomePage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  get searchInput(): Locator {
    return this.page.locator(homePageLocators.searchInputField);
  }

  getSearchSuggestionLink(keyword: string): Locator {
    return this.page.getByRole('link', { name: keyword });
  }

  
  async searchFor(term: string) {
    await this.searchInput.fill(term);
    const suggestion = this.getSearchSuggestionLink(term);
    await suggestion.click();
  }
}
