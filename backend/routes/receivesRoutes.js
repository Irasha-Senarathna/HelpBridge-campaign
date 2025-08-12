// backend/routes/receivesRoutes.js
const express = require('express');
const router = express.Router();
const { getReceives, createReceives, updateReceives, deleteReceives } = require('../controllers/ReceivesController');

router.get('/', getReceives);
router.post('/', createReceives);
router.put('/:id', updateReceives);
router.delete('/:id', deleteReceives);

module.exports = router;