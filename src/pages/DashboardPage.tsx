
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { useAuth } from "@/context/AuthContext";
import { useTransaction, TransactionStatus } from "@/context/TransactionContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Package,
  Truck,
  ShoppingBag,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

const TransactionCard = ({ 
  transaction, 
  isBuyer = false,
  onUpdateStatus 
}: { 
  transaction: any, 
  isBuyer?: boolean,
  onUpdateStatus: (id: string, status: TransactionStatus) => void 
}) => {
  const getStatusClass = () => {
    switch (transaction.status) {
      case "pending": return "escrow-status-pending";
      case "secured": return "escrow-status-secured";
      case "shipped": return "escrow-status-shipped";
      case "delivered": return "escrow-status-delivered";
      case "completed": return "escrow-status-completed";
      case "disputed": return "escrow-status-disputed";
      case "refunded": return "escrow-status-disputed";
      default: return "";
    }
  };

  // Format the date to a readable string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Determine what action is available based on transaction status and user role
  const renderActionButton = () => {
    if (isBuyer) {
      // Buyer actions
      switch (transaction.status) {
        case "shipped":
          return (
            <Button 
              onClick={() => onUpdateStatus(transaction.id, "delivered")}
              size="sm"
            >
              Confirm Delivery
            </Button>
          );
        case "delivered":
          return (
            <Button 
              onClick={() => onUpdateStatus(transaction.id, "completed")}
              size="sm"
            >
              Release Payment
            </Button>
          );
        case "secured":
          return (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onUpdateStatus(transaction.id, "disputed")}
              className="text-escrow-red border-escrow-red hover:bg-escrow-red/10"
            >
              Report Issue
            </Button>
          );
        default:
          return null;
      }
    } else {
      // Seller actions
      switch (transaction.status) {
        case "secured":
          return (
            <Button 
              onClick={() => onUpdateStatus(transaction.id, "shipped")}
              size="sm"
            >
              Mark as Shipped
            </Button>
          );
        default:
          return null;
      }
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{transaction.productName}</CardTitle>
            <CardDescription className="mt-1">
              Order #{transaction.id} • {formatDate(transaction.createdAt)}
            </CardDescription>
          </div>
          <span className={getStatusClass()}>
            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 mb-4">
          <img 
            src={transaction.productImage}
            alt={transaction.productName}
            className="w-16 h-16 object-cover rounded-md"
          />
          <div>
            <div className="text-lg font-semibold">${transaction.amount.toFixed(2)}</div>
            <div className="text-sm text-muted-foreground">
              {isBuyer 
                ? `Seller: ${transaction.sellerName}` 
                : `Buyer: ${transaction.buyerName}`}
            </div>
          </div>
        </div>
        
        {/* Transaction Progress */}
        <div className="mt-4">
          <div className="flex justify-between mb-1 text-xs text-muted-foreground">
            <span>Payment</span>
            <span>Shipping</span>
            <span>Delivery</span>
            <span>Complete</span>
          </div>
          <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
            {/* Dynamic progress based on status */}
            <div 
              className={`absolute top-0 left-0 h-full bg-escrow-blue transition-all duration-500`}
              style={{
                width: transaction.status === "pending" ? "0%" :
                       transaction.status === "secured" ? "25%" :
                       transaction.status === "shipped" ? "50%" :
                       transaction.status === "delivered" ? "75%" :
                       transaction.status === "completed" ? "100%" :
                       transaction.status === "disputed" ? "100%" : "0%",
                backgroundColor: transaction.status === "disputed" ? "#dc3545" : ""
              }}
            ></div>
          </div>
        </div>
        
        <div className="mt-5 flex justify-between items-center">
          <div className="text-sm">
            <span className="text-muted-foreground">Last updated: {formatDate(transaction.updatedAt)}</span>
          </div>
          {renderActionButton()}
        </div>
      </CardContent>
    </Card>
  );
};

const DashboardPage = () => {
  const { user, isAuthenticated } = useAuth();
  const { transactions, products, updateTransactionStatus, addProduct } = useTransaction();
  const [isAddProductDialogOpen, setIsAddProductDialogOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
    stock: ""
  });

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Filter transactions based on user role
  const userTransactions = transactions.filter(t => 
    user?.role === 'buyer' ? t.buyerId === user.id : 
    user?.role === 'seller' ? t.sellerId === user.id :
    true // Admin sees all
  );

  // Filter transactions by status for summary
  const pendingCount = userTransactions.filter(t => t.status === "pending").length;
  const activeCount = userTransactions.filter(t => 
    ["secured", "shipped", "delivered"].includes(t.status)
  ).length;
  const completedCount = userTransactions.filter(t => t.status === "completed").length;
  const disputedCount = userTransactions.filter(t => t.status === "disputed").length;

  const sellerProducts = products.filter(p => p.sellerId === user?.id);

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct({
      name: newProduct.name,
      description: newProduct.description,
      price: parseFloat(newProduct.price),
      image: newProduct.image || "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tfGVufDB8fDB8fHww",
      category: newProduct.category,
      stock: parseInt(newProduct.stock)
    });
    
    setNewProduct({
      name: "",
      description: "",
      price: "",
      image: "",
      category: "",
      stock: ""
    });
    
    setIsAddProductDialogOpen(false);
  };

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        {/* Dashboard Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <div className="flex items-center mb-4 sm:mb-0">
            <Avatar className="h-12 w-12 mr-4">
              <AvatarImage src={user?.avatarUrl} alt={user?.name} />
              <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-semibold">{user?.name}'s Dashboard</h1>
              <p className="text-muted-foreground">
                <Badge variant="outline" className="mr-2">
                  {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)}
                </Badge>
                {user?.email}
              </p>
            </div>
          </div>
          
          {user?.role === 'seller' && (
            <Button onClick={() => setIsAddProductDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          )}
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="flex items-center pt-6">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <ShoppingBag className="h-6 w-6 text-escrow-blue" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Orders</p>
                <h3 className="text-2xl font-bold">{activeCount}</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center pt-6">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <CheckCircle className="h-6 w-6 text-escrow-green" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <h3 className="text-2xl font-bold">{completedCount}</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center pt-6">
              <div className="bg-yellow-100 p-3 rounded-full mr-4">
                <DollarSign className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <h3 className="text-2xl font-bold">{pendingCount}</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center pt-6">
              <div className="bg-red-100 p-3 rounded-full mr-4">
                <AlertCircle className="h-6 w-6 text-escrow-red" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Disputed</p>
                <h3 className="text-2xl font-bold">{disputedCount}</h3>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Dashboard Content */}
        <Tabs defaultValue="transactions">
          <TabsList className="mb-6">
            <TabsTrigger value="transactions">
              <DollarSign className="h-4 w-4 mr-2" />
              Transactions
            </TabsTrigger>
            
            {user?.role === 'seller' && (
              <TabsTrigger value="products">
                <Package className="h-4 w-4 mr-2" />
                My Products
              </TabsTrigger>
            )}
            
            {user?.role === 'admin' && (
              <TabsTrigger value="disputes">
                <AlertCircle className="h-4 w-4 mr-2" />
                Disputes
              </TabsTrigger>
            )}
          </TabsList>
          
          <TabsContent value="transactions">
            {userTransactions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {userTransactions.map(transaction => (
                  <TransactionCard 
                    key={transaction.id} 
                    transaction={transaction} 
                    isBuyer={user?.role === 'buyer'}
                    onUpdateStatus={updateTransactionStatus}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No transactions yet</h3>
                <p className="text-muted-foreground mb-4">
                  {user?.role === 'buyer' 
                    ? "Start shopping to see your transactions here." 
                    : "Once you make sales, your transactions will appear here."}
                </p>
                <Button asChild>
                  {user?.role === 'buyer' ? (
                    <a href="/products">Browse Products</a>
                  ) : (
                    <a onClick={() => setIsAddProductDialogOpen(true)} href="#">Add a Product</a>
                  )}
                </Button>
              </div>
            )}
          </TabsContent>
          
          {user?.role === 'seller' && (
            <TabsContent value="products">
              {sellerProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {sellerProducts.map(product => (
                    <Card key={product.id}>
                      <div className="aspect-video w-full overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{product.name}</CardTitle>
                        <CardDescription className="flex justify-between">
                          <span>{product.category}</span>
                          <span className="font-medium text-black">${product.price.toFixed(2)}</span>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                          {product.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className={`text-sm ${product.stock > 0 ? 'text-escrow-green' : 'text-escrow-red'} font-medium`}>
                            {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                          </span>
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {/* Add Product Card */}
                  <Card className="flex items-center justify-center h-full min-h-[280px] border-dashed cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => setIsAddProductDialogOpen(true)}
                  >
                    <CardContent className="flex flex-col items-center text-center p-6">
                      <div className="rounded-full border-2 border-muted p-4 mb-4">
                        <Plus className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="font-medium mb-1">Add New Product</h3>
                      <p className="text-sm text-muted-foreground">
                        List a new item for sale
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No products listed</h3>
                  <p className="text-muted-foreground mb-4">
                    Start selling by adding your first product.
                  </p>
                  <Button onClick={() => setIsAddProductDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Product
                  </Button>
                </div>
              )}
            </TabsContent>
          )}
          
          {user?.role === 'admin' && (
            <TabsContent value="disputes">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {userTransactions
                  .filter(t => t.status === "disputed")
                  .map(transaction => (
                    <Card key={transaction.id}>
                      <CardHeader>
                        <CardTitle className="text-lg">Dispute #{transaction.id}</CardTitle>
                        <CardDescription>
                          Product: {transaction.productName}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center space-x-4 mb-4">
                          <img 
                            src={transaction.productImage}
                            alt={transaction.productName}
                            className="w-16 h-16 object-cover rounded-md"
                          />
                          <div>
                            <div className="text-lg font-semibold">${transaction.amount.toFixed(2)}</div>
                            <div className="flex space-x-4 text-sm text-muted-foreground">
                              <span>Buyer: {transaction.buyerName}</span>
                              <span>Seller: {transaction.sellerName}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium mb-1">Dispute Action:</h4>
                            <div className="flex space-x-2">
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="flex-1"
                                onClick={() => updateTransactionStatus(transaction.id, "refunded")}
                              >
                                Refund Buyer
                              </Button>
                              <Button 
                                size="sm" 
                                className="flex-1"
                                onClick={() => updateTransactionStatus(transaction.id, "completed")}
                              >
                                Release to Seller
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                
                {userTransactions.filter(t => t.status === "disputed").length === 0 && (
                  <div className="col-span-2 text-center py-12 bg-gray-50 rounded-lg">
                    <CheckCircle className="h-12 w-12 text-escrow-green mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No active disputes</h3>
                    <p className="text-muted-foreground">
                      All transactions are currently proceeding smoothly.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          )}
        </Tabs>
        
        {/* Add Product Dialog */}
        <Dialog open={isAddProductDialogOpen} onOpenChange={setIsAddProductDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>
                Add your product details below. Fields marked with * are required.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleAddProduct}>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Product Name *
                  </label>
                  <Input
                    id="name"
                    value={newProduct.name}
                    onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Description *
                  </label>
                  <Textarea
                    id="description"
                    rows={3}
                    value={newProduct.description}
                    onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="price" className="text-sm font-medium">
                      Price ($) *
                    </label>
                    <Input
                      id="price"
                      type="number"
                      min="0.01"
                      step="0.01"
                      value={newProduct.price}
                      onChange={e => setNewProduct({...newProduct, price: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="stock" className="text-sm font-medium">
                      Stock *
                    </label>
                    <Input
                      id="stock"
                      type="number"
                      min="0"
                      value={newProduct.stock}
                      onChange={e => setNewProduct({...newProduct, stock: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="category" className="text-sm font-medium">
                    Category *
                  </label>
                  <Input
                    id="category"
                    value={newProduct.category}
                    onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="image" className="text-sm font-medium">
                    Image URL
                  </label>
                  <Input
                    id="image"
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={newProduct.image}
                    onChange={e => setNewProduct({...newProduct, image: e.target.value})}
                  />
                  <p className="text-xs text-muted-foreground">
                    Leave blank for a placeholder image
                  </p>
                </div>
              </div>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsAddProductDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Product</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default DashboardPage;
