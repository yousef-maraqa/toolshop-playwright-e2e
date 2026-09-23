import { z } from 'zod';

export const brandSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    slug: z.string().optional(),
  })
  .loose();

export const categorySchema = z
  .object({
    id: z.string(),
    name: z.string(),
    slug: z.string().optional(),
    parent_id: z.string().nullable().optional(),
  })
  .loose();

export const productImageSchema = z
  .object({
    id: z.string(),
    by_name: z.string(),
    by_url: z.string(),
    source_name: z.string(),
    source_url: z.string(),
    file_name: z.string(),
    title: z.string(),
  })
  .loose();

export const productSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    price: z.number(),
    is_location_offer: z.boolean(),
    is_rental: z.boolean(),
    in_stock: z.boolean(),
    co2_rating: z.string(),
    is_eco_friendly: z.boolean(),
    product_image: productImageSchema,
    category: categorySchema,
    brand: brandSchema,
  })
  .loose();

export const productListSchema = z
  .object({
    current_page: z.number().int().positive(),
    data: z.array(productSchema),
  })
  .loose();

export type Brand = z.infer<typeof brandSchema>;
export type Category = z.infer<typeof categorySchema>;
export type Product = z.infer<typeof productSchema>;
export type ProductList = z.infer<typeof productListSchema>;
