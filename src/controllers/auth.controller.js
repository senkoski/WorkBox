const { login, register } = require('../services/auth.service');

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await login(email, password);
    res.json(result);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const registerController = async (req, res) => {
  try {
    const { name, email, password, companyId } = req.body;
    const user = await register(name, email, password, companyId);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginController, registerController };