/**
 * Modèle License - Licence d'utilisation du système
 */

const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/connection');

const License = sequelize.define('License', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  license_key: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  institution_id: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true,
  },
  issue_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  expiry_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('active', 'expired', 'suspended', 'revoked'),
    defaultValue: 'active',
  },
  max_users: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  active_users_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  modules_enabled: {
    type: DataTypes.JSON,
    defaultValue: {
      module_01: true,
      module_02: true,
      module_03: true,
      module_04: true,
      module_05: true,
      module_06: true,
      module_07: true,
      module_08: true,
      module_09: true,
      module_10: true,
    },
  },
  created_by: {
    type: DataTypes.UUID,
  },
  last_verified: {
    type: DataTypes.DATE,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'licenses',
  timestamps: true,
  underscored: true,
});

License.prototype.isExpired = function() {
  return new Date() > new Date(this.expiry_date);
};

License.prototype.daysUntilExpiry = function() {
  const today = new Date();
  const expiry = new Date(this.expiry_date);
  const differenceTime = expiry - today;
  return Math.ceil(differenceTime / (1000 * 60 * 60 * 24));
};

module.exports = License;
