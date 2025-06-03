import { test, expect } from '@playwright/test';

//Successful sign in
test('Successful sign in', async ({ page }) => {
  await page.goto('https://playground.testingart.com/', { waitUntil: 'load' });
  await page.getByRole('textbox', { name: 'Email Address' }).fill('testingart@email.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('Testing!123');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page.getByText("Logout")).toBeVisible();
  await page.getByText("Logout").click();
  });

  
  
  //Email and password fields are empty
  test('Empty email and password fields', async ({ page }) => {
  await page.goto('https://playground.testingart.com/', { waitUntil: 'load' });
  await page.getByRole('textbox', { name: 'Email Address' }).click();
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page.getByText("Invalid Email or Password")).toBeVisible();
  });


  //Valid email, empty password
  test('Valid email/empty password', async ({ page }) => {
  await page.goto('https://playground.testingart.com/', { waitUntil: 'load' });
  await page.getByRole('textbox', { name: 'Email Address' }).fill('testingart@email.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page.getByText("Invalid Email or Password")).toBeVisible();
  });


  //Empty email, valid password
  test('Empty email, valid password', async ({ page }) => {
  await page.goto('https://playground.testingart.com/', { waitUntil: 'load' });
  await page.getByRole('textbox', { name: 'Email Address' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Testing!123');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page.getByText("Invalid Email or Password")).toBeVisible();
  });


  //Invalid email format
  test('Invalid email format', async ({ page }) => {
  await page.goto('https://playground.testingart.com/', { waitUntil: 'load' });
  await page.getByRole('textbox', { name: 'Email Address' }).fill('testingartemail.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('Testing!123');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page.getByText("Invalid Email or Password")).toBeVisible();
  });


  //Valid email, wrong password
  test('Valid email, wrong password', async ({ page }) => {
  await page.goto('https://playground.testingart.com/', { waitUntil: 'load' });
  await page.getByRole('textbox', { name: 'Email Address' }).fill('testingart@email.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('Testing!12');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page.getByText("Invalid Email or Password")).toBeVisible();
  });


  //Special characters in email
  test('Special characters in email', async ({ page }) => {
  await page.goto('https://playground.testingart.com/', { waitUntil: 'load' });
  await page.getByRole('textbox', { name: 'Email Address' }).fill('testingart()@email.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('Testing!123');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page.getByText("Invalid Email or Password")).toBeVisible();
  });

  //Case sensitivity check for email address
  test('Case sensitivity check', async ({ page }) => {
  await page.goto('https://playground.testingart.com/', { waitUntil: 'load' });
  await page.getByRole('textbox', { name: 'Email Address' }).fill('Testingart@email.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('Testing!123');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page.getByText("Logout")).toBeVisible();
  await page.getByText("Logout").click();
  });