const express = require('express');
const router = express.Router();
const { addReceivedItem, getReceivedItemsByCampaign } = require('../controllers/ReceivesController');



router.post('/', addReceivedItem); // Add received item
router.get('/:campaignId', getReceivedItemsByCampaign); // Get received items for a campaign

module.exports = router;
