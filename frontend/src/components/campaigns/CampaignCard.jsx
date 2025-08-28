import React from 'react';
import Button from '../ui/Button';
import ProgressBar from '../ProgressBar';

const CampaignCard = ({ campaign }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-transform hover:-translate-y-1">
      <img 
        src={campaign.image} 
        alt={campaign.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{campaign.title}</h3>
        <p className="text-gray-600 mb-4">{campaign.description}</p>
        
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
                LKR {parseInt(campaign.target).toLocaleString()}
              </p>
            </div>
          </div>
          
          <ProgressBar 
            current={campaign.raised}
            target={campaign.target}
            gradient="from-orange-600 to-red-600"
          />
          
          <p className="text-sm text-gray-500 text-center mt-2">
            {Math.min(Math.round((campaign.raised / campaign.target) * 100), 100)}% funded
          </p>
        </div>

        <div className="flex items-center text-sm text-gray-500 mb-4">
          <span>{campaign.stats}</span>
        </div>
        <Button className="w-full">Learn More</Button>
      </div>
    </div>
  );
};

export default CampaignCard;

