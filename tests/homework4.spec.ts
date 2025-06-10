import { test, expect } from "@playwright/test";

test.beforeEach("Open start URL", async ({ page }) => {
  await page.goto("https://www.zigzag.am/en/", { waitUntil: "load" });
});

test("Compare the product price", async ({ page }) => {
  const search = page.locator("#search");
  await search.fill("Samsung washing machine");
  await search.press("Enter");
  await page.waitForSelector(".block_inner.product-item-details");
  const productCard = page
    .locator(".block_inner.product-item-details")
    .filter({ hasText: "Samsung WW80AGAS21AXLP" });
  const priceOnCardText = await productCard
    .locator(".product_price #product-price-42671")
    .innerText();
  const priceOnCard = Number(priceOnCardText);
  await productCard.click();
  await page.waitForSelector("#product-price-42671 .price");
  const priceOnDetailPageText = await page
    .locator("#product-price-42671 .price")
    .innerText();
  const priceOnDetailPage = Number(priceOnDetailPageText);
  expect(priceOnCard).toBe(priceOnDetailPage);
});

test("Add item to the cart", async ({ page }) => {

  const search = page.locator("#search");
  await search.fill("Samsung washing machine");
  await search.press("Enter");

  await page.waitForSelector(".block_inner.product-item-details");

  const productCard = page
    .locator(".block_inner.product-item-details")
    .filter({ hasText: "Samsung WW80AGAS21AXLP" });
  await productCard.click();

  const productName = await page
    .locator('div[data-dynamic="name"].value')
    .first()
    .innerText();

  const addToCart = page.locator("#product-addtocart-button");
  await addToCart.click();

  const cartButton = page.locator(".basket_block .basket_btn");
  await cartButton.click();

  const basketModal = page.locator(".mpquickcart-block");
  await expect(basketModal).toBeVisible();

  await expect(basketModal).toContainText(productName.trim());
});
