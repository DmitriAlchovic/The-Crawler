import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { OrderItems } from './order_items.model';
import { PaymentDetails } from './payment_details.model';
import { User } from './user.model';

interface OrderDetailsCreation {
  orderDetailsId: number;
  user: number;
  total: number;
  payment: number;
}

@Table({ tableName: 'order_details' })
export class OrderDetails extends Model<OrderDetails, OrderDetailsCreation> {
  @AllowNull(false)
  @ForeignKey(() => OrderItems)
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  declare orderDetailsId: number;
  @BelongsTo(() => User, {
    foreignKey: { name: 'userId', allowNull: false },
  })
  declare user: number;
  @AllowNull(false)
  @Column({ type: DataType.INTEGER })
  declare total: number;
  @BelongsTo(() => PaymentDetails, {
    as: 'paymentDetails',
    foreignKey: { name: 'paymentDetailsId', allowNull: false },
  })
  declare payment: number;
  @HasMany(()=>OrderItems, 'orderId')
  declare products: OrderItems[];
}
