
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      <div className="container mx-auto py-16 px-4">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <ShieldCheck className="h-16 w-16 text-escrow-blue" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
            Welcome to EscrowSafeguard
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The secure way to buy and sell online. We hold your payment in escrow until you've received exactly what you ordered.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/products">Browse Products</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/how-it-works">Learn How It Works</Link>
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-lg shadow-sm border text-center">
            <h2 className="text-xl font-bold mb-4">Safe Payments</h2>
            <p className="text-muted-foreground">
              Your money is held in secure escrow until you confirm you're satisfied with what you received.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-sm border text-center">
            <h2 className="text-xl font-bold mb-4">Verified Sellers</h2>
            <p className="text-muted-foreground">
              All sellers on our platform undergo verification to ensure legitimacy and quality service.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-sm border text-center">
            <h2 className="text-xl font-bold mb-4">Dispute Resolution</h2>
            <p className="text-muted-foreground">
              If there's ever an issue with your transaction, our team helps resolve disputes fairly.
            </p>
          </div>
        </div>

        <div className="bg-escrow-blue/5 p-8 rounded-lg mb-16">
          <h2 className="text-2xl font-bold mb-4 text-center">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center p-4">
              <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 border border-escrow-blue text-escrow-blue font-bold">1</div>
              <h3 className="font-medium">Find a Product</h3>
              <p className="text-sm text-muted-foreground">Browse listings and find what you need</p>
            </div>
            <div className="text-center p-4">
              <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 border border-escrow-blue text-escrow-blue font-bold">2</div>
              <h3 className="font-medium">Pay Securely</h3>
              <p className="text-sm text-muted-foreground">Your payment is held in escrow</p>
            </div>
            <div className="text-center p-4">
              <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 border border-escrow-blue text-escrow-blue font-bold">3</div>
              <h3 className="font-medium">Receive Item</h3>
              <p className="text-sm text-muted-foreground">Seller ships the item to you</p>
            </div>
            <div className="text-center p-4">
              <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 border border-escrow-blue text-escrow-blue font-bold">4</div>
              <h3 className="font-medium">Release Payment</h3>
              <p className="text-sm text-muted-foreground">Confirm receipt and release funds</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Join thousands of users who trust EscrowSafeguard for secure online transactions.
          </p>
          <Button asChild size="lg">
            <Link to="/register">Create an Account</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
