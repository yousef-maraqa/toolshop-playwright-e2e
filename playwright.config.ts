import { defineConfig, devices } from '@playwright/test';

import { authStateFiles } from './src/config/auth.js';
import { currentEnvironment } from './src/config/environments.js';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: currentEnvironment.uiUrl,
    testIdAttribute: 'data-test',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: 'chromium',
      dependencies: ['setup'],
      testIgnore: /.*\.setup\.ts/,
      use: { ...devices['Desktop Chrome'], storageState: authStateFiles.customer },
    },
    {
      name: 'firefox',
      dependencies: ['setup'],
      testIgnore: /.*\.setup\.ts/,
      use: { ...devices['Desktop Firefox'], storageState: authStateFiles.customer },
    },
    {
      name: 'webkit',
      dependencies: ['setup'],
      testIgnore: /.*\.setup\.ts/,
      use: { ...devices['Desktop Safari'], storageState: authStateFiles.customer },
    },
  ],
});
