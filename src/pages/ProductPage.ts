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
    this.addToCart = page.getByRole('button', { name: /add to cart/i });
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

  /** Returns the authenticated cart identifier created by the UI. */
  public async getCartId(): Promise<string> {
    const cartId = await this.page.evaluate(() => sessionStorage.getItem('cart_id'));

    if (!cartId) {
      throw new Error('The UI did not create a cart identifier after adding the product.');
    }

    return cartId;
  }
}
