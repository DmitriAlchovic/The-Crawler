import { Request, Response } from 'express';
import featuredController, { byCategoryController } from '../../controllers/product.controller';

const newProductsHandler = async (req: Request, res: Response) => {
  try {
    const  limit  = parseInt(req.params.limit);
    const discountList = await featuredController(limit);

    res.status(200).json(discountList);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default newProductsHandler;
