import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { ProductCategory } from '../Enum/product-type.enum';
import { Inventory } from 'src/inventory/entities/inventory.entity';

@Entity()
export class ProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productName: string;

  @Column()
  price: number;

  @Column()
  categories: ProductCategory;

  @Column({ default: '' })
  productImgUrl: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  // @ManyToOne((type) => User, (user) => user.boards, { eager: false })
  // user: User;

  // @Column()
  // userId: number;
  @OneToOne(() => Inventory)
  @JoinColumn()
  profile: Inventory;
}
