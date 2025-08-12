// src/components/layout/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">GiveHope</h1>
            <p className="text-gray-400 leading-relaxed">
              Empowering communities through generosity and compassion. Together we can make a difference.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-white">Quick Links</h2>
            <ul className="space-y-3">
              {[
                { label: 'Explore Campaigns', path: '/campaigns/explore' },
                { label: 'Start a Campaign', path: '/campaigns/start-campaign' },
                { label: 'Donate Now', path: '/donate' },
                { label: 'About Us', path: '/about' }
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path} 
                    className="text-gray-400 hover:text-red-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-white">Contact Us</h2>
            <address className="not-italic text-gray-400 space-y-3">
              <p>123 Charity Lane</p>
              <p>Giving City, GC 12345</p>
              <p className="mt-2">(123) 456-7890</p>
              <a 
                href="mailto:contact@givelope.org" 
                className="block text-gray-400 hover:text-red-400 transition-colors duration-200"
              >
                contact@givelope.org
              </a>
            </address>
          </div>

          {/* Newsletter Subscription */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-white">Subscribe</h2>
            <p className="text-gray-400">
              Stay updated with our latest campaigns and news.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 text-white placeholder-gray-500"
                required
              />
              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
          <p>© 2025 Givelope. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;