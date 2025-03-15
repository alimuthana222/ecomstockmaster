
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { ProductTable } from '@/components/inventory/ProductTable';
import { mockProducts } from '@/data/mock-data';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

const Inventory = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Inventory</h1>
          <Button className="flex items-center gap-1">
            <PlusCircle className="h-4 w-4" /> Add Product
          </Button>
        </div>
        
        <ProductTable 
          products={mockProducts} 
          onAddProduct={() => {}}
          onEditProduct={() => {}}
          onDeleteProduct={() => {}}
        />
      </div>
    </Layout>
  );
};

export default Inventory;
