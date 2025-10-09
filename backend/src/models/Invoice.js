const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Invoice = sequelize.define('Invoice', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  number: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  series: {
    type: DataTypes.STRING(10)
  },
  type: {
    type: DataTypes.ENUM('incoming', 'outgoing'),
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  partnerId: {
    type: DataTypes.UUID,
    references: {
      model: 'Partners',
      key: 'id'
    }
  },
  companyId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Companies',
      key: 'id'
    }
  },
  totalValue: {
    type: DataTypes.DECIMAL(15, 2),
    defaultValue: 0
  },
  accessKey: {
    type: DataTypes.STRING(44)
  },
  xmlContent: {
    type: DataTypes.TEXT
  },
  status: {
    type: DataTypes.ENUM('pending', 'verified', 'divergent', 'cancelled'),
    defaultValue: 'pending'
  },
  notes: {
    type: DataTypes.TEXT
  },
  items: {
    type: DataTypes.JSONB,
    defaultValue: []
  }
}, {
  tableName: 'invoices',
  timestamps: true
});

module.exports = Invoice;
