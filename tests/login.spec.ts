import { test, expect } from "./fixtures/qabuddy-test";

test("user can log in successfully", async ({ loginPage, page }) => {
  await loginPage.goto();
  await loginPage.login(
    process.env.TEST_USER_EMAIL!,
    process.env.TEST_USER_PASSWORD!
  );
  await expect(page).toHaveURL(/.*dashboard/);
});
