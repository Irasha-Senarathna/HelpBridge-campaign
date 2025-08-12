// src/pages/Auth/Register.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../../components/auth/RegisterForm';
import authBg from '../../assets/images/auth-bg.jpg';

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 p-4">
      <div className="w-full max-w-4xl rounded-xl overflow-hidden grid md:grid-cols-2 shadow-lg">
        {/* Image Section */}
        <div className="hidden md:block relative">
          <img
            src={authBg}
            alt="Decorative background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-red-900/60 via-orange-900/30 to-transparent flex items-end p-8">
            <div className="text-white">
              <h3 className="text-2xl font-bold">Join Our Community</h3>
              <p className="text-gray-200">Start making a difference today</p>
            </div>
          </div>
        </div>
        
        {/* Form Section */}
        <div className="bg-white/95 backdrop-blur-sm p-8 sm:p-10 flex flex-col justify-center">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-red-100 to-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              Create Account
            </h2>
            <p className="text-gray-600 mt-2">
              Join us and start making a difference
            </p>
          </div>
          
          <RegisterForm />
          
          {/* Additional styling for form links */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link 
                to="/auth/login" 
                className="font-medium text-red-600 hover:text-orange-600 transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;