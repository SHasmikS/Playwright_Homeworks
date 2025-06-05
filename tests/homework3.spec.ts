import { test, expect } from '@playwright/test';

test('Find the product', async ({ page }) => {
  await page.goto('https://www.zigzag.am/en/', { waitUntil: 'load' });
  await page.locator('#search').fill('Samsung washing machine');
  await page.locator('#search').press('Enter');
  await page.waitForSelector(".block_inner.product-item-details");
  await page.locator('.block_inner.product-item-details')
           .filter({ hasText: 'Samsung WW80AGAS21AXLP' })
           .click();
  });


test.only('Compare the product', async ({ page }) => {
  await page.goto('https://www.zigzag.am/en/', { waitUntil: 'load' });
  await page.locator('#search').fill('Samsung washing machine');
  await page.locator('#search').press('Enter');
  await page.waitForSelector('.block_inner.product-item-details');

  // Filter product card by text
  const productCard = page.locator('.block_inner.product-item-details')
    .filter({ hasText: 'Samsung WW80AGAS21AXLP' });
  await expect(productCard).toBeVisible();

  // Get the product name text via XPath inside productCard
  const nameFromCard = await productCard.locator('xpath=//*[@id="product-item-info_42671"]/div/div[2]/a[1]').innerText();

  // Click the product card to go to detail page
  await productCard.click();

  // Wait for navigation or detail page to load
  await page.waitForLoadState('load');

  // Locate the product name on detail page and assert it contains nameFromCard
  const nameOnDetailPage = page.locator('[data-dynamic="name"]');
  await expect(nameOnDetailPage).toContainText(nameFromCard);
});