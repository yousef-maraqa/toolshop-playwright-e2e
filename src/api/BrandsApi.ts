import type { APIRequestContext } from '@playwright/test';
import { z } from 'zod';

import { BaseApi } from './BaseApi.js';

const brandResponseSchema = z.looseObject({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
});

export type Brand = z.infer<typeof brandResponseSchema>;

export class BrandsApi extends BaseApi {
  public constructor(request: APIRequestContext, baseUrl: string, token: string) {
    super(request, baseUrl, token);
  }

  /** Creates an admin-managed brand. */
  public async create(name: string, slug: string): Promise<Brand> {
    return this.requestJson('POST', '/brands', brandResponseSchema, { name, slug });
  }

  /** Deletes an admin-managed brand. */
  public async delete(brandId: string): Promise<void> {
    return this.requestNoContent('DELETE', `/brands/${brandId}`);
  }
}
