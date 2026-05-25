/**
 * Modèle Institution - Établissement scolaire
 */

const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/connection');

const Institution = sequelize.define('Institution', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  code: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  type: {
    type: DataTypes.ENUM('primary', 'secondary', 'university'),
    allowNull: false,
  },
  contact_email: {
    type: DataTypes.STRING(255),
    validate: {
      isEmail: true,
    },
  },
  contact_phone: {
    type: DataTypes.STRING(20),
  },
  address: {
    type: DataTypes.TEXT,
  },
  city: {
    type: DataTypes.STRING(100),
  },
  country: {
    type: DataTypes.STRING(100),
  },
  postal_code: {
    type: DataTypes.STRING(20),
  },
  website: {
    type: DataTypes.STRING(255),
  },
  logo_url: {
    type: DataTypes.STRING(255),
  },
  license_id: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  academic_year: {
    type: DataTypes.STRING(10),
    defaultValue: new Date().getFullYear().toString(),
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
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
  tableName: 'institutions',
  timestamps: true,
  underscored: true,
});

module.exports = Institution;
