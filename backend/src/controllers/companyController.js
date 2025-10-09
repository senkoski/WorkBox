const { Company, User } = require('../models');
const { Op } = require('sequelize');

exports.getAll = async (req, res, next) => {
  try {
    const { type, status, search } = req.query;
    const where = {};

    if (type) where.type = type;
    if (status) where.status = status;
    if (search) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { tradeName: { [Op.iLike]: `%${search}%` } },
        { cnpj: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const companies = await Company.findAll({
      where,
      include: [
        { model: Company, as: 'parent' },
        { model: Company, as: 'branches' }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json(companies);
  } catch (error) {
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const company = await Company.findByPk(req.params.id, {
      include: [
        { model: Company, as: 'parent' },
        { model: Company, as: 'branches' },
        { model: User, as: 'users', attributes: { exclude: ['password'] } }
      ]
    });

    if (!company) {
      return res.status(404).json({ message: 'Empresa não encontrada' });
    }

    res.json(company);
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const company = await Company.create(req.body);

    res.status(201).json({
      message: 'Empresa cadastrada com sucesso',
      company
    });
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const company = await Company.findByPk(req.params.id);

    if (!company) {
      return res.status(404).json({ message: 'Empresa não encontrada' });
    }

    await company.update(req.body);

    res.json({
      message: 'Empresa atualizada com sucesso',
      company
    });
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const company = await Company.findByPk(req.params.id);

    if (!company) {
      return res.status(404).json({ message: 'Empresa não encontrada' });
    }

    // Verificar se há filiais vinculadas
    const branches = await Company.count({ where: { parentId: req.params.id } });
    if (branches > 0) {
      return res.status(400).json({ message: 'Não é possível deletar empresa com filiais vinculadas' });
    }

    await company.destroy();

    res.json({ message: 'Empresa deletada com sucesso' });
  } catch (error) {
    next(error);
  }
};

exports.getBranches = async (req, res, next) => {
  try {
    const branches = await Company.findAll({
      where: { parentId: req.params.id },
      order: [['name', 'ASC']]
    });

    res.json(branches);
  } catch (error) {
    next(error);
  }
};

exports.getDashboard = async (req, res, next) => {
  try {
    const { Asset, Product } = require('../models');
    
    const totalAssets = await Asset.count({ where: { companyId: req.params.id } });
    const totalProducts = await Product.count({ where: { companyId: req.params.id } });
    const totalUsers = await User.count({ where: { companyId: req.params.id } });

    const assetsByStatus = await Asset.findAll({
      where: { companyId: req.params.id },
      attributes: ['status', [require('sequelize').fn('COUNT', 'id'), 'count']],
      group: ['status'],
      raw: true
    });

    res.json({
      totalAssets,
      totalProducts,
      totalUsers,
      assetsByStatus
    });
  } catch (error) {
    next(error);
  }
};
