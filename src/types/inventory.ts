
export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  cost: number;
  stockQuantity: number;
  reorderLevel: number;
  image: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategorySummary {
  name: string;
  count: number;
  value: number;
}

export interface InventoryStats {
  totalProducts: number;
  lowStockCount: number;
  totalValue: number;
  categories: CategorySummary[];
}
