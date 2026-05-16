import { test } from '@playwright/test'
import { InventoryPage } from '../pages/InventoryPage'
import { CartPage } from '../pages/CartPage'
import { items } from '../fixtures/items'

test.describe('Remove from cart feature', () => {
  test.beforeEach(async ({ page }) => {
    await new InventoryPage(page).open()
  })

  test('add one item, check cart, remove it and verify zero', async ({ page }) => {
    const inventoryPage = new InventoryPage(page)
    const cartPage = new CartPage(page)
    await inventoryPage.addItem(items.backpack)
    await inventoryPage.openCart()
    await cartPage.expectItem(items.backpack)
    await cartPage.removeItem(items.backpack)
    await cartPage.expectItemCount(0)
  })

  test('add multiple items, remove one by one and verify cart status', async ({ page }) => {
    const inventoryPage = new InventoryPage(page)
    const cartPage = new CartPage(page)
    const selectedItems = [items.backpack, items.bikeLight]
    for (const item of selectedItems) {
      await inventoryPage.addItem(item)
    }
    await inventoryPage.expectCartCount(2)
    await inventoryPage.openCart()
    await cartPage.removeItem(items.backpack)
    await cartPage.expectItem(items.bikeLight)
    await cartPage.expectItemCount(1)
    await cartPage.removeItem(items.bikeLight)
    await cartPage.expectItemCount(0)
  })
})
