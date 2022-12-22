import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { Product } from './product.model';
import { ShoppingSession } from './shopping_session.model';

interface CartItemCreation {
  cartId: number;
  session: number;
  product: number;
  quantity: number;
}

@Table({ tableName: 'cart_item' })
export class CartItem extends Model<CartItem, CartItemCreation> {
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  declare cartId: number;
  @BelongsTo(() => ShoppingSession, {
    as: 'shoppingSession',
    foreignKey: { name: 'shoppingSessionId', allowNull: false },
  })
  declare session: ShoppingSession;
  @BelongsTo(() => Product, 'productId')
  declare product: number;
  @AllowNull(false)
  @Column({ type: DataType.INTEGER })
  declare quantity: number;
}
