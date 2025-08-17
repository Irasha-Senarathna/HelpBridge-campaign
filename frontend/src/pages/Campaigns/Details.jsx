// src/pages/Campaigns/Details.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


import ProgressBar from "../../components/ProgressBar";
import DonationForm from "../../components/DonationForm";
import DonationList from "../../components/DonationList";
import ReceivedItemsForm from "../../components/ReceivedItemsForm";
import ReceivedItemsList from "../../components/ReceivedItemsList";

export default function Details() {
  const { id } = useParams();

  const [campaign, setCampaign] = useState(null);
  const [donations, setDonations] = useState([]);
  const [receivedItems, setReceivedItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCampaignData = async () => {
    try {
      // Fetch campaign
      const campaignRes = await axios.get(`/api/campaigns/${id}`);
      setCampaign(campaignRes.data);

      // Fetch donations for this campaign
      const donationRes = await axios.get(`/api/donations/${id}`);
      setDonations(donationRes.data);

      // Fetch received items for this campaign
      const receivesRes = await axios.get(`/api/receives/${id}`);
      setReceivedItems(receivesRes.data);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching campaign details:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaignData();
  }, [id]);

  if (loading) return <p>Loading campaign details...</p>;
  if (!campaign) return <p>Campaign not found.</p>;

  const progressPercentage =
    campaign.target_amount > 0
      ? (campaign.current_donation / campaign.target_amount) * 100
      : 0;

  return (
    <div className="campaign-container">
      {/* ---------------- Campaign Header ---------------- */}
      <div className="campaign-header">
        <h1>{campaign.Title}</h1>
        <p>{campaign.Description}</p>

        <div className="progress-section">
          <div className="progress-stats">
            <div>
              <span>Raised</span>
              <strong>LKR {campaign.Current_donation}</strong>
            </div>
            <div>
              <span>Goal</span>
              <strong>LKR {campaign.Target_amount}</strong>
            </div>
          </div>

          <ProgressBar percentage={progressPercentage} />
          <span className="percentage">
            {progressPercentage.toFixed(0)}% funded
          </span>
        </div>
      </div>

      {/* ---------------- Two-Column Layout ---------------- */}
      <div className="campaign-content">
        {/* Left Column - Forms */}
        <div className="left-column">
          <DonationForm
            presetAmounts={[1000, 5000, 10000, 25000]}
            campaignId={id}
            onDonationSuccess={fetchCampaignData} // refresh after submit
          />
          <ReceivedItemsForm
            campaignId={id}
            neededItems={campaign.neededItems || []}
            onItemReceived={fetchCampaignData} // refresh after submit
          />
        </div>

        {/* Right Column - Lists */}
        <div className="right-column">
          <DonationList donations={donations} />
          <ReceivedItemsList items={receivedItems} />
        </div>
      </div>
    </div>
  );
}
