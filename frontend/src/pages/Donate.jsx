// src/pages/Campaigns/Donate.jsx
import React, { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import cloths1Image from '../assets/images/cloths1.jpg';
import stationaryImage from '../assets/images/stationary.jpg';
import medicineImage from '../assets/images/medicine.jpg';
import booksImage from '../assets/images/books.jpg';
import { useNavigate } from 'react-router-dom';
import DonationList from '../components/DonationList';


const Donate = () => {
  const [donationAmounts, setDonationAmounts] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [donations, setDonations] = useState([]);
  const navigate = useNavigate();
  


  // campaigns will be fetched from backend (do not hardcode)
  const [campaigns, setCampaigns] = useState([]);

  const computeUrgency = (progress, daysLeft) => {
    if (progress >= 100) return 'funded';
    if (daysLeft <= 7) return 'critical';
    if (progress >= 50) return 'high';
    return 'moderate';
  };

  // Map product types to local fallback images
  const productImageMap = {
    Clothing: cloths1Image,
    Education: booksImage,
    Medicine: medicineImage,
    Stationary: stationaryImage,
    Food: cloths1Image,
  };

  useEffect(() => {
    let cancelled = false;

    const fetchCampaigns = async () => {
      try {
        // fetch only active campaigns from backend
        const res = await fetch(${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/campaigns?status=Active&limit=20);
        if (!res.ok) throw new Error('Failed to fetch campaigns');
        const json = await res.json();
        // backend returns { success, data: campaigns, ... }
        const raw = Array.isArray(json) ? json : (json.data || []);

        const mapped = raw.map(c => {
          const id = c.Campaign_ID || c.Campaign_ID || c._id || (c._id && c._id.$oid) || c.id;
          const title = c.Title || c.title || c.Campaign_ID || 'Untitled Campaign';
          const description = c.Description || c.description || '';
          const targetAmount = c.Target_amount ?? c.target_amount ?? 0;
          const raised = c.Current_donation ?? c.Current_donation ?? 0;
          const startDate = c.Start_date || c.start_date || null;
          const endDate = c.End_date || c.end_date || null;

          // compute daysLeft and progress
          const now = new Date();
          const end = endDate ? new Date(endDate) : null;
          const daysLeft = end ? Math.max(0, Math.ceil((end - now) / (1000 * 60 * 60 * 24))) : 0;
          const progress = (c.progressPercentage != null) ? Number(c.progressPercentage) : (targetAmount > 0 ? Math.round((raised / targetAmount) * 100) : 0);
          const urgency = computeUrgency(progress, daysLeft);

          const product = c.Product || c.product || 'Other';
          const image = c.image || productImageMap[product] || booksImage;

          // gradient class derived from urgency
          const gradient = getUrgencyColor(urgency);

          return {
            id,
            title,
            description,
            daysLeft,
            targetAmount,
            raised,
            goal: targetAmount,
            startDate,
            endDate,
            image,
            progress: Math.min(Math.round(progress), 100),
            gradient,
            urgency
          };
        });

        if (!cancelled) setCampaigns(mapped);
      } catch (err) {
        console.error('Error fetching campaigns:', err);
      }
    };

    fetchCampaigns();
    return () => { cancelled = true; };
  }, []);

  const handleDonate = (campaignId) => {
    const amount = donationAmounts[campaignId] || '';
    if (amount) {
      setShowSuccess(true);
      setDonationAmounts(prev => ({ ...prev, [campaignId]: '' }));
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const handleAmountChange = (campaignId, value) => {
    setDonationAmounts(prev => ({ ...prev, [campaignId]: value }));
  };

  const getUrgencyColor = (urgency) => {
    switch(urgency) {
      case 'critical': return 'from-red-500 to-pink-500';
      case 'high': return 'from-orange-500 to-red-500';
      case 'moderate': return 'from-yellow-500 to-orange-500';
      case 'funded': return 'from-green-500 to-emerald-500';
      default: return 'from-orange-500 to-red-500';
    }
  };

  const getUrgencyText = (urgency) => {
    switch(urgency) {
      case 'critical': return 'CRITICAL';
      case 'high': return 'URGENT';
      case 'moderate': return 'ACTIVE';
      case 'funded': return 'FUNDED';
      default: return 'ACTIVE';
    }
  };

  // Fetch donations from backend
  useEffect(() => {
    let cancelled = false;
    const fetchDonations = async () => {
      try {
        const res = await fetch(${process.env.REACT_APP_API_URL || ''}/api/donations);
        if (!res.ok) throw new Error('Failed to fetch donations');
        const data = await res.json();
        if (!cancelled) setDonations(data);
      } catch (err) {
        console.error('Error fetching donations:', err);
      }
    };

    fetchDonations();
    return () => { cancelled = true; };
  }, []);

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

      <Header activeTab="donate" />
      
      <main className="flex-grow relative z-10">
        {/* Enhanced Success Message */}
        {showSuccess && (
          <div className="fixed top-24 right-4 z-50 animate-slideIn">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-sm border border-white/20">
              <div className="flex items-center space-x-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-semibold">Donation Successful! Thank you for your generosity.</span>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-red-600 to-pink-600">
            <div className="absolute inset-0 bg-black/10"></div>
            {/* Decorative elements */}
            <div className="absolute top-10 right-10 w-32 h-32 border border-white/20 rounded-full"></div>
            <div className="absolute bottom-10 left-10 w-24 h-24 border border-white/20 rounded-full"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-white/10 rounded-full"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center text-white">
              <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30 mb-8">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">4 Active Campaigns</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Donate 
                <span className="block bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent">
                  Now
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl mb-6 text-white/90 font-light">
                Every gift brings hope to those in need.
              </p>
              
              <p className="text-lg mb-10 text-white/80 max-w-3xl mx-auto leading-relaxed">
                Your generosity has the power to transform lives, build communities, and create lasting change. Together, we can make the impossible possible.
              </p>
              
              <div className="flex justify-center gap-6 flex-wrap">
                <button 
                onClick={() => {
                  const section = document.getElementById("Quick Donate"); // now points to team
                  const headerOffset = 100; // adjust for your sticky header
                  const elementPosition = section.getBoundingClientRect().top + window.scrollY;
                  const offsetPosition = elementPosition - headerOffset;
              
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                  });
                }}
                className="group bg-white text-gray-800 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Quick Donate
                  <svg className="inline ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
                <button 
                onClick={() => navigate("/Campaigns/Explore")}
                className="group border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Stats */}
        <section className="py-16 relative">
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Impact Today</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">Every donation creates ripple effects of positive change across communities worldwide.</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="group bg-white/60 backdrop-blur-sm border border-white/50 rounded-2xl p-8 text-center hover:bg-white/80 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-6 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <h3 className="text-4xl font-bold mb-2 text-gray-800 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">LKR 47.5M</h3>
                  <p className="text-gray-600 font-medium">Total Raised</p>
                </div>
                
                <div className="group bg-white/60 backdrop-blur-sm border border-white/50 rounded-2xl p-8 text-center hover:bg-white/80 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-6 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-4xl font-bold mb-2 text-gray-800 bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">47.9K</h3>
                  <p className="text-gray-600 font-medium">Donors</p>
                </div>
                
                <div className="group bg-white/60 backdrop-blur-sm border border-white/50 rounded-2xl p-8 text-center hover:bg-white/80 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-6 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.2 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <h3 className="text-4xl font-bold mb-2 text-gray-800 bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">120K</h3>
                  <p className="text-gray-600 font-medium">Lives Touched</p>
                </div>
                
                <div className="group bg-white/60 backdrop-blur-sm border border-white/50 rounded-2xl p-8 text-center hover:bg-white/80 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-6 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-4xl font-bold mb-2 text-gray-800 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">4</h3>
                  <p className="text-gray-600 font-medium">Active Campaigns</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Campaigns Grid */}
        <section id="Quick Donate" className="py-16 relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Active 
                <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent"> Campaigns</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Choose a campaign that speaks to your heart and make a direct impact on someone's life today.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
              {campaigns.map((campaign, index) => (
                <div
                  key={campaign.id}
                  className="group bg-white/70 backdrop-blur-sm border border-white/50 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
                  style={{
                    animationDelay: ${index * 150}ms
                  }}
                >
                  {/* Campaign Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={campaign.image} 
                      alt={campaign.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                    
                    {/* Urgency Badge */}
                    <div className="absolute top-4 left-4">
                      <div className={px-4 py-2 rounded-full text-xs font-bold text-white bg-gradient-to-r ${getUrgencyColor(campaign.urgency)} shadow-lg backdrop-blur-sm border border-white/20}>
                        {getUrgencyText(campaign.urgency)}
                      </div>
                    </div>
                    
                    {/* Days Left Badge */}
                    <div className="absolute top-4 right-4">
                      <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-gray-800 shadow-lg border border-white/50">
                        {campaign.daysLeft} days left
                      </div>
                    </div>
                  </div>

                  {/* Campaign Content */}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-orange-600 transition-colors duration-300">
                      {campaign.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{campaign.description}</p>
                    
                    {/* Progress Section */}
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-3">
                        <div>
                          <span className="text-sm text-gray-500">Raised</span>
                          <p className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                            LKR {parseInt(campaign.raised).toLocaleString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-sm text-gray-500">Goal</span>
                          <p className="text-xl font-bold text-gray-800">
                            LKR {parseInt(campaign.goal).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="w-full bg-gray-200 rounded-full h-3 mb-2 overflow-hidden">
                        <div 
                          className={h-full bg-gradient-to-r ${campaign.gradient} rounded-full transition-all duration-1000 ease-out}
                          style={{ width: ${Math.min(campaign.progress, 100)}% }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-500 text-center">{campaign.progress}% funded</p>
                    </div>

                    {/* Donation Section */}
                    <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-6 border border-gray-100">
                      <div className="flex gap-4 mb-4">
                        <div className="flex-1">
                          <input
                            type="number"
                            placeholder="Enter amount (LKR)"
                            value={donationAmounts[campaign.id] || ''}
                            onChange={(e) => handleAmountChange(campaign.id, e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors duration-200 bg-white/80 backdrop-blur-sm"
                          />
                        </div>
                        <button 
                          onClick={() => handleDonate(campaign.id)}
                          className={px-8 py-3 rounded-xl font-semibold text-white bg-gradient-to-r ${campaign.gradient} hover:shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-200}
                        >
                          Donate
                        </button>
                      </div>
                      
                      {/* Quick Amount Buttons */}
                      <div className="flex gap-2 mb-4">
                        {[1000, 5000, 10000, 25000].map(amount => (
                          <button
                            key={amount}
                            onClick={() => handleAmountChange(campaign.id, amount.toString())}
                            className="flex-1 px-3 py-2 text-sm border-2 border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-all duration-200"
                          >
                            {amount.toLocaleString()}
                          </button>
                        ))}
                      </div>
                      
                      {/* Campaign Details */}
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                        <div className="bg-white/80 rounded-lg p-3">
                          <span className="block font-medium">Target</span>
                          <span className="text-lg font-bold text-orange-600">LKR {parseInt(campaign.targetAmount).toLocaleString()}</span>
                        </div>
                        <div className="bg-white/80 rounded-lg p-3">
                          <span className="block font-medium">End Date</span>
                          <span className="font-semibold">{campaign.endDate}</span>
                        </div>
                      </div>
                    </div>

                    {/* Social Share */}
                    <div className="mt-6 text-center">
                      <button className="inline-flex items-center space-x-2 text-orange-600 hover:text-orange-700 font-medium transition-colors duration-200 group">
                        <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                        </svg>
                        <span>Share this Campaign</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <DonationList donations={donations} />
            </div>
            {/* Call to Action */}
            <div className="text-center mt-16">
              <div className="bg-white/60 backdrop-blur-sm border border-white/50 rounded-3xl p-8 max-w-2xl mx-auto shadow-lg">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Start Your Own Campaign</h3>
                <p className="text-gray-600 mb-6">Have a cause you're passionate about? Create your own fundraising campaign and rally support.</p>
                <button 
                onClick={() => navigate('/start-campaign')}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Create Campaign
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Custom animations */}
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
        
        .grid > div {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .grid > div:nth-child(1) { animation-delay: 0.1s; }
        .grid > div:nth-child(2) { animation-delay: 0.25s; }
        .grid > div:nth-child(3) { animation-delay: 0.4s; }
        .grid > div:nth-child(4) { animation-delay: 0.55s; }
      `}</style>
    </div>
  );
};

export default Donate;