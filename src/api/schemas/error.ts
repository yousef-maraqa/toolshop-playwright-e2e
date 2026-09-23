import { z } from 'zod';

export const errorResponseSchema = z
  .object({
    message: z.string().optional(),
    errors: z.record(z.string(), z.array(z.string())).optional(),
  })
  .loose();

export type ErrorResponse = z.infer<typeof errorResponseSchema>;
