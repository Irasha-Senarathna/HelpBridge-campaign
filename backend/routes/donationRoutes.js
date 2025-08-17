const express = require('express');
const router = express.Router();
const { createDonation, getDonationsByCampaign } = require('../controllers/donationController');
const donationController = require('../controllers/donationController');


router.post('/', donationController.createDonation); // Create donation
router.get('/:campaignId', donationController.getDonationsByCampaign); // Get donations for a campaign

module.exports = router;

