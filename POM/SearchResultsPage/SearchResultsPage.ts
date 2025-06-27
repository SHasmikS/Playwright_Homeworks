import { Locator, Page } from '@playwright/test';

export class SearchResultsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  getPageHeader(term: string): Locator {
    return this.page.getByRole('heading', { name: term });
  }
}