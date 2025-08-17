// backend/routes/campaignRoutes.js
const express = require('express');
const router = express.Router();
const campaignController = require('../controllers/campaignController');
const authMiddleware = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', campaignController.getCampaigns);
router.post('/', authMiddleware, upload.single('image'), campaignController.createCampaign);

router.get('/:id', campaignController.getCampaignById);  
router.put('/:id', authMiddleware, upload.single('image'), campaignController.updateCampaign);
router.delete('/:id', authMiddleware, campaignController.deleteCampaign);

module.exports = router;
