const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  donation_amount: { 
    type: Number, 
    required: true 
  },
  campaign: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Campaigns', 
    required: true 
  },
  donor: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  date: { 
    type: Date, 
    default: Date.now 
  },
  Donation_ID: {
    type: String,
    unique: true,
    sparse: true, // Allows multiple documents to omit this field
    default: function() {
      // Generate a unique ID if not provided
      return 'DON-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    }
  }
}, { 
  timestamps: true // Adds createdAt and updatedAt fields
});

// Fix the model name to match your references (plural vs singular)
module.exports = mongoose.model('Donation', donationSchema); // Changed from 'Donations'