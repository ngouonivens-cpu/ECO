/**
 * Modèle Subject - Matière/Cours
 */

const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/connection');

const Subject = sequelize.define('Subject', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  institution_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  code: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  level: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  credit_hours: {
    type: DataTypes.INTEGER,
  },
  coefficient: {
    type: DataTypes.FLOAT,
    defaultValue: 1,
  },
  ects_credits: {
    type: DataTypes.INTEGER,
  },
  is_mandatory: {
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
  tableName: 'subjects',
  timestamps: true,
  underscored: true,
});

module.exports = Subject;
