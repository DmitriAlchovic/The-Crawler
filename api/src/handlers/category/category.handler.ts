import { Request, Response } from 'express';
import { subcategoryController } from '../../controllers/category.controller';

const categoryHandler = async (req: Request, res: Response) => {
  try {
    const { categoryName } = req.params;
    const subcategoryList = await subcategoryController(categoryName);
    res.status(200).json(subcategoryList);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default categoryHandler;
