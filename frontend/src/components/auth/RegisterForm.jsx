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
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      <InputField
        label="Full Name"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Enter your full name"
        required
        className="bg-white/80 border-gray-200 focus:border-red-400 focus:ring-red-100 rounded-xl"
      />

      <InputField
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="your@email.com"
        required
        className="bg-white/80 border-gray-200 focus:border-red-400 focus:ring-red-100 rounded-xl"
      />

      <InputField
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="••••••••"
        required
        className="bg-white/80 border-gray-200 focus:border-red-400 focus:ring-red-100 rounded-xl"
      />

      <InputField
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        placeholder="••••••••"
        required
        className="bg-white/80 border-gray-200 focus:border-red-400 focus:ring-red-100 rounded-xl"
      />

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-3">
          User Type
        </label>
        <select
          name="user_type"
          value={formData.user_type}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl text-gray-800 focus:ring-2 focus:ring-red-100 focus:border-red-400 transition-all duration-300"
          required
        >
          <option value="donor">Donor</option>
          <option value="recipient">Recipient</option>
        </select>
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full py-4 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Creating Account...' : 'Create Account'}
      </Button>
    </form>
  );
};

export default RegisterForm;