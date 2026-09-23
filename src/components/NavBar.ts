import type { Locator, Page } from '@playwright/test';

export class NavBar {
  public readonly menu: Locator;
  public readonly cartLink: Locator;
  public readonly accountLink: Locator;

  public constructor(private readonly page: Page) {
    this.menu = page.getByTestId('nav-menu');
    this.cartLink = page.getByTestId('nav-cart');
    this.accountLink = page.getByTestId('nav-account');
  }

  /** Opens the cart from the application navigation. */
  public async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  /** Opens the authenticated account overview from the application navigation. */
  public async openAccount(): Promise<void> {
    await this.accountLink.click();
  }

  /** Logs out through the navigation menu. */
  public async logout(): Promise<void> {
    await this.menu.click();
    await this.page.getByTestId('nav-sign-out').click();
  }
}
