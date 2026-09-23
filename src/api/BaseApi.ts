import type { APIRequestContext, APIResponse } from '@playwright/test';
import { z, type ZodType } from 'zod';

export class ApiRequestError extends Error {
  public constructor(
    public readonly status: number,
    public readonly body: unknown,
  ) {
    super(`API request failed with status ${status}`);
    this.name = 'ApiRequestError';
  }
}

export abstract class BaseApi {
  protected constructor(
    protected readonly request: APIRequestContext,
    protected readonly baseUrl: string,
    protected readonly token?: string,
  ) {}

  /** Sends a JSON request and validates its response with the supplied schema. */
  protected async requestJson<T>(
    method: 'DELETE' | 'GET' | 'PATCH' | 'POST' | 'PUT',
    path: string,
    schema: ZodType<T>,
    data?: unknown,
  ): Promise<T> {
    const response = await this.send(method, path, data);
    const body = await this.readBody(response);

    if (!response.ok()) {
      throw new ApiRequestError(response.status(), body);
    }

    return schema.parse(body);
  }

  /** Sends a request that is expected to return no response body. */
  protected async requestNoContent(
    method: 'DELETE' | 'GET' | 'PATCH' | 'POST' | 'PUT',
    path: string,
    data?: unknown,
  ): Promise<void> {
    const response = await this.send(method, path, data);
    const body = await this.readBody(response);

    if (!response.ok()) {
      throw new ApiRequestError(response.status(), body);
    }
  }

  private async send(
    method: 'DELETE' | 'GET' | 'PATCH' | 'POST' | 'PUT',
    path: string,
    data?: unknown,
  ): Promise<APIResponse> {
    const headers: Record<string, string> = {};

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    if (data !== undefined) {
      headers['Content-Type'] = 'application/json';
    }

    return this.request.fetch(new URL(path, this.baseUrl).toString(), {
      method,
      headers,
      data,
    });
  }

  private async readBody(response: APIResponse): Promise<unknown> {
    if (response.status() === 204) {
      return undefined;
    }

    const text = await response.text();

    if (!text) {
      return undefined;
    }

    try {
      return JSON.parse(text) as unknown;
    } catch {
      return text;
    }
  }
}

export const emptyResponseSchema = z.undefined();
