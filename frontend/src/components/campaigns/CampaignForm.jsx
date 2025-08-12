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
        name="title"
        value={formData.title}
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
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 bg-white/80 border border-white/50 rounded-xl text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-orange-100 focus:border-orange-400 transition-all duration-300"
          placeholder="Describe your campaign's mission and impact..."
          required
        />
      </div>

      <InputField
        label="Contact Number"
        type="tel"
        name="contact"
        value={formData.contact}
        onChange={handleChange}
        placeholder="0771234567"
        required
        className="bg-white/80 border-white/50 focus:border-orange-400 focus:ring-orange-100 rounded-xl"
      />

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-3">
          Campaign Status
        </label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white/80 border border-white/50 rounded-xl text-gray-800 focus:ring-2 focus:ring-orange-100 focus:border-orange-400 transition-all duration-300"
        >
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
          <option value="Paused">Paused</option>
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
