import { test as setup } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'

setup('save authenticated state', async ({ page }) => {
  const loginPage = new LoginPage(page)

  await loginPage.open()

  await loginPage.login(
    'standard_user',
    'secret_sauce'
  )

  await loginPage.expectLoggedIn()

  await page.context().storageState({
    path: 'storage-state.json'
  })
})