const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AssetMovement = sequelize.define('AssetMovement', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  assetId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Assets',
      key: 'id'
    }
  },
  type: {
    type: DataTypes.ENUM('transfer', 'maintenance', 'return', 'retirement', 'assignment'),
    allowNull: false
  },
  fromLocation: {
    type: DataTypes.STRING(200)
  },
  toLocation: {
    type: DataTypes.STRING(200)
  },
  fromResponsible: {
    type: DataTypes.STRING(100)
  },
  toResponsible: {
    type: DataTypes.STRING(100)
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  reason: {
    type: DataTypes.TEXT
  },
  userId: {
    type: DataTypes.UUID,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  notes: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'asset_movements',
  timestamps: true
});

module.exports = AssetMovement;
