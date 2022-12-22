import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { OrderDetails } from './order_details.model';
import { Product } from './product.model';

interface PaymentDetailsCreation {
  paymentId: number;
  order: number;
  provider: string;
  status: string;
}

@Table({ tableName: 'payment_details' })
export class PaymentDetails extends Model<
  PaymentDetails,
  PaymentDetailsCreation
> {
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  declare paymentId: number;
  @BelongsTo(() => OrderDetails, {
    as:'orderDetais',
    foreignKey: { name: 'orderDetailsId', allowNull: false },
  })
  declare order: number;
  @Column({ type: DataType.STRING })
  declare provider: string;
  @Column({ type: DataType.STRING })
  declare status: string;
}
