import { Injectable } from '@nestjs/common';
import { ProductEntity } from './Entity/product.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateProductDto } from './Dto/create-product.dto';
import { ProductCategory } from './Enum/product-type.enum';

@Injectable()
export class ProductService {
  private productRepository: Repository<ProductEntity>;
  constructor(private readonly dataSource: DataSource) {
    this.productRepository = this.dataSource.getRepository(ProductEntity);
  }

  getAllProducts(): Promise<ProductEntity[]> {
    return this.productRepository.find();
  }

  async createProduct(
    createProductDto: CreateProductDto,
  ): Promise<ProductEntity> {
    const { categories, price, productName } = createProductDto;
    const insertedData = this.productRepository.create({
      categories,
      price,
      productName,
    });
    await this.productRepository.save(insertedData);
    return insertedData;
  }
}
