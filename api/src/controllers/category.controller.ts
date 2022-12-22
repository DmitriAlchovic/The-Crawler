import { Category } from '../models/category.model';
import { Product } from '../models/product.model';
import { Subcategory } from '../models/subcategory.model';

export const subcategoryController = async (categoryName: string) => {
  if (categoryName === 'All') {
    return await Subcategory.findAll({
      raw: true,
      nest: true,
      attributes: ['name', 'image'],
      include: [
        {
          model: Product,
          attributes: ['productId'],
        },
      ],
    });
  } else
    return await Subcategory.findAll({
      raw: true,
      nest: true,
      attributes: ['name', 'image'],
      include: [
        {
          model: Product,
          attributes: ['productId'],
        },
        {
          model: Category,
          attributes: ['categoryId'],
          where: { name: categoryName },
        },
      ],
    });
};

export const categoryController = async () => {
  return await Category.findAll({
    raw: true,
    nest: true,
    attributes: ['name'],
  });
};

export default { subcategoryController, categoryController };
