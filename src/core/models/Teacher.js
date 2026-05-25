/**
 * Modèle Teacher - Enseignant
 */

const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/connection');

const Teacher = sequelize.define('Teacher', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  institution_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  employee_id: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  first_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    validate: {
      isEmail: true,
    },
  },
  phone: {
    type: DataTypes.STRING(20),
  },
  specialization: {
    type: DataTypes.STRING(100),
  },
  qualification: {
    type: DataTypes.STRING(200),
  },
  hire_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('active', 'on_leave', 'retired', 'resigned'),
    defaultValue: 'active',
  },
  contract_type: {
    type: DataTypes.ENUM('permanent', 'contract', 'seasonal'),
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
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'teachers',
  timestamps: true,
  underscored: true,
});

Teacher.prototype.getFullName = function() {
  return `${this.first_name} ${this.last_name}`;
};

module.exports = Teacher;
