const express = require('express');
const router = express.Router();
const assetController = require('../controllers/assetController');
const { authenticate, authorize } = require('../middlewares/auth');
const { assetValidation } = require('../middlewares/validators');

router.use(authenticate);

router.get('/', assetController.getAll);
router.get('/:id', assetController.getById);
router.get('/:id/movements', assetController.getMovements);
router.post('/', authorize('admin', 'supervisor'), assetValidation.create, assetController.create);
router.put('/:id', authorize('admin', 'supervisor'), assetController.update);
router.delete('/:id', authorize('admin'), assetController.delete);
router.post('/:id/movements', assetController.addMovement);
router.post('/:id/depreciation', authorize('admin', 'supervisor'), assetController.calculateDepreciation);

module.exports = router;
