import { test, expect } from "@playwright/test";

test("Item checkout", async ({ page }) => {
  //(1) Մուտք գործել "zigzag am"
  await page.goto("https://www.zigzag.am/am/", { waitUntil: "load" });

  //(2) Անցնել ըստ ցանկության թաբ
  await page.getByRole("link", { name: "Կենցաղային տեխնիկա" }).hover();
  const dryersLink = page.locator("a", {
    hasText: "Չորանոցներ և չորացման պարագաներ",
  });
  await expect.soft(dryersLink).toBeVisible();
  await dryersLink.click();

  //(3) Ընտրել որևէ ապրանք, վերագրել փոփոխականի ապրանքի անունը
  const product = page.locator(".product-item-details", {
    hasText: "Cecotec 05355 Ready Warm 9790",
  });
  await expect(product).toBeVisible();
  await product.hover();
  const productElement = product.locator("a.product_name.combo_link");
  const productName = await productElement.first().innerText();

  //(4) Վերագրել փոփոխականներին ապրանքի գինը
  const priceLocator = page.locator("#product-price-42921");
  const productPrice = await priceLocator.innerText();

  //(5) Ավելացնել զամբյուղում
  const addToCartButton = product.locator("button", { hasText: "Ավելացնել" });
  await expect(addToCartButton).toBeVisible();
  await addToCartButton.click();

  // (6) Ստուգել, որ ավելացել է զամբյուղում
  const basketModal = page.locator(".mpquickcart-block");
  await expect(basketModal).toBeVisible();

  //(7) Ստուգել զամբյուզում ապրանքի անունը և գումարը  (Soft Assertion)
  const cartProductNameElement = basketModal.locator(".product-item-name a");
  const cartProductName = await cartProductNameElement.innerText();
  const cartProductPriceElement = basketModal.locator(
    ".price-excluding-tax .price"
  );
  const cartProductPrice = await cartProductPriceElement.innerText();

  expect.soft(cartProductName).toBe(productName);
  expect.soft(cartProductPrice).toBe(productPrice);

  await page.getByRole("button", { name: "Close" }).click();

  await page.getByRole("link", { name: "Խոհանոցային տեխնիկա" }).click();

  // (9) Ընտրել որևէ ապրանք, վերագրել փոփոխականի ապրանքի անունը
  const productBlock2 = page.locator(".product-item-details", {
    hasText: "Teka HSB 630 BLACK",
  });
  await expect(productBlock2).toBeVisible();
  await productBlock2.hover();

  const productName2 = await productBlock2
    .locator("a.product_name.combo_link")
    .innerText();

  // (10) Վերագրել փոփոխականներին ապրանքի գինը
  const priceLocator2 = productBlock2.locator('[id^="product-price"] .price');
  const productPrice2 = await priceLocator2.innerText();

  // (11) Ավելացնել զամբյուղում
  const addToCartButton2 = productBlock2.locator("button", {
    hasText: "Ավելացնել",
  });
  await expect(addToCartButton2).toBeVisible();
  await addToCartButton2.click();

  // (12) Ստուգել զամբյուղում ապրանքի անունը և գումարը (Soft Assertion)

  const cartProductNameElement2 = basketModal.locator(".product-item-name a", {
    hasText: "Teka HSB 630 BLACK",
  });
  const cartProductName2 = await cartProductNameElement2.innerText();

  const cartProductPriceElement2 = basketModal
    .locator(".price-excluding-tax .price")
    .first();
  const cartProductPrice2 = await cartProductPriceElement2.innerText();

  expect.soft(cartProductName2).toBe(productName2);
  expect.soft(cartProductPrice2).toBe(productPrice2);

  //(13) Ստուգել զամբյուղում 2 ապրանքների ընդհանուր գումարը
  const numProductPrice = parseInt(cartProductPrice.replace(/[^\d]/g, ""));
  const numProductPrice2 = parseInt(cartProductPrice2.replace(/[^\d]/g, ""));
  const totalProductPrice = numProductPrice + numProductPrice2;
  const cartTotalPrice = await basketModal
    .locator(".totals")
    .filter({ hasText: "Ընդհանուր" })
    .locator(".price")
    .innerText();

  const numCartTotalPrice = parseInt(cartTotalPrice.replace(/[^\d]/g, ""));

  expect.soft(numCartTotalPrice).toBe(totalProductPrice);

  //(14) Կատարել "Պատվիրել" գործողությունը
  await page.locator("#top-cart-btn-checkout").click();

  const orderSummaryTitle = page.getByText("Պատվերի ամփոփում", { exact: true });
  expect.soft(orderSummaryTitle).toBeVisible;

  //(15) Լրացնել առաքման հասցեի բոլոր դաշտերը
  const emailField = page.locator("#customer-email").first();
  await expect.soft(emailField).toBeVisible();
  await emailField.fill("test@yopmail.com");

  const addressForm = page.locator("#shipping-new-address-form");
  expect.soft(addressForm.locator("#ctype_1")).toBeChecked;

  const firstNameField = addressForm.locator('input[name="firstname"]');
  expect.soft(firstNameField).toBeVisible;
  await firstNameField.fill("Hasmik");

  const lastNameField = addressForm.locator('input[name="lastname"]');
  expect.soft(lastNameField).toBeVisible;
  await lastNameField.fill("Sukiasyan");

  const countryField = addressForm.locator(".filter-option-inner-inner", {
    hasText: "Հայաստան",
  });
  await expect.soft(countryField).toBeVisible();

  const provinceField = addressForm.locator(".filter-option-inner-inner", {
    hasText: "Խնդրում ենք ընտրել մարզ",
  });
  await provinceField.click();

  const provinceYerevan = addressForm.locator('.dropdown-menu.inner.show').locator('li').filter({ hasText: 'Երևան' });
  await provinceYerevan.click();

  const selectedProvince = addressForm.locator(".filter-option-inner-inner", {
    hasText: "Երևան",
  });
  await expect.soft(selectedProvince).toBeVisible();

  const cityField = addressForm.locatorpage.locator('.dropdown-menu.inner.show').locator('li').filter({ hasText: 'Երևան' });
  expect.soft(cityField).toBeVisible;

  const addressField = addressForm.locator('input[name="street[0]"]');
  await addressField.fill("Բաշինջաղյան");
  expect.soft(addressField).toBeVisible;

  const telephoneField = addressForm.locator("#telephone_fake");
  expect(telephoneField).toBeVisible;
  await telephoneField.fill("441203655");

  const birthDayField = addressForm.locator(".filter-option-inner-inner", {
    hasText: "Օր",
  });
  await birthDayField.click();
  const dayOption = page.locator(".dropdown-menu.show li", { hasText: "12" });
  expect(dayOption).toBeVisible();
  await dayOption.click();

  const birthMonthField = addressForm.locator(".filter-option-inner-inner", {
    hasText: "Ամիս",
  });
  await birthMonthField.click();
  const septemberOption = page.locator('.dropdown-menu.show').locator('li').filter({ hasText: '9' }).nth(1);
  await expect(septemberOption).toBeVisible();
  await septemberOption.click();

  const birthYearField = addressForm.locator(".filter-option-inner-inner", {
    hasText: "տարի",
  });
  await birthYearField.click();
  const yearOption = page.locator(".dropdown-menu.show li", {
    hasText: "1992",
  });
  await expect(yearOption).toBeVisible();
  await yearOption.click();

  const deliveryOption = page.locator(
    "#label_method_matrixrate_215711_matrixrate"
  );
  await deliveryOption.check();
  await expect.soft(deliveryOption).toBeChecked();

  const paymentOption = page.locator("#cashondelivery");
  expect(paymentOption).toBeChecked;

  //await page.locator('.checkout_submit').first().click();
});



test("Sort by price", async ({ page }) => {
  await page.goto('https://zigzag.am');
  
 // Fill and submit search 
  const search = page.locator("#search");
  await search.fill("AirPods");
  await search.press("Enter");
  
  // Wait for the search results
  const searchResultTitle = page.getByText('Search results for " AirPods"', { exact: true });
  expect(searchResultTitle).toBeVisible;

  // Sort the page
  const sortingItems = page.locator('.filter-option-inner-inner', { hasText: 'Դասավորել ըստ' });
  await sortingItems.click();
  const sortingDropdown = page.locator('.dropdown-menu.show').locator('text=Գնի աճման');
  await sortingDropdown.click();
  
  //Take all the current prices
  const priceLocator = page.locator('span.price');

  //Wait for the first element to be visible
  await expect(priceLocator.first()).toBeVisible();

  //Elements count
 const count = await priceLocator.count();
let arr: number[] = [];

// Adding elements in the array
for (let i = 0; i < count; i++) {
  const singlePrice = priceLocator.nth(i);
  const priceText = await singlePrice.textContent();
  const numericPrice = parseFloat(priceText!.replace(/[^\d.,]/g, '').replace(',', '.'));
  arr.push(numericPrice);
}
console.log(arr)
});
