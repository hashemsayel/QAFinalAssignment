import { Page, expect } from '@playwright/test'

export class CartPage {
  constructor(private page: Page) {}

  async expectItem(name: string) {
    await expect(this.page.locator('.cart_item').filter({ hasText: name })).toBeVisible()
  }

  async expectItems(names: string[]) {
    for (const name of names) {
      await this.expectItem(name)
    }
  }

  async expectItemCount(count: number) {
    await expect(this.page.locator('.cart_item')).toHaveCount(count)
  }

  async removeItem(name: string) {
    await this.page.locator('.cart_item').filter({ hasText: name }).getByRole('button', { name: 'Remove' }).click()
  }

  async checkout() {
    await this.page.locator('[data-test="checkout"]').click()
  }
}
