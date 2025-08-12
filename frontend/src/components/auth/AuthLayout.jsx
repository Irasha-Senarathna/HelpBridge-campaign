// src/components/auth/AuthLayout.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.jpg'; 
import background from '../../assets/images/auth-bg.jpg';

// Replace with your logo


    const AuthLayout = ({ title, subtitle, description, children }) => {
      return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center" 
             style={{ backgroundImage: `url(${background})` }}>
      <div className="w-full max-w-md mx-4 bg-white rounded-xl shadow-lg p-8 backdrop-blur-sm bg-opacity-90">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="HelpBridge Logo" className="h-12" />
        </div>
        
        {/* Headings */}
        <h1 className="text-3xl font-bold text-center text-gray-800">{title}</h1>
        <p className="mt-2 text-center text-gray-600">{subtitle}</p>
        <p className="text-center text-gray-500 text-sm mb-8">{description}</p>

        {/* Form Content */}
        {children}

        {/* Footer Links */}
        <div className="mt-6 text-center text-sm">
          <Link to="/register" className="text-blue-600 hover:text-blue-800">
            Don't have an account? Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;