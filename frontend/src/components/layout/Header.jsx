// src/components/layout/Header.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

const Header = ({ activeTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const tabs = [
    { key: 'explore', label: 'Explore Campaigns', path: '/campaigns/explore' },
    { key: 'create', label: 'Start a Campaign', path: '/campaigns/start-campaign' },
    { key: 'about', label: 'About Us', path: '/about' },
    { key: 'donate', label: 'Donate Now', path: '/donate' },
  ];

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl"> {/* Increased max width */}
        <div className="flex justify-between items-center h-20 md:h-24"> {/* Increased height */}
          {/* Logo with brand name - scaled up */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Givehope Logo" className="h-12 w-auto" /> {/* Increased logo size */}
              <span className="ml-3 text-2xl font-semibold text-gray-900 hidden sm:block">GiveHope</span> {/* Increased text size */}
            </Link>
          </div>

          {/* Desktop Navigation - increased text size */}
          <nav className="hidden md:flex items-center space-x-3"> {/* Increased spacing */}
            {tabs.map((tab) => (
              <Link
                key={tab.key}
                to={tab.path}
                className={`px-5 py-3 text-base font-medium rounded-lg transition-all duration-200 ${
                  activeTab === tab.key
                    ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-md'
                    : 'text-gray-700 hover:text-red-600 hover:bg-red-50'
                }`}
              >
                {tab.label}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons - Desktop - increased size */}
          <div className="hidden md:flex items-center space-x-4"> {/* Increased spacing */}
            <Link
              to="/auth/login"
              className="px-5 py-2.5 text-base font-medium text-red-600 hover:text-red-700 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/auth/register"
              className="px-5 py-2.5 text-base font-medium text-white bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 rounded-lg shadow-sm transition-colors"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-red-600 focus:outline-none focus:text-red-600"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu - increased text size */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-3 pt-3 pb-4 space-y-2"> {/* Increased padding and spacing */}
            {tabs.map((tab) => (
              <Link
                key={tab.key}
                to={tab.path}
                className={`block px-4 py-3 rounded-md text-lg font-medium ${
                  activeTab === tab.key
                    ? 'bg-red-50 text-red-600'
                    : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {tab.label}
              </Link>
            ))}
          </div>
          <div className="px-3 pt-3 pb-5 border-t border-gray-200"> {/* Increased padding */}
            <Link
              to="/auth/login"
              className="block w-full px-4 py-3 rounded-md text-lg font-medium text-gray-700 hover:bg-red-50 hover:text-red-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/auth/register"
              className="block w-full mt-3 px-4 py-3 rounded-md text-lg font-medium text-center text-white bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;