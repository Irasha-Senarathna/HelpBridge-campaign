import React, { useState, useEffect } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Modal from '../../components/ui/Modal';
import CampaignTable from '../../components/campaigns/CampaignTable';
import bannerImage from '../../assets/images/banner.jpg';

const StartCampaign = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Control modal visibility for create form
  const [showFullCreateForm, setShowFullCreateForm] = useState(false);

  // Form data for creation
  const [formData, setFormData] = useState({
    Title: '',
    Description: '',
    Target_amount: '',
    Product: '',
    recipient: '',
    Start_date: '',
    End_date: '',
    Status: 'Active',
  });

  // Fetch campaigns
  const fetchCampaigns = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/campaigns');
      if (response.ok) {
        const result = await response.json();
        setCampaigns(result.data || []);
      } else {
        console.error('Failed to fetch campaigns');
      }
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    } finally {
      setLoading(false);
    }
  };

  // Parse user info from token
  const getCurrentUser = () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser(payload);
      } catch (error) {
        console.error('Error parsing token:', error);
      }
    }
  };

  useEffect(() => {
    getCurrentUser();
    fetchCampaigns();
  }, []);

  const handleCampaignUpdate = (updatedCampaign) => {
    setCampaigns(prev =>
      prev.map(c => (c.Campaign_ID === updatedCampaign.Campaign_ID ? updatedCampaign : c))
    );
  };

  const handleCampaignDelete = (campaignId) => {
    setCampaigns(prev => prev.filter(c => c.Campaign_ID !== campaignId));
  };

  // Update form data on input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle create form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to create campaigns');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/campaigns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        setCampaigns(prev => [...prev, result.data]);
        alert('Campaign created successfully!');
        setShowFullCreateForm(false);
        setFormData({
          Title: '',
          Description: '',
          Target_amount: '',
          Product: '',
          recipient: '',
          Start_date: '',
          End_date: '',
          Status: 'Active',
        });
        fetchCampaigns(); // Refresh list
      } else {
        const error = await response.json();
        alert(`Failed to create campaign: ${error.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error creating campaign:', error);
      alert('Error creating campaign');
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <Header activeTab="campaigns" />

      {/* Banner Section (you can add banner here) */}

      <main className="flex-grow container mx-auto px-4 max-w-7xl py-12 relative z-10">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading campaigns...</p>
          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-white/50">
            <CampaignTable
              campaigns={campaigns}
              onCampaignUpdate={handleCampaignUpdate}
              onCampaignDelete={handleCampaignDelete}
              user={user}
              onCreateClick={() => setShowFullCreateForm(true)}
            />
          </div>
        )}

        {/* Start Your Campaign button */}
        <div className="mt-12 text-center">
          <div className="bg-white/60 backdrop-blur-sm border border-white/50 rounded-3xl p-8 max-w-3xl mx-auto shadow-lg">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              Ready to Make a{' '}
              <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Difference?
              </span>
            </h3>
            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              Every campaign starts with a single step. Create meaningful change in your community by launching a campaign that matters.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  const token = localStorage.getItem('token');
                  if (!token) {
                    alert('Please login to create campaigns');
                    return;
                  }
                  setShowFullCreateForm(true);
                }}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Start Your Campaign
              </button>

              <button className="border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 font-semibold py-4 px-8 rounded-full transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Full Create Campaign Form Modal */}
        {showFullCreateForm && (
          <Modal onClose={() => setShowFullCreateForm(false)}>
            <form
              onSubmit={handleSubmit}
              className="space-y-6 max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg"
            >
              <h2 className="text-2xl font-bold mb-4">Create New Campaign</h2>

              <div>
                <label className="block font-semibold mb-1" htmlFor="Title">
                  Title
                </label>
                <input
                  id="Title"
                  name="Title"
                  type="text"
                  value={formData.Title}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1" htmlFor="Description">
                  Description
                </label>
                <textarea
                  id="Description"
                  name="Description"
                  value={formData.Description}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  rows={4}
                />
              </div>

              <div>
                <label className="block font-semibold mb-1" htmlFor="Target_amount">
                  Target Amount
                </label>
                <input
                  id="Target_amount"
                  name="Target_amount"
                  type="number"
                  value={formData.Target_amount}
                  onChange={handleInputChange}
                  required
                  min="1"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1" htmlFor="Product">
                  Product
                </label>
                <input
                  id="Product"
                  name="Product"
                  type="text"
                  value={formData.Product}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1" htmlFor="recipient">
                  Recipient
                </label>
                <input
                  id="recipient"
                  name="recipient"
                  type="text"
                  value={formData.recipient}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1" htmlFor="Start_date">
                    Start Date
                  </label>
                  <input
                    id="Start_date"
                    name="Start_date"
                    type="date"
                    value={formData.Start_date}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1" htmlFor="End_date">
                    End Date
                  </label>
                  <input
                    id="End_date"
                    name="End_date"
                    type="date"
                    value={formData.End_date}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1" htmlFor="Status">
                  Status
                </label>
                <select
                  id="Status"
                  name="Status"
                  value={formData.Status}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowFullCreateForm(false)}
                  className="px-6 py-2 rounded bg-gray-300 hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600"
                >
                  Create Campaign
                </button>
              </div>
            </form>
          </Modal>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default StartCampaign;
