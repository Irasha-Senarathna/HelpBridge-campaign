// src/components/ui/InputField.jsx
import React from 'react';

const InputField = ({ label, type, name, value, onChange, placeholder, required, className }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 
                  focus:ring-blue-500 focus:border-blue-500 transition ${className || ''}`}
        required={required}
      />
    </div>
  );
};

export default InputField;