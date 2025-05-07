import axios from 'axios';
const API_URL = 'http://localhost:5279/api'; 
export const getProducts = async () => {
  const res = await axios.get(`${API_URL}/products`);
  return res.data;
};
export const getProductDetails = async (id) => {
  const res = await axios.get(`${API_URL}/products/${id}`);
  return res.data;
};
export const createProduct = async (productData) => {
  const res = await axios.post(`${API_URL}/products`, productData);
  return res.data;
};

export const getProductTypes = async () => {
  const res = await axios.get(`${API_URL}/products/types`);
  return res.data;
};

export const getColours = async () => {
  const res = await axios.get(`${API_URL}/products/colours`);
  return res.data;
};

