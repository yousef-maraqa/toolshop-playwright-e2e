import type { Locator, Page } from '@playwright/test';

export class CheckoutPage {
  public readonly firstName: Locator;
  public readonly lastName: Locator;
  public readonly address: Locator;
  public readonly city: Locator;
  public readonly state: Locator;
  public readonly country: Locator;
  public readonly postalCode: Locator;
  public readonly continueAddress: Locator;
  public readonly paymentMethod: Locator;
  public readonly placeOrder: Locator;

  public constructor(private readonly page: Page) {
    this.firstName = page.getByTestId('first-name');
    this.lastName = page.getByTestId('last-name');
    this.address = page.getByTestId('street');
    this.city = page.getByTestId('city');
    this.state = page.getByTestId('state');
    this.country = page.getByTestId('country');
    this.postalCode = page.getByTestId('postal-code');
    this.continueAddress = page.getByTestId('proceed-3');
    this.paymentMethod = page.getByTestId('payment-method');
    this.placeOrder = page.getByTestId('finish');
  }

  /** Navigates to the checkout route. */
  public async goto(): Promise<void> {
    await this.page.goto('/checkout');
  }

  /** Fills the billing address form. */
  public async fillAddress(details: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  }): Promise<void> {
    await this.firstName.fill(details.firstName);
    await this.lastName.fill(details.lastName);
    await this.address.fill(details.address);
    await this.city.fill(details.city);
    await this.state.fill(details.state);
    await this.country.selectOption(details.country);
    await this.postalCode.fill(details.postalCode);
  }

  /** Continues from the billing address step. */
  public async continueFromAddress(): Promise<void> {
    await this.continueAddress.click();
  }

  /** Selects a payment method. */
  public async selectPaymentMethod(value: string): Promise<void> {
    await this.paymentMethod.selectOption(value);
  }

  /** Submits the final checkout step. */
  public async placeOrderNow(): Promise<void> {
    await this.placeOrder.click();
  }
}
