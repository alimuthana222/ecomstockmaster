
import axios from 'axios';
import { Product, Supplier, InventoryTransaction } from '@/types/inventory';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const productService = {
  getAll: () => api.get<Product[]>('/products'),
  getById: (id: string) => api.get<Product>(`/products/${id}`),
  getLowStock: () => api.get<Product[]>('/products/low-stock'),
  create: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => 
    api.post<Product>('/products', product),
  update: (id: string, product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => 
    api.put<void>(`/products/${id}`, product),
  delete: (id: string) => api.delete<void>(`/products/${id}`),
};

export const supplierService = {
  getAll: () => api.get<Supplier[]>('/suppliers'),
  getById: (id: string) => api.get<Supplier>(`/suppliers/${id}`),
  getByProduct: (productId: string) => api.get<Supplier>(`/suppliers/product/${productId}`),
  create: (supplier: Omit<Supplier, 'id'>) => api.post<Supplier>('/suppliers', supplier),
  update: (id: string, supplier: Omit<Supplier, 'id'>) => 
    api.put<void>(`/suppliers/${id}`, supplier),
  delete: (id: string) => api.delete<void>(`/suppliers/${id}`),
};

export const transactionService = {
  getAll: () => api.get<InventoryTransaction[]>('/transactions'),
  getById: (id: string) => api.get<InventoryTransaction>(`/transactions/${id}`),
  getByProduct: (productId: string) => 
    api.get<InventoryTransaction[]>(`/transactions/product/${productId}`),
  create: (transaction: Omit<InventoryTransaction, 'id'>) => 
    api.post<InventoryTransaction>('/transactions', transaction),
  update: (id: string, transaction: Omit<InventoryTransaction, 'id'>) => 
    api.put<void>(`/transactions/${id}`, transaction),
  delete: (id: string) => api.delete<void>(`/transactions/${id}`),
};

export default api;
