const mongoose = require('mongoose');

const receivesSchema = new mongoose.Schema({
  campaign: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaigns', required: true },
  donation: { type: mongoose.Schema.Types.ObjectId, ref: 'Donations' }, // optional
  item_name: { type: String, required: true },
  quantity: { type: Number, required: true },
  date_received: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Receives', receivesSchema);
