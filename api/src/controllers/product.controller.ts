import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript/dist/sequelize/sequelize/sequelize';
import { PAGE_ITEMS_COUNT } from '../constants';
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

export const searchByCategoryController = async (
  categoryName: string,
  str: string,
) => {
  if (categoryName === 'All categories') {
    return await Product.findAll({
      where: { name: { [Op.substring]: str } },
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
      where: { name: { [Op.substring]: str } },
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
    where: { productId: idList },
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

export const productController = async (productId: number) => {
  return await Product.findOne({
    where: { productId: productId },
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

export const subcategoryProductController = async (
  subcategoryId: number,
  page: number,
) => {
  console.log(subcategoryId, 'SUBCATEGORY ID');

  return await Product.findAll({
    limit: PAGE_ITEMS_COUNT,
    offset: PAGE_ITEMS_COUNT * page,
    raw: true,
    nest: true,
    attributes: [
      'productId',
      'name',
      'gallery',
      'desc',
      'price',
      'subcategoryId',
    ],
    include: [
      {
        model: Subcategory,
        where: { subcategoryId: subcategoryId },
        include: [{ model: Category, attributes: ['name'] }],
      },
      {
        model: Discount,
        attributes: ['name', 'desc', 'discountPercent'],
      },
      {
        model: ProductInventory,
        attributes: ['currentQuantity', 'initialQuantity'],
      },
    ],
  });
};

export const subcategoryProductControllerCount = async (
  subcategoryId: number,
) => {
  console.log(subcategoryId, 'SUBCATEGORY ID');

  return await Product.count({
    include: [
      {
        model: Subcategory,
        where: { subcategoryId: subcategoryId },
      },
    ],
  });
};

export const discountProductController = async (page: number) => {
  return await Product.findAll({
    limit: PAGE_ITEMS_COUNT,
    offset: PAGE_ITEMS_COUNT * page,
    raw: true,
    nest: true,
    attributes: ['productId', 'name', 'gallery', 'desc', 'price'],
    include: [
      {
        model: Discount,
        where: {
          discountPercent: { [Op.not]: null },
          active: { [Op.is]: true },
        },
        attributes: ['name', 'desc', 'discountPercent'],
        as: 'discount',
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
    order: [['discount', 'discountPercent', 'DESC']],
  });
};

export const discountProductControllerCount = async () => {
  return await Product.count({
    include: [
      {
        model: Discount,
        where: {
          discountPercent: { [Op.not]: null },
          active: { [Op.is]: true },
        },
      },
    ],
  });
};

export const hotDealProducts = async (page: number) => {
  return await Product.findAll({
    limit: PAGE_ITEMS_COUNT,
    offset: PAGE_ITEMS_COUNT * page,
    raw: true,
    nest: true,
    attributes: ['productId', 'name', 'gallery', 'desc', 'price'],
    include: [
      {
        model: Discount,
        where: { hot: true },
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

export const hotDealProductsCount = async () => {
  return await Product.count({
    include: [
      {
        model: Discount,
        where: { hot: true },
      },
    ],
  });
};

export const newProducts = async (page: number) => {
  return await Product.findAll({
    where: { new: true },
    limit: PAGE_ITEMS_COUNT,
    offset: PAGE_ITEMS_COUNT * page,
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

export const newProductsCount = async () => {
  return await Product.count({
    where: { new: true },
  });
};

export default featuredController;
