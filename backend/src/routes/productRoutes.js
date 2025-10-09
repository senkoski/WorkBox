const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authenticate, authorize } = require('../middlewares/auth');
const { productValidation } = require('../middlewares/validators');

router.use(authenticate);

router.get('/', productController.getAll);
router.get('/low-stock', productController.getLowStock);
router.get('/:id', productController.getById);
router.get('/:id/movements', productController.getMovements);
router.post('/', authorize('admin', 'supervisor'), productValidation.create, productController.create);
router.put('/:id', authorize('admin', 'supervisor'), productController.update);
router.delete('/:id', authorize('admin'), productController.delete);
router.post('/:id/movements', productController.addMovement);

module.exports = router;
