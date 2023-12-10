import { IsEnum, IsNotEmpty } from 'class-validator';
import { ProductCategory } from '../Enum/product-type.enum';

export class CreateProductDto {
  @IsNotEmpty()
  productName: string;

  @IsNotEmpty()
  price: number;

  @IsEnum(ProductCategory, { message: '$value는 올바른 카테고리가 아닙니다' })
  categories: ProductCategory;
}
