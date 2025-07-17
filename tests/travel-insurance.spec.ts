import { test, expect } from '@playwright/test';
import travelPlansMock from '../mocks/travel-plans.json';


test('Mock travel plans API', async ({ page }) => {
  await page.route('**/api/v1/contracts/travel/plans?age=37&destinations=134', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(travelPlansMock),
    });
  });

  await page.goto('https://online.efes.am/');

  await expect(page.getByText(travelPlansMock[0].planName)).toBeVisible();
});