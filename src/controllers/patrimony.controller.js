const { PrismaClient } = require('@prisma/client');
const QRCode = require('qrcode');
const prisma = new PrismaClient();

const createPatrimony = async (req, res) => {
  try {
    const { description, value, branchId } = req.body;
    const lastPatrimony = await prisma.patrimony.findFirst({
      orderBy: { id: 'desc' }
    });
    const code = `PAT-${String((lastPatrimony?.id || 0) + 1).padStart(6, '0')}`;

    const patrimony = await prisma.patrimony.create({
      data: { code, description, value, branchId }
    });
    res.status(201).json(patrimony);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllPatrimony = async (req, res) => {
  try {
    const patrimony = await prisma.patrimony.findMany({
      include: { branch: { include: { company: true } } }
    });
    res.json(patrimony);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar patrimônios' });
  }
};

const generateQRCode = async (req, res) => {
  try {
    const { code } = req.params;
    const patrimony = await prisma.patrimony.findUnique({ where: { code } });
    if (!patrimony) return res.status(404).json({ error: 'Patrimônio não encontrado' });

    const qrData = JSON.stringify({
      id: patrimony.id,
      code: patrimony.code,
      description: patrimony.description
    });

    const qrBase64 = await QRCode.toDataURL(qrData);
    res.json({ qrCode: qrBase64 });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao gerar QR Code' });
  }
};

module.exports = { createPatrimony, getAllPatrimony, generateQRCode };