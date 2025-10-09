const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Partner = sequelize.define('Partner', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  type: {
    type: DataTypes.ENUM('supplier', 'customer', 'service_provider', 'carrier'),
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  tradeName: {
    type: DataTypes.STRING(200)
  },
  cnpjCpf: {
    type: DataTypes.STRING(18),
    unique: true
  },
  email: {
    type: DataTypes.STRING(100)
  },
  phone: {
    type: DataTypes.STRING(20)
  },
  mobile: {
    type: DataTypes.STRING(20)
  },
  address: {
    type: DataTypes.STRING(200)
  },
  city: {
    type: DataTypes.STRING(100)
  },
  state: {
    type: DataTypes.STRING(2)
  },
  zipCode: {
    type: DataTypes.STRING(10)
  },
  contact: {
    type: DataTypes.STRING(100)
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active'
  },
  notes: {
    type: DataTypes.TEXT
  },
  companyId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Companies',
      key: 'id'
    }
  }
}, {
  tableName: 'partners',
  timestamps: true
});

module.exports = Partner;
