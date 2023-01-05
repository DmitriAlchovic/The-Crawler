type CartItem = {
  productId: number;
  quantity: number;
};

const API_URL = 'http://localhost:5000/api/' || process.env.API_URL;

export const getCartProducts = async (items: CartItem[]) => {
  const response = await fetch(`${API_URL}product/list`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(items),
  });
  return response;
};

export const getProductByCategory = async (categoryName: string) => {
  const response = await fetch(`${API_URL}product/category/${categoryName}`);
  return response;
};

export const getProduct = async (productId: number) => {
  const response = await fetch(`${API_URL}product/${productId}`);
  return response;
};

export const getProductSearch = async (
  categoryName: string,
  searchStr: string,
) => {
  const response = await fetch(
    `${API_URL}product/search/${categoryName}/${searchStr}`,
  );
  return response;
};

export const getFeaturedProduct = async () => {
  const response = await fetch(`${API_URL}product/new/4`);
  return response;
};

export const getSubcategoryProducts = async (
  categoryName: string,
  page: number | string,
) => {
  const response = await fetch(`${API_URL}subcategory/${categoryName}/${page}`);
  return response;
};

export default {
  getCartProducts,
  getProductByCategory,
  getProduct,
  getProductSearch,
  getFeaturedProduct,
  getSubcategoryProducts,
};
