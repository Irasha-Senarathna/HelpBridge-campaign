// backend/models/Receives.js
const mongoose = require('mongoose');

const receivesSchema = new mongoose.Schema({
  User_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  Donation_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'Donation' },
  N: Number // Assuming this is quantity or similar
});

module.exports = mongoose.model('Receives', receivesSchema);