import { faker } from '@faker-js/faker';

import type { CustomerRegistration } from '../api/AuthApi.js';

/**
 * Builds a unique customer registration so every run owns its account and
 * cannot be locked out (HTTP 423) by other runs or shared demo users. The
 * password mixes character classes and high entropy to satisfy the API's
 * strength and breached-password checks.
 */
export function buildCustomerRegistration(): CustomerRegistration {
  const unique = `${Date.now()}${faker.string.alphanumeric(6).toLowerCase()}`;

  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: `e2e.customer.${unique}@example.com`,
    password: `${faker.internet.password({ length: 14 })}Aa1!`,
  };
}

/** Checkout address input; the UI's postcode lookup fills street, city and state from these. */
export type BillingAddress = {
  country: string;
  postalCode: string;
  houseNumber: string;
};

/** Builds an Austrian billing address for isolated checkout tests. */
export function buildBillingAddress(): BillingAddress {
  return {
    country: 'AT',
    postalCode: faker.helpers.arrayElement(['1010', '4020', '5020', '6020', '8010']),
    houseNumber: String(faker.number.int({ min: 1, max: 99 })),
  };
}
