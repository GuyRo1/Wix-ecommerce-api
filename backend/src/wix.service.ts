import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig } from 'axios';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom, map } from 'rxjs';
import {
  validateCatalog,
  Catalog,
  ProductMold,
  UpdateProductMold,
  validateProduct,
  Product,
} from './wix.validators';
@Injectable()
export class WixService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  private getWixConfig(): AxiosRequestConfig {
    return {
      baseURL: 'https://www.wixapis.com/stores/v1',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.configService.get('WIX_TOKEN'),
        'wix-site-id': this.configService.get('WIX_SITE_ID'),
      },
    };
  }

  async getCatalog(payload: object): Promise<Catalog> {
    const queryPayload = {
      includeVariants: true,
      includeHiddenProducts: true,
      ...payload,
    };

    const catalog: Catalog = await firstValueFrom(
      this.httpService
        .post<unknown>('/products/query', queryPayload, {
          ...this.getWixConfig(),
        })
        .pipe(
          map((response) => validateCatalog(response.data)),
          catchError((error) => {
            throw error;
          }),
        ),
    );
    return catalog;
  }

  async addProductMedia(productId: string, url: string): Promise<void> {
    const urlType = url.startsWith('http') ? 'url' : 'mediaId';
    const payload = {
      media: [
        {
          [urlType]: url,
        },
      ],
    };

    await firstValueFrom(
      this.httpService
        .post<unknown>(`/products/${productId}/media`, payload, {
          ...this.getWixConfig(),
        })
        .pipe(
          catchError((error) => {
            throw error;
          }),
        ),
    );
  }

  async getProduct(productId: string) {
    const product: Product = await firstValueFrom(
      this.httpService
        .get<unknown>(`/products/${productId}`, {
          ...this.getWixConfig(),
        })
        .pipe(
          map((response) => {
            const anyResponse = response as any;
            if (!anyResponse?.data?.product) throw new Error();
            return validateProduct(anyResponse.data.product);
          }),
          catchError((error) => {
            throw error;
          }),
        ),
    );
    return product;
  }

  async createProduct(product: ProductMold): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService
        .post<unknown>('/products', { product }, { ...this.getWixConfig() })
        .pipe(
          catchError((error) => {
            throw error;
          }),
        ),
    );
    return data;
  }

  async updateProduct(
    productId: string,
    product: UpdateProductMold,
  ): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService
        .patch<unknown>(
          `/products/${productId}`,
          { product },
          { ...this.getWixConfig() },
        )
        .pipe(
          catchError((error) => {
            throw error;
          }),
        ),
    );
    return data;
  }

  async deleteProduct(productId: string): Promise<any> {
    console.log(productId);
    const { data } = await firstValueFrom(
      this.httpService
        .delete<unknown>(`/products/${productId}`, { ...this.getWixConfig() })
        .pipe(
          catchError((error) => {
            throw error;
          }),
        ),
    );
    console.log(data);
    return data;
  }
}
