import { test, expect } from "@playwright/test";
import { HomePage } from "../POM/homePage/homepagePOM";
import { basePage } from "../POM/basePage";

test("Search with valid keyword", async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.goto("https://www.6pm.com");
  await homePage.searchFor("crocs kids");
  const pageHeader = page.getByRole("heading", { name: "Crocs Kids" });
  await expect(pageHeader).toBeVisible({ timeout: 10000 });
});
