import { test, expect } from "@playwright/test";

test("Find the product", async ({ page }) => {
  await page.goto("https://www.zigzag.am/en/", { waitUntil: "load" });
  await page.locator("#search").fill("Samsung washing machine");
  await page.locator("#search").press("Enter");
  await page.waitForSelector(".block_inner.product-item-details");
  await page
    .locator(".block_inner.product-item-details")
    .filter({ hasText: "Samsung WW80AGAS21AXLP" })
    .click();
});

test("Compare the product", async ({ page }) => {
  await page.goto("https://www.zigzag.am/en/", { waitUntil: "load" });
  await page.locator("#search").fill("Samsung washing machine");
  await page.locator("#search").press("Enter");
  await page.waitForSelector(".block_inner.product-item-details");

  const productCard = page
    .locator(".block_inner.product-item-details")
    .filter({ hasText: "Samsung WW80AGAS21AXLP" });
  await expect(productCard).toBeVisible();
  const nameFromCard = await productCard
    .getByRole("link", { name: "Samsung WW80AGAS21AXLP" })
    .first()
    .innerText();
  await productCard.click();
  await page.waitForLoadState("domcontentloaded");
  const nameOnDetailPage = page.locator('[data-dynamic="name"]');
  await expect(nameOnDetailPage).toContainText(nameFromCard);
});
