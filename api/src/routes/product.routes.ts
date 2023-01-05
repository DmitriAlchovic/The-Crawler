import { Router } from 'express';
import newProductsHandler from '../handlers/product/newProducts.handler';
import productHandler from '../handlers/product/product.handler';
import productByCategoryHandler from '../handlers/product/productByCategory.handler';
import productListHandler from '../handlers/product/productList.handler';
import productSearchHandler from '../handlers/product/productSearch.handler';



const router = Router();

router.get('/:productId', productHandler)

router.get('/new/:limit', newProductsHandler);

router.get('/category/:categoryName', productByCategoryHandler );

router.get('/search/:categoryName/:searchStr', productSearchHandler );

router.post('/list/', productListHandler );

export default router;
