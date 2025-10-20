const express = require('express');
const { stockEntry, stockExit } = require('../controllers/stock.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/entry', authMiddleware, stockEntry);
router.post('/exit', authMiddleware, stockExit);

module.exports = router;