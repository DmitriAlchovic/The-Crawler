import { Request, Response } from 'express';
import { byCategoryController } from '../../controllers/product.controller';

const productByCategoryHandler = async (req: Request, res: Response) => {
  try {
    const { categoryName } = req.params;
    const discountList = await byCategoryController(categoryName);
    res.status(200).json(discountList);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default productByCategoryHandler;
