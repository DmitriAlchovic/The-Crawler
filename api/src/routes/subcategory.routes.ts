import { Router } from 'express';
import {
  categoryController,
  subcategoryByNameController,
} from '../controllers/category.controller';
import {
  discountProductController,
  discountProductControllerCount,
  hotDealProducts,
  hotDealProductsCount,
  newProducts,
  newProductsCount,
  subcategoryProductController,
  subcategoryProductControllerCount,
} from '../controllers/product.controller';

const router = Router();

router.get('/:subcategoryName/:page', async (req, res) => {
  const { subcategoryName } = req.params;
  const page = (parseInt(req.params.page)-1);
  console.log(subcategoryName, 'SUBCATEGORY');

  switch (subcategoryName) {
    case 'promotions':
      const promotionsList = await discountProductController(page);
      const discountCount = await discountProductControllerCount();
      console.log(promotionsList);
      return res.status(200).json({products:promotionsList, count:discountCount});

    case 'new':
      const newProductsList = await newProducts(page);
      const newCount = await newProductsCount();
      
      return res.status(200).json({products:newProductsList, count:newCount});

    case 'hot':
      const hotProductsList = await hotDealProducts(page);
      const hotCount = await hotDealProductsCount();
      console.log(hotProductsList);

      return res.status(200).json({products: hotProductsList, count:hotCount});

    default:
        
      const subcategoryList = await subcategoryByNameController(
        subcategoryName,
      );
      if (subcategoryList) {
        const productsList = await subcategoryProductController(
          subcategoryList.subcategoryId,
          page,
        );
        const subcategoryCount = await subcategoryProductControllerCount(subcategoryList.subcategoryId);
        return res.status(200).json({products:productsList, count:subcategoryCount});
      }
      break;
  }
});

export default router;
