
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { Shield, DollarSign, Package, AlertTriangle, CreditCard } from "lucide-react";

const HomePage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-escrow-blue to-blue-700 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Secure Online Transactions with Escrow Protection</h1>
              <p className="text-lg mb-8">Shop with confidence knowing your payment is held securely until you receive exactly what you ordered.</p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button size="lg" asChild className="bg-white text-escrow-blue hover:bg-gray-100">
                  <Link to="/products">Shop Now</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                  <Link to="/how-it-works">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500&q=80"
                  alt="Secure Online Shopping"
                  className="w-full h-auto rounded"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold mb-4">How EscrowSafeguard Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our escrow service acts as a trusted third party that holds payment securely until the terms of the transaction are met.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border flex flex-col items-center text-center">
              <div className="bg-blue-100 p-3 rounded-full mb-4">
                <CreditCard className="h-8 w-8 text-escrow-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Payment Secured</h3>
              <p className="text-muted-foreground">
                Buyer makes a payment which is held securely in our escrow account. Seller is notified of the payment.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border flex flex-col items-center text-center">
              <div className="bg-blue-100 p-3 rounded-full mb-4">
                <Package className="h-8 w-8 text-escrow-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Item Delivered</h3>
              <p className="text-muted-foreground">
                Seller ships the item to the buyer. Both parties can track the order status in real-time.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border flex flex-col items-center text-center">
              <div className="bg-blue-100 p-3 rounded-full mb-4">
                <DollarSign className="h-8 w-8 text-escrow-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Payment Released</h3>
              <p className="text-muted-foreground">
                Once the buyer confirms receipt and satisfaction, the payment is released to the seller.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link to="/how-it-works">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold mb-4">Secure Transactions Guaranteed</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We offer multiple layers of protection to ensure a safe and secure shopping experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex space-x-4">
              <div className="flex-shrink-0">
                <Shield className="h-10 w-10 text-escrow-blue" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Verified Sellers</h3>
                <p className="text-muted-foreground">
                  All sellers go through a strict verification process before they can list their products.
                </p>
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="flex-shrink-0">
                <CreditCard className="h-10 w-10 text-escrow-blue" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
                <p className="text-muted-foreground">
                  Your payment information is encrypted and securely processed through our trusted payment partners.
                </p>
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="flex-shrink-0">
                <Package className="h-10 w-10 text-escrow-blue" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Order Protection</h3>
                <p className="text-muted-foreground">
                  Track your orders and receive timely updates about shipping and delivery.
                </p>
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-10 w-10 text-escrow-blue" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Dispute Resolution</h3>
                <p className="text-muted-foreground">
                  Our dedicated team will help resolve any issues that may arise during a transaction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-escrow-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-display font-bold mb-4">Ready to Shop with Confidence?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who shop with peace of mind using our escrow protection.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button size="lg" className="bg-white text-escrow-blue hover:bg-gray-100" asChild>
              <Link to="/register">Create Account</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <Link to="/products">Browse Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold mb-4">What Our Customers Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="mb-4 italic text-muted-foreground">
                "I was skeptical about buying expensive electronics online, but EscrowSafeguard made me feel secure. The seller got paid only after I confirmed everything was as described."
              </p>
              <p className="font-semibold">- Michael T.</p>
              <p className="text-sm text-muted-foreground">Buyer</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="mb-4 italic text-muted-foreground">
                "As a seller, I appreciate that my buyers feel confident ordering from me. The escrow system ensures I get paid promptly once delivery is confirmed."
              </p>
              <p className="font-semibold">- Lisa R.</p>
              <p className="text-sm text-muted-foreground">Seller</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="mb-4 italic text-muted-foreground">
                "When I had an issue with my order, the customer service team stepped in quickly to resolve it. Their dispute resolution process is top-notch."
              </p>
              <p className="font-semibold">- David K.</p>
              <p className="text-sm text-muted-foreground">Buyer</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
