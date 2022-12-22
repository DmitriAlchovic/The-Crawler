import {
  AllowNull,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Subcategory } from './subcategory.model';

interface CategoryCreation {
  categoryId: number;
  name: string;
  desc: string;
}

@Table({ tableName: 'product_category' })
export class Category extends Model<Category, CategoryCreation> {
  @AllowNull(false)
  @ForeignKey(() => Subcategory)
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  declare categoryId: number;
  @AllowNull(false)
  @Column({ type: DataType.STRING })
  declare name: string;
  @Column({ type: DataType.STRING })
  declare desc: string;
  @HasMany(()=>Subcategory, 'subcategoryId')
  declare subcategory: Subcategory[];
}
