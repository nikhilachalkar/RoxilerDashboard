
const express = require('express');
const { getCombinedData } = require('../controllers/combinedController');

const router = express.Router();


router.get('/combined-data', getCombinedData);

module.exports = router;
