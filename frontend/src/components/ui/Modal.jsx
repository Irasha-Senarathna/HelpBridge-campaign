// src/components/ui/Modal.jsx
import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 overflow-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        className="relative bg-white rounded-lg shadow-xl max-w-3xl w-full mx-auto max-h-[90vh] overflow-y-auto p-6"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold z-10"
          aria-label="Close modal"
        >
          ×
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
