const express = require('express');
const { createCompany, getCompanies } = require('../controllers/company.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/', authMiddleware, createCompany);
router.get('/', authMiddleware, getCompanies);

module.exports = router;