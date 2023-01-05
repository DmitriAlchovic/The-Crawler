import { Request, Response } from 'express';
import { cartController } from '../../controllers/product.controller';

interface CartItem {
  productId: number;
  quantity: number;
}

const productListHandler = async (req: Request, res: Response) => {
  try {
    const cartItems = req.body;
    const idList = cartItems.map(({ productId }: CartItem) => productId);
    const productList = await cartController(idList);
    res.status(200).json(productList);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default productListHandler;
