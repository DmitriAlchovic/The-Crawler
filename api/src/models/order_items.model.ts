import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { OrderDetails } from './order_details.model';
import { Product } from './product.model';

interface OrderItemsCreation {
  orderItemId: number;
  orderDetails: number;
  product: number;
  quantity: number;
}

@Table({ tableName: 'order_items' })
export class OrderItems extends Model<OrderItems, OrderItemsCreation> {
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  declare orderItemId: number;
  @HasMany(() => OrderDetails, {
    as:'orderDetais',
    foreignKey: { name: 'orderDeatailsId', allowNull: false },
  })
  declare orderDetails: OrderDetails;
  @BelongsTo(() => Product, {
    foreignKey: { name: 'productId', allowNull: false },
  })
  declare product: number;
  @AllowNull(false)
  @Column({ type: DataType.INTEGER })
  declare quantity: number;
}
