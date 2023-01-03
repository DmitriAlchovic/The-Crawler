import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Category } from './category.model';
import { Product } from './product.model';

interface SubcategoryCreation {
  subcategoryId: number;
  name: string;
  desc: string;
  image: string;
  category:number;
  products:Product[];
}

@Table({ tableName: 'product_subcategory' })
export class Subcategory extends Model<Subcategory, SubcategoryCreation> {
  @AllowNull(false)
  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  declare subcategoryId: number;
  @AllowNull(false)
  @Column({ type: DataType.STRING })
  declare name: string;
  @Column({ type: DataType.STRING })
  declare desc: string;
  @Column({ type: DataType.STRING})
  declare image: string;
  @BelongsTo(() => Category, {
    foreignKey: { name: 'categoryId', allowNull: false },
  })
  declare category: Category;
  @HasMany(()=>Product, 'productId')
  declare products: Product[];
  
}