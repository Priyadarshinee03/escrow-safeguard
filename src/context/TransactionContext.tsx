
import { ReactNode, createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useAuth } from './AuthContext';

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  sellerId: string;
  sellerName: string;
  category: string;
  stock: number;
};

export type TransactionStatus = 
  | 'pending'        // Payment initiated but not completed
  | 'secured'        // Payment held in escrow
  | 'shipped'        // Product shipped, awaiting delivery
  | 'delivered'      // Product delivered, awaiting confirmation
  | 'completed'      // Transaction complete, funds released
  | 'disputed'       // Dispute filed, under review
  | 'refunded';      // Refunded to buyer

export type Transaction = {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  buyerId: string;
  buyerName: string;
  sellerId: string;
  sellerName: string;
  amount: number;
  status: TransactionStatus;
  createdAt: string;
  updatedAt: string;
};

type TransactionContextType = {
  products: Product[];
  transactions: Transaction[];
  addProduct: (product: Omit<Product, 'id' | 'sellerId' | 'sellerName'>) => void;
  initiateTransaction: (productId: string) => void;
  updateTransactionStatus: (transactionId: string, newStatus: TransactionStatus) => void;
  getProductById: (productId: string) => Product | undefined;
};

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

// Mock initial products
const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'Noise-cancelling wireless headphones with premium sound quality and 30-hour battery life.',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D',
    sellerId: '2',
    sellerName: 'Sarah Seller',
    category: 'Electronics',
    stock: 15
  },
  {
    id: '2',
    name: 'Smart Watch Series 5',
    description: 'Track your fitness, receive notifications, and more with this premium smartwatch.',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    sellerId: '2',
    sellerName: 'Sarah Seller',
    category: 'Electronics',
    stock: 8
  },
  {
    id: '3',
    name: 'Professional Camera Kit',
    description: 'Full-frame DSLR camera with multiple lenses, perfect for professional photography.',
    price: 1299.99,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    sellerId: '2',
    sellerName: 'Sarah Seller',
    category: 'Electronics',
    stock: 3
  },
  {
    id: '4',
    name: 'Designer Handbag',
    description: 'Luxury designer handbag made with genuine leather and premium materials.',
    price: 499.99,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    sellerId: '2',
    sellerName: 'Sarah Seller',
    category: 'Fashion',
    stock: 5
  }
];

// Mock initial transactions
const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    productId: '1',
    productName: 'Premium Wireless Headphones',
    productImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D',
    buyerId: '1',
    buyerName: 'John Buyer',
    sellerId: '2',
    sellerName: 'Sarah Seller',
    amount: 199.99,
    status: 'secured',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '2',
    productId: '3',
    productName: 'Professional Camera Kit',
    productImage: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    buyerId: '1',
    buyerName: 'John Buyer',
    sellerId: '2',
    sellerName: 'Sarah Seller',
    amount: 1299.99,
    status: 'shipped',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  }
];

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>(() => {
    const savedProducts = localStorage.getItem('escrowProducts');
    return savedProducts ? JSON.parse(savedProducts) : INITIAL_PRODUCTS;
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const savedTransactions = localStorage.getItem('escrowTransactions');
    return savedTransactions ? JSON.parse(savedTransactions) : INITIAL_TRANSACTIONS;
  });

  // Save to localStorage whenever these values change
  useEffect(() => {
    localStorage.setItem('escrowProducts', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('escrowTransactions', JSON.stringify(transactions));
  }, [transactions]);

  const addProduct = (product: Omit<Product, 'id' | 'sellerId' | 'sellerName'>) => {
    if (!user || user.role !== 'seller') {
      toast.error('Only sellers can add products');
      return;
    }

    const newProduct: Product = {
      ...product,
      id: `${products.length + 1}`,
      sellerId: user.id,
      sellerName: user.name
    };

    setProducts([...products, newProduct]);
    toast.success('Product added successfully!');
  };

  const initiateTransaction = (productId: string) => {
    if (!user) {
      toast.error('Please log in to make a purchase');
      return;
    }

    if (user.role !== 'buyer') {
      toast.error('Only buyers can make purchases');
      return;
    }

    const product = products.find(p => p.id === productId);
    if (!product) {
      toast.error('Product not found');
      return;
    }

    // Check if product is in stock
    if (product.stock <= 0) {
      toast.error('Product is out of stock');
      return;
    }

    // Create new transaction
    const newTransaction: Transaction = {
      id: `${transactions.length + 1}`,
      productId: product.id,
      productName: product.name,
      productImage: product.image,
      buyerId: user.id,
      buyerName: user.name,
      sellerId: product.sellerId,
      sellerName: product.sellerName,
      amount: product.price,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Update product stock
    setProducts(products.map(p => 
      p.id === productId ? { ...p, stock: p.stock - 1 } : p
    ));
    
    // Add new transaction
    setTransactions([...transactions, newTransaction]);
    toast.success('Transaction initiated! Proceed to payment.');

    // Simulate payment success after 2 seconds
    setTimeout(() => {
      updateTransactionStatus(newTransaction.id, 'secured');
      toast.success('Payment successful! Funds are now held in escrow.');
    }, 2000);
  };

  const updateTransactionStatus = (transactionId: string, newStatus: TransactionStatus) => {
    setTransactions(transactions.map(t => 
      t.id === transactionId 
        ? { ...t, status: newStatus, updatedAt: new Date().toISOString() } 
        : t
    ));

    let statusMessage = '';
    switch(newStatus) {
      case 'secured':
        statusMessage = 'Payment secured in escrow';
        break;
      case 'shipped':
        statusMessage = 'Product has been shipped';
        break;
      case 'delivered':
        statusMessage = 'Product has been delivered';
        break;
      case 'completed':
        statusMessage = 'Transaction completed successfully';
        break;
      case 'disputed':
        statusMessage = 'Dispute filed for this transaction';
        break;
      case 'refunded':
        statusMessage = 'Payment has been refunded';
        break;
      default:
        statusMessage = 'Transaction status updated';
    }
    
    if (statusMessage) {
      toast.info(statusMessage);
    }
  };

  const getProductById = (productId: string) => {
    return products.find(p => p.id === productId);
  };

  return (
    <TransactionContext.Provider value={{ 
      products, 
      transactions, 
      addProduct, 
      initiateTransaction, 
      updateTransactionStatus,
      getProductById
    }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransaction = () => {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error('useTransaction must be used within a TransactionProvider');
  }
  return context;
};
