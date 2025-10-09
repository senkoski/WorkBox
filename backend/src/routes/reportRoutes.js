const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const { authenticate } = require('../middlewares/auth');

router.use(authenticate);

router.get('/dashboard', reportController.getDashboard);
router.get('/assets', reportController.getAssetReport);
router.get('/stock', reportController.getStockReport);
router.get('/invoices', reportController.getInvoiceReport);

module.exports = router;
