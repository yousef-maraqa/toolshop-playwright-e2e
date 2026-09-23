import { z } from 'zod';

export const loginResponseSchema = z
  .object({
    access_token: z.string().min(1),
    token_type: z.string().min(1),
    expires_in: z.number().int().positive(),
  })
  .passthrough();

export type LoginResponse = z.infer<typeof loginResponseSchema>;
