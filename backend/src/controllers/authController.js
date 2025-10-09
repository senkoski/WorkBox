const { User, Company } = require('../models');
const { generateToken } = require('../utils/jwt');

exports.register = async (req, res, next) => {
  try {
    const { username, email, password, fullName, companyId, phone } = req.body;

    const existingUser = await User.findOne({
      where: { 
        $or: [{ username }, { email }]
      }
    });

    if (existingUser) {
      return res.status(409).json({ message: 'Usuário ou email já cadastrado' });
    }

    const user = await User.create({
      username,
      email,
      password,
      fullName,
      companyId,
      phone,
      status: 'pending'
    });

    const userResponse = user.toJSON();
    delete userResponse.password;

    res.status(201).json({
      message: 'Usuário cadastrado com sucesso. Aguardando aprovação.',
      user: userResponse
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({
      where: {
        $or: [{ username }, { email: username }]
      },
      include: [{ model: Company, as: 'company' }]
    });

    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    if (user.status !== 'active') {
      return res.status(403).json({ 
        message: 'Usuário inativo ou pendente de aprovação',
        status: user.status
      });
    }

    await user.update({ lastLogin: new Date() });

    const token = generateToken({ 
      id: user.id, 
      username: user.username, 
      role: user.role,
      companyId: user.companyId
    });

    const userResponse = user.toJSON();
    delete userResponse.password;

    res.json({
      message: 'Login realizado com sucesso',
      token,
      user: userResponse
    });
  } catch (error) {
    next(error);
  }
};

exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Company, as: 'company' }]
    });

    res.json(user);
  } catch (error) {
    next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { fullName, phone, email } = req.body;
    const user = await User.findByPk(req.user.id);

    await user.update({ fullName, phone, email });

    const userResponse = user.toJSON();
    delete userResponse.password;

    res.json({
      message: 'Perfil atualizado com sucesso',
      user: userResponse
    });
  } catch (error) {
    next(error);
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findByPk(req.user.id);

    const isValidPassword = await user.comparePassword(currentPassword);
    if (!isValidPassword) {
      return res.status(400).json({ message: 'Senha atual incorreta' });
    }

    await user.update({ password: newPassword });

    res.json({ message: 'Senha alterada com sucesso' });
  } catch (error) {
    next(error);
  }
};
