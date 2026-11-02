import {test, expect} from '@playwright/test';

test('valid promo code should apply discount to cart', async ({page}) => {
    await page.goto('/login');
    await page.getByLabel('Email').fill(process.env.TEST_EMAIL!);
    await page.getByLabel('Password').fill(process.env.TEST_PASSWORD!);
    await page.getByRole('button', {name: 'Log in'}).click();
    await expect(page.getByRole('button', {name: 'Log out'})).toBeVisible();
    await expect(page).toHaveURL('/');

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

    await page.getByTestId('cart-line-qty-select').selectOption('1');
    await expect(page.getByTestId('cart-line-qty-select')).toHaveValue('1');
    await expect(page.getByTestId('cart-subtotal')).toHaveText('₴1,249.00');

    const activePromo = page.getByText('Code SAVE100');
    if (await activePromo.isVisible()) {
        await page.getByRole('complementary').getByRole('button', {name: 'Remove'}).click();
        await expect(activePromo).toHaveCount(0);
    }

    await expect(page.getByTestId('promo-input')).toBeVisible();
    await page.getByTestId('promo-input').fill('SAVE100');
    await page.getByTestId('promo-apply-btn').click();

    await expect(page.getByText('Code SAVE100')).toBeVisible();
    await expect(page.getByText('Discount (SAVE100)')).toBeVisible();
    await expect(page.getByText('−₴100.00')).toBeVisible();
    await expect(page.getByTestId('cart-line-qty-select')).toHaveValue('1');
    await expect(page.getByTestId('cart-subtotal')).toHaveText('₴1,249.00');
    await expect(page.getByTestId('cart-total')).toHaveText('₴1,229.00');
});

test('invalid promo code should display an error message', async ({page}) => {
    await page.goto('/login');
    await page.getByLabel('Email').fill(process.env.TEST_EMAIL!);
    await page.getByLabel('Password').fill(process.env.TEST_PASSWORD!);
    await page.getByRole('button', {name: 'Log in'}).click();
    await expect(page.getByRole('button', {name: 'Log out'})).toBeVisible();
    await expect(page).toHaveURL('/');

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

    await page.getByTestId('cart-line-qty-select').selectOption('1');
    await expect(page.getByTestId('cart-line-qty-select')).toHaveValue('1');
    await expect(page.getByTestId('cart-subtotal')).toHaveText('₴1,249.00');

    const activePromo = page.getByText('Code SAVE100');
    if (await activePromo.isVisible()) {
        await page.getByRole('complementary').getByRole('button', {name: 'Remove'}).click();
        await expect(activePromo).toHaveCount(0);
    }

    await expect(page.getByTestId('promo-input')).toBeVisible();
    await page.getByTestId('promo-input').fill('INVALID123');
    await page.getByTestId('promo-apply-btn').click();

    await expect(page.getByText('Promo code not found')).toBeVisible();
    await expect(page.getByText('Code INVALID123')).toHaveCount(0);
    await expect(page.getByText('Discount (INVALID123)')).toHaveCount(0);
    await expect(page.getByTestId('cart-line-qty-select')).toHaveValue('1');
    await expect(page.getByTestId('cart-subtotal')).toHaveText('₴1,249.00');
    await expect(page.getByTestId('cart-total')).toHaveText('₴1,329.00');
});
