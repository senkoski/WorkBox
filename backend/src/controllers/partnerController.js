const { Partner, Company, Invoice } = require('../models');
const { Op } = require('sequelize');

exports.getAll = async (req, res, next) => {
  try {
    const { type, status, companyId, search } = req.query;
    const where = {};

    if (type) where.type = type;
    if (status) where.status = status;
    if (companyId) where.companyId = companyId;
    if (search) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { tradeName: { [Op.iLike]: `%${search}%` } },
        { cnpjCpf: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const partners = await Partner.findAll({
      where,
      include: [{ model: Company, as: 'company' }],
      order: [['name', 'ASC']]
    });

    res.json(partners);
  } catch (error) {
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const partner = await Partner.findByPk(req.params.id, {
      include: [
        { model: Company, as: 'company' },
        { model: Invoice, as: 'invoices', limit: 10, order: [['date', 'DESC']] }
      ]
    });

    if (!partner) {
      return res.status(404).json({ message: 'Parceiro não encontrado' });
    }

    res.json(partner);
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const partner = await Partner.create(req.body);

    res.status(201).json({
      message: 'Parceiro cadastrado com sucesso',
      partner
    });
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const partner = await Partner.findByPk(req.params.id);

    if (!partner) {
      return res.status(404).json({ message: 'Parceiro não encontrado' });
    }

    await partner.update(req.body);

    res.json({
      message: 'Parceiro atualizado com sucesso',
      partner
    });
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const partner = await Partner.findByPk(req.params.id);

    if (!partner) {
      return res.status(404).json({ message: 'Parceiro não encontrado' });
    }

    // Verificar se há notas fiscais vinculadas
    const invoicesCount = await Invoice.count({ where: { partnerId: req.params.id } });
    if (invoicesCount > 0) {
      return res.status(400).json({ message: 'Não é possível deletar parceiro com notas fiscais vinculadas' });
    }

    await partner.destroy();

    res.json({ message: 'Parceiro deletado com sucesso' });
  } catch (error) {
    next(error);
  }
};

exports.getTransactions = async (req, res, next) => {
  try {
    const invoices = await Invoice.findAll({
      where: { partnerId: req.params.id },
      include: [
        { model: Company, as: 'company' }
      ],
      order: [['date', 'DESC']]
    });

    res.json(invoices);
  } catch (error) {
    next(error);
  }
};
