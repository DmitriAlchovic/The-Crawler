import { Op } from 'sequelize';
import { Category } from '../models/category.model';
import { Discount } from '../models/discount.model';
import { ProductInventory } from '../models/inventory.model';
import { Product } from '../models/product.model';
import { Subcategory } from '../models/subcategory.model';

const featuredController = async (limit: number) => {
  return await Product.findAll({
    order: ['updatedAt'],
    raw: true,
    nest: true,
    attributes: ['productId', 'name', 'gallery', 'desc', 'price'],
    include: [
      {
        model: Discount,
        attributes: ['name', 'desc', 'discountPercent'],
        order: ['updatedAt'],
      },
      {
        model: Subcategory,
        include: [{ model: Category, attributes: ['name'] }],
      },
      {
        model: ProductInventory,
        attributes: ['currentQuantity', 'initialQuantity'],
      },
    ],
    limit: limit,
  });
};

export const byCategoryController = async (categoryName: string) => {
  if (categoryName === 'All') {
    return await Product.findAll({
      order: ['updatedAt'],
      raw: true,
      nest: true,
      attributes: ['productId', 'name', 'gallery', 'desc', 'price'],
      include: [
        {
          model: Discount,
          attributes: ['name', 'desc', 'discountPercent'],
          order: ['updatedAt'],
        },
        {
          model: Subcategory,
          include: [{ model: Category, attributes: ['name'] }],
        },
        {
          model: ProductInventory,
          attributes: ['currentQuantity', 'initialQuantity'],
        },
      ],
    });
  } else
    return await Product.findAll({
      order: ['updatedAt'],
      raw: true,
      nest: true,
      attributes: ['productId', 'name', 'gallery', 'desc', 'price'],
      include: [
        {
          model: Subcategory,
          include: [
            {
              model: Category,
              attributes: ['name'],
              where: { name: categoryName },
              required: true,
            },
          ],
          attributes: ['categoryId'],
        },
      ],
    }).then((product) =>
      product.filter(({ subcategory }) => subcategory.category.name !== null),
    );
};

export const searchByCategoryController = async (
  categoryName: string,
  str: string,
) => {
  if (categoryName === 'All categories') {
    return await Product.findAll({
      where: {name:{[Op.substring]:str}},
      raw: true,
      nest: true,
      attributes: ['productId', 'name', 'gallery', 'desc', 'price'],
      include: [
        {
          model: Discount,
          attributes: ['name', 'desc', 'discountPercent'],
          order: ['updatedAt'],
        },
        {
          model: Subcategory,
          include: [{ model: Category, attributes: ['name'] }],
        },
        {
          model: ProductInventory,
          attributes: ['currentQuantity', 'initialQuantity'],
        },
      ],
    });
  } else
    return await Product.findAll({
      where: {name:{[Op.substring]:str}},
      raw: true,
      nest: true,
      attributes: ['productId', 'name', 'gallery', 'desc', 'price'],
      include: [
        {
          model: Discount,
          attributes: ['name', 'desc', 'discountPercent'],
          order: ['updatedAt'],
        },
        {
          model: Subcategory,
          include: [
            {
              model: Category,
              attributes: ['name'],
              where: { name: categoryName },
              required: true,
            },
          ],
          attributes: ['categoryId'],
        },
        {
          model: ProductInventory,
          attributes: ['currentQuantity', 'initialQuantity'],
        },
      ],
    }).then((product) =>
      product.filter(({ subcategory }) => subcategory.category.name !== null),
    );
};

export const cartController = async (idList: number[]) => {
  return await Product.findAll({
    where: {productId: idList},
    raw: true,
    nest: true,
    attributes: ['productId', 'name', 'gallery', 'desc', 'price'],
    include: [
      {
        model: Discount,
        attributes: ['name', 'desc', 'discountPercent'],
      },
      {
        model: Subcategory,
        include: [{ model: Category, attributes: ['name'] }],
      },
      {
        model: ProductInventory,
        attributes: ['currentQuantity', 'initialQuantity'],
      },
    ],
  });
};
export default featuredController;
