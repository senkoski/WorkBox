const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');
const { authenticate, authorize } = require('../middlewares/auth');

router.use(authenticate);

router.get('/', invoiceController.getAll);
router.get('/discrepancies', invoiceController.getDiscrepancies);
router.get('/:id', invoiceController.getById);
router.post('/', authorize('admin', 'supervisor'), invoiceController.create);
router.put('/:id', authorize('admin', 'supervisor'), invoiceController.update);
router.delete('/:id', authorize('admin'), invoiceController.delete);
router.post('/:id/verify', authorize('admin', 'supervisor'), invoiceController.verify);

module.exports = router;
