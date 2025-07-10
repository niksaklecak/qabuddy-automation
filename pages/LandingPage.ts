import { type Page, type Locator } from "@playwright/test";

export class LandingPage {
  readonly page: Page;
  readonly loginIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginIcon = page.locator('button[type="submit"]');
  }

  async goto() {
    await this.page.goto("/");
  }

  async login() {
    await this.loginIcon.click();
  }
}
