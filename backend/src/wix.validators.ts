import { z } from 'zod';

const ProductMoldSchema = z.object({
  name: z.string(),
  productType: z.string(),
  priceData: z.object({
    price: z.number(),
  }),
  costAndProfitData: z
    .object({
      itemCost: z.number(),
    })
    .optional(),
  description: z.string(),
  sku: z.string(),
  visible: z.boolean(),
  ribbon: z.string().optional(),
  brand: z.string().optional(),
  weight: z.number().optional(),
  discount: z
    .object({
      type: z.string(),
      value: z.number(),
    })
    .optional(),
  manageVariants: z.boolean(),
  productOptions: z
    .array(
      z.object({
        name: z.string(),
        choices: z.array(
          z.object({
            value: z.string(),
            description: z.string(),
          }),
        ),
      }),
    )
    .optional(),
});

const UpdateProductMoldSchema = ProductMoldSchema.partial();

export type ProductMold = z.infer<typeof ProductMoldSchema>;
export type UpdateProductMold = z.infer<typeof UpdateProductMoldSchema>;

const PriceDataSchema = z.object({
  currency: z.string().optional(),
  price: z.number(),
  discountedPrice: z.number().optional(),
  formatted: z
    .object({ price: z.string(), discountedPrice: z.string() })
    .optional(),
});

const MediaSchema = z.object({
  mainMedia: z
    .object({
      thumbnail: z.object({
        url: z.string(),
        width: z.number(),
        height: z.number(),
      }),
      mediaType: z.string(),
      title: z.string(),
      image: z.object({
        url: z.string(),
        width: z.number(),
        height: z.number(),
      }),
      id: z.string(),
    })
    .optional(),
});

const productOption = z.object({
  optionType: z.string(),
  name: z.string(),
  choices: z.array(
    z.object({
      value: z.string(),
      description: z.string(),
      inStock: z.boolean(),
      visible: z.boolean(),
    }),
  ),
});

const variant = z.object({
  id: z.string(),
  choices: z.object({}).passthrough(),
  variant: z.object({
    priceData: PriceDataSchema,
    visible: z.boolean(),
    sku: z.string(),
  }),
});

const ProductSchema = z.object({
  name: z.string(),
  id: z.string(),
  media: MediaSchema,
  productOptions: z.array(productOption),
  variants: z.array(variant),
  priceData: PriceDataSchema,
  visible: z.boolean(),
  ribbon: z.string(),
});

export type Product = z.infer<typeof ProductSchema>;

const CatalogSchema = z.object({
  products: z.array(ProductSchema),
  metadata: z.object({
    items: z.number(),
    offset: z.number(),
  }),
  totalResults: z.number(),
});

export type Catalog = z.infer<typeof CatalogSchema>;

export function validateCatalog(data: unknown): Catalog {
  return CatalogSchema.parse(data);
}

export function validateProductMold(data: unknown): ProductMold {
  return ProductMoldSchema.parse(data);
}

export function validateProduct(data: unknown): Product {
  return ProductSchema.parse(data);
}

export function validateUpdateProductMold(data: unknown): UpdateProductMold {
  return UpdateProductMoldSchema.parse(data);
}
