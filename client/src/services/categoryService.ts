const API_URL = 'http://localhost:5000/api/' || process.env.API_URL;

export const getCategoryByName = async (categoryName: string) => {
  const response = await fetch(
    `${API_URL}category/${categoryName}`,
  );
  return response;
};

export const getCategoryList = async () => {
  const response = await fetch(`${API_URL}category/`);
  return response;
};

export default { getCategoryByName, getCategoryList };
