
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  ArrowLeft, 
  Package, 
  Info, 
  Building, 
  Clock,
  TrendingUp,
  TrendingDown,
  AlertTriangle
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { 
  mockProducts, 
  getProductSupplier, 
  getProductTransactions 
} from '@/data/mock-data';
import { InventoryTransaction } from '@/types/inventory';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = mockProducts.find(p => p.id === id);
  const supplier = product ? getProductSupplier(product.id) : undefined;
  const transactions = product ? getProductTransactions(product.id) : [];

  if (!product) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-96">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Button asChild>
            <Link to="/products">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
            </Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const getLowStockBadge = () => {
    if (product.stockQuantity <= product.reorderLevel) {
      return <Badge variant="destructive">Low Stock</Badge>;
    }
    return null;
  };

  const getTransactionIcon = (type: InventoryTransaction['type']) => {
    switch (type) {
      case 'purchase':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'sale':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      case 'adjustment':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button variant="outline" asChild>
              <Link to="/products">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Link>
            </Button>
            <h1 className="text-2xl font-bold">Product Details</h1>
          </div>
          <Button>Edit Product</Button>
        </div>

        {/* Product Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl">Product Overview</CardTitle>
                {getLowStockBadge()}
              </div>
              <CardDescription>Product information and inventory details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <div className="aspect-square relative rounded-lg overflow-hidden border">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">{product.description}</p>
                  </div>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">SKU</p>
                      <p>{product.sku}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Category</p>
                      <p>{product.category}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Price</p>
                      <p>${product.price.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Cost</p>
                      <p>${product.cost.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Stock Quantity</p>
                      <p className={product.stockQuantity <= product.reorderLevel ? "text-red-500 font-medium" : ""}>
                        {product.stockQuantity}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Reorder Level</p>
                      <p>{product.reorderLevel}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Profit Margin</p>
                      <p>{((product.price - product.cost) / product.price * 100).toFixed(2)}%</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Stock Value</p>
                      <p>${(product.stockQuantity * product.cost).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Supplier Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Building className="mr-2 h-5 w-5" /> Supplier
              </CardTitle>
              <CardDescription>Contact information for the supplier</CardDescription>
            </CardHeader>
            <CardContent>
              {supplier ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">{supplier.name}</h3>
                    <p className="text-sm text-muted-foreground">Primary Supplier</p>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Contact Person</p>
                      <p>{supplier.contactPerson}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Email</p>
                      <p className="underline hover:text-primary">{supplier.email}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Phone</p>
                      <p>{supplier.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Address</p>
                      <p className="text-sm">{supplier.address}</p>
                    </div>
                  </div>
                  
                  <Button className="w-full" variant="outline">Contact Supplier</Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-40 text-center">
                  <Info className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">No supplier information available</p>
                  <Button variant="ghost" className="mt-2">Add Supplier</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Transaction History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Clock className="mr-2 h-5 w-5" /> Transaction History
            </CardTitle>
            <CardDescription>Recent inventory changes for this product</CardDescription>
          </CardHeader>
          <CardContent>
            {transactions.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>
                        {format(new Date(transaction.date), 'MMM d, yyyy')}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          {getTransactionIcon(transaction.type)}
                          <span className="capitalize">{transaction.type}</span>
                        </div>
                      </TableCell>
                      <TableCell className={
                        transaction.quantity > 0 
                          ? "text-green-600" 
                          : transaction.quantity < 0 
                          ? "text-red-600" 
                          : ""
                      }>
                        {transaction.quantity > 0 ? `+${transaction.quantity}` : transaction.quantity}
                      </TableCell>
                      <TableCell>{transaction.notes || '-'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <Package className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No transactions recorded for this product</p>
                <Button variant="outline" className="mt-4">Add Transaction</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ProductDetail;
