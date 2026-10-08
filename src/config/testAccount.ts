import fs from 'node:fs';
import path from 'node:path';

import { requiredEnvironmentValue } from './env.js';

export type TestCredentials = { email: string; password: string };

/** Credentials for the customer account registered by global setup for this run. */
export const customerCredentialsFile = path.resolve('.auth/customer.credentials.json');

/** Persists the customer credentials chosen for this run. */
export function writeCustomerCredentials(credentials: TestCredentials): void {
  fs.mkdirSync(path.dirname(customerCredentialsFile), { recursive: true });
  fs.writeFileSync(customerCredentialsFile, JSON.stringify(credentials, null, 2));
}

/**
 * Returns the customer credentials for this run. Reads the file written by
 * global setup and falls back to the TEST_CUSTOMER_* environment variables when
 * it is absent (e.g. a pinned local account, or a single test run without the
 * global setup having produced the file).
 */
export function readCustomerCredentials(): TestCredentials {
  try {
    const parsed = JSON.parse(
      fs.readFileSync(customerCredentialsFile, 'utf8'),
    ) as Partial<TestCredentials>;

    if (parsed.email && parsed.password) {
      return { email: parsed.email, password: parsed.password };
    }
  } catch {
    // Fall back to environment variables below.
  }

  return {
    email: requiredEnvironmentValue('TEST_CUSTOMER_EMAIL'),
    password: requiredEnvironmentValue('TEST_CUSTOMER_PASSWORD'),
  };
}
