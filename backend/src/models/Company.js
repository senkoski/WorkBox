const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Company = sequelize.define('Company', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  tradeName: {
    type: DataTypes.STRING(200)
  },
  cnpj: {
    type: DataTypes.STRING(18),
    unique: true
  },
  type: {
    type: DataTypes.ENUM('headquarters', 'branch'),
    defaultValue: 'headquarters'
  },
  parentId: {
    type: DataTypes.UUID,
    references: {
      model: 'Companies',
      key: 'id'
    }
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
  phone: {
    type: DataTypes.STRING(20)
  },
  email: {
    type: DataTypes.STRING(100)
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active'
  },
  settings: {
    type: DataTypes.JSONB,
    defaultValue: {}
  }
}, {
  tableName: 'companies',
  timestamps: true
});

module.exports = Company;
