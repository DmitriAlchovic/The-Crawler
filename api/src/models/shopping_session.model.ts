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
import { CartItem } from './cart.item.model';
import { User } from './user.model';

interface ShoppingSessionCreation {
  cartId: number;
  user: number;
  total: number;
}

@Table({ tableName: 'shopping_session' })
export class ShoppingSession extends Model<
  ShoppingSession,
  ShoppingSessionCreation
> {
  @AllowNull(false)
  @ForeignKey(() => CartItem)
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  declare cartId: number;
  @BelongsTo(() => User, {
    foreignKey: { name: 'user', allowNull: false },
  })
  declare userId: number;
  @AllowNull(false)
  @Column({ type: DataType.INTEGER })
  declare total: number;
  @HasMany(()=>CartItem, 'cartId')
  declare products: CartItem[];
}
