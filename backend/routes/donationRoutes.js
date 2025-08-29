const express = require('express');
const router = express.Router();
const donationController = require('../controllers/donationController');
const auth = require('../middleware/auth');

// Routes
router.post('/', donationController.createDonation);
router.get('/', donationController.getDonations);
router.get('/campaign/:campaignId', donationController.getDonationsByCampaign);

module.exports = router;

