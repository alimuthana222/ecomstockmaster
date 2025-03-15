
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ProductTable } from '@/components/inventory/ProductTable';
import { mockProducts } from '@/data/mock-data';
import { toast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ProductForm } from '@/components/inventory/ProductForm';
import { Product } from '@/types/inventory';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

const Products = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddProduct = () => {
    setSelectedProduct(undefined);
    setIsProductFormOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsProductFormOpen(true);
  };

  const handleDeleteProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteDialogOpen(true);
  };

  const handleProductFormSubmit = (data: any) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      if (selectedProduct) {
        // Update existing product
        setProducts(products.map(p => 
          p.id === selectedProduct.id ? { ...selectedProduct, ...data } : p
        ));
        toast({ title: "Product updated", description: `${data.name} has been updated.` });
      } else {
        // Add new product
        const newProduct: Product = {
          id: String(Date.now()),
          ...data,
          image: '/placeholder.svg',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setProducts([newProduct, ...products]);
        toast({ title: "Product added", description: `${data.name} has been added to inventory.` });
      }
      
      setIsProductFormOpen(false);
      setIsSubmitting(false);
    }, 600);
  };

  const confirmDelete = () => {
    if (!selectedProduct) return;
    
    // Filter out the product to delete
    setProducts(products.filter(p => p.id !== selectedProduct.id));
    toast({ 
      title: "Product deleted", 
      description: `${selectedProduct.name} has been removed from inventory.`,
      variant: "destructive"
    });
    
    setIsDeleteDialogOpen(false);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Products</h1>
        
        <ProductTable 
          products={products}
          onAddProduct={handleAddProduct}
          onEditProduct={handleEditProduct}
          onDeleteProduct={handleDeleteProduct}
        />
        
        {/* Product Form Dialog */}
        <Dialog open={isProductFormOpen} onOpenChange={setIsProductFormOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{selectedProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
            </DialogHeader>
            <ProductForm
              product={selectedProduct}
              onSubmit={handleProductFormSubmit}
              onCancel={() => setIsProductFormOpen(false)}
              isSubmitting={isSubmitting}
            />
          </DialogContent>
        </Dialog>
        
        {/* Delete Confirmation Dialog */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete {selectedProduct?.name} from your inventory.
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Layout>
  );
};

export default Products;
