import { ApiRequestError } from '../api/BaseApi.js';
import { CartApi } from '../api/CartApi.js';

/** Deletes a cart while allowing the application to have already converted it into an order. */
export async function deleteCartIfPresent(cartApi: CartApi, cartId: string): Promise<void> {
  try {
    await cartApi.deleteCart(cartId);
  } catch (error) {
    if (!(error instanceof ApiRequestError) || error.status !== 404) {
      throw error;
    }
  }
}
