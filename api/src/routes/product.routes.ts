import { Router } from 'express';
import featuredController, {
  byCategoryController,
  cartController,
  productController,
  searchByCategoryController,
} from '../controllers/product.controller';

interface CartItem {
  productId: number;
  quantity: number;
}

const router = Router();

router.get('/:productId', async (req, res) => {
  const { productId } = req.params;
  const product = await productController(parseInt(productId));
  console.log(product, productId);
  
  return res.status(200).json(product);
})

router.get('/new/:limit', async (req, res) => {
  const { limit } = req.params;
  const discountList = await featuredController(parseInt(limit));

  return res.status(200).json(discountList);
});

router.get('/category/:categoryName', async (req, res) => {
  const { categoryName } = req.params;
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

  return res.status(200).json(discountList);
});

router.post('/list/', async (req, res) => {
  const cartItems = req.body;
  const idList = cartItems.map(({ productId }: CartItem) => productId);
  const productList = await cartController(idList);

  return res.status(200).json(productList);
});

export default router;
