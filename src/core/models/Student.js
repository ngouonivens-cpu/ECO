/**
 * Modèle Student - Apprenant
 */

const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/connection');

const Student = sequelize.define('Student', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  matricule: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  institution_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  first_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  date_of_birth: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  gender: {
    type: DataTypes.ENUM('M', 'F'),
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
  address: {
    type: DataTypes.TEXT,
  },
  city: {
    type: DataTypes.STRING(100),
  },
  country: {
    type: DataTypes.STRING(100),
  },
  parent_id: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  level: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  class_id: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('active', 'suspended', 'graduated', 'transferred'),
    defaultValue: 'active',
  },
  enrollment_date: {
    type: DataTypes.DATEONLY,
    defaultValue: DataTypes.NOW,
  },
  graduation_date: {
    type: DataTypes.DATEONLY,
    allowNull: true,
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
  tableName: 'students',
  timestamps: true,
  underscored: true,
});

Student.prototype.getFullName = function() {
  return `${this.first_name} ${this.last_name}`;
};

module.exports = Student;
