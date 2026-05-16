import { test } from '@playwright/test'
import { InventoryPage } from '../pages/InventoryPage'
import { CartPage } from '../pages/CartPage'
import { items } from '../fixtures/items'

test.describe('Add to cart feature', () => {
  test.beforeEach(async ({ page }) => {
    await new InventoryPage(page).open()
  })

  test('add one item and check it in cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page)
    const cartPage = new CartPage(page)
    await inventoryPage.addItem(items.backpack)
    await inventoryPage.expectCartCount(1)
    await inventoryPage.openCart()
    await cartPage.expectItem(items.backpack)
    await cartPage.expectItemCount(1)
  })

  test('add multiple items and check them in cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page)
    const cartPage = new CartPage(page)
    const selectedItems = [items.backpack, items.bikeLight, items.boltShirt]
    for (const item of selectedItems) {
      await inventoryPage.addItem(item)
    }
    await inventoryPage.expectCartCount(selectedItems.length)
    await inventoryPage.openCart()
    await cartPage.expectItems(selectedItems)
    await cartPage.expectItemCount(selectedItems.length)
  })
})
