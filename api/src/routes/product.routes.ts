import { Router } from 'express';
import featuredController, { byCategoryController, searchByCategoryController } from '../controllers/product.controller';

const router = Router();

router.get('/new/:limit', async (req, res) => {
  const { limit } = req.params;
  console.log();

  const discountList = await featuredController(parseInt(limit));
  console.log(discountList);

  return res.status(200).json(discountList);
});

router.get('/category/:categoryName', async (req, res) => {
  const { categoryName } = req.params;
  const discountList = await byCategoryController(categoryName);
  console.log(discountList);

  return res.status(200).json(discountList);
});

router.get('/search/:categoryName/:searchStr', async (req, res) => {
  const { categoryName } = req.params;
  const {searchStr} = req.params;
  const discountList = await searchByCategoryController(categoryName, searchStr);
  console.log(discountList);

  return res.status(200).json(discountList);
});

export default router;
