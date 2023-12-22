import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Inventory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  small: number;

  @Column()
  medium: number;

  @Column()
  large: number;

  @Column()
  xLarge: number;
}
