import { Link } from "react-router-dom";
import { ShieldCheck, Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <ShieldCheck className="h-8 w-8 text-escrow-blue" />
              <span className="font-display font-bold text-xl">EscrowSafeguard</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Secure online transactions with our escrow payment protection. Safe buying and selling for everyone.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-escrow-gray hover:text-escrow-blue transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-escrow-gray hover:text-escrow-blue transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-escrow-gray hover:text-escrow-blue transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-escrow-gray hover:text-escrow-blue transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-escrow-blue transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-muted-foreground hover:text-escrow-blue transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-muted-foreground hover:text-escrow-blue transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-muted-foreground hover:text-escrow-blue transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-escrow-blue transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-escrow-blue transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/refund" className="text-muted-foreground hover:text-escrow-blue transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-muted-foreground hover:text-escrow-blue transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-muted-foreground">
                <Mail className="h-5 w-5 mr-2" />
                support@escrowsafeguard.com
              </li>
            </ul>
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Subscribe to our newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="rounded-l-md border border-r-0 px-3 py-2 text-sm flex-1"
                />
                <button className="bg-escrow-blue hover:bg-blue-700 text-white rounded-r-md px-3 text-sm transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t mt-12 pt-6 text-sm text-muted-foreground text-center">
          <p>&copy; {new Date().getFullYear()} EscrowSafeguard. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
