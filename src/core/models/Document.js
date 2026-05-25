/**
 * Modèle Document - Document stocké dans le système
 */

const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/connection');

const Document = sequelize.define('Document', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  institution_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  file_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  original_name: {
    type: DataTypes.STRING(255),
  },
  file_path: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  file_type: {
    type: DataTypes.STRING(50),
  },
  file_size: {
    type: DataTypes.BIGINT,
  },
  entity_type: {
    type: DataTypes.ENUM('student', 'teacher', 'institution', 'exam', 'general'),
    allowNull: false,
  },
  entity_id: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  uploaded_by: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  version: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  access_level: {
    type: DataTypes.ENUM('public', 'private', 'restricted'),
    defaultValue: 'private',
  },
  is_archived: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  archived_date: {
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
  tableName: 'documents',
  timestamps: true,
  underscored: true,
});

module.exports = Document;
