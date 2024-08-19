import { expect, test } from '@playwright/test'

test('sign up successfully', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page.getByLabel('Nome do estabelecimento').fill('Quad Mock')
  await page.getByLabel('Nome do Responsável').fill('Moacir Gama')
  await page.getByLabel('Seu e-mail').fill('quad@mock.com')
  await page.getByLabel('Seu celular').fill('123812641264')

  await page.getByRole('button', { name: 'Finalizar cadastro' }).click()

  const toast = page.getByText('Cadastro Realizado com Sucesso')

  await expect(toast).toBeVisible()
})

test('sign up with error', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page.getByLabel('Nome do estabelecimento').fill('Invalid Name')
  await page.getByLabel('Nome do Responsável').fill('Moacir Gama')
  await page.getByLabel('Seu e-mail').fill('quad@mock.com')
  await page.getByLabel('Seu celular').fill('123812641264')

  await page.getByRole('button', { name: 'Finalizar cadastro' }).click()

  const toast = page.getByText('Erro ao cadastrar estabelecimento.')

  await expect(toast).toBeVisible()
})

test('navigate to login page', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page.getByRole('link', { name: 'Fazer login' }).click()

  expect(page.url()).toContain('/sign-in')
})
