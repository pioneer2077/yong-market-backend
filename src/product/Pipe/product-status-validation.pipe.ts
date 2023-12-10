import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { ProductCategory } from '../Enum/product-type.enum';
import { ProductEntity } from '../Entity/product.entity';

export class ProductStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    ProductCategory.CAP,
    ProductCategory.PANTS,
    ProductCategory.SHIRT,
    ProductCategory.SHOES,
    ProductCategory.SOCKS,
  ];
  transform(
    { categories, productName, price }: ProductEntity,
    metadata: ArgumentMetadata,
  ) {
    console.log({ categories, productName, price });
    // categories = categories.toUpperCase();
    if (!this.isStatusValid(categories)) {
      throw new BadRequestException(
        `${categories} 는 올바른 카테고리가 아닙니다`,
      );
    }
    return { categories, productName, price };
  }
  isStatusValid(status) {
    const index = this.allowedStatuses.indexOf(status);
    return index !== -1;
  }
}
