import type { APIRequestContext } from '@playwright/test';

import { BaseApi, emptyResponseSchema } from './BaseApi.js';
import { cartItemAddedSchema, cartSchema, type Cart, type CartItemAdded } from './schemas/cart.js';

export class CartApi extends BaseApi {
  public constructor(request: APIRequestContext, baseUrl: string, token: string) {
    super(request, baseUrl, token);
  }

  /** Creates an authenticated cart and returns its identifier. */
  public async createCart(): Promise<Cart> {
    return this.requestJson('POST', '/carts', cartSchema);
  }

  /** Adds or updates a product quantity in an existing cart. */
  public async addItem(
    cartId: string,
    productId: string,
    quantity: number,
  ): Promise<CartItemAdded> {
    return this.requestJson('POST', `/carts/${cartId}`, cartItemAddedSchema, {
      product_id: productId,
      quantity,
    });
  }

  /** Retrieves an authenticated cart by its identifier. */
  public async getCart(cartId: string): Promise<Cart> {
    return this.requestJson('GET', `/carts/${cartId}`, cartSchema);
  }

  /** Deletes an authenticated cart by its identifier. */
  public async deleteCart(cartId: string): Promise<void> {
    return this.requestJson('DELETE', `/carts/${cartId}`, emptyResponseSchema);
  }
}
