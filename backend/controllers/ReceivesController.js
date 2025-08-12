// backend/controllers/receivesController.js
const Receives = require('../models/Receives');

exports.getReceives = async (req, res) => {
  const receives = await Receives.find()
    .populate('User_ID')
    .populate('Donation_ID');
  res.json(receives);
};

exports.createReceives = async (req, res) => {
  const newReceives = new Receives(req.body);
  const saved = await newReceives.save();
  res.json(saved);
};

exports.updateReceives = async (req, res) => {
  const updated = await Receives.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteReceives = async (req, res) => {
  await Receives.findByIdAndDelete(req.params.id);
  res.json({ message: 'Receives record deleted' });
};