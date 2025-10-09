const { body, param, query, validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const userValidation = {
  register: [
    body('username').trim().isLength({ min: 3, max: 50 }).withMessage('Username deve ter entre 3 e 50 caracteres'),
    body('email').isEmail().normalizeEmail().withMessage('Email inválido'),
    body('password').isLength({ min: 6 }).withMessage('Senha deve ter no mínimo 6 caracteres'),
    body('fullName').trim().isLength({ min: 3 }).withMessage('Nome completo obrigatório'),
    validate
  ],
  login: [
    body('username').trim().notEmpty().withMessage('Username ou email obrigatório'),
    body('password').notEmpty().withMessage('Senha obrigatória'),
    validate
  ]
};

const companyValidation = {
  create: [
    body('name').trim().isLength({ min: 3 }).withMessage('Nome da empresa obrigatório'),
    body('type').isIn(['headquarters', 'branch']).withMessage('Tipo inválido'),
    validate
  ]
};

const assetValidation = {
  create: [
    body('code').trim().notEmpty().withMessage('Código obrigatório'),
    body('name').trim().isLength({ min: 3 }).withMessage('Nome obrigatório'),
    body('companyId').isUUID().withMessage('ID da empresa inválido'),
    validate
  ]
};

const productValidation = {
  create: [
    body('code').trim().notEmpty().withMessage('Código obrigatório'),
    body('name').trim().isLength({ min: 3 }).withMessage('Nome obrigatório'),
    body('companyId').isUUID().withMessage('ID da empresa inválido'),
    validate
  ]
};

module.exports = {
  validate,
  userValidation,
  companyValidation,
  assetValidation,
  productValidation
};
