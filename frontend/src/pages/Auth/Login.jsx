import React, { useState } from 'react';
import { FiMail, FiLock, FiEye, FiEyeOff, FiLogIn } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import axios from 'axios';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Send login request to backend
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password
      });
      
      if (response.data.success) {
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(response.data.data));
        
        // If remember me is checked, store for longer period
        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }
        
        // Redirect to explore page
        navigate('/campaigns/explore');
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else if (error.response?.status === 401) {
        setError('Invalid email or password. Please try again.');
      } else {
        setError('Login failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Warm background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
        {/* Soft floating shapes */}
        <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-r from-orange-200 to-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse"></div>
        <div className="absolute top-60 right-32 w-56 h-56 bg-gradient-to-r from-red-200 to-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-40 left-1/3 w-48 h-48 bg-gradient-to-r from-amber-200 to-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse" style={{animationDelay: '4s'}}></div>
        
        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full bg-[radial-gradient(circle_at_1px_1px,rgba(239,68,68,0.3)_1px,transparent_0)] bg-[size:20px_20px]"></div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left side - Hero content */}
          <div className="hidden lg:block space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-orange-200 shadow-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">Making a difference together</span>
              </div>
              
              <h1 className="text-6xl font-bold leading-tight text-gray-800">
                Welcome to
                <br />
                <span className="bg-gradient-to-r from-orange-600 via-red-500 to-pink-500 bg-clip-text text-transparent">
                  Hope
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-md">
                Join thousands of compassionate individuals making meaningful impact through donations and community support.
              </p>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 max-w-sm">
              <div className="bg-white/60 backdrop-blur-sm border border-orange-100 rounded-2xl p-4 hover:bg-white/80 transition-all duration-300 shadow-sm">
                <div className="text-2xl font-bold text-orange-600">$2.4M</div>
                <div className="text-sm text-gray-600">Donated</div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm border border-red-100 rounded-2xl p-4 hover:bg-white/80 transition-all duration-300 shadow-sm">
                <div className="text-2xl font-bold text-red-500">10K+</div>
                <div className="text-sm text-gray-600">Donors</div>
              </div>
            </div>
          </div>

          {/* Right side - Clean form */}
          <div className="w-full max-w-md mx-auto">
            <div className="bg-white/90 backdrop-blur-sm border border-white/50 rounded-3xl p-8 shadow-xl">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="relative inline-block mb-6">
                  <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                    <img 
                      src={logo} 
                      alt="Logo" 
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
                <p className="text-gray-600">Continue your journey of giving</p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FiMail className={`transition-colors duration-200 ${focusedField === 'email' ? 'text-orange-500' : 'text-gray-400'}`} />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full pl-12 pr-4 py-4 bg-white/80 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all duration-300 hover:border-gray-300"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                {/* Password field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FiLock className={`transition-colors duration-200 ${focusedField === 'password' ? 'text-red-500' : 'text-gray-400'}`} />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full pl-12 pr-12 py-4 bg-white/80 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all duration-300 hover:border-gray-300"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center hover:bg-gray-50 rounded-r-xl transition-colors duration-200"
                    >
                      {showPassword ? (
                        <FiEyeOff className="text-gray-400 hover:text-gray-600" />
                      ) : (
                        <FiEye className="text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember me & Forgot password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center cursor-pointer group">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded-md border-2 transition-all duration-200 ${rememberMe ? 'bg-orange-500 border-orange-500' : 'border-gray-300 bg-white'}`}>
                        {rememberMe && (
                          <svg className="w-3 h-3 text-white absolute top-0.5 left-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <span className="ml-3 text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-200">Remember me</span>
                  </label>

                  <a 
                    href="/forgot-password" 
                    className="text-sm font-medium text-orange-600 hover:text-orange-700 transition-colors duration-200"
                  >
                    Forgot password?
                  </a>
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-orange-200"
                  >
                    <div className="flex items-center justify-center space-x-3">
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Signing in...</span>
                        </>
                      ) : (
                        <>
                          <span>Sign In</span>
                          <FiLogIn className="text-lg" />
                        </>
                      )}
                    </div>
                  </button>
                </div>
              </form>

              {/* Divider */}
              <div className="my-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-4 text-sm text-gray-500 bg-white">
                      New to our platform?
                    </span>
                  </div>
                </div>
              </div>

              {/* Create account */}
              <div>
                <a
                  href="/auth/register"
                  className="w-full flex items-center justify-center py-4 px-6 border-2 border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 group"
                >
                  <span>Create an account</span>
                  <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Simple floating elements */}
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-orange-300 rounded-xl opacity-30 animate-pulse"></div>
            <div className="absolute -bottom-4 -right-4 w-10 h-10 bg-red-300 rounded-2xl opacity-30 animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
        </div>
      </div>

      {/* Simple CSS animations */}
      <style>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px); 
          }
          50% { 
            transform: translateY(-10px); 
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Login;