import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductEntity } from './Entity/product.entity';
import { CreateProductDto } from './Dto/create-product.dto';
import { ProductStatusValidationPipe } from './Pipe/product-status-validation.pipe';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  getAllProducts(): Promise<ProductEntity[]> {
    return this.productService.getAllProducts();
  }

  @Post()
  @UsePipes(ValidationPipe)
  createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ProductEntity> {
    return this.productService.createProduct(createProductDto);
  }
}
