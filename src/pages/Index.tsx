
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { StatCard } from '@/components/dashboard/StatCard';
import { CategoryDistribution } from '@/components/dashboard/CategoryDistribution';
import { LowStockAlert } from '@/components/dashboard/LowStockAlert';
import { mockProducts, getInventoryStats } from '@/data/mock-data';
import { Package, DollarSign, ShoppingCart, Package2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductTable } from '@/components/inventory/ProductTable';
import { Link } from 'react-router-dom';

const Index = () => {
  const stats = getInventoryStats();

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <Button asChild>
            <Link to="/products">Manage Products</Link>
          </Button>
        </div>

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
            value={mockProducts.filter(p => p.stockQuantity === 0).length}
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
          <LowStockAlert products={mockProducts} />
        </div>

        <div>
          <ProductTable
            products={mockProducts.slice(0, 5)}
            onAddProduct={() => {}}
          />
          {mockProducts.length > 5 && (
            <div className="mt-4 flex justify-center">
              <Button variant="outline" asChild>
                <Link to="/products">View All Products</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Index;
