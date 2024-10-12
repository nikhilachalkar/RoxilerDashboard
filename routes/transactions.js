
const express = require('express');
const { listTransactions, seedDatabase } = require('../controllers/transactionsController');

const router = express.Router();


router.get('/transactions', listTransactions);


router.get('/seed-database', seedDatabase);

module.exports = router;
