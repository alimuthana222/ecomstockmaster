
import { Product, InventoryStats, CategorySummary, Supplier, InventoryTransaction } from '../types/inventory';

// Sample product data
export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    sku: 'ELEC-001',
    category: 'Electronics',
    price: 129.99,
    cost: 65.00,
    stockQuantity: 34,
    reorderLevel: 10,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    description: 'High-quality wireless headphones with noise cancellation.',
    createdAt: new Date(2023, 2, 15).toISOString(),
    updatedAt: new Date(2023, 6, 20).toISOString(),
  },
  {
    id: '2',
    name: 'Organic Cotton T-Shirt',
    sku: 'APRL-022',
    category: 'Apparel',
    price: 24.99,
    cost: 8.50,
    stockQuantity: 78,
    reorderLevel: 20,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    description: 'Soft, comfortable 100% organic cotton t-shirt.',
    createdAt: new Date(2023, 1, 10).toISOString(),
    updatedAt: new Date(2023, 5, 5).toISOString(),
  },
  {
    id: '3',
    name: 'Stainless Steel Water Bottle',
    sku: 'HOME-108',
    category: 'Home Goods',
    price: 19.99,
    cost: 7.25,
    stockQuantity: 52,
    reorderLevel: 15,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    description: 'Durable, insulated stainless steel water bottle.',
    createdAt: new Date(2023, 3, 20).toISOString(),
    updatedAt: new Date(2023, 7, 12).toISOString(),
  },
  {
    id: '4',
    name: 'Smartphone Stand',
    sku: 'ELEC-032',
    category: 'Electronics',
    price: 15.99,
    cost: 4.50,
    stockQuantity: 8,
    reorderLevel: 10,
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    description: 'Adjustable smartphone stand with non-slip base.',
    createdAt: new Date(2023, 4, 8).toISOString(),
    updatedAt: new Date(2023, 8, 3).toISOString(),
  },
  {
    id: '5',
    name: 'Leather Wallet',
    sku: 'ACCS-067',
    category: 'Accessories',
    price: 49.99,
    cost: 18.75,
    stockQuantity: 42,
    reorderLevel: 12,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    description: 'Genuine leather wallet with multiple card slots.',
    createdAt: new Date(2023, 2, 5).toISOString(),
    updatedAt: new Date(2023, 6, 30).toISOString(),
  },
  {
    id: '6',
    name: 'Yoga Mat',
    sku: 'FITN-045',
    category: 'Fitness',
    price: 32.99,
    cost: 12.00,
    stockQuantity: 22,
    reorderLevel: 8,
    image: 'https://images.unsplash.com/photo-1599447292180-45fd84092f64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    description: 'Non-slip, eco-friendly yoga mat.',
    createdAt: new Date(2023, 5, 12).toISOString(),
    updatedAt: new Date(2023, 9, 18).toISOString(),
  },
  {
    id: '7',
    name: 'Coffee Grinder',
    sku: 'HOME-076',
    category: 'Home Goods',
    price: 59.99,
    cost: 28.50,
    stockQuantity: 5,
    reorderLevel: 7,
    image: 'https://images.unsplash.com/photo-1625525832338-c6055e6b5d45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    description: 'Electric coffee grinder with adjustable settings.',
    createdAt: new Date(2023, 1, 22).toISOString(),
    updatedAt: new Date(2023, 7, 7).toISOString(),
  },
  {
    id: '8',
    name: 'Wireless Charger',
    sku: 'ELEC-089',
    category: 'Electronics',
    price: 29.99,
    cost: 14.25,
    stockQuantity: 3,
    reorderLevel: 10,
    image: 'https://images.unsplash.com/photo-1608748717452-d7ff3243286b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    description: 'Fast wireless charging pad compatible with multiple devices.',
    createdAt: new Date(2023, 4, 17).toISOString(),
    updatedAt: new Date(2023, 8, 9).toISOString(),
  },
];

// Sample supplier data
export const mockSuppliers: Supplier[] = [
  {
    id: '1',
    name: 'Tech Distributors Inc.',
    contactPerson: 'John Smith',
    email: 'john@techdist.com',
    phone: '555-123-4567',
    address: '123 Tech Avenue, San Francisco, CA 94107',
    products: ['1', '4', '8'] // Electronics products
  },
  {
    id: '2',
    name: 'Apparel Wholesale Co.',
    contactPerson: 'Lisa Johnson',
    email: 'lisa@apparelwholesale.com',
    phone: '555-987-6543',
    address: '456 Fashion Blvd, New York, NY 10001',
    products: ['2'] // Apparel products
  },
  {
    id: '3',
    name: 'Home Goods Supply',
    contactPerson: 'Michael Brown',
    email: 'michael@homegoods.com',
    phone: '555-567-8901',
    address: '789 Home Street, Chicago, IL 60607',
    products: ['3', '7'] // Home goods products
  }
];

// Sample transaction history
export const mockTransactions: InventoryTransaction[] = [
  {
    id: '1',
    productId: '1',
    type: 'purchase',
    quantity: 20,
    date: new Date(2023, 9, 15).toISOString(),
    notes: 'Restocked from Tech Distributors Inc.'
  },
  {
    id: '2',
    productId: '2',
    type: 'sale',
    quantity: -5,
    date: new Date(2023, 9, 18).toISOString()
  },
  {
    id: '3',
    productId: '8',
    type: 'purchase',
    quantity: 10,
    date: new Date(2023, 9, 20).toISOString(),
    notes: 'Emergency restock due to low inventory'
  }
];

// Calculate inventory stats
export const getInventoryStats = (): InventoryStats => {
  const totalProducts = mockProducts.length;
  
  const lowStockCount = mockProducts.filter(p => p.stockQuantity < p.reorderLevel).length;
  
  const totalValue = mockProducts.reduce((total, product) => {
    return total + (product.stockQuantity * product.cost);
  }, 0);

  // Gather categories
  const categoryMap = new Map<string, { count: number; value: number }>();
  
  mockProducts.forEach(product => {
    if (!categoryMap.has(product.category)) {
      categoryMap.set(product.category, { count: 0, value: 0 });
    }
    
    const category = categoryMap.get(product.category)!;
    category.count += 1;
    category.value += product.stockQuantity * product.cost;
  });

  const categories: CategorySummary[] = Array.from(categoryMap.entries()).map(([name, { count, value }]) => ({
    name,
    count,
    value
  }));

  return {
    totalProducts,
    lowStockCount,
    totalValue,
    categories
  };
};

// Get recent transactions for a product
export const getProductTransactions = (productId: string): InventoryTransaction[] => {
  return mockTransactions.filter(t => t.productId === productId);
};

// Get supplier for a product
export const getProductSupplier = (productId: string): Supplier | undefined => {
  return mockSuppliers.find(s => s.products.includes(productId));
};
