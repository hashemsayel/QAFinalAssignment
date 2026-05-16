import { test } from '@playwright/test'
import { InventoryPage } from '../pages/InventoryPage'
import { CartPage } from '../pages/CartPage'
import { CheckoutPage } from '../pages/CheckoutPage'
import { items } from '../fixtures/items'

test.describe('Checkout feature', () => {
  test.beforeEach(async ({ page }) => {
    await new InventoryPage(page).open()
  })

  test('checkout with one item', async ({ page }) => {
    const inventoryPage = new InventoryPage(page)
    const cartPage = new CartPage(page)
    const checkoutPage = new CheckoutPage(page)
    const selectedItems = [items.backpack]
    await inventoryPage.addItem(selectedItems[0])
    await inventoryPage.openCart()
    await cartPage.checkout()
    await checkoutPage.fillInformation(process.env.FIRST_NAME!, process.env.LAST_NAME!, process.env.POSTAL_CODE!)
    await checkoutPage.expectOverviewItems(selectedItems)
    await checkoutPage.finish()
    await checkoutPage.expectComplete()
  })

  test('checkout with multiple items', async ({ page }) => {
    const inventoryPage = new InventoryPage(page)
    const cartPage = new CartPage(page)
    const checkoutPage = new CheckoutPage(page)
    const selectedItems = [items.backpack, items.bikeLight, items.fleeceJacket]
    for (const item of selectedItems) {
      await inventoryPage.addItem(item)
    }
    await inventoryPage.openCart()
    await cartPage.checkout()
    await checkoutPage.fillInformation(process.env.FIRST_NAME!, process.env.LAST_NAME!, process.env.POSTAL_CODE!)
    await checkoutPage.expectOverviewItems(selectedItems)
    await checkoutPage.finish()
    await checkoutPage.expectComplete()
  })
})
