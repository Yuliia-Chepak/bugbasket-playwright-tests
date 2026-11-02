import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

export default defineConfig({
    testDir: './tests',
    fullyParallel: false,
    retries: 0,
    workers: 1,
    reporter: 'html',

    use: {
        baseURL: 'https://bugbasket-ref.vercel.app',
        trace: 'retain-on-failure',
        screenshot: 'only-on-failure',
    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
});
