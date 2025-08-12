// backend/models/Donation.js
const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  Donation_ID: { type: String, required: true, unique: true },
  Donator_amount: Number,
  made_duration: Date,
  Location_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
  User_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  Campaign_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign' }
});

module.exports = mongoose.model('Donation', donationSchema);