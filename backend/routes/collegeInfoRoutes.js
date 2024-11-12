const express = require('express');
const router = express.Router();
const collegeInfoController = require('../controllers/collegeInfoController');

// Route to get all college info
router.get('/', collegeInfoController.getCollegeInfo);

module.exports = router;
