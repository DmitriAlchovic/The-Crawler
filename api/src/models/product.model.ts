import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { CartItem } from './cart.item.model';
import { Discount } from './discount.model';
import { ProductInventory } from './inventory.model';
import { OrderItems } from './order_items.model';
import { Subcategory } from './subcategory.model';

interface productCreation {
  productId: number;
  name: string;
  desc: string;
  subcategory: Subcategory[];
  inventory: number;
  discount: number;
  price: number;
  new: boolean;
  gallery: string;
}

@Table({ tableName: 'product' })
export class Product extends Model<Product, productCreation> {
  @AllowNull(false)
  @ForeignKey(() => OrderItems)
  @ForeignKey(() => CartItem)
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  declare productId: number;
  @AllowNull(false)
  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;
  @Column({ type: DataType.STRING })
  declare desc: string;
  @BelongsTo(() => Subcategory, {
    foreignKey: { name: 'subcategoryId', allowNull: false },
  })
  declare subcategory: Subcategory;
  @BelongsTo(() => Discount, 'discountId')
  declare discount: number;
  @AllowNull(false)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare price: number;
  @AllowNull(false)
  @Column({ type: DataType.BOOLEAN, allowNull: false })
  declare new: boolean;
  @Column({ type: DataType.STRING, allowNull: false })
  declare gallery: string;
  @BelongsTo(() => ProductInventory, {
    foreignKey: { name: 'inventoryId' },
  })
  declare inventory: ProductInventory;
}
