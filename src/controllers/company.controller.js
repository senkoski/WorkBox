const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createCompany = async (req, res) => {
  try {
    const { name, cnpj } = req.body;
    const company = await prisma.company.create({ data: { name, cnpj } });
    res.status(201).json(company);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getCompanies = async (req, res) => {
  try {
    const companies = await prisma.company.findMany();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar empresas' });
  }
};

module.exports = { createCompany, getCompanies };