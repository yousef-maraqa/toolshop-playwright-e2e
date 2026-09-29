import { faker } from '@faker-js/faker';

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
