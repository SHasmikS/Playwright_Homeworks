import { test, expect } from "@playwright/test";
import { HomePage } from "../POM/homePage/homepagePOM";
import { SearchResultsPage } from "../POM/SearchResultsPage";

test("Search with valid keyword", async ({ page }) => {
  const homePage = new HomePage(page);
  const searchResults = new SearchResultsPage(page);

  await homePage.goto("https://www.6pm.com");
  await homePage.searchFor("crocs kids");
  const header = searchResults.getPageHeader('Crocs Kids');
  await expect(header).toBeVisible({ timeout: 10000 });
});
