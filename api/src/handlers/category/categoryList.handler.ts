import { Request, Response } from 'express';
import { categoryController } from '../../controllers/category.controller';

const categoryListHandler = async (req: Request, res: Response) => {
  try {
    const categoryList = await categoryController();
    res.status(200).json(categoryList);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default categoryListHandler;
