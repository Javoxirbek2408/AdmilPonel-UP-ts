import { z } from 'zod';

export const productSchema = z.object({
  title: z
    .string()
    .min(5, 'Name must be at least 5 characters'),
  category: z
    .string()
    .min(3, 'Category must be at least 3 characters'),
  price: z
    .string()
    .refine((val) => /^\d+(\.\d{1,2})?$/.test(val), {
      message: 'Price must be a valid number',
    }),
});

// 🔄 Type inference
export type ProductSchema = z.infer<typeof productSchema>;
