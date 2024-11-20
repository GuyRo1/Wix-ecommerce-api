import { Injectable } from '@nestjs/common';
import { WixService } from './wix.service';
import { ProductMold, UpdateProductMold } from './wix.validators';
import { CreateProductInput } from './input.validator';
import { Product } from './wix.validators';

@Injectable()
export class AppService {
  constructor(private readonly wixService: WixService) {}

  async getProducts(): Promise<Product[]> {
    const { products } = await this.wixService.getCatalog({});
    return products;
  }

  async getProduct(productId: string): Promise<Product> {
    const product = await this.wixService.getProduct(productId);
    return product;
  }

  async createProduct(
    productMold: ProductMold,
    imageUrl?: string,
  ): Promise<any> {
    const newProduct: any = await this.wixService.createProduct(productMold);
    if (imageUrl && newProduct?.product?.id) {
      try {
        await this.wixService.addProductMedia(newProduct.product.id, imageUrl);
      } catch (err) {
        const anyErr = err as any;
        console.log(anyErr?.data?.details);
      }
    }
    return newProduct;
  }

  updateVisibility(productId: string, isVisible: boolean): Promise<any> {
    return this.wixService.updateProduct(productId, { visible: isVisible });
  }

  updateProduct(productId: string, update: UpdateProductMold): Promise<any> {
    return this.wixService.updateProduct(productId, update);
  }

  deleteProduct(productId: string): Promise<any> {
    return this.wixService.deleteProduct(productId);
  }

  private createDefaultProductMold(): ProductMold {
    return {
      name: '',
      productType: 'physical',
      description: '',
      sku: '',
      weight: 0,
      priceData: {
        price: 0,
      },
      visible: false,
      ribbon: '',
      manageVariants: false,
    };
  }

  private notSameValue = (one: string, two: string, three: string) =>
    one !== two && one !== three && two !== three;

  transformToWixProductMold(requestInput: CreateProductInput): ProductMold {
    const base = this.createDefaultProductMold();
    base.name = requestInput.name ?? base.name;
    base.ribbon = requestInput.ribbon ?? base.ribbon;
    base.description = requestInput.description ?? base.description;
    base.priceData.price = Number(requestInput.price) ?? base.priceData.price;
    if (requestInput.choices && requestInput.choices.name) {
      const { choices } = requestInput;
      const name = choices.name;
      const first =
        choices.one.value && choices.one.description ? choices.one : null;
      const second =
        choices.two.value && choices.two.description ? choices.two : null;
      const third =
        choices.three.value && choices.three.description ? choices.three : null;
      if (first && second && third) {
        if (
          this.notSameValue(
            first.value || '',
            second.value || '',
            third.value || '',
          ) &&
          this.notSameValue(
            first.description || '',
            second.description || '',
            third.description || '',
          )
        ) {
          base.manageVariants = true;
          base.productOptions = [
            {
              name,
              choices: [
                {
                  value: first.value || '',
                  description: first.description || '',
                },
                {
                  value: second.value || '',
                  description: second.description || '',
                },
                {
                  value: third.value || '',
                  description: third.description || '',
                },
              ],
            },
          ];
        }
      }
    }
    return base;
  }
}
