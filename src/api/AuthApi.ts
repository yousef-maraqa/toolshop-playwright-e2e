import type { APIRequestContext } from '@playwright/test';

import { BaseApi } from './BaseApi.js';
import {
  loginResponseSchema,
  registerResponseSchema,
  type LoginResponse,
  type RegisterResponse,
} from './schemas/auth.js';

export interface CustomerRegistration {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

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

  /** Registers a new customer account. */
  public async register(details: CustomerRegistration): Promise<RegisterResponse> {
    return this.requestJson('POST', '/users/register', registerResponseSchema, {
      first_name: details.firstName,
      last_name: details.lastName,
      email: details.email,
      password: details.password,
    });
  }
}
