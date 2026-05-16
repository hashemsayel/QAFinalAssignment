import { Page, expect } from '@playwright/test'

export class InventoryPage {
  constructor(private page: Page) {}

  async open() {
    await this.page.goto('/inventory.html')
  }

  itemName(name: string) {
    return this.page.locator('.inventory_item').filter({ hasText: name }).locator('.inventory_item_name')
  }

  async addItem(name: string) {
    await this.page.locator('.inventory_item').filter({ hasText: name }).getByRole('button', { name: 'Add to cart' }).click()
  }

  async removeItem(name: string) {
    await this.page.locator('.inventory_item').filter({ hasText: name }).getByRole('button', { name: 'Remove' }).click()
  }

  async openCart() {
    await this.page.locator('[data-test="shopping-cart-link"]').click()
  }

  async sortBy(value: string) {
    await this.page.locator('[data-test="product-sort-container"]').selectOption(value)
  }

  async expectCartCount(count: number) {
    if (count === 0) {
      await expect(this.page.locator('[data-test="shopping-cart-badge"]')).toHaveCount(0)
      return
    }
    await expect(this.page.locator('[data-test="shopping-cart-badge"]')).toHaveText(String(count))
  }

  async getNames() {
    return this.page.locator('.inventory_item_name').allTextContents()
  }

  async getPrices() {
    const prices = await this.page.locator('.inventory_item_price').allTextContents()
    return prices.map(price => Number(price.replace('$', '')))
  }
}
