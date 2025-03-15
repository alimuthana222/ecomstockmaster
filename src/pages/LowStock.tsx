
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { mockProducts } from '@/data/mock-data';
import { Button } from '@/components/ui/button';
import { AlertTriangle, PackagePlus } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const LowStock = () => {
  const lowStockProducts = mockProducts
    .filter(product => product.stockQuantity < product.reorderLevel)
    .sort((a, b) => (a.stockQuantity / a.reorderLevel) - (b.stockQuantity / b.reorderLevel));

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-warning" />
            <h1 className="text-3xl font-bold tracking-tight">Low Stock Items</h1>
          </div>
          <Button>
            <PackagePlus className="mr-2 h-4 w-4" /> Reorder Items
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Items Below Reorder Level</CardTitle>
          </CardHeader>
          <CardContent>
            {lowStockProducts.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <div className="mx-auto w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mb-4">
                  <PackagePlus className="h-8 w-8 text-success" />
                </div>
                <h3 className="text-lg font-medium mb-1">No Low Stock Items</h3>
                <p>All inventory items are above their reorder levels.</p>
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>SKU</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">In Stock</TableHead>
                      <TableHead className="text-right">Reorder Level</TableHead>
                      <TableHead>Stock Status</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {lowStockProducts.map((product) => {
                      const stockPercentage = (product.stockQuantity / product.reorderLevel) * 100;
                      
                      return (
                        <TableRow key={product.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center overflow-hidden">
                                <img 
                                  src={product.image} 
                                  alt={product.name} 
                                  className="h-full w-full object-cover" 
                                />
                              </div>
                              {product.name}
                            </div>
                          </TableCell>
                          <TableCell>{product.sku}</TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell className="text-right">{product.stockQuantity}</TableCell>
                          <TableCell className="text-right">{product.reorderLevel}</TableCell>
                          <TableCell>
                            <div className="w-full space-y-1">
                              <Progress 
                                value={stockPercentage} 
                                className={`h-2 ${
                                  stockPercentage === 0 
                                    ? 'bg-destructive/20' 
                                    : stockPercentage < 50 
                                      ? 'bg-warning/20' 
                                      : 'bg-success/20'
                                }`} 
                              />
                              <p className="text-xs text-muted-foreground text-right">
                                {stockPercentage.toFixed(0)}% of reorder level
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Button size="sm" variant="outline">Order</Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default LowStock;
