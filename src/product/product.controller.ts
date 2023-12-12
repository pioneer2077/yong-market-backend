import {
  Bind,
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductEntity } from './Entity/product.entity';
import { CreateProductDto } from './Dto/create-product.dto';
import { ProductStatusValidationPipe } from './Pipe/product-status-validation.pipe';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  getAllProducts(): Promise<ProductEntity[]> {
    return this.productService.getAllProducts();
  }

  @Post()
  @UsePipes(ValidationPipe)
  @UseInterceptors(FileInterceptor('file'))
  async createProduct(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ProductEntity> {
    return this.productService.createProduct(createProductDto, file);
  }
}
