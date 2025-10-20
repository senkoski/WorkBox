const express = require('express');
const { createPatrimony, getAllPatrimony, generateQRCode } = require('../controllers/patrimony.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/', authMiddleware, createPatrimony);
router.get('/', authMiddleware, getAllPatrimony);
router.get('/qr-code/:code', authMiddleware, generateQRCode);

module.exports = router;