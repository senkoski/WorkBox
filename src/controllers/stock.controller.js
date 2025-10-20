const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const stockEntry = async (req, res) => {
  const { productId, quantity, reason } = req.body;
  try {
    await prisma.$transaction(async (tx) => {
      await tx.product.update({
        where: { id: productId },
        data: { stock: { increment: quantity } }
      });
      await tx.stockMovement.create({
        data: { productId, type: 'entry', quantity, reason }
      });
    });
    res.json({ message: 'Entrada registrada com sucesso' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const stockExit = async (req, res) => {
  const { productId, quantity, reason } = req.body;
  try {
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product || product.stock < quantity) {
      return res.status(400).json({ error: 'Estoque insuficiente' });
    }

    await prisma.$transaction(async (tx) => {
      await tx.product.update({
        where: { id: productId },
        data: { stock: { decrement: quantity } }
      });
      await tx.stockMovement.create({
        data: { productId, type: 'exit', quantity, reason }
      });
    });
    res.json({ message: 'Saída registrada com sucesso' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { stockEntry, stockExit };