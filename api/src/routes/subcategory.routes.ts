import { Router } from 'express';
import subcategoryHandler from '../handlers/subcategory/subcategory.handler';

const router = Router();

router.get('/:subcategoryName/:page', subcategoryHandler);

export default router;
