import { Page, expect } from '@playwright/test'

export class LoginPage {
  constructor(private page: Page) {}

async open() {
  await this.page.goto('https://www.saucedemo.com')
}
  async login(username: string, password: string) {
    await this.page.locator('[data-test="username"]').fill(username)
    await this.page.locator('[data-test="password"]').fill(password)
    await this.page.locator('[data-test="login-button"]').click()
  }

  async expectLoggedIn() {
    await expect(this.page).toHaveURL(/inventory/)
    await expect(this.page.locator('[data-test="inventory-container"]')).toBeVisible()
  }

  async expectError(message: string) {
    await expect(this.page.locator('[data-test="error"]')).toContainText(message)
  }
}
