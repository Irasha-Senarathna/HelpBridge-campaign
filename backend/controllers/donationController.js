const Donations = require('../models/Donation');

// Create donation
exports.createDonation = async (req, res) => {
  try {
    const donation = await Donations.create({
      donation_amount: req.body.donation_amount,
      campaign: req.body.campaign,
      donor: req.body.donor
    });
    res.status(201).json(donation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get donations for a campaign
exports.getDonationsByCampaign = async (req, res) => {
  try {
    const donations = await Donations.find({ campaign: req.params.campaignId })
      .populate('donor', 'name email');
    res.json(donations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
