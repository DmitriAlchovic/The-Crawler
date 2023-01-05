import { Router } from 'express';
import featuredController, {
  byCategoryController,
  cartController,
  searchByCategoryController,
} from '../controllers/product.controller';

interface CartItem {
  productId: number;
  quantity: number;
}

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
  console.log(categoryName, "Category");
  
  const discountList = await byCategoryController(categoryName);
  return res.status(200).json(discountList);
});

router.get('/search/:categoryName/:searchStr', async (req, res) => {
  const { categoryName } = req.params;
  const { searchStr } = req.params;
  const discountList = await searchByCategoryController(
    categoryName,
    searchStr,
  );
  console.log(discountList);

  return res.status(200).json(discountList);
});

router.post('/list/', async (req, res) => {
  console.log(req.body, "BODY");
  
  const cartItems = req.body;
  const idList = cartItems.map(({ productId }: CartItem) => productId);
  const productList = await cartController(idList);

  return res.status(200).json(productList);
});

export default router;
