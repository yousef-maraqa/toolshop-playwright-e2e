import type { APIRequestContext } from '@playwright/test';

import { BaseApi } from './BaseApi.js';
import {
  productListSchema,
  productSchema,
  type Product,
  type ProductList,
} from './schemas/product.js';

export interface ProductListOptions {
  page?: number;
  size?: number;
  sort?: string;
  brandId?: string;
  categoryId?: string;
  inStock?: boolean;
  isEcoFriendly?: boolean;
  isLocationOffer?: boolean;
  isRental?: boolean;
}

export interface ProductSearchOptions {
  page?: number;
}

export class ProductsApi extends BaseApi {
  public constructor(request: APIRequestContext, baseUrl: string, token?: string) {
    super(request, baseUrl, token);
  }

  /** Retrieves a paginated list of products using optional catalog filters. */
  public async list(options: ProductListOptions = {}): Promise<ProductList> {
    const params = new URLSearchParams();
    const values: Record<string, string | number | boolean | undefined> = {
      page: options.page,
      size: options.size,
      sort: options.sort,
      by_brand: options.brandId,
      by_category: options.categoryId,
      in_stock: options.inStock,
      is_eco_friendly: options.isEcoFriendly,
      is_location_offer: options.isLocationOffer,
      is_rental: options.isRental,
    };

    for (const [key, value] of Object.entries(values)) {
      if (value !== undefined) {
        params.set(key, String(value));
      }
    }

    const query = params.toString();
    return this.requestJson('GET', `/products${query ? `?${query}` : ''}`, productListSchema);
  }

  /** Retrieves one product by its identifier. */
  public async getById(productId: string): Promise<Product> {
    return this.requestJson('GET', `/products/${productId}`, productSchema);
  }

  /** Searches products by the API search query. */
  public async search(query: string, options: ProductSearchOptions = {}): Promise<ProductList> {
    const params = new URLSearchParams({ q: query });

    if (options.page !== undefined) params.set('page', String(options.page));

    return this.requestJson('GET', `/products/search?${params.toString()}`, productListSchema);
  }

  /** Retrieves products belonging to one category. */
  public async filterByCategory(
    categoryId: string,
    options: Omit<ProductListOptions, 'categoryId'> = {},
  ): Promise<ProductList> {
    return this.list({ ...options, categoryId });
  }
}
