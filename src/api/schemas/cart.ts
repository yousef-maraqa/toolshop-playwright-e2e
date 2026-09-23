import { z } from 'zod';

const cartProductSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    price: z.number(),
    is_location_offer: z.boolean(),
    is_rental: z.boolean(),
    co2_rating: z.string(),
    in_stock: z.boolean(),
    is_eco_friendly: z.boolean(),
  })
  .passthrough();

export const cartItemSchema = z
  .object({
    id: z.string(),
    quantity: z.number().int().positive(),
    discount_percentage: z.number().nullable().optional(),
    cart_id: z.string(),
    product_id: z.string(),
    product: cartProductSchema,
  })
  .passthrough();

export const cartSchema = z
  .object({
    id: z.string(),
    additional_discount_percentage: z.number().nullable().optional(),
    lat: z.number().nullable().optional(),
    lng: z.number().nullable().optional(),
    cart_items: z.array(cartItemSchema).optional(),
  })
  .passthrough();

export const cartItemAddedSchema = z
  .object({
    result: z.string(),
  })
  .passthrough();

export type Cart = z.infer<typeof cartSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;
export type CartItemAdded = z.infer<typeof cartItemAddedSchema>;
