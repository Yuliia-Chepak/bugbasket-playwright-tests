import { test, expect } from '@playwright/test';

test('search should display no results for a nonexistent product', async ({ page }) => {
    await page.goto('/');

    await page.getByPlaceholder('Search products').fill('xyznonexistentproduct12345');
    await page.getByTestId('header-search-btn').click();

    await expect(page.getByText('0 products', {exact: true})).toBeVisible();
    await expect(page.getByText('No products found')).toBeVisible();
    await expect(page.getByText('Try another search or reset the filters.')).toBeVisible();
    await expect(page.getByRole('link', {name: 'Aurora Desk Lamp'})).toHaveCount(0);
});
