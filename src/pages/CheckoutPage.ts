import type { Locator, Page } from '@playwright/test';

export class CheckoutPage {
  public readonly address: Locator;
  public readonly houseNumber: Locator;
  public readonly city: Locator;
  public readonly state: Locator;
  public readonly country: Locator;
  public readonly postalCode: Locator;
  public readonly continueAddress: Locator;
  public readonly continueLogin: Locator;
  public readonly paymentMethod: Locator;
  public readonly placeOrder: Locator;
  public readonly paymentSuccess: Locator;

  public constructor(private readonly page: Page) {
    this.address = page.getByTestId('street');
    this.houseNumber = page.getByTestId('house_number');
    this.city = page.getByTestId('city');
    this.state = page.getByTestId('state');
    this.country = page.getByTestId('country');
    this.postalCode = page.getByTestId('postal_code');
    this.continueAddress = page.getByTestId('proceed-3');
    this.continueLogin = page.getByTestId('proceed-2');
    this.paymentMethod = page.getByTestId('payment-method');
    this.placeOrder = page.getByTestId('finish');
    this.paymentSuccess = page.getByTestId('payment-success-message');
  }

  /** Navigates to the checkout route. */
  public async goto(): Promise<void> {
    await this.page.goto('/checkout');
  }

  /** Fills the billing address form. */
  public async fillAddress(details: {
    address: string;
    houseNumber: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  }): Promise<void> {
    await this.address.fill(details.address);
    await this.houseNumber.fill(details.houseNumber);
    await this.city.fill(details.city);
    await this.state.fill(details.state);
    await this.country.selectOption(details.country);
    await this.postalCode.fill(details.postalCode);
  }

  /** Continues from the billing address step. */
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

  /** Submits the final checkout step. */
  public async placeOrderNow(): Promise<void> {
    await this.placeOrder.click();
  }
}
