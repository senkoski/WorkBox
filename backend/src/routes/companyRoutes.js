const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
const { authenticate, authorize } = require('../middlewares/auth');
const { companyValidation } = require('../middlewares/validators');

router.use(authenticate);

router.get('/', companyController.getAll);
router.get('/:id', companyController.getById);
router.get('/:id/branches', companyController.getBranches);
router.get('/:id/dashboard', companyController.getDashboard);
router.post('/', authorize('admin'), companyValidation.create, companyController.create);
router.put('/:id', authorize('admin'), companyController.update);
router.delete('/:id', authorize('admin'), companyController.delete);

module.exports = router;
