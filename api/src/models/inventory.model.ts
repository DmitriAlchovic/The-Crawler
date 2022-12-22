import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Product } from './product.model';

interface ProductInventoryCreation {
  productInventoryId: number;
  currentQuantity: number;
  initialQuantity: number;
}

@Table({ tableName: 'product_inventory' })
export class ProductInventory extends Model<
  ProductInventory,
  ProductInventoryCreation
> {
  @AllowNull(false)
  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  declare productInventoryId: number;
  @AllowNull(false)
  @Column({ type: DataType.INTEGER })
  declare currentQuantity: number;
  @AllowNull(false)
  @Column({ type: DataType.INTEGER })
  declare initialQuantity: number;
}
