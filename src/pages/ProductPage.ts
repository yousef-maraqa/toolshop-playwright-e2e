import type { Locator, Page } from '@playwright/test';

export class ProductPage {
  public readonly title: Locator;
  public readonly price: Locator;
  public readonly quantity: Locator;
  public readonly increaseQuantity: Locator;
  public readonly decreaseQuantity: Locator;
  public readonly addToCart: Locator;

  public constructor(private readonly page: Page) {
    this.title = page.getByTestId('product-name');
    this.price = page.getByTestId('unit-price');
    this.quantity = page.getByTestId('quantity');
    this.increaseQuantity = page.getByTestId('increase-quantity');
    this.decreaseQuantity = page.getByTestId('decrease-quantity');
    this.addToCart = page.getByTestId('add-to-cart');
  }

  /** Navigates to a product detail route. */
  public async goto(productId: string): Promise<void> {
    await this.page.goto(`/product/${productId}`);
  }

  /** Increases the requested product quantity. */
  public async increaseQuantityBy(amount: number): Promise<void> {
    for (let index = 0; index < amount; index += 1) {
      await this.increaseQuantity.click();
    }
  }

  /** Adds the configured product quantity to the cart. */
  public async addProductToCart(): Promise<void> {
    const addItemResponse = this.page.waitForResponse(
      (response) =>
        response.request().method() === 'POST' && /\/carts\/[^/]+$/.test(response.url()),
    );
    await this.addToCart.click();
    await addItemResponse;
  }
}
