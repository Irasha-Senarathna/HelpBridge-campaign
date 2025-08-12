// src/pages/Campaigns/StartCampaign.jsx
import React, { useState } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Button from '../../components/ui/Button';
import InputField from '../../components/ui/InputField';
import Modal from '../../components/ui/Modal';
import bannerImage from '../../assets/images/banner.jpg';
import CampaignForm from '../../components/campaigns/CampaignForm';

const StartCampaign = () => {
  // Campaigns state with initial data
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      title: "Clean Water Project",
      description: "Providing clean drinking water to rural areas through well construction and water purification systems.",
      contact: "0771234567",
      image: null,
      status: "Active",
      createdDate: "2024-01-15",
    },
    {
      id: 2,
      title: "School Supplies Drive",
      description: "Collecting school materials for underprivileged kids including books, pens, and uniforms.",
      contact: "0719876543",
      image: null,
      status: "Active",
      createdDate: "2024-02-10",
    },
    {
      id: 3,
      title: "Medical Aid Campaign",
      description: "Providing essential medicines and medical equipment to remote healthcare centers.",
      contact: "0757891234",
      image: null,
      status: "Completed",
      createdDate: "2024-01-08",
    },
  ]);

  // Other state variables
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [viewingCampaign, setViewingCampaign] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    contact: "",
    image: null,
    status: "Active",
  });

  // Handle input changes for form fields
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Create or update campaign
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCampaign) {
      setCampaigns((prev) =>
        prev.map((c) =>
          c.id === editingCampaign.id
            ? { ...formData, id: c.id, createdDate: c.createdDate }
            : c
        )
      );
    } else {
      const newCampaign = {
        ...formData,
        id: Date.now(),
        createdDate: new Date().toISOString().split('T')[0],
      };
      setCampaigns((prev) => [...prev, newCampaign]);
    }
    resetForm();
  };

  // Reset form and close modal
  const resetForm = () => {
    setFormData({ title: "", description: "", contact: "", image: null, status: "Active" });
    setEditingCampaign(null);
    setShowForm(false);
  };

  // Delete campaign
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this campaign?")) {
      setCampaigns((prev) => prev.filter((c) => c.id !== id));
    }
  };

  // Edit campaign
  const handleEdit = (campaign) => {
    setEditingCampaign(campaign);
    setFormData({
      title: campaign.title,
      description: campaign.description,
      contact: campaign.contact,
      image: campaign.image,
      status: campaign.status,
    });
    setShowForm(true);
  };

  // View campaign details
  const handleViewMore = (campaign) => {
    setViewingCampaign(campaign);
    setShowDetails(true);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background elements */}
      <div className="fixed inset-0 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 -z-10">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-r from-orange-200 to-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute top-60 right-32 w-56 h-56 bg-gradient-to-r from-red-200 to-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-40 left-1/3 w-48 h-48 bg-gradient-to-r from-amber-200 to-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{animationDelay: '4s'}}></div>
        </div>
      </div>

      <Header activeTab="campaigns" />

      {/* Enhanced Banner Section */}
      <div className="relative w-full h-80 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-red-600 to-pink-600">
          <img
            src={bannerImage}
            alt="Campaign Banner"
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/20 via-transparent to-red-900/20"></div>
          
          {/* Decorative elements */}
          <div className="absolute top-10 right-10 w-24 h-24 border border-white/20 rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-16 h-16 border border-white/20 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 right-1/4 w-12 h-12 border border-white/10 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="relative z-10 flex flex-col justify-center items-start h-full px-6 md:px-16 text-white">
          <div className="max-w-4xl">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30 mb-6">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-sm font-medium">Campaign Management</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold drop-shadow-lg mb-4 leading-tight">
              Empower Your
              <span className="block bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent">
                Community
              </span>
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl drop-shadow-md font-light text-white/90">
              Launch and manage impactful campaigns that make a real difference in people's lives.
            </p>
          </div>
        </div>
      </div>

      <main className="flex-grow container mx-auto px-4 max-w-7xl py-12 relative z-10">
        {/* Enhanced Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-4xl font-bold text-gray-800 mb-2">
              Campaign 
              <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent"> Management</span>
            </h2>
            <p className="text-xl text-gray-600">Create, manage, and track your meaningful campaigns</p>
          </div>
          <Button
            onClick={() => setShowForm(true)}
            className="group bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold"
          >
            <svg className="inline w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create New Campaign
          </Button>
        </div>

        {/* Enhanced Campaigns Table */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-white/50">
          <div className="px-8 py-6 border-b border-gray-100 bg-white/60">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">Your Campaigns</h3>
                <p className="text-gray-600">Manage and track your active campaigns</p>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-700">
              <thead className="bg-gradient-to-r from-orange-100 to-red-100 text-gray-700 text-xs font-bold tracking-wide uppercase">
                <tr>
                  <th className="px-8 py-4">Campaign</th>
                  <th className="px-8 py-4">Description</th>
                  <th className="px-8 py-4">Contact</th>
                  <th className="px-8 py-4">Status</th>
                  <th className="px-8 py-4">Created</th>
                  <th className="px-8 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {campaigns.map((campaign, index) => (
                  <tr
                    key={campaign.id}
                    className="hover:bg-white/60 transition-all duration-200 group"
                    style={{
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    <td className="px-8 py-6">
                      <div className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-200">
                        {campaign.title}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="max-w-xs">
                        <p className="text-gray-600 truncate">{campaign.description}</p>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span className="text-gray-700">{campaign.contact}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span
                        className={`inline-flex px-3 py-1 text-xs font-bold rounded-full ${
                          campaign.status === 'Active'
                            ? 'bg-green-100 text-green-700 border border-green-200'
                            : campaign.status === 'Completed'
                            ? 'bg-blue-100 text-blue-700 border border-blue-200'
                            : 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                        }`}
                      >
                        {campaign.status}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-2 text-gray-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{campaign.createdDate}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleViewMore(campaign)}
                          className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200 hover:underline"
                        >
                          More Info
                        </button>
                        <button
                          onClick={() => handleEdit(campaign)}
                          className="text-green-600 hover:text-green-800 font-semibold transition-colors duration-200 hover:underline"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(campaign.id)}
                          className="text-red-600 hover:text-red-800 font-semibold transition-colors duration-200 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Inspirational Call to Action */}
        <div className="mt-12 text-center">
          <div className="bg-white/60 backdrop-blur-sm border border-white/50 rounded-3xl p-8 max-w-3xl mx-auto shadow-lg">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              Ready to Make a 
              <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent"> Difference?</span>
            </h3>
            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              Every campaign starts with a single step. Create meaningful change in your community by launching a campaign that matters.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setShowForm(true)}
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
      </main>

      <Footer />

      {/* Enhanced Create/Edit Campaign Modal */}
      {showForm && (
        <Modal isOpen={showForm} onClose={resetForm}>
          <div className="p-8 bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {editingCampaign ? "Update Campaign" : "Create New Campaign"}
              </h2>
              <p className="text-gray-600">Fill in the details to launch your meaningful campaign</p>
            </div>

            <CampaignForm
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              resetForm={resetForm}
              editingCampaign={editingCampaign}
            />
          </div>
        </Modal>
      )}

      {/* Enhanced Campaign Details Modal */}
      {showDetails && viewingCampaign && (
        <Modal isOpen={showDetails} onClose={() => setShowDetails(false)}>
          <div className="p-8 bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Campaign Details</h2>
              <p className="text-gray-600">Complete information about this campaign</p>
            </div>

            <div className="space-y-6">
              <div className="bg-white/60 rounded-2xl p-4">
                <h3 className="font-bold text-gray-700 mb-2">Campaign Title:</h3>
                <p className="text-lg text-gray-900 font-medium">{viewingCampaign.title}</p>
              </div>

              <div className="bg-white/60 rounded-2xl p-4">
                <h3 className="font-bold text-gray-700 mb-2">Description:</h3>
                <p className="text-gray-900 leading-relaxed">{viewingCampaign.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/60 rounded-2xl p-4">
                  <h3 className="font-bold text-gray-700 mb-2">Contact Number:</h3>
                  <p className="text-gray-900 font-medium">{viewingCampaign.contact}</p>
                </div>

                <div className="bg-white/60 rounded-2xl p-4">
                  <h3 className="font-bold text-gray-700 mb-2">Status:</h3>
                  <span
                    className={`inline-flex px-3 py-1 text-sm font-bold rounded-full ${
                      viewingCampaign.status === "Active"
                        ? "bg-green-100 text-green-700 border border-green-200"
                        : viewingCampaign.status === "Completed"
                        ? "bg-blue-100 text-blue-700 border border-blue-200"
                        : "bg-yellow-100 text-yellow-700 border border-yellow-200"
                    }`}
                  >
                    {viewingCampaign.status}
                  </span>
                </div>
              </div>

              <div className="bg-white/60 rounded-2xl p-4">
                <h3 className="font-bold text-gray-700 mb-2">Created Date:</h3>
                <p className="text-gray-900 font-medium">{viewingCampaign.createdDate}</p>
              </div>

              {viewingCampaign.image && (
                <div className="bg-white/60 rounded-2xl p-4">
                  <h3 className="font-bold text-gray-700 mb-4">Campaign Image:</h3>
                  <img
                    src={URL.createObjectURL(viewingCampaign.image)}
                    alt="Campaign"
                    className="w-full h-64 object-cover rounded-xl shadow-lg"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end pt-8">
              <Button
                onClick={() => setShowDetails(false)}
                className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Close Details
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Custom animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        tbody tr {
          animation: fadeInUp 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
    
  );
};

export default StartCampaign;