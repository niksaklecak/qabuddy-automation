import { type Page, type Locator } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('input[name="email"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.signInButton = page.locator('button[type="submit"]');
  }

  async goto() {
    await this.page.goto("/login");
  }

  async login(email: string, password?: string) {
    await this.emailInput.fill(email);
    if (password) {
      await this.passwordInput.fill(password);
    }
    await this.signInButton.click();
  }
}
