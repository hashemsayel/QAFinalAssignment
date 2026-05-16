import { test, expect } from '@playwright/test'
import { InventoryPage } from '../pages/InventoryPage'

test.describe('Sort feature', () => {
  test.beforeEach(async ({ page }) => {
    await new InventoryPage(page).open()
  })

  test('sort items from A to Z', async ({ page }) => {
    const inventoryPage = new InventoryPage(page)
    await inventoryPage.sortBy('az')
    const names = await inventoryPage.getNames()
    const sortedNames = [...names].sort((a, b) => a.localeCompare(b))
    expect(names).toEqual(sortedNames)
  })

  test('sort items by price from high to low', async ({ page }) => {
    const inventoryPage = new InventoryPage(page)
    await inventoryPage.sortBy('hilo')
    const prices = await inventoryPage.getPrices()
    const sortedPrices = [...prices].sort((a, b) => b - a)
    expect(prices).toEqual(sortedPrices)
  })
})
