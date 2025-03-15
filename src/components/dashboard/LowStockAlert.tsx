
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Product } from '@/types/inventory';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface LowStockAlertProps {
  products: Product[];
}

export function LowStockAlert({ products }: LowStockAlertProps) {
  const lowStockProducts = products
    .filter(product => product.stockQuantity < product.reorderLevel)
    .sort((a, b) => (a.stockQuantity / a.reorderLevel) - (b.stockQuantity / b.reorderLevel));

  return (
    <Card className="col-span-1">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Low Stock Alerts</CardTitle>
        <div className="h-8 w-8 rounded-full bg-warning/20 p-1.5 text-warning">
          <AlertTriangle className="h-full w-full" />
        </div>
      </CardHeader>
      <CardContent>
        {lowStockProducts.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            No low stock items to display
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {lowStockProducts.slice(0, 5).map(product => (
                <div key={product.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="h-full w-full object-cover" 
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium leading-none">{product.name}</p>
                      <p className="text-xs text-muted-foreground">SKU: {product.sku}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      product.stockQuantity === 0 
                        ? 'bg-destructive/15 text-destructive' 
                        : 'bg-warning/15 text-warning'
                    }`}>
                      {product.stockQuantity} left
                    </span>
                  </div>
                </div>
              ))}
            </div>
            {lowStockProducts.length > 5 && (
              <div className="mt-4 text-center">
                <Button variant="link" asChild>
                  <Link to="/low-stock">View all {lowStockProducts.length} low stock items</Link>
                </Button>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
