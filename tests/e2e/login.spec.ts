import { qabuddyTest, expect } from "../fixtures/qabuddy-test";
import { LoginPage } from "../../pages/LoginPage";

qabuddyTest("user can log in successfully", async ({ authenticatedPage }) => {
  const loginPage = new LoginPage(authenticatedPage);
  await loginPage.goto();
  await loginPage.login(
    process.env.TEST_USER_EMAIL!,
    process.env.TEST_USER_PASSWORD!
  );
  await expect(authenticatedPage).toHaveURL(/.*dashboard/);
});
