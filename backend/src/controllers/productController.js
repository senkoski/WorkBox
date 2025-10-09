const { Product, StockMovement, Company } = require('../models');
const { Op } = require('sequelize');

exports.getAll = async (req, res, next) => {
  try {
    const { status, category, companyId, search, lowStock } = req.query;
    const where = {};

    if (status) where.status = status;
    if (category) where.category = category;
    if (companyId) where.companyId = companyId;
    if (search) {
      where[Op.or] = [
        { code: { [Op.iLike]: `%${search}%` } },
        { name: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } }
      ];
    }
    if (lowStock === 'true') {
      where[Op.and] = [
        require('sequelize').where(
          require('sequelize').col('currentStock'),
          { [Op.lte]: require('sequelize').col('minimumStock') }
        )
      ];
    }

    const products = await Product.findAll({
      where,
      include: [{ model: Company, as: 'company' }],
      order: [['createdAt', 'DESC']]
    });

    res.json(products);
  } catch (error) {
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [
        { model: Company, as: 'company' },
        { model: StockMovement, as: 'movements', limit: 20, order: [['date', 'DESC']] }
      ]
    });

    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    res.json(product);
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      message: 'Produto cadastrado com sucesso',
      product
    });
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    await product.update(req.body);

    res.json({
      message: 'Produto atualizado com sucesso',
      product
    });
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    await product.destroy();

    res.json({ message: 'Produto deletado com sucesso' });
  } catch (error) {
    next(error);
  }
};

exports.addMovement = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    const { type, quantity, unitPrice } = req.body;

    const movementData = {
      ...req.body,
      productId: req.params.id,
      userId: req.user.id,
      totalPrice: quantity * unitPrice
    };

    const movement = await StockMovement.create(movementData);

    // Atualizar estoque
    let newStock = parseFloat(product.currentStock);
    if (type === 'entry') {
      newStock += parseFloat(quantity);
    } else {
      newStock -= parseFloat(quantity);
    }

    await product.update({ currentStock: newStock });

    res.status(201).json({
      message: 'Movimentação registrada com sucesso',
      movement,
      newStock
    });
  } catch (error) {
    next(error);
  }
};

exports.getMovements = async (req, res, next) => {
  try {
    const movements = await StockMovement.findAll({
      where: { productId: req.params.id },
      include: [
        { model: Product, as: 'product' }
      ],
      order: [['date', 'DESC']]
    });

    res.json(movements);
  } catch (error) {
    next(error);
  }
};

exports.getLowStock = async (req, res, next) => {
  try {
    const { companyId } = req.query;
    const where = {};

    if (companyId) where.companyId = companyId;

    const products = await Product.findAll({
      where: {
        ...where,
        [Op.and]: [
          require('sequelize').where(
            require('sequelize').col('currentStock'),
            { [Op.lte]: require('sequelize').col('minimumStock') }
          )
        ]
      },
      include: [{ model: Company, as: 'company' }],
      order: [['currentStock', 'ASC']]
    });

    res.json(products);
  } catch (error) {
    next(error);
  }
};
