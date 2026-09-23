import type { APIRequestContext } from '@playwright/test';

import { BaseApi } from './BaseApi.js';
import { loginResponseSchema, type LoginResponse } from './schemas/auth.js';

export class AuthApi extends BaseApi {
  public constructor(request: APIRequestContext, baseUrl: string) {
    super(request, baseUrl);
  }

  /** Authenticates a user and returns the API bearer token response. */
  public async login(email: string, password: string): Promise<LoginResponse> {
    return this.requestJson('POST', '/users/login', loginResponseSchema, {
      email,
      password,
    });
  }
}
