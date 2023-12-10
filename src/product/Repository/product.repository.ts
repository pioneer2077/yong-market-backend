import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ProductEntity } from '../Entity/product.entity';

@Injectable()
export class BoardsRepository {
  private boardsRepository: Repository<ProductEntity>;

  constructor(private readonly dataSource: DataSource) {
    this.boardsRepository = this.dataSource.getRepository(ProductEntity);
  }
}
