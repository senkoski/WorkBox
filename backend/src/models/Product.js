const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  code: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  name: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  category: {
    type: DataTypes.STRING(100)
  },
  unit: {
    type: DataTypes.STRING(20),
    defaultValue: 'UN'
  },
  minimumStock: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  currentStock: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  unitPrice: {
    type: DataTypes.DECIMAL(15, 2),
    defaultValue: 0
  },
  companyId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Companies',
      key: 'id'
    }
  },
  barcode: {
    type: DataTypes.STRING(50)
  },
  photo: {
    type: DataTypes.STRING
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active'
  }
}, {
  tableName: 'products',
  timestamps: true
});

module.exports = Product;
