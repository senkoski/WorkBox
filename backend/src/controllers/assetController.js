const { Asset, AssetMovement, Company } = require('../models');
const { Op } = require('sequelize');
const QRCode = require('qrcode');

exports.getAll = async (req, res, next) => {
  try {
    const { status, category, companyId, search } = req.query;
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

    const assets = await Asset.findAll({
      where,
      include: [{ model: Company, as: 'company' }],
      order: [['createdAt', 'DESC']]
    });

    res.json(assets);
  } catch (error) {
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const asset = await Asset.findByPk(req.params.id, {
      include: [
        { model: Company, as: 'company' },
        { model: AssetMovement, as: 'movements', limit: 10, order: [['date', 'DESC']] }
      ]
    });

    if (!asset) {
      return res.status(404).json({ message: 'Patrimônio não encontrado' });
    }

    res.json(asset);
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const assetData = req.body;

    // Gerar QR Code
    const qrCodeData = JSON.stringify({
      id: assetData.code,
      name: assetData.name,
      type: 'asset'
    });
    const qrCode = await QRCode.toDataURL(qrCodeData);
    assetData.qrCode = qrCode;

    const asset = await Asset.create(assetData);

    res.status(201).json({
      message: 'Patrimônio cadastrado com sucesso',
      asset
    });
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const asset = await Asset.findByPk(req.params.id);

    if (!asset) {
      return res.status(404).json({ message: 'Patrimônio não encontrado' });
    }

    await asset.update(req.body);

    res.json({
      message: 'Patrimônio atualizado com sucesso',
      asset
    });
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const asset = await Asset.findByPk(req.params.id);

    if (!asset) {
      return res.status(404).json({ message: 'Patrimônio não encontrado' });
    }

    await asset.destroy();

    res.json({ message: 'Patrimônio deletado com sucesso' });
  } catch (error) {
    next(error);
  }
};

exports.addMovement = async (req, res, next) => {
  try {
    const asset = await Asset.findByPk(req.params.id);

    if (!asset) {
      return res.status(404).json({ message: 'Patrimônio não encontrado' });
    }

    const movementData = {
      ...req.body,
      assetId: req.params.id,
      userId: req.user.id
    };

    const movement = await AssetMovement.create(movementData);

    // Atualizar status e localização do patrimônio se necessário
    if (req.body.toLocation) {
      await asset.update({ location: req.body.toLocation });
    }
    if (req.body.toResponsible) {
      await asset.update({ responsible: req.body.toResponsible });
    }
    if (req.body.newStatus) {
      await asset.update({ status: req.body.newStatus });
    }

    res.status(201).json({
      message: 'Movimentação registrada com sucesso',
      movement
    });
  } catch (error) {
    next(error);
  }
};

exports.getMovements = async (req, res, next) => {
  try {
    const movements = await AssetMovement.findAll({
      where: { assetId: req.params.id },
      include: [
        { model: Asset, as: 'asset' }
      ],
      order: [['date', 'DESC']]
    });

    res.json(movements);
  } catch (error) {
    next(error);
  }
};

exports.calculateDepreciation = async (req, res, next) => {
  try {
    const asset = await Asset.findByPk(req.params.id);

    if (!asset) {
      return res.status(404).json({ message: 'Patrimônio não encontrado' });
    }

    const yearsOld = (new Date() - new Date(asset.acquisitionDate)) / (1000 * 60 * 60 * 24 * 365);
    const depreciationAmount = asset.acquisitionValue * (asset.depreciationRate / 100) * yearsOld;
    const currentValue = Math.max(0, asset.acquisitionValue - depreciationAmount);

    await asset.update({ currentValue });

    res.json({
      message: 'Depreciação calculada com sucesso',
      acquisitionValue: asset.acquisitionValue,
      depreciationRate: asset.depreciationRate,
      yearsOld: yearsOld.toFixed(2),
      depreciationAmount: depreciationAmount.toFixed(2),
      currentValue: currentValue.toFixed(2)
    });
  } catch (error) {
    next(error);
  }
};
