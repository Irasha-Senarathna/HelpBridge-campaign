// src/components/CampaignForm.jsx
import React from "react";
import InputField from "../ui/InputField";
import Button from "../ui/Button";

const CampaignForm = ({ formData, handleChange, handleSubmit, resetForm, editingCampaign }) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <InputField
        label="Campaign Title"
        type="text"
        name="Title"
        value={formData.Title || ''}
        onChange={handleChange}
        placeholder="Enter an inspiring campaign title"
        required
        className="bg-white/80 border-white/50 focus:border-orange-400 focus:ring-orange-100 rounded-xl"
      />

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-3">
          Campaign Description
        </label>
        <textarea
          name="Description"
          value={formData.Description || ''}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 bg-white/80 border border-white/50 rounded-xl text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-orange-100 focus:border-orange-400 transition-all duration-300"
          placeholder="Describe your campaign's mission and impact..."
          required
        />
      </div>

      <InputField
        label="Target Amount"
        type="number"
        name="Target_amount"
        value={formData.Target_amount || ''}
        onChange={handleChange}
        placeholder="Enter target amount"
        required
        className="bg-white/80 border-white/50 focus:border-orange-400 focus:ring-orange-100 rounded-xl"
      />

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-3">
          Product Type
        </label>
        <select
          name="Product"
          value={formData.Product || ''}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white/80 border border-white/50 rounded-xl text-gray-800 focus:ring-2 focus:ring-orange-100 focus:border-orange-400 transition-all duration-300"
          required
        >
          <option value="">Select product type</option>
          <option value="Food">Food</option>
          <option value="Clothing">Clothing</option>
          <option value="Medicine">Medicine</option>
          <option value="Education">Education</option>
          <option value="Shelter">Shelter</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <InputField
        label="Recipient ID (Optional)"
        type="text"
        name="recipient"
        value={formData.recipient || ''}
        onChange={handleChange}
        placeholder="Leave empty to use yourself as recipient"
        className="bg-white/80 border-white/50 focus:border-orange-400 focus:ring-orange-100 rounded-xl"
      />

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-3">
          Start Date
        </label>
        <input
          type="date"
          name="Start_date"
          value={formData.Start_date || ''}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white/80 border border-white/50 rounded-xl text-gray-800 focus:ring-2 focus:ring-orange-100 focus:border-orange-400 transition-all duration-300"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-3">
          End Date
        </label>
        <input
          type="date"
          name="End_date"
          value={formData.End_date || ''}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white/80 border border-white/50 rounded-xl text-gray-800 focus:ring-2 focus:ring-orange-100 focus:border-orange-400 transition-all duration-300"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-3">
          Campaign Status
        </label>
        <select
          name="Status"
          value={formData.Status || 'Active'}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white/80 border border-white/50 rounded-xl text-gray-800 focus:ring-2 focus:ring-orange-100 focus:border-orange-400 transition-all duration-300"
        >
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
          <option value="Paused">Paused</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-3">
          Campaign Image
        </label>
        <input
          type="file"
          name="image"
          onChange={handleChange}
          accept="image/*"
          className="w-full px-4 py-3 bg-white/80 border border-white/50 rounded-xl text-gray-800 focus:ring-2 focus:ring-orange-100 focus:border-orange-400 transition-all duration-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
        />
      </div>

      <div className="flex justify-end space-x-4 pt-6">
        <Button
          type="button"
          onClick={resetForm}
          className="px-6 py-3 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-xl font-semibold transition-all duration-300"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          {editingCampaign ? "Update Campaign" : "Create Campaign"}
        </Button>
      </div>
    </form>
  );
};

export default CampaignForm;
