
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { useAuth } from "@/context/AuthContext";
import { useTransaction, Transaction, TransactionStatus } from "@/context/TransactionContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Shield,
  Users,
  Package,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Search,
  ArrowUpDown,
  PieChart,
  BarChart3,
} from "lucide-react";

const AdminPage = () => {
  const { user, isAuthenticated } = useAuth();
  const { transactions, products, updateTransactionStatus } = useTransaction();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({ 
    key: 'createdAt', 
    direction: 'desc' 
  });

  // Redirect if not admin
  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/dashboard" />;
  }

  // Transaction stats
  const totalTransactions = transactions.length;
  const pendingTransactions = transactions.filter(t => t.status === "pending").length;
  const activeTransactions = transactions.filter(t => ["secured", "shipped", "delivered"].includes(t.status)).length;
  const completedTransactions = transactions.filter(t => t.status === "completed").length;
  const disputedTransactions = transactions.filter(t => t.status === "disputed").length;
  
  // Product stats
  const totalProducts = products.length;
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
  const outOfStockProducts = products.filter(p => p.stock === 0).length;

  // Filter transactions based on search
  const filteredTransactions = transactions.filter(transaction => {
    if (searchTerm === "") return true;
    
    const searchFields = [
      transaction.id,
      transaction.productName,
      transaction.buyerName,
      transaction.sellerName,
      transaction.status
    ];
    
    return searchFields.some(field => 
      field.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Sort transactions
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    const aValue = a[sortConfig.key as keyof Transaction];
    const bValue = b[sortConfig.key as keyof Transaction];
    
    if (aValue < bValue) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const handleSort = (key: string) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        {/* Admin Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div className="flex items-center">
            <div className="bg-escrow-blue text-white p-3 rounded-full mr-4">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage transactions, disputes, and users</p>
            </div>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              className="pl-9 w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Transactions</p>
                  <h3 className="text-2xl font-bold mt-1">{totalTransactions}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="text-escrow-green">Active: {activeTransactions}</span> • <span className="text-escrow-blue">Completed: {completedTransactions}</span>
                  </p>
                </div>
                <div className="bg-blue-100 p-2 rounded-full">
                  <DollarSign className="h-5 w-5 text-escrow-blue" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Disputes</p>
                  <h3 className="text-2xl font-bold mt-1">{disputedTransactions}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {disputedTransactions > 0 ? (
                      <span className="text-escrow-red">Requires attention</span>
                    ) : (
                      <span className="text-escrow-green">No active disputes</span>
                    )}
                  </p>
                </div>
                <div className="bg-red-100 p-2 rounded-full">
                  <AlertTriangle className="h-5 w-5 text-escrow-red" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Products</p>
                  <h3 className="text-2xl font-bold mt-1">{totalProducts}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span>Total Stock: {totalStock}</span> • <span className="text-escrow-red">Out of Stock: {outOfStockProducts}</span>
                  </p>
                </div>
                <div className="bg-purple-100 p-2 rounded-full">
                  <Package className="h-5 w-5 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Users</p>
                  <h3 className="text-2xl font-bold mt-1">3</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span>Buyers: 1</span> • <span>Sellers: 1</span> • <span>Admins: 1</span>
                  </p>
                </div>
                <div className="bg-green-100 p-2 rounded-full">
                  <Users className="h-5 w-5 text-escrow-green" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alert for pending disputes */}
        {disputedTransactions > 0 && (
          <Alert className="mb-8 border-escrow-red/30 text-escrow-red bg-escrow-red/10">
            <AlertTriangle className="h-5 w-5" />
            <AlertTitle>Action Required</AlertTitle>
            <AlertDescription>
              There {disputedTransactions === 1 ? 'is' : 'are'} {disputedTransactions} open dispute{disputedTransactions > 1 ? 's' : ''} that need{disputedTransactions === 1 ? 's' : ''} your attention.
            </AlertDescription>
          </Alert>
        )}
        
        {/* Main Content Tabs */}
        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Transactions</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="disputes">Disputes</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>
                  View and manage all transactions in the system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <ScrollArea className="h-[60vh]">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="py-3 px-4 text-left font-medium" onClick={() => handleSort('id')}>
                            <div className="flex items-center cursor-pointer">
                              ID
                              <ArrowUpDown className="ml-1 h-3 w-3" />
                            </div>
                          </th>
                          <th className="py-3 px-4 text-left font-medium" onClick={() => handleSort('productName')}>
                            <div className="flex items-center cursor-pointer">
                              Product
                              <ArrowUpDown className="ml-1 h-3 w-3" />
                            </div>
                          </th>
                          <th className="py-3 px-4 text-left font-medium" onClick={() => handleSort('buyerName')}>
                            <div className="flex items-center cursor-pointer">
                              Buyer
                              <ArrowUpDown className="ml-1 h-3 w-3" />
                            </div>
                          </th>
                          <th className="py-3 px-4 text-left font-medium" onClick={() => handleSort('sellerName')}>
                            <div className="flex items-center cursor-pointer">
                              Seller
                              <ArrowUpDown className="ml-1 h-3 w-3" />
                            </div>
                          </th>
                          <th className="py-3 px-4 text-left font-medium" onClick={() => handleSort('amount')}>
                            <div className="flex items-center cursor-pointer">
                              Amount
                              <ArrowUpDown className="ml-1 h-3 w-3" />
                            </div>
                          </th>
                          <th className="py-3 px-4 text-left font-medium" onClick={() => handleSort('status')}>
                            <div className="flex items-center cursor-pointer">
                              Status
                              <ArrowUpDown className="ml-1 h-3 w-3" />
                            </div>
                          </th>
                          <th className="py-3 px-4 text-right font-medium">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {sortedTransactions.map(transaction => (
                          <tr key={transaction.id} className="border-b hover:bg-muted/50 transition-colors">
                            <td className="px-4 py-3">{transaction.id}</td>
                            <td className="px-4 py-3">
                              <div className="flex items-center space-x-2">
                                <img 
                                  src={transaction.productImage}
                                  alt={transaction.productName}
                                  className="w-8 h-8 rounded object-cover"
                                />
                                <span className="truncate max-w-[150px]">{transaction.productName}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3">{transaction.buyerName}</td>
                            <td className="px-4 py-3">{transaction.sellerName}</td>
                            <td className="px-4 py-3">${transaction.amount.toFixed(2)}</td>
                            <td className="px-4 py-3">
                              <Badge 
                                className={
                                  transaction.status === "pending" ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" :
                                  transaction.status === "secured" ? "bg-blue-100 text-blue-800 hover:bg-blue-100" :
                                  transaction.status === "shipped" ? "bg-purple-100 text-purple-800 hover:bg-purple-100" :
                                  transaction.status === "delivered" ? "bg-indigo-100 text-indigo-800 hover:bg-indigo-100" :
                                  transaction.status === "completed" ? "bg-green-100 text-green-800 hover:bg-green-100" :
                                  "bg-red-100 text-red-800 hover:bg-red-100"
                                }
                              >
                                {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                              </Badge>
                            </td>
                            <td className="px-4 py-3 text-right space-x-1">
                              {transaction.status === "disputed" && (
                                <>
                                  <Button 
                                    size="sm" 
                                    variant="outline" 
                                    onClick={() => updateTransactionStatus(transaction.id, "refunded")}
                                  >
                                    Refund
                                  </Button>
                                  <Button 
                                    size="sm"
                                    onClick={() => updateTransactionStatus(transaction.id, "completed")}
                                  >
                                    Complete
                                  </Button>
                                </>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    
                    {sortedTransactions.length === 0 && (
                      <div className="flex flex-col items-center justify-center p-8 text-center">
                        <Package className="h-10 w-10 text-muted-foreground mb-3" />
                        <h3 className="text-lg font-medium">No transactions found</h3>
                        <p className="text-muted-foreground text-sm">
                          Try adjusting your search or filters
                        </p>
                      </div>
                    )}
                  </ScrollArea>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="active">
            <Card>
              <CardHeader>
                <CardTitle>Active Transactions</CardTitle>
                <CardDescription>
                  Monitor transactions in progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <ScrollArea className="h-[60vh]">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="py-3 px-4 text-left font-medium">ID</th>
                          <th className="py-3 px-4 text-left font-medium">Product</th>
                          <th className="py-3 px-4 text-left font-medium">Buyer</th>
                          <th className="py-3 px-4 text-left font-medium">Seller</th>
                          <th className="py-3 px-4 text-left font-medium">Status</th>
                          <th className="py-3 px-4 text-left font-medium">Last Updated</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactions
                          .filter(t => ["secured", "shipped", "delivered"].includes(t.status))
                          .map(transaction => (
                          <tr key={transaction.id} className="border-b hover:bg-muted/50 transition-colors">
                            <td className="px-4 py-3">{transaction.id}</td>
                            <td className="px-4 py-3">
                              <div className="flex items-center space-x-2">
                                <img 
                                  src={transaction.productImage}
                                  alt={transaction.productName}
                                  className="w-8 h-8 rounded object-cover"
                                />
                                <span className="truncate max-w-[150px]">{transaction.productName}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3">{transaction.buyerName}</td>
                            <td className="px-4 py-3">{transaction.sellerName}</td>
                            <td className="px-4 py-3">
                              <Badge 
                                className={
                                  transaction.status === "secured" ? "bg-blue-100 text-blue-800 hover:bg-blue-100" :
                                  transaction.status === "shipped" ? "bg-purple-100 text-purple-800 hover:bg-purple-100" :
                                  "bg-indigo-100 text-indigo-800 hover:bg-indigo-100"
                                }
                              >
                                {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                              </Badge>
                            </td>
                            <td className="px-4 py-3">
                              {new Date(transaction.updatedAt).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    
                    {transactions.filter(t => ["secured", "shipped", "delivered"].includes(t.status)).length === 0 && (
                      <div className="flex flex-col items-center justify-center p-8 text-center">
                        <CheckCircle className="h-10 w-10 text-muted-foreground mb-3" />
                        <h3 className="text-lg font-medium">No active transactions</h3>
                        <p className="text-muted-foreground text-sm">
                          All transactions are either completed or pending
                        </p>
                      </div>
                    )}
                  </ScrollArea>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="disputes">
            <Card>
              <CardHeader>
                <CardTitle>Dispute Management</CardTitle>
                <CardDescription>
                  Handle user disputes and issue refunds or release payments
                </CardDescription>
              </CardHeader>
              <CardContent>
                {disputedTransactions > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {transactions
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
                            
                            <div className="space-y-4 bg-muted/50 p-4 rounded-md">
                              <div>
                                <h4 className="text-sm font-medium mb-1">Description:</h4>
                                <p className="text-sm text-muted-foreground">
                                  This dispute requires administrator review. Please examine the transaction details and make a decision.
                                </p>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium mb-1">Timeline:</h4>
                                <ul className="text-sm space-y-1 text-muted-foreground">
                                  <li>Created: {new Date(transaction.createdAt).toLocaleString()}</li>
                                  <li>Disputed: {new Date(transaction.updatedAt).toLocaleString()}</li>
                                </ul>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="flex justify-between">
                            <Button 
                              variant="outline" 
                              className="border-escrow-red text-escrow-red hover:bg-escrow-red/10 hover:text-escrow-red"
                              onClick={() => updateTransactionStatus(transaction.id, "refunded")}
                            >
                              Refund to Buyer
                            </Button>
                            <Button 
                              onClick={() => updateTransactionStatus(transaction.id, "completed")}
                            >
                              Release to Seller
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-12 text-center">
                    <CheckCircle className="h-12 w-12 text-escrow-green mb-4" />
                    <h3 className="text-xl font-medium mb-2">No Active Disputes</h3>
                    <p className="text-muted-foreground max-w-md">
                      All transactions are currently proceeding without issues. No user disputes need attention at this time.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle>Product Management</CardTitle>
                <CardDescription>
                  View and manage products in the marketplace
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <ScrollArea className="h-[60vh]">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="py-3 px-4 text-left font-medium">ID</th>
                          <th className="py-3 px-4 text-left font-medium">Product</th>
                          <th className="py-3 px-4 text-left font-medium">Category</th>
                          <th className="py-3 px-4 text-left font-medium">Price</th>
                          <th className="py-3 px-4 text-left font-medium">Stock</th>
                          <th className="py-3 px-4 text-left font-medium">Seller</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map(product => (
                          <tr key={product.id} className="border-b hover:bg-muted/50 transition-colors">
                            <td className="px-4 py-3">{product.id}</td>
                            <td className="px-4 py-3">
                              <div className="flex items-center space-x-2">
                                <img 
                                  src={product.image}
                                  alt={product.name}
                                  className="w-8 h-8 rounded object-cover"
                                />
                                <span className="font-medium">{product.name}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3">{product.category}</td>
                            <td className="px-4 py-3">${product.price.toFixed(2)}</td>
                            <td className="px-4 py-3">
                              <span className={product.stock === 0 ? 'text-escrow-red' : 'text-escrow-green'}>
                                {product.stock}
                              </span>
                            </td>
                            <td className="px-4 py-3">{product.sellerName}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </ScrollArea>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminPage;
