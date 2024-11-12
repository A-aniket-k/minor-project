// routes/queryRoutes.js
const express = require('express');
const queryController = require('../controllers/queryController');

const router = express.Router();

// Route for handling enhanced natural language queries
router.post('/query', queryController.handleEnhancedQuery);

module.exports = router;
