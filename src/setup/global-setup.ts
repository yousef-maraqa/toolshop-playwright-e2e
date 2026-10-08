import { request } from '@playwright/test';

import { AuthApi } from '../api/AuthApi.js';
import { currentEnvironment } from '../config/environments.js';
import { writeCustomerCredentials } from '../config/testAccount.js';
import { buildCustomerRegistration } from '../data/factories.js';

/**
 * Registers a unique customer against the API once per run and stores its
 * credentials for every customer-authenticated test. A fresh account cannot be
 * locked out (HTTP 423) by other runs or by shared public demo users, which is
 * what made the setup login fail intermittently.
 *
 * If registration cannot succeed (e.g. an environment without the endpoint),
 * falls back to the pinned TEST_CUSTOMER_* credentials when they are provided.
 */
export default async function globalSetup(): Promise<void> {
  const context = await request.newContext({ baseURL: currentEnvironment.apiUrl });

  try {
    const authApi = new AuthApi(context, currentEnvironment.apiUrl);
    let lastError: unknown;

    for (let attempt = 0; attempt < 2; attempt += 1) {
      const registration = buildCustomerRegistration();

      try {
        await authApi.register(registration);
        // Verify the account authenticates before the suite depends on it.
        await authApi.login(registration.email, registration.password);
        writeCustomerCredentials({
          email: registration.email,
          password: registration.password,
        });
        return;
      } catch (error) {
        lastError = error;
      }
    }

    if (process.env.TEST_CUSTOMER_EMAIL && process.env.TEST_CUSTOMER_PASSWORD) {
      writeCustomerCredentials({
        email: process.env.TEST_CUSTOMER_EMAIL,
        password: process.env.TEST_CUSTOMER_PASSWORD,
      });
      console.warn(
        `Customer registration failed; falling back to TEST_CUSTOMER_* credentials. ${String(lastError)}`,
      );
      return;
    }

    throw lastError;
  } finally {
    await context.dispose();
  }
}
