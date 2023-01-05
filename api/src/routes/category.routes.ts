import { Router } from 'express';
import {
  categoryController,
  subcategoryController,
} from '../controllers/category.controller';

const router = Router();

router.get('/:categoryName', async (req, res) => {
  const { categoryName } = req.params;
  const subcategoryList = await subcategoryController(categoryName);
  

  return res.status(200).json(subcategoryList);
});

router.get('/', async (req, res) => {
  const categoryList = await categoryController();
  console.log(categoryList);
  

  return res.status(200).json(categoryList);
});

export default router;
