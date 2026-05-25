/**
 * Modèle Attendance - Présence d'apprenant
 */

const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/connection');

const Attendance = sequelize.define('Attendance', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  institution_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  student_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  class_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  subject_id: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('present', 'absent', 'late', 'excused'),
    defaultValue: 'present',
  },
  time_marked: {
    type: DataTypes.TIME,
    allowNull: true,
  },
  marked_by: {
    type: DataTypes.UUID,
  },
  notes: {
    type: DataTypes.TEXT,
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
  tableName: 'attendances',
  timestamps: true,
  underscored: true,
});

module.exports = Attendance;
