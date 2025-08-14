import React, { useState, useEffect, useRef} from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import CampaignTable from '../../components/campaigns/CampaignTable';

const StartCampaign = () => {
  const campaignTableRef = useRef(null);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  

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

  

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <Header activeTab="campaigns" />

      {/* Hero Banner Section */}
      <div className="relative bg-gradient-to-br from-orange-500 via-red-500 to-red-600 overflow-hidden">
        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <span className="text-white font-medium">🚀 Active since 2005</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Start Your
            <br />
            <span className="text-yellow-300">Campaign</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-4xl mx-auto leading-relaxed">
            Join thousands of changemakers who are making a difference in their communities.
            Launch your campaign today and turn your vision into reality.
          </p>

          <button
onClick={() => {
  if (!localStorage.getItem('token')) {
    alert('Please login to create campaigns');
    return;
  }
  
  // Find the table DOM element and scroll to it
  const tableElement = document.querySelector('.campaign-table');
  if (tableElement) {
    tableElement.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
  
  // Open the create form after scrolling
  setTimeout(() => {
    campaignTableRef.current?.openCreateForm();
  }, 1000); // Increased delay for better UX
}}         className="bg-white text-red-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-lg mr-4"
          >
            Get Started →
          </button>

          <button
onClick={() => {
  if (!localStorage.getItem('token')) {
    alert('Please login to create campaigns');
    return;
  }
  
  // Find the table DOM element and scroll to it
  const tableElement = document.querySelector('.campaign-table');
  if (tableElement) {
    tableElement.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
  
  // Open the create form after scrolling
  setTimeout(() => {
    campaignTableRef.current?.openCreateForm();
  }, 1000); // Increased delay for better UX
}}         className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Start Your Campaign
          </button>
        </div>
      </div>

      <main className="flex-grow container mx-auto px-4 max-w-7xl py-12 relative z-10">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading campaigns...</p>
          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-white/50">
            <CampaignTable
              ref={campaignTableRef}
              campaigns={campaigns}
              onCampaignUpdate={handleCampaignUpdate}
              onCampaignDelete={handleCampaignDelete}
              user={user}
            />
          </div>
        )}

        {/* Call to Action Section */}
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
  if (!localStorage.getItem('token')) {
    alert('Please login to create campaigns');
    return;
  }
  
  // Find the table DOM element and scroll to it
  const tableElement = document.querySelector('.campaign-table');
  if (tableElement) {
    tableElement.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
  
  // Open the create form after scrolling
  setTimeout(() => {
    campaignTableRef.current?.openCreateForm();
  }, 1000); // Increased delay for better UX
}}           className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
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
    </div>
  );
};

export default StartCampaign;