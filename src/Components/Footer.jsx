import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  const location = useLocation();

  // Hide footer on specific routes
  if (location.pathname === "/address" || location.pathname === "/cart") {
    return null;
  }

  return (
    <footer className="bg-gradient-to-r from-yellow-700 to-yellow-900 text-white w-full bottom-0">
      <div className="max-w-6xl mx-auto py-10 px-5 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* --- About Section --- */}
        <div>
          <h2 className="text-lg font-semibold mb-3 border-b border-yellow-500 w-fit">About Us</h2>
          <p className="text-gray-200 text-sm leading-relaxed">
            We are committed to delivering high-quality products and services that 
            bring value to our customers. Your satisfaction is our priority — 
            every single day.
          </p>
        </div>

        {/* --- Quick Links --- */}
        <div>
          <h2 className="text-lg font-semibold mb-3 border-b border-yellow-500 w-fit">Quick Links</h2>
          <ul className="space-y-2 text-sm text-gray-200">
            <li><a href="/home" className="hover:text-yellow-300">Home</a></li>
            <li><a href="/about" className="hover:text-yellow-300">About</a></li>
            <li><a href="/shop" className="hover:text-yellow-300">Shop</a></li>
            <li><a href="/contact" className="hover:text-yellow-300">Contact</a></li>
          </ul>
        </div>

        {/* --- Support --- */}
        <div>
          <h2 className="text-lg font-semibold mb-3 border-b border-yellow-500 w-fit">Support</h2>
          <ul className="space-y-2 text-sm text-gray-200">
            <li><a href="/faq" className="hover:text-yellow-300">FAQ</a></li>
            <li><a href="/returns" className="hover:text-yellow-300">Returns</a></li>
            <li><a href="/shipping" className="hover:text-yellow-300">Shipping Info</a></li>
            <li><a href="/privacy" className="hover:text-yellow-300">Privacy Policy</a></li>
          </ul>
        </div>

        {/* --- Social Media --- */}
        <div>
          <h2 className="text-lg font-semibold mb-3 border-b border-yellow-500 w-fit">Follow Us</h2>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="hover:text-yellow-300"><FaFacebookF size={20} /></a>
            <a href="#" className="hover:text-yellow-300"><FaTwitter size={20} /></a>
            <a href="#" className="hover:text-yellow-300"><FaInstagram size={20} /></a>
            <a href="#" className="hover:text-yellow-300"><FaLinkedinIn size={20} /></a>
          </div>
          <p className="text-sm text-gray-300 mt-4">
            Stay connected with us for the latest updates and offers.
          </p>
        </div>
      </div>

      {/* --- Bottom Bar --- */}
      <div className="text-center text-xs text-gray-300 border-t border-yellow-600 py-4">
        &copy; {new Date().getFullYear()} YourBrand. All rights reserved. |
        <a href="/terms" className="hover:underline ml-1">Terms of Service</a>
        <span className="mx-1">|</span>
        <a href="/privacy" className="hover:underline">Privacy Policy</a>
      </div>
    </footer>
  );
};

export default Footer;
