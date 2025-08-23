// src/components/campaigns/CampaignCard.jsx
import React from 'react';
import Button from '../ui/Button';

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
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <span>{campaign.stats}</span>
        </div>
        <Button className="w-full">Learn More</Button>
      </div>
    </div>
  );
};

export default CampaignCard;
