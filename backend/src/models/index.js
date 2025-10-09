const sequelize = require('../config/database');
const User = require('./User');
const Company = require('./Company');
const Asset = require('./Asset');
const AssetMovement = require('./AssetMovement');
const Product = require('./Product');
const StockMovement = require('./StockMovement');
const Invoice = require('./Invoice');
const Partner = require('./Partner');

// Relacionamentos
// User - Company
User.belongsTo(Company, { foreignKey: 'companyId', as: 'company' });
Company.hasMany(User, { foreignKey: 'companyId', as: 'users' });

// Company - Company (Parent/Child)
Company.belongsTo(Company, { foreignKey: 'parentId', as: 'parent' });
Company.hasMany(Company, { foreignKey: 'parentId', as: 'branches' });

// Asset - Company
Asset.belongsTo(Company, { foreignKey: 'companyId', as: 'company' });
Company.hasMany(Asset, { foreignKey: 'companyId', as: 'assets' });

// AssetMovement - Asset
AssetMovement.belongsTo(Asset, { foreignKey: 'assetId', as: 'asset' });
Asset.hasMany(AssetMovement, { foreignKey: 'assetId', as: 'movements' });

// AssetMovement - User
AssetMovement.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(AssetMovement, { foreignKey: 'userId', as: 'assetMovements' });

// Product - Company
Product.belongsTo(Company, { foreignKey: 'companyId', as: 'company' });
Company.hasMany(Product, { foreignKey: 'companyId', as: 'products' });

// StockMovement - Product
StockMovement.belongsTo(Product, { foreignKey: 'productId', as: 'product' });
Product.hasMany(StockMovement, { foreignKey: 'productId', as: 'movements' });

// StockMovement - Company
StockMovement.belongsTo(Company, { foreignKey: 'companyId', as: 'company' });
Company.hasMany(StockMovement, { foreignKey: 'companyId', as: 'stockMovements' });

// StockMovement - User
StockMovement.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(StockMovement, { foreignKey: 'userId', as: 'stockMovements' });

// StockMovement - Invoice
StockMovement.belongsTo(Invoice, { foreignKey: 'invoiceId', as: 'invoice' });
Invoice.hasMany(StockMovement, { foreignKey: 'invoiceId', as: 'stockMovements' });

// Invoice - Partner
Invoice.belongsTo(Partner, { foreignKey: 'partnerId', as: 'partner' });
Partner.hasMany(Invoice, { foreignKey: 'partnerId', as: 'invoices' });

// Invoice - Company
Invoice.belongsTo(Company, { foreignKey: 'companyId', as: 'company' });
Company.hasMany(Invoice, { foreignKey: 'companyId', as: 'invoices' });

// Partner - Company
Partner.belongsTo(Company, { foreignKey: 'companyId', as: 'company' });
Company.hasMany(Partner, { foreignKey: 'companyId', as: 'partners' });

module.exports = {
  sequelize,
  User,
  Company,
  Asset,
  AssetMovement,
  Product,
  StockMovement,
  Invoice,
  Partner
};
