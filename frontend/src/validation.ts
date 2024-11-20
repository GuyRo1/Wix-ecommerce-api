import { z } from 'zod'

// const ProductMoldSchema = z.object({
//   name: z.string(),
//   productType: z.string(),
//   priceData: z.object({
//     price: z.number(),
//   }),
//   costAndProfitData: z.object({
//     itemCost: z.number(),
//   }),
//   description: z.string(),
//   sku: z.string(),
//   visible: z.boolean(),
//   ribbon: z.string(),
//   brand: z.string(),
//   weight: z.number(),
//   discount: z.object({
//     type: z.string(),
//     value: z.number(),
//   }),
//   manageVariants: z.boolean(),
//   productOptions: z.array(
//     z.object({
//       name: z.string(),
//       choices: z.array(
//         z.object({
//           value: z.string(),
//           description: z.string(),
//         }),
//       ),
//     }),
//   ),
// });

// export type ProductMold = z.infer<typeof ProductMoldSchema>;

const PriceDataSchema = z.object({
  currency: z.string().optional(),
  price: z.number(),
  discountedPrice: z.number().optional(),
  formatted: z
    .object({ price: z.string(), discountedPrice: z.string() })
    .optional()
});

const MediaSchema = z.object({
  mainMedia: z
    .object({
      thumbnail: z.object({
        url: z.string(),
        width: z.number(),
        height: z.number()
      }),
      mediaType: z.string(),
      title: z.string(),
      image: z.object({
        url: z.string(),
        width: z.number(),
        height: z.number()
      }),
      id: z.string()
    })
    .optional()
});

const productOption = z.object({
  optionType: z.string(),
  name: z.string(),
  choices: z.array(
    z.object({
      value: z.string(),
      description: z.string(),
      inStock: z.boolean(),
      visible: z.boolean()
    })
  )
});

const variant = z.object({
  id: z.string(),
  choices: z.object({}).passthrough(),
  variant: z.object({
    priceData: PriceDataSchema,
    sku: z.string(),
    visible: z.boolean()
  })
});

export type Variant = z.infer<typeof variant>;

const ProductSchema = z.object({
  name: z.string(),
  id: z.string(),
  media: MediaSchema,
  productOptions: z.array(productOption),
  variants: z.array(variant).optional(),
  priceData: PriceDataSchema,
  visible: z.boolean(),
  ribbon: z.string()
});

export type Product = z.infer<typeof ProductSchema>;

const CatalogSchema = z.object({
  products: z.array(ProductSchema),
  metadata: z.object({
    items: z.number(),
    offset: z.number()
  }),
  totalResults: z.number()
});

export type Catalog = z.infer<typeof CatalogSchema>

export function validateCatalog (data: unknown): Catalog {
  return CatalogSchema.parse(data)
};

export function validateProduct (data: unknown): Product {
  return ProductSchema.parse(data)
};
