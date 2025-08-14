// src/components/auth/RegisterForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import InputField from '../ui/InputField';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    user_type: 'donor'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          user_type: formData.user_type
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.data));
        
        console.log('Registration successful:', data);
        
        // Navigate to explore page after registration
        navigate('/campaigns/explore');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      {/* Error Message */}
      {error && (
        <div className="relative p-4 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-2xl">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-sm font-medium text-red-800">{error}</p>
          </div>
        </div>
      )}

      {/* Form Fields */}
      <div className="space-y-6">
        <div className="group">
          <InputField
            label="Full Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
            className="w-full px-5 py-4 bg-white/70 backdrop-blur-sm border border-gray-200/60 rounded-2xl text-gray-800 placeholder-gray-400 focus:ring-4 focus:ring-red-100/50 focus:border-red-300 transition-all duration-300 hover:border-gray-300 hover:bg-white/80 group-hover:shadow-lg"
          />
        </div>

        <div className="group">
          <InputField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            required
            className="w-full px-5 py-4 bg-white/70 backdrop-blur-sm border border-gray-200/60 rounded-2xl text-gray-800 placeholder-gray-400 focus:ring-4 focus:ring-red-100/50 focus:border-red-300 transition-all duration-300 hover:border-gray-300 hover:bg-white/80 group-hover:shadow-lg"
          />
        </div>

        <div className="group">
          <InputField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
            className="w-full px-5 py-4 bg-white/70 backdrop-blur-sm border border-gray-200/60 rounded-2xl text-gray-800 placeholder-gray-400 focus:ring-4 focus:ring-red-100/50 focus:border-red-300 transition-all duration-300 hover:border-gray-300 hover:bg-white/80 group-hover:shadow-lg"
          />
        </div>

        <div className="group">
          <InputField
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="••••••••"
            required
            className="w-full px-5 py-4 bg-white/70 backdrop-blur-sm border border-gray-200/60 rounded-2xl text-gray-800 placeholder-gray-400 focus:ring-4 focus:ring-red-100/50 focus:border-red-300 transition-all duration-300 hover:border-gray-300 hover:bg-white/80 group-hover:shadow-lg"
          />
        </div>

        {/* User Type Selection */}
        <div className="group">
          <label className="block text-sm font-semibold text-gray-700 mb-3 tracking-wide">
            User Type
          </label>
          <div className="relative">
            <select
              name="user_type"
              value={formData.user_type}
              onChange={handleChange}
              className="w-full px-5 py-4 bg-white/70 backdrop-blur-sm border border-gray-200/60 rounded-2xl text-gray-800 focus:ring-4 focus:ring-red-100/50 focus:border-red-300 transition-all duration-300 hover:border-gray-300 hover:bg-white/80 appearance-none cursor-pointer group-hover:shadow-lg"
              required
            >
              <option value="donor">🤝 Donor - Support Campaigns</option>
              <option value="recipient">📢 Recipient - Create Campaigns</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <Button
          type="submit"
          disabled={loading}
          className="w-full py-4 px-6 bg-gradient-to-r from-red-500 via-red-600 to-orange-500 hover:from-red-600 hover:via-red-700 hover:to-orange-600 text-white rounded-2xl font-semibold text-base shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          <span className="relative flex items-center justify-center space-x-2">
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <span>Create Account</span>
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </>
            )}
          </span>
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;