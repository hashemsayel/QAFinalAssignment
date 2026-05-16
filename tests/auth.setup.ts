import { test as setup } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'

setup('save authenticated state', async ({ page }) => {
  const loginPage = new LoginPage(page)

  await loginPage.open()

  await loginPage.login(
    process.env.SAUCE_USERNAME!,
    process.env.SAUCE_PASSWORD!
  )

  await loginPage.expectLoggedIn()

  await page.context().storageState({
    path: 'storage-state.json'
  })
})