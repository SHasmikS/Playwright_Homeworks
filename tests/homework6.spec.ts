import { test, expect } from "@playwright/test";

//(1) Search with valid keyword
test("Valid keyword", async ({ page }) => {
  await page.goto("https://www.6pm.com/", { waitUntil: "load" });
  const search = page.locator("#searchAll");
  await search.fill("crocs kids");
  const link = page.getByRole("link", { name: "crocs kids" });
  await expect(link).toBeVisible();
  await link.click();

  const pageHeader = page.getByRole("heading", { name: "Crocs Kids" });
  await expect(pageHeader).toBeVisible({ timeout: 10000 });
});


//(2) Search with empty input
test("Empty input", async ({ page }) => {
  await page.goto("https://www.6pm.com/", { waitUntil: "load" });
  const search = page.locator("#searchAll");
  await search.press('Enter');

  const pageHeader = page.getByRole('heading', { name: 'Your search results' });
  await expect(pageHeader).toBeVisible({ timeout: 10000 });
});



//(3) Searching non existing product
test("Non-existing product", async ({ page }) => {
  await page.goto("https://www.6pm.com/", { waitUntil: "load" });
  const search = page.locator("#searchAll");

  await search.fill("hafksjfhksdjfh");
  await search.press('Enter');

  const pageHeader = page.getByText("Hmmm, we couldn’t find anything for", { exact: false });
  await expect(pageHeader).toBeVisible({ timeout: 10000 });
});


//(4) Searching with special characters
test("Including special characters", async ({ page }) => {
  await page.goto("https://www.6pm.com/", { waitUntil: "load" });
  const search = page.locator("#searchAll");

  await search.fill("cr**&&ocs");
  await search.press('Enter');

  const pageHeader = page.getByText("Hmmm, we couldn’t find anything for", { exact: false });
  await expect(pageHeader).toBeVisible({ timeout: 10000 });
});


//(5) Searching with nummbers only
test("Searching with numbers", async ({ page }) => {
  await page.goto("https://www.6pm.com/", { waitUntil: "load" });
  const search = page.locator("#searchAll");

  await search.fill("1503262222");
  await search.press('Enter');

  const pageHeader = page.getByText("Hmmm, we couldn’t find anything for", { exact: false });
  await expect(pageHeader).toBeVisible({ timeout: 10000 });
});


//(6) Searching with uppercase and lowercase letters
test("Uppercase and lowercase letters", async ({ page }) => {
  await page.goto("https://www.6pm.com/", { waitUntil: "load" });
  const search = page.locator("#searchAll");

  await search.fill("TRoUSers");
  await search.press('Enter');

  const pageHeader = page.getByRole('heading', { name: 'trousers' });
  await expect(pageHeader).toBeVisible({ timeout: 10000 });
});

//(7) Searching with spaces included
test("Searchign with spaces included", async ({ page }) => {
  await page.goto("https://www.6pm.com/", { waitUntil: "load" });
  const search = page.locator("#searchAll");

  await search.fill("tr  ou  ser  s");
  await search.press('Enter');

  const pageHeader = page.getByText("Hmmm, we couldn’t find anything for", { exact: false });
  await expect(pageHeader).toBeVisible({ timeout: 10000 });
});



//(7) Printing search results - price and name pairs

test("Printing price and name pairs", async ({ page }) => {
  await page.goto("https://www.6pm.com/", { waitUntil: "load" });

  // Search for products
  const search = page.locator("#searchAll");
  await search.fill("crocs kids");

  // Navigate to brand page
  const link = page.getByRole("link", { name: "crocs kids" });
  await expect(link).toBeVisible();
  await link.click();

  // Verify page loaded
  const pageHeader = page.getByRole("heading", { name: "Crocs Kids" });
  await expect(pageHeader).toBeVisible({ timeout: 10000 });

  // Wait for product cards to load
  const productCards = page.locator('a._Y-z');
  await expect(productCards.first()).toBeVisible();

  // Collect product data
  const count = await productCards.count();
  const productPairs: { productName: string; price: string }[] = [];

  for (let i = 0; i < count; i++) {
    const card = productCards.nth(i);

    // Get product name 
    const name = (await card.locator('dd.dZ-z').textContent()) ?? "Unknown Product";

    // Get product price 
    const price = (await card.locator('dd.d--z > span.c--z').first().textContent()) ?? "Price not available";

    productPairs.push({
      productName: name.trim(),
      price: price.trim(),
    });
  }
});