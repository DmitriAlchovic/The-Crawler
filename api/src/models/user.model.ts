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
import { OrderDetails } from './order_details.model';

interface UserCreation {
  userId: number;
  email: number;
  password: string;
  fullName: string;
  phoneNumber: string;
  avatar: string;
  discount: number;
}

@Table({ tableName: 'user' })
export class User extends Model<User, UserCreation> {
  @ForeignKey(() => OrderDetails)
  @ForeignKey(() => CartItem)
  @ForeignKey(() => ProductInventory)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  declare userId: number;
  @AllowNull(false)
  @Column({ type: DataType.STRING, unique: true })
  declare email: string;
  @AllowNull(false)
  @Column({ type: DataType.STRING, unique: true })
  declare password: string;
  @AllowNull(false)
  @Column({ type: DataType.STRING })
  declare fullName: string;
  @AllowNull(false)
  @Column({ type: DataType.STRING })
  declare phoneNumber: string;
  @Column({ type: DataType.STRING })
  declare avatar: string;
  @BelongsTo(() => Discount, {
    foreignKey: { name: 'discountId', allowNull: false },
  })
  declare discount: Discount;
}
