const express = require('express');
const router = express.Router();
const partnerController = require('../controllers/partnerController');
const { authenticate, authorize } = require('../middlewares/auth');

router.use(authenticate);

router.get('/', partnerController.getAll);
router.get('/:id', partnerController.getById);
router.get('/:id/transactions', partnerController.getTransactions);
router.post('/', authorize('admin', 'supervisor'), partnerController.create);
router.put('/:id', authorize('admin', 'supervisor'), partnerController.update);
router.delete('/:id', authorize('admin'), partnerController.delete);

module.exports = router;
