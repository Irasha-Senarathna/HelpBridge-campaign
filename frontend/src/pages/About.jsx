// src/pages/About.jsx
import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import sarahImage from '../assets/images/sarah.jpg';
import michaelImage from '../assets/images/michal.jpeg';
import amaraImage from '../assets/images/amara.jpeg';
import davidImage from '../assets/images/david.jpg';
import emilyImage from '../assets/images/emily.jpg';
import thomasImage from '../assets/images/thamos.jpg'; 

const About = () => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background elements */}
      <div className="fixed inset-0 bg-gradient-to-br from-red-50 via-orange-50 to-pink-50 -z-10">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-r from-red-200 to-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute top-60 right-32 w-56 h-56 bg-gradient-to-r from-orange-200 to-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-40 left-1/3 w-48 h-48 bg-gradient-to-r from-red-200 to-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{animationDelay: '4s'}}></div>
        </div>
      </div>

      <Header activeTab="about" />
      
      <main className="flex-grow relative z-10">
        {/* Enhanced Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-orange-600 to-pink-700">
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
                <span className="text-sm font-medium">Established 2012 • 10+ Years Strong</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Making a difference,
                <span className="block bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent">
                  one life at a time
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl mb-6 text-white/90 font-light">
                For over 10 years, HopeHarbor has been dedicated to providing support.
              </p>
              
              <p className="text-lg mb-10 text-white/80 max-w-3xl mx-auto leading-relaxed">
                We provide resources, and hope to communities in need around the world, building bridges of compassion and creating lasting change through sustainable development initiatives.
              </p>
              
              <div className="flex justify-center gap-6 flex-wrap">
                <button className="group bg-white text-gray-800 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Our Mission
                  <svg className="inline ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
                <button className="group border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Join Our Cause
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Impact Section */}
        <section className="py-16 relative">
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Impact Worldwide</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">A decade of transformative work, creating sustainable change across continents and empowering communities to thrive.</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="group bg-white/60 backdrop-blur-sm border border-white/50 rounded-2xl p-8 text-center hover:bg-white/80 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-6 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </div>
                  <h3 className="text-4xl font-bold mb-2 text-gray-800 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">1M+</h3>
                  <p className="text-gray-600 font-medium">People Helped</p>
                </div>
                
                <div className="group bg-white/60 backdrop-blur-sm border border-white/50 rounded-2xl p-8 text-center hover:bg-white/80 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-6 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                    </svg>
                  </div>
                  <h3 className="text-4xl font-bold mb-2 text-gray-800 bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">15</h3>
                  <p className="text-gray-600 font-medium">Countries</p>
                </div>
                
                <div className="group bg-white/60 backdrop-blur-sm border border-white/50 rounded-2xl p-8 text-center hover:bg-white/80 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-6 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <h3 className="text-4xl font-bold mb-2 text-gray-800 bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent">$5.2M</h3>
                  <p className="text-gray-600 font-medium">Funds Raised</p>
                </div>
                
                <div className="group bg-white/60 backdrop-blur-sm border border-white/50 rounded-2xl p-8 text-center hover:bg-white/80 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-6 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-4xl font-bold mb-2 text-gray-800 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">10K+</h3>
                  <p className="text-gray-600 font-medium">Volunteers</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Story Section */}
        <section className="py-16 relative">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center space-x-2 bg-red-100 px-4 py-2 rounded-full mb-4">
                  <span className="text-red-600 font-semibold text-sm">OUR JOURNEY</span>
                </div>
                <h2 className="text-4xl font-bold text-gray-800 mb-4">
                  Our 
                  <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">Story</span>
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="bg-white/60 backdrop-blur-sm border border-white/50 rounded-2xl p-8 hover:bg-white/80 transition-all duration-300 shadow-lg hover:shadow-xl">
                    <div className="w-12 h-1 bg-gradient-to-r from-red-500 to-orange-500 mb-4"></div>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Founded in 2012, HopeHarbor began with a simple idea: everyone deserves access to basic necessities and opportunities.
                    </p>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm border border-white/50 rounded-2xl p-8 hover:bg-white/80 transition-all duration-300 shadow-lg hover:shadow-xl">
                    <div className="w-12 h-1 bg-gradient-to-r from-orange-500 to-pink-500 mb-4"></div>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      What started as a small local initiative has grown into a global movement, bringing together thousands of volunteers and donors committed to making a difference.
                    </p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="bg-white/60 backdrop-blur-sm border border-white/50 rounded-2xl p-8 hover:bg-white/80 transition-all duration-300 shadow-lg hover:shadow-xl">
                    <div className="w-12 h-1 bg-gradient-to-r from-pink-500 to-red-500 mb-4"></div>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Our journey hasn't always been easy, but through perseverance and the support of our community, we've been able to expand our reach and impact year after year.
                    </p>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm border border-white/50 rounded-2xl p-8 hover:bg-white/80 transition-all duration-300 shadow-lg hover:shadow-xl">
                    <div className="w-12 h-1 bg-gradient-to-r from-red-500 to-orange-500 mb-4"></div>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Today, we operate in 15 countries across 4 continents, focusing on sustainable development, emergency relief, and empowering local communities to build better futures.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Mission & Values Section */}
        <section className="py-16 relative">
          <div className="absolute inset-0 bg-white/60 backdrop-blur-sm"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12">
                <div className="group bg-white/80 backdrop-blur-sm border border-white/50 rounded-3xl p-12 hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">Our Mission</h2>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    To provide immediate relief and long-term support to vulnerable communities, empowering them to break the cycle of poverty and build sustainable futures.
                  </p>
                </div>
                <div className="group bg-white/80 backdrop-blur-sm border border-white/50 rounded-3xl p-12 hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-red-500 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent">Our Values</h2>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Compassion, integrity, and respect guide everything we do. We believe in transparency and accountability to our supporters and beneficiaries alike.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Vision Section */}
        <section className="py-16 relative">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto text-center">
              <div className="bg-white/60 backdrop-blur-sm border border-white/50 rounded-3xl p-12 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-100 to-orange-100 px-6 py-3 rounded-full mb-8">
                  <div className="w-3 h-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"></div>
                  <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent font-semibold">Our Vision</span>
                </div>
                <p className="text-2xl md:text-3xl text-gray-700 leading-relaxed max-w-4xl mx-auto font-light">
                  A world where every community has the 
                  <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent font-semibold"> resources and opportunities </span>
                  they need to thrive and determine their own future.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Team Section */}
        <section className="py-16 relative">
          <div className="absolute inset-0 bg-white/40 backdrop-blur-sm"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-flex items-center space-x-2 bg-red-100 px-4 py-2 rounded-full mb-4">
                  <span className="text-red-600 font-semibold text-sm">OUR TEAM</span>
                </div>
                <h2 className="text-4xl font-bold text-gray-800 mb-4">
                  Meet Our 
                  <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">Team</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Passionate individuals committed to making a difference in the world through dedication, innovation, and boundless compassion.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    name: "Sarah Johnson",
                    role: "Executive Director",
                    bio: "With over 15 years of experience in nonprofit management, Sarah leads our organization with passion and strategic vision.",
                    image: sarahImage,
                    gradient: "from-red-400 to-orange-500"
                  },
                  {
                    name: "Michael Chen",
                    role: "Operations Director",
                    bio: "Michael ensures that our programs run efficiently and effectively, maximizing the impact of every donation.",
                    image: michaelImage,
                    gradient: "from-orange-400 to-pink-500"
                  },
                  {
                    name: "Amara Okafor",
                    role: "Program Manager",
                    bio: "Amara oversees our international projects, bringing extensive field experience and cultural understanding to our work.",
                    image: amaraImage,
                    gradient: "from-pink-400 to-red-500"
                  },
                  {
                    name: "David Rodriguez",
                    role: "Financial Director",
                    bio: "David ensures transparency and accountability in our financial operations, maintaining the trust of our donors.",
                    image: davidImage,
                    gradient: "from-red-400 to-orange-500"
                  },
                  {
                    name: "Emily Park",
                    role: "Volunteer Coordinator",
                    bio: "Emily manages our network of volunteers, matching skills with needs to maximize our collective impact.",
                    image: emilyImage,
                    gradient: "from-orange-400 to-red-500"
                  },
                  {
                    name: "Thomas Wilson",
                    role: "Outreach Specialist",
                    bio: "Thomas builds partnerships with communities, organizations, and businesses to extend our reach and impact.",
                    image: thomasImage,
                    gradient: "from-red-400 to-pink-500"
                  }
                ].map((member, index) => (
                  <div 
                    key={index} 
                    className="group bg-white/70 backdrop-blur-sm border border-white/50 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    style={{
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    <div className="relative">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${member.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                    </div>
                    <div className="p-8">
                      <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                      <p className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent font-semibold mb-4">{member.role}</p>
                      <p className="text-gray-600 leading-relaxed">{member.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Call to Action */}
              <div className="text-center mt-16">
                <div className="bg-white/60 backdrop-blur-sm border border-white/50 rounded-3xl p-8 max-w-2xl mx-auto shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Join Our Mission</h3>
                  <p className="text-gray-600 mb-6">Ready to be part of something bigger? Join our team of dedicated changemakers.</p>
                  <button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    Get Involved Today
                  </button>
                </div>
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

export default About;