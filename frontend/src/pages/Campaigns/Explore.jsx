// src/pages/Campaigns/Explore.jsx
import React from 'react';
import CampaignCard from '../../components/campaigns/CampaignCard';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import shelterImage from '../../assets/images/shelter.jpg';
import clothsImage from '../../assets/images/cloths.jpg';
import cloths1Image from '../../assets/images/cloths1.jpg';
import stationaryImage from '../../assets/images/stationary.jpg';
import medicineImage from '../../assets/images/medicine.jpg';
import booksImage from '../../assets/images/books.jpg';
import StartCampaign from './StartCampaign';

const Explore = () => {
  const campaigns = [
    {
      id: 1,
      title: "Shelter for Struggling Families",
      description: "Help us provide safe housing for impoverished families. Your donation can build or repair homes, offering warmth, security, and dignity to those in desperate need. Together, we can give them a place to thrive.",
      image: shelterImage
    },
    {
      id: 2,
      title: "Stationery for Nursery Kids",
      description: "Give little learners the tools they need! Your support buys pencils, notebooks, and crayons for underfunded nurseries, helping children start their education with joy and confidence.",
      image: stationaryImage
    },
    {
      id: 3,
      title: "Warm Clothes for the Needy",
      description: "Donate winter coats, blankets, and clothing to protect vulnerable individuals from harsh weather. Your kindness ensures no one suffers from the cold this season.",
      image: clothsImage
    },
    {
      id: 4,
      title: "Books for School Libraries",
      description: "Fuel young minds with knowledge! Your contribution provides textbooks and storybooks for schools' lacking resources, opening doors to endless learning opportunities.",
      image: booksImage
    },
    {
      id: 5,
      title: "Medicine for the Sick",
      description: "Many lack access to basic healthcare. Your donation funds life-saving medicines and medical supplies for clinics serving impoverished communities.",
      image: medicineImage
    },
    {
      id: 6,
      title: "Clothes for Disaster Survivors",
      description: "After disasters, survivors lose everything. Your donated clothes restore hope and practicality, helping families rebuild their lives with dignity.",
      image: cloths1Image
    }
  ];

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

      <Header />
      
      <main className="flex-grow relative z-10">
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
                <span className="text-sm font-medium">Active since 2005</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Explore 
                <span className="block bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent">
                  Campaigns
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl mb-6 text-white/90 font-light">
                World Vision has been changing lives across the globe since 2005.
              </p>
              
              <p className="text-lg mb-10 text-white/80 max-w-3xl mx-auto leading-relaxed">
                For the past 20 years, we've been partnering with governments, corporates, donors, sponsors, and individuals like you to improve the wellbeing of the most vulnerable children around the world.
              </p>
              
              <button className="group bg-white text-gray-800 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Learn More
                <svg className="inline ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* Enhanced Stats Section */}
        <section className="py-16 relative">
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Impact Worldwide</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">Two decades of dedicated service, touching lives across continents and creating lasting change in communities.</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="group bg-white/60 backdrop-blur-sm border border-white/50 rounded-2xl p-8 text-center hover:bg-white/80 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-6 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-4xl font-bold mb-2 text-gray-800 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">20</h3>
                  <p className="text-gray-600 font-medium">Years in World</p>
                </div>
                
                <div className="group bg-white/60 backdrop-blur-sm border border-white/50 rounded-2xl p-8 text-center hover:bg-white/80 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-6 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                    </svg>
                  </div>
                  <h3 className="text-4xl font-bold mb-2 text-gray-800 bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">52</h3>
                  <p className="text-gray-600 font-medium">Countries</p>
                </div>
                
                <div className="group bg-white/60 backdrop-blur-sm border border-white/50 rounded-2xl p-8 text-center hover:bg-white/80 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-6 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-4xl font-bold mb-2 text-gray-800 bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">78</h3>
                  <p className="text-gray-600 font-medium">Locations</p>
                </div>
                
                <div className="group bg-white/60 backdrop-blur-sm border border-white/50 rounded-2xl p-8 text-center hover:bg-white/80 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-6 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <h3 className="text-4xl font-bold mb-2 text-gray-800 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">1200+</h3>
                  <p className="text-gray-600 font-medium">Completed Projects</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Campaign Grid Section */}
        <section className="py-16 relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Active 
                <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent"> Campaigns</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover meaningful ways to make a difference. Each campaign represents real lives that can be transformed through your generosity.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {campaigns.map((campaign, index) => (
                <div
                  key={campaign.id}
                  className="group transform hover:scale-105 transition-all duration-300"
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  <CampaignCard campaign={campaign} />
                </div>
              ))}
            </div>
            
            {/* Call to Action */}
            <div className="text-center mt-16">
              <div className="bg-white/60 backdrop-blur-sm border border-white/50 rounded-3xl p-8 max-w-2xl mx-auto shadow-lg">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to Make a Difference?</h3>
                <p className="text-gray-600 mb-6">Join thousands of compassionate individuals who are changing lives every day.</p>
                <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Start Your Own Campaign
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Custom animations */}
      <style jsx>{`
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
        
        .grid > div {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .grid > div:nth-child(1) { animation-delay: 0.1s; }
        .grid > div:nth-child(2) { animation-delay: 0.2s; }
        .grid > div:nth-child(3) { animation-delay: 0.3s; }
        .grid > div:nth-child(4) { animation-delay: 0.4s; }
        .grid > div:nth-child(5) { animation-delay: 0.5s; }
        .grid > div:nth-child(6) { animation-delay: 0.6s; }
      `}</style>
    </div>
  );
};

export default Explore;