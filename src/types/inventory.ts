
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

// Adding supplier information to enhance the inventory system
export interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  products: string[]; // Array of product IDs supplied by this supplier
}

// Transaction history for tracking inventory changes
export interface InventoryTransaction {
  id: string;
  productId: string;
  type: 'purchase' | 'sale' | 'adjustment';
  quantity: number;
  date: string;
  notes?: string;
}
