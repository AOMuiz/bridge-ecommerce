import axios from 'axios';
import {Product} from 'src/types/products';

export const API_URL = 'https://fakestoreapi.com';

export const fetchProductInfo = async (
  id: string | number,
): Promise<Product> => {
  const {data} = await axios.get(`${API_URL}/products/${id}`);
  return data;
};
