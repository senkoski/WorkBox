const { Asset, Product, StockMovement, Invoice, Company, User } = require('../models');
const { Op } = require('sequelize');
const sequelize = require('../config/database');

exports.getDashboard = async (req, res, next) => {
  try {
    const { companyId } = req.query;
    const where = companyId ? { companyId } : {};

    // KPIs gerais
    const totalAssets = await Asset.count({ where });
    const totalProducts = await Product.count({ where });
    const totalUsers = await User.count(companyId ? { where: { companyId } } : {});
    const totalCompanies = await Company.count();

    // Patrimônio por status
    const assetsByStatus = await Asset.findAll({
      where,
      attributes: [
        'status',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      group: ['status'],
      raw: true
    });

    // Valor total do patrimônio
    const assetsTotalValue = await Asset.sum('currentValue', { where });

    // Produtos com estoque baixo
    const lowStockProducts = await Product.count({
      where: {
        ...where,
        [Op.and]: [
          sequelize.where(
            sequelize.col('currentStock'),
            { [Op.lte]: sequelize.col('minimumStock') }
          )
        ]
      }
    });

    // Movimentações recentes de estoque
    const recentStockMovements = await StockMovement.count({
      where: {
        ...where,
        date: {
          [Op.gte]: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // últimos 7 dias
        }
      }
    });

    // Notas fiscais pendentes
    const pendingInvoices = await Invoice.count({
      where: {
        ...where,
        status: 'pending'
      }
    });

    res.json({
      kpis: {
        totalAssets,
        totalProducts,
        totalUsers,
        totalCompanies,
        assetsTotalValue: parseFloat(assetsTotalValue || 0).toFixed(2),
        lowStockProducts,
        recentStockMovements,
        pendingInvoices
      },
      assetsByStatus
    });
  } catch (error) {
    next(error);
  }
};

exports.getAssetReport = async (req, res, next) => {
  try {
    const { companyId, category, status, startDate, endDate } = req.query;
    const where = {};

    if (companyId) where.companyId = companyId;
    if (category) where.category = category;
    if (status) where.status = status;
    if (startDate && endDate) {
      where.acquisitionDate = {
        [Op.between]: [new Date(startDate), new Date(endDate)]
      };
    }

    const assets = await Asset.findAll({
      where,
      include: [{ model: Company, as: 'company' }],
      order: [['acquisitionDate', 'DESC']]
    });

    const summary = {
      total: assets.length,
      totalAcquisitionValue: assets.reduce((sum, a) => sum + parseFloat(a.acquisitionValue), 0),
      totalCurrentValue: assets.reduce((sum, a) => sum + parseFloat(a.currentValue), 0),
      byCategory: {},
      byStatus: {}
    };

    assets.forEach(asset => {
      summary.byCategory[asset.category] = (summary.byCategory[asset.category] || 0) + 1;
      summary.byStatus[asset.status] = (summary.byStatus[asset.status] || 0) + 1;
    });

    res.json({
      summary,
      assets
    });
  } catch (error) {
    next(error);
  }
};

exports.getStockReport = async (req, res, next) => {
  try {
    const { companyId, category, startDate, endDate } = req.query;
    const where = {};

    if (companyId) where.companyId = companyId;
    if (category) where.category = category;

    const products = await Product.findAll({
      where,
      include: [{ model: Company, as: 'company' }],
      order: [['name', 'ASC']]
    });

    const movementWhere = {};
    if (companyId) movementWhere.companyId = companyId;
    if (startDate && endDate) {
      movementWhere.date = {
        [Op.between]: [new Date(startDate), new Date(endDate)]
      };
    }

    const movements = await StockMovement.findAll({
      where: movementWhere,
      include: [{ model: Product, as: 'product' }]
    });

    const summary = {
      totalProducts: products.length,
      totalStockValue: products.reduce((sum, p) => sum + (parseFloat(p.currentStock) * parseFloat(p.unitPrice)), 0),
      lowStockCount: products.filter(p => parseFloat(p.currentStock) <= parseFloat(p.minimumStock)).length,
      totalEntries: movements.filter(m => m.type === 'entry').length,
      totalExits: movements.filter(m => m.type === 'exit').length
    };

    res.json({
      summary,
      products,
      movements
    });
  } catch (error) {
    next(error);
  }
};

exports.getInvoiceReport = async (req, res, next) => {
  try {
    const { companyId, type, status, startDate, endDate } = req.query;
    const where = {};

    if (companyId) where.companyId = companyId;
    if (type) where.type = type;
    if (status) where.status = status;
    if (startDate && endDate) {
      where.date = {
        [Op.between]: [new Date(startDate), new Date(endDate)]
      };
    }

    const invoices = await Invoice.findAll({
      where,
      include: [
        { model: Company, as: 'company' },
        { model: require('../models').Partner, as: 'partner' }
      ],
      order: [['date', 'DESC']]
    });

    const summary = {
      total: invoices.length,
      totalValue: invoices.reduce((sum, i) => sum + parseFloat(i.totalValue), 0),
      byType: {},
      byStatus: {}
    };

    invoices.forEach(invoice => {
      summary.byType[invoice.type] = (summary.byType[invoice.type] || 0) + 1;
      summary.byStatus[invoice.status] = (summary.byStatus[invoice.status] || 0) + 1;
    });

    res.json({
      summary,
      invoices
    });
  } catch (error) {
    next(error);
  }
};
