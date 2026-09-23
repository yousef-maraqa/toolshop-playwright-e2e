import type { APIRequestContext } from '@playwright/test';
import { z } from 'zod';

import { BaseApi } from './BaseApi.js';

const categoryResponseSchema = z.looseObject({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  parent_id: z.string().nullable().optional(),
});

const categoryListSchema = z.array(categoryResponseSchema);

export type Category = z.infer<typeof categoryResponseSchema>;

export class CategoriesApi extends BaseApi {
  public constructor(request: APIRequestContext, baseUrl: string) {
    super(request, baseUrl);
  }

  /** Retrieves the available catalog categories. */
  public async list(): Promise<Category[]> {
    return this.requestJson('GET', '/categories', categoryListSchema);
  }
}
