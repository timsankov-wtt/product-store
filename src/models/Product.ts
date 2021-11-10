import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ProductStatus } from '../types/entity.types';
import { Category } from './Category';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false, length: 10 })
  name!: string;

  @Column({
    type: 'enum',
    enum: ProductStatus,
    default: ProductStatus.ACTIVE,
  })
  type!: ProductStatus;

  @Column({ nullable: false })
  price!: number;

  @Column({ nullable: false, length: 255 })
  description!: string;

  @ManyToMany(() => Category)
  @JoinTable()
  categories!: Category[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
