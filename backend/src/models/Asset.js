const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Asset = sequelize.define('Asset', {
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
  acquisitionDate: {
    type: DataTypes.DATE
  },
  acquisitionValue: {
    type: DataTypes.DECIMAL(15, 2),
    defaultValue: 0
  },
  currentValue: {
    type: DataTypes.DECIMAL(15, 2),
    defaultValue: 0
  },
  depreciationRate: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: 0
  },
  status: {
    type: DataTypes.ENUM('in_use', 'maintenance', 'available', 'retired'),
    defaultValue: 'available'
  },
  location: {
    type: DataTypes.STRING(200)
  },
  responsible: {
    type: DataTypes.STRING(100)
  },
  companyId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Companies',
      key: 'id'
    }
  },
  qrCode: {
    type: DataTypes.TEXT
  },
  lastMaintenanceDate: {
    type: DataTypes.DATE
  },
  nextMaintenanceDate: {
    type: DataTypes.DATE
  },
  photos: {
    type: DataTypes.JSONB,
    defaultValue: []
  },
  notes: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'assets',
  timestamps: true
});

module.exports = Asset;
