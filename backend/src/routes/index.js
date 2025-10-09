const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const companyRoutes = require('./companyRoutes');
const assetRoutes = require('./assetRoutes');
const productRoutes = require('./productRoutes');
const invoiceRoutes = require('./invoiceRoutes');
const partnerRoutes = require('./partnerRoutes');
const reportRoutes = require('./reportRoutes');

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/companies', companyRoutes);
router.use('/assets', assetRoutes);
router.use('/products', productRoutes);
router.use('/invoices', invoiceRoutes);
router.use('/partners', partnerRoutes);
router.use('/reports', reportRoutes);

module.exports = router;
