import { Sequelize } from 'sequelize-typescript';
import { CartItem } from '../models/cart.item.model';
import { Category } from '../models/category.model';
import { Discount } from '../models/discount.model';
import { ProductInventory } from '../models/inventory.model';
import { OrderDetails } from '../models/order_details.model';
import { OrderItems } from '../models/order_items.model';
import { PaymentDetails } from '../models/payment_details.model';
import { Product } from '../models/product.model';
import { ShoppingSession } from '../models/shopping_session.model';
import { Subcategory } from '../models/subcategory.model';
import { User } from '../models/user.model';

const database = new Sequelize('The Grocery', 'root', '12345', {
  host: 'db',
  port: 3306,
  dialect: 'mariadb',
  timezone: '+03:00',
  pool: {
    max: 100,
    idle: 5000,
    acquire: 30000,
  },
  models: [
    Product,
    Discount,
    CartItem,
    Category,
    ProductInventory,
    OrderDetails,
    OrderItems,
    PaymentDetails,
    ShoppingSession,
    User,
    Subcategory,
  ],
});

export default database;
