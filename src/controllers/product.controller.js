const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createProduct = async (req, res) => {
  try {
    const { name, description, sku, categoryId } = req.body;
    const product = await prisma.product.create({
      data: { name, description, sku, categoryId: categoryId || undefined }
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: { category: true }
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
};

module.exports = { createProduct, getProducts };