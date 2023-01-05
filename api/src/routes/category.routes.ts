import { Router } from 'express';
import {
  categoryController,
  subcategoryController,
} from '../controllers/category.controller';
import categoryHandler from '../handlers/category/category.handler';

const router = Router();

router.get('/:categoryName', categoryHandler );

router.get('/', async (req, res) => {
  const categoryList = await categoryController();
  console.log(categoryList);
  

  return res.status(200).json(categoryList);
});

export default router;
