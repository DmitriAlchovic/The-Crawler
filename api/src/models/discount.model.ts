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
import { Product } from './product.model';
import { User } from './user.model';

interface discountCreation {
  discountId: number;
  name: string;
  desc: string;
  discountPercent: number;
  active: boolean;
  hot: boolean;
}

@Table({ tableName: 'discount' })
export class Discount extends Model<Discount, discountCreation> {
  @AllowNull(false)
  @ForeignKey(() => Product)
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  declare discountId: number;
  @AllowNull(false)
  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;
  @Column({ type: DataType.STRING, allowNull: false })
  declare desc: string;
  @AllowNull(false)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare discountPercent: number;
  @AllowNull(false)
  @Column({ type: DataType.BOOLEAN, allowNull: false })
  declare active: boolean;
  @AllowNull(false)
  @Column({ type: DataType.BOOLEAN, allowNull: false })
  declare hot: boolean;
  @HasMany(() => User, 'userId')
  declare user: User[];
}
