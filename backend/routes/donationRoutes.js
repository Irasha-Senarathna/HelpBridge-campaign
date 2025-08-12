// backend/routes/donationRoutes.js
const express = require('express');
const router = express.Router();
const { getDonations, createDonation, updateDonation, deleteDonation } = require('../controllers/donationController');

router.get('/', getDonations);
router.post('/', createDonation);
router.put('/:id', updateDonation);
router.delete('/:id', deleteDonation);

module.exports = router;