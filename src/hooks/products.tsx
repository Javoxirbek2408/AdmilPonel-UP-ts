import { toast } from 'react-toastify';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CREATE_PRODUCT, PRODUCTS } from '../constants/indes';
import request from '../services';
import type { AxiosError } from 'axios';

export interface Product {
  id: number;
  name: string;
  category: string;
  image: string;
  price: number;
  rating: number;
  inStock: number | string;
}

interface ProductQueryParams {
  limit: number;
  skip: number;
}

interface CreateProductData {
  id?: number;
  name: string;
  category: string;
  image: string;
  price: number;
  rating: number;
  inStock: number | string;
}

export const useGetProducts = ({ limit, skip }: ProductQueryParams) => {
  const query = { limit, skip };

  return useQuery<Product[], Error>({
    queryKey: ['products', query],
    queryFn: async () => {
      const res = await request.get(PRODUCTS, { params: query });
      return res.data;
    },
  onError: (error: unknown) => {
  const axiosError = error as AxiosError;

  if (axiosError.response?.status === 401) {
    console.log('User query unauthorized');
  } else {
    console.error('Unexpected error in useUser:', error);
  }
},,
  });
}; //yuborish

export const useCreateProduct = () => {
  const qc = useQueryClient();

  return useMutation<Product, Error, CreateProductData>({
    mutationFn: async ({ id, ...data }) => {
      if (id) {
        const res = await request.put(`${PRODUCTS}/${id}`, data);
        return res.data;
      } else {
        const res = await request.post(CREATE_PRODUCT, data);
        return res.data;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['products'] });
    },
    onError: (error) => {
      console.error(error);
      toast.error('Failed to create/update product');
    },
  });
}; //

export const useDeleteProduct = () => {
  const qc = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: async (id) => {
      await request.delete(`${PRODUCTS}/${id}`);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['products'] });
    },
    onError: (error) => {
      console.error(error);
      toast.error('Failed to delete product');
    },
  });
};
