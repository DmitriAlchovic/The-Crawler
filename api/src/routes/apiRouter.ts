import { Router } from 'express';
import product from './product.routes';
import category from './category.routes';
import user from './user.routes';
import subcategory from './subcategory.routes';

const router = Router();

router.use('/product', product);
router.use('/category', category);
router.use('/subcategory', subcategory);
router.use('/user', user);

export default router;
