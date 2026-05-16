import { test } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'

test.describe('Login feature', () => {
  test.use({ storageState: { cookies: [], origins: [] } })

  test.beforeEach(async ({ page }) => {
    await new LoginPage(page).open()
  })

  test('valid user can login', async ({ page }) => {
    const loginPage = new LoginPage(page)

    await loginPage.login(
      process.env.SAUCE_USERNAME!,
      process.env.SAUCE_PASSWORD!
    )

    await loginPage.expectLoggedIn()
  })

  const invalidCases = [
    {
      username: 'wrong_user',
      password: 'secret_sauce',
      error: 'Username and password do not match'
    },
    {
      username: 'standard_user',
      password: 'wrong_password',
      error: 'Username and password do not match'
    },
    {
      username: '',
      password: 'secret_sauce',
      error: 'Username is required'
    },
    {
      username: 'standard_user',
      password: '',
      error: 'Password is required'
    }
  ]

  for (const data of invalidCases) {
    test(
      `cannot login with ${data.username || 'empty username'} and ${data.password || 'empty password'}`,
      async ({ page }) => {
        const loginPage = new LoginPage(page)

        await loginPage.login(data.username, data.password)

        await loginPage.expectError(data.error)
      }
    )
  }
})