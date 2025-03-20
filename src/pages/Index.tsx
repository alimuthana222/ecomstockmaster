
import React, { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { StatCard } from '@/components/dashboard/StatCard';
import { CategoryDistribution } from '@/components/dashboard/CategoryDistribution';
import { LowStockAlert } from '@/components/dashboard/LowStockAlert';
import { Package, DollarSign, ShoppingCart, Package2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductTable } from '@/components/inventory/ProductTable';
import { Link } from 'react-router-dom';
import { productService } from '@/services/api';
import { Product } from '@/types/inventory';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalValue: 0,
    outOfStock: 0,
    lowStockCount: 0,
    categories: [] as {name: string, count: number, value: number}[]
  });
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all products
        const productsResponse = await productService.getAll();
        const productsData = productsResponse.data;
        setProducts(productsData);
        
        // Fetch low stock products
        const lowStockResponse = await productService.getLowStock();
        const lowStockData = lowStockResponse.data;
        
        // Calculate dashboard statistics
        const totalValue = productsData.reduce(
          (sum, product) => sum + (product.price * product.stockQuantity), 
          0
        );
        
        const outOfStock = productsData.filter(p => p.stockQuantity === 0).length;
        
        // Get unique categories and count products in each
        const categoryMap = productsData.reduce((acc, product) => {
          if (!acc[product.category]) {
            acc[product.category] = {
              count: 0,
              value: 0
            };
          }
          acc[product.category].count++;
          acc[product.category].value += (product.price * product.stockQuantity);
          return acc;
        }, {} as Record<string, {count: number, value: number}>);
        
        const categories = Object.entries(categoryMap).map(([name, data]) => ({
          name,
          count: data.count,
          value: data.value
        }));
        
        setStats({
          totalProducts: productsData.length,
          totalValue,
          outOfStock,
          lowStockCount: lowStockData.length,
          categories
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: "Error",
          description: "Failed to fetch inventory data",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <Button asChild>
            <Link to="/products">Manage Products</Link>
          </Button>
        </div>

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 rounded-lg border border-border animate-pulse bg-muted" />
            ))}
          </div>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="Total Products"
                value={stats.totalProducts}
                icon={<Package className="h-full w-full" />}
                trend={{ value: 12, positive: true }}
              />
              <StatCard
                title="Inventory Value"
                value={`$${stats.totalValue.toFixed(2)}`}
                icon={<DollarSign className="h-full w-full" />}
                trend={{ value: 8.2, positive: true }}
              />
              <StatCard
                title="Out of Stock"
                value={stats.outOfStock}
                icon={<ShoppingCart className="h-full w-full" />}
                trend={{ value: 2.8, positive: false }}
              />
              <StatCard
                title="Low Stock Items"
                value={stats.lowStockCount}
                description="Items below reorder level"
                icon={<Package2 className="h-full w-full" />}
                className={stats.lowStockCount > 0 ? "border-warning/50" : ""}
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <CategoryDistribution categories={stats.categories} />
              <LowStockAlert products={products.filter(p => p.stockQuantity < p.reorderLevel)} />
            </div>

            <div>
              <ProductTable
                products={products.slice(0, 5)}
                onAddProduct={() => {}}
              />
              {products.length > 5 && (
                <div className="mt-4 flex justify-center">
                  <Button variant="outline" asChild>
                    <Link to="/products">View All Products</Link>
                  </Button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Index;
