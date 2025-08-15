const Receives = require('../models/Receives');

// Add received item
exports.addReceivedItem = async (req, res) => {
  try {
    const received = await Receives.create({
      campaign: req.body.campaign,
      donation: req.body.donation,
      item_name: req.body.item_name,
      quantity: req.body.quantity
    });
    res.status(201).json(received);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get received items for a campaign
exports.getReceivedItemsByCampaign = async (req, res) => {
  try {
    const items = await Receives.find({ campaign: req.params.campaignId })
      .populate('donation');
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
