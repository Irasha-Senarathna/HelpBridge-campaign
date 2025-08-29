const Donation = require('../models/Donation');
const Campaign = require('../models/Campaign');

// Helper function to generate Donation ID
const generateDonationID = () => {
    const prefix = 'DON';
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `${prefix}-${timestamp}${random}`;
};

// Get all donations
exports.getDonations = async (req, res) => {
    try {
        const donations = await Donation.find()
            .populate('donor', 'name')
            .populate('campaign', 'Title')
            .sort('-createdAt');

        res.status(200).json({
            success: true,
            data: donations
        });
    } catch (error) {
        console.error('Error getting donations:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch donations'
        });
    }
};

// Create new donation
exports.createDonation = async (req, res) => {
    try {
        const { donation_amount, campaign } = req.body;

        if (!donation_amount || !campaign) {
            return res.status(400).json({
                success: false,
                message: 'Please provide donation amount and campaign ID'
            });
        }

        // Find campaign by Campaign_ID
        const campaignDoc = await Campaign.findOne({ Campaign_ID: campaign });
        
        if (!campaignDoc) {
            return res.status(404).json({
                success: false,
                message: 'Campaign not found'
            });
        }

        // Create donation with generated ID
        const donation = await Donation.create({
            Donation_ID: generateDonationID(),
            donation_amount: Number(donation_amount),
            campaign: campaignDoc._id,
            donor: req.user?._id || null,
            date: new Date()
        });

        // Update campaign's current donation
        await Campaign.findByIdAndUpdate(
            campaignDoc._id,
            { $inc: { Current_donation: Number(donation_amount) } }
        );

        // Populate donor information
        const populatedDonation = await Donation.findById(donation._id)
            .populate('donor', 'name')
            .populate('campaign', 'Title Campaign_ID');

        res.status(201).json({
            success: true,
            data: populatedDonation
        });
    } catch (error) {
        console.error('Donation creation error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to process donation: ' + error.message
        });
    }
};

// Get donations by campaign
exports.getDonationsByCampaign = async (req, res) => {
    try {
        const donations = await Donation.find({ campaign: req.params.campaignId })
            .populate('donor', 'name')
            .sort('-date');

        // Always return an array, even if empty
        res.status(200).json({
            success: true,
            data: donations || []
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch campaign donations'
        });
    }
};
