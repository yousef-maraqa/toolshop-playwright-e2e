import { faker } from '@faker-js/faker';

export type BillingAddress = {
  address: string;
  houseNumber: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
};

/** Builds a valid-looking Austrian billing address for isolated checkout tests. */
export function buildBillingAddress(): BillingAddress {
  return {
    address: faker.location.street(),
    houseNumber: String(faker.number.int({ min: 1, max: 99 })),
    city: faker.location.city(),
    state: faker.location.state(),
    country: 'AT',
    postalCode: faker.location.zipCode('####'),
  };
}
