import { Router } from 'express';
import product from './product.routes';
import category from './category.routes';

const router = Router();

router.use('/product', product);
router.use('/category', category)

export default router;
