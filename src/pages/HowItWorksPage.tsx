
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  CreditCard,
  Package,
  DollarSign,
  ShieldCheck,
  AlertTriangle,
  CheckCircle,
  Truck,
  Users,
} from "lucide-react";

const HowItWorksPage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-escrow-blue to-blue-700 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-display font-bold mb-4">How EscrowSafeguard Works</h1>
            <p className="text-lg mb-6">
              Our escrow service protects both buyers and sellers by acting as a trusted third party that holds payment until the terms of the transaction are satisfied.
            </p>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-display font-semibold mb-8 text-center">The Escrow Process</h2>
            
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-escrow-blue transform -translate-x-1/2 hidden md:block"></div>
              
              {/* Step 1 */}
              <div className="flex flex-col md:flex-row items-start mb-16 relative">
                <div className="md:w-1/2 md:pr-12 mb-4 md:mb-0 md:text-right">
                  <h3 className="text-xl font-semibold mb-2">Step 1: Agreement & Payment</h3>
                  <p className="text-muted-foreground">
                    Buyer and seller agree on terms, and the buyer makes a payment to EscrowSafeguard.
                  </p>
                </div>
                <div className="bg-escrow-blue text-white rounded-full p-2 z-10 mx-auto md:mx-0 mb-4 md:mb-0">
                  <CreditCard className="h-6 w-6" />
                </div>
                <div className="md:w-1/2 md:pl-12">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">What happens in this step:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Seller lists product with detailed description</li>
                      <li>Buyer places order and makes payment</li>
                      <li>Funds are securely held in escrow</li>
                      <li>Seller is notified of the secured payment</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="flex flex-col md:flex-row items-start mb-16 relative">
                <div className="md:w-1/2 md:pr-12 mb-4 md:mb-0 order-1 md:order-1 md:text-right">
                  <div className="bg-gray-50 p-4 rounded-lg md:ml-auto">
                    <h4 className="font-medium mb-2">What happens in this step:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Seller ships the item to the buyer</li>
                      <li>Tracking information is uploaded</li>
                      <li>Both parties receive shipping updates</li>
                      <li>Buyer is notified when delivery is expected</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-escrow-blue text-white rounded-full p-2 z-10 mx-auto md:mx-0 mb-4 md:mb-0 order-0 md:order-2">
                  <Truck className="h-6 w-6" />
                </div>
                <div className="md:w-1/2 md:pl-12 order-2 md:order-3">
                  <h3 className="text-xl font-semibold mb-2">Step 2: Shipping & Tracking</h3>
                  <p className="text-muted-foreground">
                    The seller ships the item and provides tracking information to EscrowSafeguard and the buyer.
                  </p>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="flex flex-col md:flex-row items-start mb-16 relative">
                <div className="md:w-1/2 md:pr-12 mb-4 md:mb-0 md:text-right">
                  <h3 className="text-xl font-semibold mb-2">Step 3: Inspection & Approval</h3>
                  <p className="text-muted-foreground">
                    The buyer receives the item and has time to inspect it before approving the transaction.
                  </p>
                </div>
                <div className="bg-escrow-blue text-white rounded-full p-2 z-10 mx-auto md:mx-0 mb-4 md:mb-0">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <div className="md:w-1/2 md:pl-12">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">What happens in this step:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Buyer receives the product</li>
                      <li>Inspection period begins (typically 2-3 days)</li>
                      <li>Buyer verifies the item matches description</li>
                      <li>Buyer approves the transaction</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Step 4 */}
              <div className="flex flex-col md:flex-row items-start relative">
                <div className="md:w-1/2 md:pr-12 mb-4 md:mb-0 order-1 md:order-1 md:text-right">
                  <div className="bg-gray-50 p-4 rounded-lg md:ml-auto">
                    <h4 className="font-medium mb-2">What happens in this step:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Escrow funds are released to the seller</li>
                      <li>Both parties receive confirmation</li>
                      <li>Transaction is marked as completed</li>
                      <li>Buyer can leave a review for the seller</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-escrow-blue text-white rounded-full p-2 z-10 mx-auto md:mx-0 mb-4 md:mb-0 order-0 md:order-2">
                  <DollarSign className="h-6 w-6" />
                </div>
                <div className="md:w-1/2 md:pl-12 order-2 md:order-3">
                  <h3 className="text-xl font-semibold mb-2">Step 4: Payment Release</h3>
                  <p className="text-muted-foreground">
                    After approval, EscrowSafeguard releases the payment to the seller, completing the transaction.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dispute Resolution Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-3xl font-display font-semibold mb-4">Dispute Resolution</h2>
            <p className="text-lg text-muted-foreground">
              If any issues arise during the transaction, our dedicated team steps in to help resolve disputes fairly.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-semibold mb-4">How We Handle Disputes</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-medium mb-2 flex items-center">
                    <span className="bg-escrow-blue text-white rounded-full p-1 mr-2 flex items-center justify-center h-6 w-6 text-sm">1</span>
                    Filing a Dispute
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4 ml-8">
                    Either party can file a dispute from their dashboard, providing details and evidence about the issue.
                  </p>

                  <h4 className="font-medium mb-2 flex items-center">
                    <span className="bg-escrow-blue text-white rounded-full p-1 mr-2 flex items-center justify-center h-6 w-6 text-sm">2</span>
                    Information Gathering
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4 ml-8">
                    Our team collects information from both parties, including photos, tracking information, and communications.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2 flex items-center">
                    <span className="bg-escrow-blue text-white rounded-full p-1 mr-2 flex items-center justify-center h-6 w-6 text-sm">3</span>
                    Review Process
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4 ml-8">
                    Our experienced dispute resolution team reviews all evidence and may contact both parties for clarification.
                  </p>

                  <h4 className="font-medium mb-2 flex items-center">
                    <span className="bg-escrow-blue text-white rounded-full p-1 mr-2 flex items-center justify-center h-6 w-6 text-sm">4</span>
                    Resolution & Action
                  </h4>
                  <p className="text-sm text-muted-foreground ml-8">
                    Based on the evidence, we make a fair decision that may include releasing funds, processing a refund, or other appropriate actions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-semibold mb-4">Benefits of Using EscrowSafeguard</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="bg-blue-100 p-3 rounded-full inline-block mb-4">
                <ShieldCheck className="h-6 w-6 text-escrow-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Buyer Protection</h3>
              <p className="text-muted-foreground">
                Your payment is only released when you confirm you've received exactly what you ordered.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="bg-blue-100 p-3 rounded-full inline-block mb-4">
                <DollarSign className="h-6 w-6 text-escrow-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Seller Security</h3>
              <p className="text-muted-foreground">
                Know that the buyer has committed to the purchase before you ship the item.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="bg-blue-100 p-3 rounded-full inline-block mb-4">
                <AlertTriangle className="h-6 w-6 text-escrow-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Dispute Mediation</h3>
              <p className="text-muted-foreground">
                Professional and fair resolution if any issues arise during the transaction.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="bg-blue-100 p-3 rounded-full inline-block mb-4">
                <Truck className="h-6 w-6 text-escrow-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Shipping Tracking</h3>
              <p className="text-muted-foreground">
                Monitor your shipment from dispatch to delivery with real-time tracking updates.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="bg-blue-100 p-3 rounded-full inline-block mb-4">
                <Users className="h-6 w-6 text-escrow-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Users</h3>
              <p className="text-muted-foreground">
                Deal with confidence knowing that all platform users undergo verification checks.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="bg-blue-100 p-3 rounded-full inline-block mb-4">
                <Package className="h-6 w-6 text-escrow-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Marketplace</h3>
              <p className="text-muted-foreground">
                Browse and shop in a trusted environment designed to protect all parties.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-escrow-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-display font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Create your account today and experience secure online transactions with EscrowSafeguard.
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
    </Layout>
  );
};

export default HowItWorksPage;
