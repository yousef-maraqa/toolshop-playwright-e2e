import { expect, type Locator, type Page } from '@playwright/test';

import type { BillingAddress } from '../data/factories.js';

export class CheckoutPage {
  public readonly address: Locator;
  public readonly houseNumber: Locator;
  public readonly city: Locator;
  public readonly state: Locator;
  public readonly country: Locator;
  public readonly postalCode: Locator;
  public readonly postcodeLookupLoading: Locator;
  public readonly continueAddress: Locator;
  public readonly continueLogin: Locator;
  public readonly paymentMethod: Locator;
  public readonly placeOrder: Locator;
  public readonly paymentSuccess: Locator;
  public readonly orderConfirmation: Locator;

  public constructor(private readonly page: Page) {
    this.address = page.getByTestId('street');
    this.houseNumber = page.getByTestId('house_number');
    this.city = page.getByTestId('city');
    this.state = page.getByTestId('state');
    this.country = page.getByTestId('country');
    this.postalCode = page.getByTestId('postal_code');
    this.postcodeLookupLoading = page.getByTestId('postcode-lookup-loading');
    this.continueAddress = page.getByTestId('proceed-3');
    this.continueLogin = page.getByTestId('proceed-2');
    this.paymentMethod = page.getByTestId('payment-method');
    this.placeOrder = page.getByTestId('finish');
    this.paymentSuccess = page.getByTestId('payment-success-message');
    this.orderConfirmation = page.locator('#order-confirmation');
  }

  /** Navigates to the checkout route. */
  public async goto(): Promise<void> {
    await this.page.goto('/checkout');
  }

  /**
   * Fills the billing address form. The API only accepts the street, city and state returned by
   * its postcode lookup, so those are left for the UI to fill after country, postcode and house number.
   */
  public async fillAddress(details: BillingAddress): Promise<void> {
    // The form is prefilled asynchronously from the customer profile, which can overwrite our input.
    await expect(async () => {
      const lookup = this.page.waitForResponse(
        (response) => response.url().includes('/postcode-lookup') && response.ok(),
        { timeout: 5_000 },
      );
      await this.country.selectOption(details.country);
      await this.postalCode.fill('');
      await this.postalCode.fill(details.postalCode);
      await this.houseNumber.fill(details.houseNumber);
      await lookup;

      await expect(this.postcodeLookupLoading).toBeHidden({ timeout: 1_000 });
      await expect(this.postalCode).toHaveValue(details.postalCode, { timeout: 1_000 });
      await expect(this.continueAddress).toBeEnabled({ timeout: 1_000 });
    }).toPass({ timeout: 20_000 });
  }

  /** Continues from the sign-in step. */
  public async continueFromLogin(): Promise<void> {
    await this.continueLogin.click();
  }

  /** Continues from the billing address step. */
  public async continueFromAddress(): Promise<void> {
    await this.continueAddress.click();
  }

  /** Selects a payment method. */
  public async selectPaymentMethod(value: string): Promise<void> {
    await this.paymentMethod.selectOption(value);
  }

  /** Validates the payment, then confirms again to create the order (the UI needs both clicks). */
  public async placeOrderNow(): Promise<void> {
    await this.placeOrder.click();
    await this.paymentSuccess.waitFor();
    await this.placeOrder.click();
  }
}
