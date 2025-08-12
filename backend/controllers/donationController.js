// backend/controllers/donationController.js
const Donation = require('../models/Donation');

exports.getDonations = async (req, res) => {
  const donations = await Donation.find()
    .populate('User_ID')
    .populate('Location_ID')
    .populate('Campaign_ID');
  res.json(donations);
};

exports.createDonation = async (req, res) => {
  const newDonation = new Donation(req.body);
  const saved = await newDonation.save();
  res.json(saved);
};

exports.updateDonation = async (req, res) => {
  const updated = await Donation.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteDonation = async (req, res) => {
  await Donation.findByIdAndDelete(req.params.id);
  res.json({ message: 'Donation deleted' });
};