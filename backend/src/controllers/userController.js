const { User, Company } = require('../models');
const { Op } = require('sequelize');

exports.getAll = async (req, res, next) => {
  try {
    const { status, role, companyId, search } = req.query;
    const where = {};

    if (status) where.status = status;
    if (role) where.role = role;
    if (companyId) where.companyId = companyId;
    if (search) {
      where[Op.or] = [
        { username: { [Op.iLike]: `%${search}%` } },
        { fullName: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const users = await User.findAll({
      where,
      attributes: { exclude: ['password'] },
      include: [{ model: Company, as: 'company' }],
      order: [['createdAt', 'DESC']]
    });

    res.json(users);
  } catch (error) {
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Company, as: 'company' }]
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};

exports.approve = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    if (user.status !== 'pending') {
      return res.status(400).json({ message: 'Usuário não está pendente de aprovação' });
    }

    await user.update({ status: 'active' });

    res.json({ message: 'Usuário aprovado com sucesso', user });
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { role, status, companyId } = req.body;
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    await user.update({ role, status, companyId });

    const userResponse = user.toJSON();
    delete userResponse.password;

    res.json({ message: 'Usuário atualizado com sucesso', user: userResponse });
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    await user.destroy();

    res.json({ message: 'Usuário deletado com sucesso' });
  } catch (error) {
    next(error);
  }
};
