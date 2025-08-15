// src/pages/Campaigns/Details.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import ProgressBar from '../../components/ProgressBar';
import DonationForm from '../../components/DonationForm';
import ReceivedItemsList from '../../components/ReceivedItemsList';
import ReceivedItemsForm  from '../../components/ReceivedItemsForm';
import DonationList from '../../components/DonationList';




export default function Details() {
    const { id } = useParams(); // get ID from route

    // You can replace the hardcoded campaign data with dynamic content based on the ID later
    const campaignTitle = "Clean Water for Villages";
    const campaignDescription = "Fund wells and filters to provide safe drinking water, saving lives and transforming entire communities.";
    const raisedAmount = 25;
    const goalAmount = 100;
    const progressPercentage = 25;

    return (
        <div className="campaign-container">
            {/* Campaign Header Section */}
            <div className="campaign-header">
                <h1>{campaignTitle}</h1>
                <p>{campaignDescription}</p>
                
                <div className="progress-section">
                    <div className="progress-stats">
                        <div>
                            <span>Raised</span>
                            <strong>LKR {raisedAmount}</strong>
                        </div>
                        <div>
                            <span>Goal</span>
                            <strong>LKR {goalAmount}</strong>
                        </div>
                    </div>
                    <ProgressBar percentage={progressPercentage} />
                    <span className="percentage">{progressPercentage}% funded</span>
                </div>
            </div>

            {/* Two-Column Layout */}
            <div className="campaign-content">
                {/* Left Column - Donation Forms */}
                <div className="left-column">
                    <DonationForm 
                        presetAmounts={[1000, 5000, 10000, 25000]} 
                        campaignId={id || "default-campaign"} 
                    />
                    
                    <ReceivedItemsForm 
                        campaignId={id || "default-campaign"}
                        neededItems={["Water filters", "Pipes", "Construction materials"]}
                    />
                </div>

                {/* Right Column - Lists */}
                <div className="right-column">
                    <DonationList 
                        donations={[
                            {id: 1, name: "Anonymous", amount: 5000, date: "2023-08-10"},
                            {id: 2, name: "John D.", amount: 20000, date: "2023-08-05"}
                        ]} 
                    />
                    
                    <ReceivedItemsList 
                        items={[
                            {id: 1, name: "Sarah K.", item: "10 Water filters", date: "2023-08-12"},
                            {id: 2, name: "Local Corp", item: "PVC Pipes", date: "2023-08-08"}
                        ]}
                    />
                </div>
            </div>
        </div>
    );
}
