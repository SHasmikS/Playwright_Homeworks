import { test, expect } from "@playwright/test";

test("Item checkout", async ({ page }) => {
    //(1) Մուտք գործել "zigzag am"
  await page.goto("https://www.zigzag.am/am/", { waitUntil: "load" });

  

  //(2) Անցնել ըստ ցանկության թաբ
 await page.getByRole('link', { name: 'Կենցաղային տեխնիկա' }).hover();
 const dryersLink = page.locator('a', { hasText: 'Չորանոցներ և չորացման պարագաներ' });
  await expect.soft(dryersLink).toBeVisible();
await dryersLink.click();
 
//(3) Ընտրել որևէ ապրանք, վերագրել փոփոխականի ապրանքի անունը
const product = page.locator('.product-item-details', { hasText: 'Cecotec 05355 Ready Warm 9790' });
  await expect(product).toBeVisible();
  await product.hover();
  const productElement = product.locator('a.product_name.combo_link');
  const productName = await productElement.first().innerText();



//(4) Վերագրել փոփոխականներին ապրանքի գինը
const priceLocator = page.locator('#product-price-42921');
    const productPrice = await priceLocator.innerText();

  //(5) Ավելացնել զամբյուղում
const addToCartButton = product.locator('button', { hasText: 'Ավելացնել' });
  await expect(addToCartButton).toBeVisible();
  await addToCartButton.click();

  // (6) Ստուգել, որ ավելացել է զամբյուղում
  const basketModal = page.locator(".mpquickcart-block");
    await expect(basketModal).toBeVisible();

//(7) Ստուգել զամբյուզում ապրանքի անունը և գումարը  (Soft Assertion)
 const cartProductNameElement = basketModal.locator('.product-item-name a');
 const cartProductName = await cartProductNameElement.innerText();
 const cartProductPriceElement = basketModal.locator('.price-excluding-tax .price');
const cartProductPrice = await cartProductPriceElement.innerText();

expect.soft(cartProductName).toBe(productName);
expect.soft(cartProductPrice).toBe(productPrice);

await page.getByRole('button', { name: 'Close' }).click();

//(8)  Անցնել ուրիշ "ըստ ցանկության" tab
await page.getByRole('link', { name: 'Խոհանոցային տեխնիկա' }).click();

// (9) Ընտրել որևէ ապրանք, վերագրել փոփոխականի ապրանքի անունը
const product2 = page.locator('.product_name.combo_link', { hasText: 'Teka HSB 630 BLACK' });
  await expect(product2).toBeVisible();
  const productName2 = product2.innerText();
  await product2.hover();

  // (10) Վերագրել փոփոխականներին ապրանքի գինը
  const priceLocator2 = page.locator('#product-price-44963 .price');
    const productPrice2 = await priceLocator2.innerText();


// (11) Ավելացնել զամբյուղում
const addToCartButton2 = product2.getByRole('button', { name: 'Ավելացնել' });
  await expect(addToCartButton2).toBeVisible();
  await addToCartButton2.click();

  //(12) Ստուգել զամբյուղում ապրանքի անունը և գումարը (Soft Assertion)
const cartProductNameElement2 = basketModal.locator('.product-item-name a');
 const cartProductName2 = await cartProductNameElement2.innerText();
 const cartProductPriceElement2 = basketModal.locator('.price-excluding-tax .price');
const cartProductPrice2 = await cartProductPriceElement2.innerText();

expect.soft(cartProductName2).toBe(productName2);
expect.soft(cartProductPrice2).toBe(productPrice2);




});

