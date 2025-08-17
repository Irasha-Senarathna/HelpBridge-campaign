const Campaign = require('../models/Campaign');
const mongoose = require('mongoose');

// Get all campaigns with pagination and advanced filtering
exports.getCampaigns = async (req, res) => {
    try {
        const { status, search, product, page = 1, limit = 10 } = req.query;

        // Build query
        const query = {};
        if (status) query.Status = status;
        if (product) query.Product = product;
        if (search) {
            query.$or = [
                { Title: { $regex: search, $options: 'i' } },
                { Description: { $regex: search, $options: 'i' } }
            ];
        }

        // Pagination
        const skip = (page - 1) * limit;

        const [campaigns, total] = await Promise.all([
            Campaign.find(query)
                .populate('Created_by', 'name email user_type')
                .populate('recipient', 'name email')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(parseInt(limit)),
            Campaign.countDocuments(query)
        ]);

        res.status(200).json({
            success: true,
            count: campaigns.length,
            total,
            pages: Math.ceil(total / limit),
            currentPage: parseInt(page),
            data: campaigns
        });

    } catch (error) {
        console.error('Get campaigns error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch campaigns',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Create new campaign with auto-generated ID
exports.createCampaign = async (req, res) => {
    try {
        const { Title, Description, Target_amount, Product, recipient } = req.body;

        // File handling
        const image = req.file?.path || null;

        // Date handling with validation
        const Start_date = req.body.Start_date || new Date();
        const End_date = req.body.End_date || new Date(new Date(Start_date).setDate(Start_date.getDate() + 30));

        if (End_date <= Start_date) {
            return res.status(400).json({
                success: false,
                message: 'End date must be after start date'
            });
        }

        // Recipient handling
        let recipientId = recipient;
        if (recipient && !mongoose.Types.ObjectId.isValid(recipient)) {
            recipientId = req.user.id;
        }

        const newCampaign = new Campaign({
            Title,
            Description,
            Target_amount,
            Product,
            recipient: recipientId,
            Start_date,
            End_date,
            image,
            Created_by: req.user.id
        });

        const savedCampaign = await newCampaign.save();

        // Populate data
        await savedCampaign.populate([
            { path: 'Created_by', select: 'name email' },
            { path: 'recipient', select: 'name email' }
        ]);

        res.status(201).json({
            success: true,
            data: savedCampaign
        });

    } catch (error) {
        console.error('Create campaign error:', error);
        res.status(error.name === 'ValidationError' ? 400 : 500).json({
            success: false,
            message: 'Failed to create campaign',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Update campaign with comprehensive validation
exports.updateCampaign = async (req, res) => {
    try {
        const { id } = req.params;

        // Find and validate campaign
        const campaign = await Campaign.findOne({ Campaign_ID: id });
        if (!campaign) {
            return res.status(404).json({
                success: false,
                message: 'Campaign not found'
            });
        }

        // Authorization check
        if (campaign.Created_by.toString() !== req.user.id && req.user.user_type !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this campaign'
            });
        }

        // Prepare update data
        const updateData = { ...req.body };
        if (req.file) updateData.image = req.file.path;

        // Date validation
        if (updateData.Start_date || updateData.End_date) {
            const start = updateData.Start_date ? new Date(updateData.Start_date) : campaign.Start_date;
            const end = updateData.End_date ? new Date(updateData.End_date) : campaign.End_date;

            if (end <= start) {
                return res.status(400).json({
                    success: false,
                    message: 'End date must be after start date'
                });
            }
        }

        const updatedCampaign = await Campaign.findOneAndUpdate(
            { Campaign_ID: id },
            updateData,
            { new: true, runValidators: true }
        ).populate([
            { path: 'Created_by', select: 'name email' },
            { path: 'recipient', select: 'name email' }
        ]);

        res.status(200).json({
            success: true,
            data: updatedCampaign
        });

    } catch (error) {
        console.error('Update campaign error:', error);
        res.status(error.name === 'ValidationError' ? 400 : 500).json({
            success: false,
            message: 'Failed to update campaign',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Delete campaign with proper cleanup (if needed)
exports.deleteCampaign = async (req, res) => {
    try {
        const { id } = req.params;

        const campaign = await Campaign.findOne({ Campaign_ID: id });
        if (!campaign) {
            return res.status(404).json({
                success: false,
                message: 'Campaign not found'
            });
        }

        // Authorization check
        if (campaign.Created_by.toString() !== req.user.id && req.user.user_type !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this campaign'
            });
        }

        await Campaign.findOneAndDelete({ Campaign_ID: id });

        res.status(200).json({
            success: true,
            data: null
        });

    } catch (error) {
        console.error('Delete campaign error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete campaign',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Get single campaign with additional data (renamed to getCampaignById)
exports.getCampaignById = async (req, res) => {
    try {
        const { id } = req.params;

        const campaign = await Campaign.findOne({ Campaign_ID: id })
            .populate('Created_by', 'name email user_type')
            .populate('recipient', 'name email');

        if (!campaign) {
            return res.status(404).json({
                success: false,
                message: 'Campaign not found'
            });
        }

        res.status(200).json({
            success: true,
            data: campaign
        });

    } catch (error) {
        console.error('Get campaign error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch campaign',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};
