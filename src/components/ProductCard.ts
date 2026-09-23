import type { Locator } from '@playwright/test';

export class ProductCard {
  public readonly root: Locator;
  public readonly name: Locator;
  public readonly price: Locator;

  public constructor(root: Locator) {
    this.root = root;
    this.name = root.getByTestId('product-name');
    this.price = root.getByTestId('product-price');
  }

  /** Opens the product detail page represented by this card. */
  public async open(): Promise<void> {
    await this.root.click();
  }
}
