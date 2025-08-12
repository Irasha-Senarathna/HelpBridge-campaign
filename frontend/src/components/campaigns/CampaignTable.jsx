
import React, { useState } from 'react';
import { FaEdit, FaTrash, FaEye, FaPlus } from 'react-icons/fa';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import CampaignForm from './CampaignForm';

const CampaignTable = ({ campaigns, onCampaignUpdate, onCampaignDelete, user }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [formData, setFormData] = useState({
    Title: '',
    Description: '',
    Target_amount: '',
    Product: '',
    recipient: '',
    Start_date: '',
    End_date: '',
    Status: 'Active'
  });
  const [loading, setLoading] = useState(false);

  // Handle Edit: open modal with data loaded
  const handleEdit = (campaign) => {
    setSelectedCampaign(campaign);
    setFormData({
      Title: campaign.Title,
      Description: campaign.Description,
      Target_amount: campaign.Target_amount,
      Product: campaign.Product,
      recipient: campaign.recipient?._id || campaign.recipient || '',
      Start_date: campaign.Start_date ? new Date(campaign.Start_date).toISOString().split('T')[0] : '',
      End_date: campaign.End_date ? new Date(campaign.End_date).toISOString().split('T')[0] : '',
      Status: campaign.Status
    });
    setShowEditModal(true);
  };

  // Handle Delete: open delete confirmation modal
  const handleDelete = (campaign) => {
    setSelectedCampaign(campaign);
    setShowDeleteModal(true);
  };

  // Handle View: open view details modal
  const handleView = (campaign) => {
    setSelectedCampaign(campaign);
    setShowViewModal(true);
  };

  // Handle Create: show create form outside table
  const handleCreate = () => {
    setShowCreateForm(true);
    setSelectedCampaign(null);
    setFormData({
      Title: '',
      Description: '',
      Target_amount: '',
      Product: '',
      recipient: '',
      Start_date: '',
      End_date: '',
      Status: 'Active'
    });
  };

  // Form field change handler
  const handleFormChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Form submit for both create and update
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login to perform this action');
        setLoading(false);
        return;
      }

      const formDataToSend = new FormData();

      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== undefined && formData[key] !== '') {
          if (key === 'recipient' && (!formData[key] || formData[key].trim() === '')) {
            return;
          }
          formDataToSend.append(key, formData[key]);
        }
      });

      const url = selectedCampaign
        ? `http://localhost:5000/api/campaigns/${selectedCampaign.Campaign_ID}`
        : 'http://localhost:5000/api/campaigns';

      const method = selectedCampaign ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend
      });

      if (response.ok) {
        const result = await response.json();
        if (onCampaignUpdate) {
          onCampaignUpdate(result.data);
        }

        if (selectedCampaign) {
          setShowEditModal(false);
          alert('Campaign updated successfully!');
        } else {
          // Created new campaign
          setShowCreateForm(false);
          alert('Campaign created successfully!');
        }

        setFormData({
          Title: '',
          Description: '',
          Target_amount: '',
          Product: '',
          recipient: '',
          Start_date: '',
          End_date: '',
          Status: 'Active'
        });
        setSelectedCampaign(null);
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while saving the campaign');
    } finally {
      setLoading(false);
    }
  };

  // Confirm deletion
  const confirmDelete = async () => {
    if (!selectedCampaign) return;

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login to delete campaigns');
        setLoading(false);
        return;
      }

      const response = await fetch(`http://localhost:5000/api/campaigns/${selectedCampaign.Campaign_ID}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        if (onCampaignDelete) {
          onCampaignDelete(selectedCampaign.Campaign_ID);
        }
        setShowDeleteModal(false);
        setSelectedCampaign(null);
        alert('Campaign deleted successfully!');
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error('Error deleting campaign:', error);
      alert('An error occurred while deleting the campaign');
    } finally {
      setLoading(false);
    }
  };

  // Reset form (used in CampaignForm)
  const resetForm = () => {
    setFormData({
      Title: '',
      Description: '',
      Target_amount: '',
      Product: '',
      recipient: '',
      Start_date: '',
      End_date: '',
      Status: 'Active'
    });
    setShowCreateForm(false);
    setSelectedCampaign(null);
  };

  // Format helpers
  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    return new Date(dateString).toLocaleDateString();
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount || 0);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      case 'Paused': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const canEditCampaign = (campaign) => {
    const token = localStorage.getItem('token');
    if (!token) return false;
    return true;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">

      {/* Header */}
      <div className="px-6 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Campaign Management</h2>
          <Button
            onClick={() => {
              if (!localStorage.getItem('token')) {
                alert('Please login to create campaigns');
                return;
              }
              handleCreate();
            }}
            data-create-campaign
            className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2"
          >
            <FaPlus className="text-sm" />
            Create Campaign
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full campaign-table">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Campaign
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Target
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Progress
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Dates
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {campaigns.map((campaign) => (
              <tr key={campaign.Campaign_ID} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-12 w-12">
                      <img
                        className="h-12 w-12 rounded-lg object-cover"
                        src={campaign.image || '/default-campaign.jpg'}
                        alt={campaign.Title}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {campaign.Title}
                      </div>
                      <div className="text-sm text-gray-500">
                        {campaign.Product} • {campaign.Campaign_ID}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  <div className="font-medium">{formatCurrency(campaign.Target_amount)}</div>
                  <div className="text-gray-500">
                    Raised: {formatCurrency(campaign.Current_donation || 0)}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full"
                      style={{ 
                        width: `${campaign.Target_amount ? Math.min(((campaign.Current_donation || 0) / campaign.Target_amount) * 100, 100) : 0}%` 
                      }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {campaign.Target_amount ? Math.round(((campaign.Current_donation || 0) / campaign.Target_amount) * 100) : 0}%
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(campaign.Status)}`}>
                    {campaign.Status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  <div>Start: {formatDate(campaign.Start_date)}</div>
                  <div>End: {formatDate(campaign.End_date)}</div>
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => handleView(campaign)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="View Campaign"
                    >
                      <FaEye className="text-sm" />
                    </Button>
                    {canEditCampaign(campaign) && (
                      <>
                        <Button
                          onClick={() => handleEdit(campaign)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Edit Campaign"
                        >
                          <FaEdit className="text-sm" />
                        </Button>
                        <Button
                          onClick={() => handleDelete(campaign)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Campaign"
                        >
                          <FaTrash className="text-sm" />
                        </Button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {campaigns.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📋</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns found</h3>
          <p className="text-gray-500 mb-4">Get started by creating your first campaign</p>
          <Button
            onClick={() => {
              if (!localStorage.getItem('token')) {
                alert('Please login to create campaigns');
                return;
              }
              handleCreate();
            }}
            className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300"
          >
            Create Campaign
          </Button>
        </div>
      )}

      {/* Create Form shown outside the table */}
      {showCreateForm && (
        <div className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-xl shadow-lg">
          <CampaignForm
            formData={formData}
            handleChange={handleFormChange}
            handleSubmit={async (e) => {
              await handleFormSubmit(e);
              setShowCreateForm(false);
            }}
            resetForm={() => setShowCreateForm(false)}
            editingCampaign={null}
          />
          <Button
            onClick={() => setShowCreateForm(false)}
            className="mt-4 px-6 py-3 bg-gray-300 rounded-lg font-semibold hover:bg-gray-400 transition"
          >
            Cancel
          </Button>
        </div>
      )}

      {/* Edit Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Campaign"
      >
        <CampaignForm
          formData={formData}
          handleChange={handleFormChange}
          handleSubmit={handleFormSubmit}
          resetForm={resetForm}
          editingCampaign={selectedCampaign}
        />
      </Modal>

      {/* View Modal */}
      <Modal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        title="Campaign Details"
      >
        {selectedCampaign && (
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-bold text-gray-700 mb-2">Campaign ID:</h3>
                <p className="text-gray-900">{selectedCampaign.Campaign_ID}</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-700 mb-2">Title:</h3>
                <p className="text-gray-900">{selectedCampaign.Title}</p>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-gray-700 mb-2">Description:</h3>
              <p className="text-gray-900">{selectedCampaign.Description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-bold text-gray-700 mb-2">Product:</h3>
                <span className="inline-flex px-2 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-800">
                  {selectedCampaign.Product}
                </span>
              </div>
              <div>
                <h3 className="font-bold text-gray-700 mb-2">Status:</h3>
                <span className={`inline-flex px-2 py-1 text-sm font-semibold rounded-full ${getStatusColor(selectedCampaign.Status)}`}>
                  {selectedCampaign.Status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-bold text-gray-700 mb-2">Target Amount:</h3>
                <p className="text-gray-900">{formatCurrency(selectedCampaign.Target_amount)}</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-700 mb-2">Current Donation:</h3>
                <p className="text-gray-900">{formatCurrency(selectedCampaign.Current_donation || 0)}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-bold text-gray-700 mb-2">Start Date:</h3>
                <p className="text-gray-900">{formatDate(selectedCampaign.Start_date)}</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-700 mb-2">End Date:</h3>
                <p className="text-gray-900">{formatDate(selectedCampaign.End_date)}</p>
              </div>
            </div>

            {selectedCampaign.image && (
              <div>
                <h3 className="font-bold text-gray-700 mb-2">Campaign Image:</h3>
                <img
                  src={selectedCampaign.image}
                  alt="Campaign"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            )}
          </div>
        )}
      </Modal>

      
      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Campaign"
      >
        <div className="p-6">
          <div className="text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Delete Campaign
            </h3>
            <p className="text-gray-500 mb-6">
              Are you sure you want to delete "{selectedCampaign?.Title}"? This action cannot be undone.
            </p>
            <div className="flex justify-center space-x-4">
              <Button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold transition-colors"
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors"
                disabled={loading}
              >
                {loading ? 'Deleting...' : 'Delete'}
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CampaignTable;
