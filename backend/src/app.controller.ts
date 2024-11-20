import {
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
  Patch,
  Get,
  Delete,
} from '@nestjs/common';
import { AppService } from './app.service';
import { UpdateProductMold, validateUpdateProductMold } from './wix.validators';
import {
  CreateProductInput,
  validateInputCreateProduct,
} from './input.validator';
import { LoggerService } from './log.service';

@Controller('catalog')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly logger: LoggerService,
  ) {}

  @Post('search')
  @HttpCode(200)
  async getCatalog(): Promise<object> {
    try {
      const data = await this.appService.getProducts();
      return data;
    } catch (err) {
      // handle error
      throw err;
    }
  }

  @Post('product')
  async createProduct(@Req() request: Request): Promise<string> {
    try {
      const validatedInput: CreateProductInput = validateInputCreateProduct(
        request.body,
      );
      const productMold =
        this.appService.transformToWixProductMold(validatedInput);
      const data = await this.appService.createProduct(
        productMold,
        validatedInput.imageUrl,
      );
      console.log(data);
      this.logger.success({
        productId: data?.product?.id || '',
        type: 'create',
      });
      return data;
    } catch (err) {
      console.log('this.logger', this.logger);
      this.logger.error({ productId: '', type: 'create' });
      throw err;
    }
  }

  @Patch('product/:id/visibility')
  async updateVisibility(
    @Req() request: any,
    @Param() params: any,
  ): Promise<object> {
    try {
      const visibility = !!request?.body?.visible;
      const productId = params?.id;
      if (!productId) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'Product not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      if (typeof visibility !== 'boolean') {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Product not found',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      const data = await this.appService.updateVisibility(
        productId,
        !!visibility,
      );
      this.logger.success({ type: 'Update', productId });

      return data;
    } catch (err) {
      const productId = params?.id || '';
      this.logger.error({ type: 'Update', productId });
      throw err;
    }
  }

  @Patch('product/:id')
  async updateProduct(
    @Req() request: any,
    @Param() params: any,
  ): Promise<object> {
    try {
      const update = request.body;

      if (update.price) {
        update.priceData = {
          price: Number(update.price),
        };
        delete update.price;
      }

      const productId = params?.id;
      if (!productId) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'Product not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      const validatedUpdate: UpdateProductMold =
        validateUpdateProductMold(update);

      const data = await this.appService.updateProduct(
        productId,
        validatedUpdate,
      );
      this.logger.success({ type: 'Update', productId });
      return data;
    } catch (err) {
      const productId = params?.id || '';
      this.logger.error({ type: 'Update', productId });
      throw err;
    }
  }

  @Get('/product/:id')
  async getProductById(@Param() params: any): Promise<any> {
    const id = params?.id;
    if (!id) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: 'Product Not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    const product = await this.appService.getProduct(id);
    return product;
  }

  @Delete('/product/:id')
  async deleteProductById(@Param() params: any): Promise<any> {
    try {
      const id = params?.id;
      if (!id) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: 'Product Not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      const deletedProduct = await this.appService.deleteProduct(id);
      this.logger.success({ type: 'Delete', productId: deletedProduct.id });
      return deletedProduct;
    } catch (err) {
      const productId = params?.id || '';
      this.logger.error({ type: 'Update', productId });
      throw err;
    }
  }
}
