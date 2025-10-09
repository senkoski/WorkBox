const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const StockMovement = sequelize.define('StockMovement', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  productId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Products',
      key: 'id'
    }
  },
  type: {
    type: DataTypes.ENUM('entry', 'exit'),
    allowNull: false
  },
  subtype: {
    type: DataTypes.ENUM('purchase', 'transfer', 'donation', 'sale', 'loan', 'disposal', 'return', 'adjustment'),
    allowNull: false
  },
  quantity: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  unitPrice: {
    type: DataTypes.DECIMAL(15, 2),
    defaultValue: 0
  },
  totalPrice: {
    type: DataTypes.DECIMAL(15, 2),
    defaultValue: 0
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  companyId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Companies',
      key: 'id'
    }
  },
  userId: {
    type: DataTypes.UUID,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  invoiceId: {
    type: DataTypes.UUID,
    references: {
      model: 'Invoices',
      key: 'id'
    }
  },
  lot: {
    type: DataTypes.STRING(50)
  },
  expirationDate: {
    type: DataTypes.DATE
  },
  notes: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'stock_movements',
  timestamps: true
});

module.exports = StockMovement;
