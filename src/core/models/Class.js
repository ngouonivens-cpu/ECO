/**
 * Modèle Class - Classe/Groupe d'apprenants
 */

const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/connection');

const Class = sequelize.define('Class', {
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
  level: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  academic_year: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  capacity: {
    type: DataTypes.INTEGER,
    defaultValue: 30,
  },
  current_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  class_teacher_id: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  room_number: {
    type: DataTypes.STRING(50),
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
  tableName: 'classes',
  timestamps: true,
  underscored: true,
});

module.exports = Class;
