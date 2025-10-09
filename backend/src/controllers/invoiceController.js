const { Invoice, Partner, Company, StockMovement } = require('../models');
const { Op } = require('sequelize');

exports.getAll = async (req, res, next) => {
  try {
    const { type, status, companyId, partnerId, search } = req.query;
    const where = {};

    if (type) where.type = type;
    if (status) where.status = status;
    if (companyId) where.companyId = companyId;
    if (partnerId) where.partnerId = partnerId;
    if (search) {
      where[Op.or] = [
        { number: { [Op.iLike]: `%${search}%` } },
        { accessKey: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const invoices = await Invoice.findAll({
      where,
      include: [
        { model: Partner, as: 'partner' },
        { model: Company, as: 'company' }
      ],
      order: [['date', 'DESC']]
    });

    res.json(invoices);
  } catch (error) {
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const invoice = await Invoice.findByPk(req.params.id, {
      include: [
        { model: Partner, as: 'partner' },
        { model: Company, as: 'company' },
        { model: StockMovement, as: 'stockMovements' }
      ]
    });

    if (!invoice) {
      return res.status(404).json({ message: 'Nota fiscal não encontrada' });
    }

    res.json(invoice);
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const invoice = await Invoice.create(req.body);

    res.status(201).json({
      message: 'Nota fiscal cadastrada com sucesso',
      invoice
    });
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const invoice = await Invoice.findByPk(req.params.id);

    if (!invoice) {
      return res.status(404).json({ message: 'Nota fiscal não encontrada' });
    }

    await invoice.update(req.body);

    res.json({
      message: 'Nota fiscal atualizada com sucesso',
      invoice
    });
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const invoice = await Invoice.findByPk(req.params.id);

    if (!invoice) {
      return res.status(404).json({ message: 'Nota fiscal não encontrada' });
    }

    await invoice.destroy();

    res.json({ message: 'Nota fiscal deletada com sucesso' });
  } catch (error) {
    next(error);
  }
};

exports.verify = async (req, res, next) => {
  try {
    const invoice = await Invoice.findByPk(req.params.id, {
      include: [{ model: StockMovement, as: 'stockMovements' }]
    });

    if (!invoice) {
      return res.status(404).json({ message: 'Nota fiscal não encontrada' });
    }

    // Lógica de verificação (simplificada)
    const hasDiscrepancies = req.body.hasDiscrepancies || false;
    const newStatus = hasDiscrepancies ? 'divergent' : 'verified';

    await invoice.update({ 
      status: newStatus,
      notes: req.body.notes
    });

    res.json({
      message: `Nota fiscal ${hasDiscrepancies ? 'verificada com divergências' : 'verificada com sucesso'}`,
      invoice
    });
  } catch (error) {
    next(error);
  }
};

exports.getDiscrepancies = async (req, res, next) => {
  try {
    const { companyId } = req.query;
    const where = { status: 'divergent' };

    if (companyId) where.companyId = companyId;

    const invoices = await Invoice.findAll({
      where,
      include: [
        { model: Partner, as: 'partner' },
        { model: Company, as: 'company' }
      ],
      order: [['date', 'DESC']]
    });

    res.json(invoices);
  } catch (error) {
    next(error);
  }
};
