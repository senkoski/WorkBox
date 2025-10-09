const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate, authorize } = require('../middlewares/auth');

router.use(authenticate);

router.get('/', userController.getAll);
router.get('/:id', userController.getById);
router.put('/:id/approve', authorize('admin'), userController.approve);
router.put('/:id', authorize('admin', 'supervisor'), userController.update);
router.delete('/:id', authorize('admin'), userController.delete);

module.exports = router;
