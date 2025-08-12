const express = require('express');
const router = express.Router();
const {
  getCampaigns,
  getCampaign,
  createCampaign,
  updateCampaign,
  deleteCampaign
} = require('../controllers/campaignController');
const authMiddleware = require('../middleware/auth');
const upload = require('../middleware/upload');

// Consolidated routes following RESTful conventions
router.route('/')
  .get(getCampaigns) // GET /api/campaigns (public)
  .post(authMiddleware, upload.single('image'), createCampaign); // POST /api/campaigns (protected)

router.route('/:id') // Using Campaign_ID (CAMP-0001)
  .get(getCampaign) // GET /api/campaigns/CAMP-0001
  .put(authMiddleware, upload.single('image'), updateCampaign) // PUT /api/campaigns/CAMP-0001
  .delete(authMiddleware, deleteCampaign); // DELETE /api/campaigns/CAMP-0001

module.exports = router;