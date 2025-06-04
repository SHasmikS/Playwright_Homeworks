import { test, expect } from "@playwright/test";

test.beforeEach("Open start URL", async ({ page }) => {
  await page.goto("https://playground.testingart.com/", { waitUntil: "load" });
});

//Successful sign in
test("Successful sign in", async ({ page }) => {
  const email = process.env.LOGIN_EMAIL!;
  const password = process.env.LOGIN_PASSWORD!;
  await page.getByRole("textbox", { name: "Email Address" }).fill(email);
  await page.getByRole("textbox", { name: "Password" }).fill(password);
  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(page.getByText("Logout")).toBeVisible();
  await page.getByText("Logout").click();
});

//Email and password fields are empty
test("Empty email and password fields", async ({ page }) => {
  await page.getByRole("textbox", { name: "Email Address" }).click();
  await page.getByRole("textbox", { name: "Password" }).click();
  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(page.getByText("Invalid Email or Password")).toBeVisible();
});

//Valid email, empty password
test("Valid email/empty password", async ({ page }) => {
  const email = process.env.LOGIN_EMAIL!;
  await page.getByRole("textbox", { name: "Email Address" }).fill(email);
  await page.getByRole("textbox", { name: "Password" }).click();
  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(page.getByText("Invalid Email or Password")).toBeVisible();
});

//Empty email, valid password
test("Empty email, valid password", async ({ page }) => {
  const password = process.env.LOGIN_PASSWORD!;
  await page.getByRole("textbox", { name: "Email Address" }).click();
  await page.getByRole("textbox", { name: "Password" }).fill(password);
  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(page.getByText("Invalid Email or Password")).toBeVisible();
});

//Invalid email format
test("Invalid email format", async ({ page }) => {
  const password = process.env.LOGIN_PASSWORD!;
  const email = process.env.LOGIN_EMAIL!;
  const shortEmail = email.substring(0, 10);
  await page.getByRole("textbox", { name: "Email Address" }).fill(shortEmail);
  await page.getByRole("textbox", { name: "Password" }).fill(password);
  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(page.getByText("Invalid Email or Password")).toBeVisible();
});

//Valid email, wrong password
test("Valid email, wrong password", async ({ page }) => {
  const email = process.env.LOGIN_EMAIL!;
  const password = process.env.LOGIN_PASSWORD!;
  const shortPassword = password.substring(0, 8);
  await page.getByRole("textbox", { name: "Email Address" }).fill(email);
  await page.getByRole("textbox", { name: "Password" }).fill(shortPassword);
  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(page.getByText("Invalid Email or Password")).toBeVisible();
});

//Special characters in email
test("Special characters in email", async ({ page }) => {
  const email = process.env.LOGIN_EMAIL!;
  const password = process.env.LOGIN_PASSWORD!;
  const emailChar = email.replace("testingart", "testingart()");
  await page.getByRole("textbox", { name: "Email Address" }).fill(emailChar);
  await page.getByRole("textbox", { name: "Password" }).fill(password);
  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(page.getByText("Invalid Email or Password")).toBeVisible();
});

//Case sensitivity check for email address
test("Case sensitivity check", async ({ page }) => {
  const email = process.env.LOGIN_EMAIL!;
  const password = process.env.LOGIN_PASSWORD!;
  const emailUpperCase = email.charAt(0).toUpperCase() + email.slice(1);
  await page
    .getByRole("textbox", { name: "Email Address" })
    .fill(emailUpperCase);
  await page.getByRole("textbox", { name: "Password" }).fill(password);
  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(page.getByText("Logout")).toBeVisible();
  await page.getByText("Logout").click();
});

test.afterAll("Teardown", async () => {
  console.log("Done with tests");
});
