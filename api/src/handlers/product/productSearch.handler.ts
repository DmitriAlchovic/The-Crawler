import { Request, Response } from 'express';
import { searchByCategoryController } from '../../controllers/product.controller';

const productSearchHandler = async (req: Request, res: Response) => {
  try {
    const { categoryName } = req.params;
    const { searchStr } = req.params;
    const discountList = await searchByCategoryController(
      categoryName,
      searchStr,
    );
    res.status(200).json(discountList);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default productSearchHandler;
