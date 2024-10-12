const express = require('express');
const { getPriceRangeBarChart, getCategoryPieChart } = require('../controllers/chartController');

const router = express.Router();


router.get('/price-range-bar-chart', getPriceRangeBarChart);


router.get('/category-pie-chart', getCategoryPieChart);

module.exports = router;
