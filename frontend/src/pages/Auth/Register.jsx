// src/pages/Auth/Register.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../../components/auth/RegisterForm';
import authBg from '../../assets/images/auth-bg.jpg';

const Register = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-pink-50 p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-red-200/30 to-orange-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-orange-200/30 to-pink-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-red-100/20 to-orange-100/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative flex items-center justify-center min-h-screen">
        <div className="w-full max-w-5xl rounded-3xl overflow-hidden grid lg:grid-cols-2 shadow-2xl bg-white/10 backdrop-blur-md border border-white/20">
          
          {/* Image Section */}
          <div className="hidden lg:block relative overflow-hidden">
            <img
              src={authBg}
              alt="Community members helping each other"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-red-900/70 via-orange-900/50 to-pink-900/40"></div>
            
            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col justify-between p-8 lg:p-12">
              {/* Top Logo/Brand */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <span className="text-white font-bold text-lg">CrowdFund</span>
              </div>

              {/* Bottom Content */}
              <div className="text-white">
                <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                  Join Our
                  <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent block">
                    Community
                  </span>
                </h1>
                <p className="text-gray-200 text-lg mb-6 leading-relaxed">
                  Start making a difference today. Connect with thousands who share your passion for positive change.
                </p>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span>Secure & Trusted</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                      </svg>
                    </div>
                    <span>10K+ Members</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="bg-white/90 backdrop-blur-sm p-8 lg:p-12 flex flex-col justify-center relative">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-red-100/50 to-transparent rounded-bl-full"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-orange-100/50 to-transparent rounded-tr-full"></div>

            {/* Header */}
            <div className="text-center mb-8 relative z-10">
              <div className="w-20 h-20 bg-gradient-to-r from-red-100 to-orange-100 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group hover:shadow-xl transition-all duration-300 hover:scale-105">
                <svg className="w-10 h-10 text-red-600 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              
              <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-red-600 via-red-700 to-orange-600 bg-clip-text text-transparent mb-3">
                Create Account
              </h2>
              <p className="text-gray-600 text-lg">
                Join us and start making a 
                <span className="font-semibold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent"> difference</span>
              </p>
            </div>

            {/* Form */}
            <div className="relative z-10">
              <RegisterForm />
            </div>

            {/* Login Link */}
            <div className="mt-8 text-center relative z-10">
              <div className="flex items-center justify-center mb-4">
                <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent flex-1"></div>
                <span className="px-4 text-sm text-gray-500 bg-white/90">or</span>
                <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent flex-1"></div>
              </div>
              
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link
                  to="/auth/login"
                  className="font-semibold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent hover:from-red-700 hover:to-orange-700 transition-all duration-300 relative group"
                >
                  Sign in here
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-600 to-orange-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;