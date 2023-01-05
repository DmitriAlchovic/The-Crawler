import { Router } from 'express';
import product from './product.routes';
import category from './category.routes';
import user from './user.routes';

const router = Router();

router.use('/product', product);
router.use('/category', category);
router.use('/user', user);

export default router;
