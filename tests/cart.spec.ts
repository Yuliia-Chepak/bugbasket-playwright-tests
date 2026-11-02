
import {test, expect} from '@playwright/test';

test('user should be able to log in with a demo account', async ({page}) => {
    await page.goto('/login');
    await page.getByLabel('Email').fill(process.env.TEST_EMAIL!);
    await page.getByLabel('Password').fill(process.env.TEST_PASSWORD!);
    await page.getByRole('button', {name: 'Log in'}).click();
    await expect(page.getByRole('button', {name: 'Log out'})).toBeVisible();
    await expect(page).toHaveURL('/');
});

test('user should be able to add a product to the cart', async ({page}) => {
    await page.goto('/login');
    await page.getByLabel('Email').fill(process.env.TEST_EMAIL!);
    await page.getByLabel('Password').fill(process.env.TEST_PASSWORD!);
    await page.getByRole('button', {name: 'Log in'}).click();
    await expect(page.getByRole('button', {name: 'Log out'})).toBeVisible();

    await page.goto('/cart');
    const cartItems = page.getByTestId('cart-line-name');
    const removeButton = page.getByTestId('cart-line-remove-btn');
    await expect(page.getByTestId('cart-line-qty-select').or(page.getByText('Your cart is empty')).first()).toBeVisible();
    while (await cartItems.count() > 0) {
        const previousCount = await cartItems.count();
        await removeButton.first().click();
        await expect(cartItems).toHaveCount(previousCount - 1);
    }
    await expect(cartItems).toHaveCount(0);

    await page.goto('/');
    await page.getByPlaceholder('Search products').fill('lamp');
    await page.getByTestId('header-search-btn').click();
    await page.getByRole('button', {name: 'Add Aurora Desk Lamp to cart'}).click();
    await page.getByTestId('nav-cart-link').click();
    await expect(page).toHaveURL('/cart');
    await expect(page.getByTestId('cart-line-name')).toHaveText('Aurora Desk Lamp');
    await expect(page.getByTestId('cart-line-qty-select')).toHaveValue('1');
    await expect(page.getByTestId('cart-subtotal')).toHaveText('₴1,249.00');
});

test('cart subtotal should update after quantity change', async ({page}) => {
    await page.goto('/login');
    await page.getByLabel('Email').fill(process.env.TEST_EMAIL!);
    await page.getByLabel('Password').fill(process.env.TEST_PASSWORD!);
    await page.getByRole('button', {name: 'Log in'}).click();
    await expect(page.getByRole('button', {name: 'Log out'})).toBeVisible();

    await page.goto('/cart');
    const cartItems = page.getByTestId('cart-line-name');
    const removeButton = page.getByTestId('cart-line-remove-btn');
    await expect(page.getByTestId('cart-line-qty-select').or(page.getByText('Your cart is empty')).first()).toBeVisible();
    while (await cartItems.count() > 0) {
        const previousCount = await cartItems.count();
        await removeButton.first().click();
        await expect(cartItems).toHaveCount(previousCount - 1);
    }
    await expect(cartItems).toHaveCount(0);

    await page.goto('/');
    await page.getByPlaceholder('Search products').fill('lamp');
    await page.getByTestId('header-search-btn').click();
    await page.getByRole('button', {name: 'Add Aurora Desk Lamp to cart'}).click();
    await page.getByTestId('nav-cart-link').click();
    await expect(page).toHaveURL('/cart');
    await expect(page.getByTestId('cart-line-name')).toHaveText('Aurora Desk Lamp');
    await expect(page.getByTestId('cart-line-qty-select')).toHaveValue('1');
    await expect(page.getByTestId('cart-subtotal')).toHaveText('₴1,249.00');
    await page.getByTestId('cart-line-qty-select').selectOption('2');
    await expect(page.getByTestId('cart-line-qty-select')).toHaveValue('2');
    await expect(page.getByTestId('cart-subtotal')).toHaveText('₴2,498.00');
    await expect(page.getByTestId('cart-line-total')).toHaveText('₴2,498.00');
});
