
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShieldCheck, Search, Package } from "lucide-react";
import Layout from "@/components/Layout";
import { useTransaction, Product } from "@/context/TransactionContext";
import { useAuth } from "@/context/AuthContext";

const ProductCard = ({ product }: { product: Product }) => {
  const { initiateTransaction } = useTransaction();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  
  const handlePurchase = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    initiateTransaction(product.id);
    navigate('/dashboard');
  };

  const canPurchase = isAuthenticated && user?.role === 'buyer';
  
  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full transition-transform hover:scale-105 duration-300"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-lg">{product.name}</CardTitle>
        <CardDescription className="flex justify-between items-center">
          <span>{product.category}</span>
          <span className="font-medium text-black">${product.price.toFixed(2)}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {product.description}
        </p>
        <div className="mt-4 flex items-center text-xs text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-escrow-blue mr-1" />
          <span>Escrow Protected</span>
        </div>
      </CardContent>
      <CardFooter className="mt-auto">
        <div className="w-full flex flex-col space-y-2">
          <div className="text-sm">
            <span className={`${product.stock > 0 ? 'text-escrow-green' : 'text-escrow-red'} font-medium`}>
              {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
            </span>
            <span className="text-muted-foreground ml-2">·</span>
            <span className="text-muted-foreground ml-2">Sold by {product.sellerName}</span>
          </div>
          <Button 
            onClick={handlePurchase} 
            disabled={!canPurchase || product.stock === 0}
            className="w-full"
          >
            {!isAuthenticated ? 'Login to Buy' : 
              !canPurchase ? 'Seller Account' : 
              product.stock === 0 ? 'Out of Stock' : 
              'Secure Purchase'}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

const ProductsPage = () => {
  const { products } = useTransaction();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  
  // Get unique categories
  const categories = Array.from(new Set(products.map(product => product.category)));
  
  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || product.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-escrow-blue to-blue-700 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-display font-bold mb-4">Shop with Confidence</h1>
            <p className="text-lg mb-8">
              Browse our products with the peace of mind that comes with escrow payment protection.
            </p>
            
            <div className="relative">
              <Search className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-10 bg-white/10 border-white/20 placeholder:text-white/70 text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Filter Bar */}
          <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center">
              <Package className="h-5 w-5 text-escrow-blue mr-2" />
              <h2 className="text-xl font-semibold">Products</h2>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button
                variant={categoryFilter === null ? "default" : "outline"}
                size="sm"
                onClick={() => setCategoryFilter(null)}
              >
                All
              </Button>
              {categories.map(category => (
                <Button
                  key={category}
                  variant={categoryFilter === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCategoryFilter(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground">
                We couldn't find any products matching your search criteria.
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default ProductsPage;
