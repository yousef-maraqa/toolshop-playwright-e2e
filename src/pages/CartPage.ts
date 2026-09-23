import type { Locator, Page } from '@playwright/test';

import { NavBar } from '../components/NavBar.js';

export class CartPage {
  public readonly productTitles: Locator;
  public readonly quantities: Locator;
  public readonly proceedToCheckout: Locator;
  public readonly navBar: NavBar;

  public constructor(private readonly page: Page) {
    this.productTitles = page.getByTestId('product-title');
    this.quantities = page.getByTestId('product-quantity');
    this.proceedToCheckout = page.getByTestId('proceed-1');
    this.navBar = new NavBar(page);
  }

  /** Navigates to the cart route. */
  public async goto(): Promise<void> {
    await this.page.goto('/checkout');
  }

  /** Updates a cart line quantity by its visible row index. */
  public async setQuantity(index: number, quantity: number): Promise<void> {
    await this.quantities.nth(index).fill(String(quantity));
    await this.quantities.nth(index).press('Enter');
  }

  /** Continues from the cart to checkout. */
  public async checkout(): Promise<void> {
    await this.proceedToCheckout.click();
  }
}
