import { z } from 'zod'

export const productValidationSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number().positive(),
  category: z.string(),
  tags: z.array(z.string()),
  variants: z.array(
    z.object({
      type: z.string(),
      value: z.string(),
    }),
  ),
  inventory: z.object({
    quantity: z.number().int().nonnegative(),
    inStock: z.boolean(),
  }),
})
