const mongoose = require('mongoose');

// Add helper function for generating donation IDs
function generateDonationID() {
    const prefix = 'DON';
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `${prefix}-${timestamp}${random}`;
}

const donationSchema = new mongoose.Schema({
    Donation_ID: {
        type: String,
        unique: true,
        default: generateDonationID
    },
    donation_amount: {
        type: Number,
        required: [true, 'Please add a donation amount']
    },
    campaign: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Campaign',
        required: true
    },
    donor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

// Add static method to fetch donations
donationSchema.statics.getDonationsByCampaign = async function(campaignId) {
    return this.find({ campaign: campaignId })
        .populate('donor', 'name email')
        .populate('campaign', 'Title Campaign_ID')
        .sort('-date');
};

module.exports = mongoose.model('Donation', donationSchema);







