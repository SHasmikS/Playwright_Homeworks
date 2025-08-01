import { test, expect } from '@playwright/test';
import { homePage } from '../POM/homePage/homePagePOM';
import { SearchResultsPage } from '../POM/searchResults/searchResultsPOM';

test.describe('Home Page Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.6pm.com/", { waitUntil: "load" });
  });

  test('User can search for an item and view results', async ({ page }) => {
    const homepage = new homePage(page);
    const searchResultsPage = new SearchResultsPage(page);

    const searchKeyword = 'crocs kids';
    await homepage.doSearch(searchKeyword);
    const headerText = await searchResultsPage.getPageHeaderText();
    expect(headerText).toContain('crocs kids');
  });


  test ('No results message appears for invalid searches', async ({page}) =>{
     const homepage = new homePage(page);
    const searchResultsPage = new SearchResultsPage(page);

    const searchKeyword = 'hsjkhjjkh';
    await homepage.search(searchKeyword);
    const headerText = await searchResultsPage.getInvalidItemPageHeaderText();
    expect(headerText).toContain('Hmmm, we couldn’t find anything for');

  });
});