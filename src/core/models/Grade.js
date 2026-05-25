/**
 * Modèle Grade - Note d'apprenant
 */

const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/connection');

const Grade = sequelize.define('Grade', {
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
  subject_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  teacher_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  class_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  continuous_assessment: {
    type: DataTypes.FLOAT,
    validate: {
      min: 0,
      max: 20,
    },
  },
  exam_grade: {
    type: DataTypes.FLOAT,
    validate: {
      min: 0,
      max: 20,
    },
  },
  final_grade: {
    type: DataTypes.FLOAT,
    validate: {
      min: 0,
      max: 20,
    },
  },
  academic_year: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  semester: {
    type: DataTypes.ENUM('1', '2'),
    allowNull: false,
  },
  recorded_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
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
  tableName: 'grades',
  timestamps: true,
  underscored: true,
});

// Hook pour calculer la note finale
Grade.beforeSave(async (grade) => {
  if (grade.continuous_assessment && grade.exam_grade) {
    grade.final_grade = (grade.continuous_assessment * 0.4) + (grade.exam_grade * 0.6);
  } else if (grade.exam_grade) {
    grade.final_grade = grade.exam_grade;
  } else if (grade.continuous_assessment) {
    grade.final_grade = grade.continuous_assessment;
  }
});

module.exports = Grade;
