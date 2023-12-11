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
import * as AWS from 'aws-sdk';
import * as config from 'config';

const awsConfig = config.get('aws');

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
    AWS.config.update({
      region: 'ap-northeast-2',
      credentials: {
        accessKeyId: awsConfig.accessKeyId,
        secretAccessKey: awsConfig.secretAccessKey,
      },
    });
    try {
      const upload = await new AWS.S3()
        .putObject({
          Key: `${Date.now() + file.originalname}`,
          Body: file.buffer,
          Bucket: awsConfig.bucketName,
        })
        .promise();
      console.log(upload);
    } catch (error) {
      console.log(error);
    }
    return this.productService.createProduct(createProductDto, file);
  }
}
