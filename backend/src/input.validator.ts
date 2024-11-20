import { z } from 'zod';

const ChoiceSchema = z.object({
  value: z.string(),
  description: z.string(),
});

const CreateProductInputSchema = z.object({
  imageUrl: z.string().optional(),
  name: z.string().optional(),
  ribbon: z.string().optional(),
  description: z.string().optional(),
  price: z.string().optional(),
  choices: z
    .object({
      name: z.string(),
      one: ChoiceSchema.partial(),
      two: ChoiceSchema.partial(),
      three: ChoiceSchema.partial(),
    })
    .optional(),
});

export type CreateProductInput = z.infer<typeof CreateProductInputSchema>;

export const validateInputCreateProduct = (data: unknown) =>
  CreateProductInputSchema.parse(data);
