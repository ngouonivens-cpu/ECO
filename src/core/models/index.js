/**
 * Index des modèles
 * Exporte tous les modèles et établit les associations
 */

const User = require('./User');
const Institution = require('./Institution');
const Student = require('./Student');
const Teacher = require('./Teacher');
const Class = require('./Class');
const Subject = require('./Subject');
const Grade = require('./Grade');
const Attendance = require('./Attendance');
const License = require('./License');
const Payment = require('./Payment');
const Document = require('./Document');

// ============================================
// ASSOCIATIONS
// ============================================

// User relationships
User.hasOne(Student, { foreignKey: 'user_id', as: 'student' });
User.hasOne(Teacher, { foreignKey: 'user_id', as: 'teacher' });
Student.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
Teacher.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// Institution relationships
Institution.hasMany(Student, { foreignKey: 'institution_id', as: 'students' });
Institution.hasMany(Teacher, { foreignKey: 'institution_id', as: 'teachers' });
Institution.hasMany(Class, { foreignKey: 'institution_id', as: 'classes' });
Institution.hasMany(Subject, { foreignKey: 'institution_id', as: 'subjects' });
Institution.hasOne(License, { foreignKey: 'institution_id', as: 'license' });
Student.belongsTo(Institution, { foreignKey: 'institution_id', as: 'institution' });
Teacher.belongsTo(Institution, { foreignKey: 'institution_id', as: 'institution' });
Class.belongsTo(Institution, { foreignKey: 'institution_id', as: 'institution' });
Subject.belongsTo(Institution, { foreignKey: 'institution_id', as: 'institution' });

// Class relationships
Class.hasMany(Student, { foreignKey: 'class_id', as: 'students' });
Class.belongsTo(Teacher, { foreignKey: 'class_teacher_id', as: 'class_teacher' });
Student.belongsTo(Class, { foreignKey: 'class_id', as: 'class' });

// Teacher - Class relationship (many-to-many)
Teacher.hasMany(Class, { as: 'classes' });

// Subject relationships
Subject.hasMany(Grade, { foreignKey: 'subject_id', as: 'grades' });
Grade.belongsTo(Subject, { foreignKey: 'subject_id', as: 'subject' });

// Grade relationships
Student.hasMany(Grade, { foreignKey: 'student_id', as: 'grades' });
Teacher.hasMany(Grade, { foreignKey: 'teacher_id', as: 'grades' });
Class.hasMany(Grade, { foreignKey: 'class_id', as: 'grades' });
Grade.belongsTo(Student, { foreignKey: 'student_id', as: 'student' });
Grade.belongsTo(Teacher, { foreignKey: 'teacher_id', as: 'teacher' });
Grade.belongsTo(Class, { foreignKey: 'class_id', as: 'class' });

// Attendance relationships
Student.hasMany(Attendance, { foreignKey: 'student_id', as: 'attendances' });
Class.hasMany(Attendance, { foreignKey: 'class_id', as: 'attendances' });
Attendance.belongsTo(Student, { foreignKey: 'student_id', as: 'student' });
Attendance.belongsTo(Class, { foreignKey: 'class_id', as: 'class' });

// Payment relationships
Student.hasMany(Payment, { foreignKey: 'student_id', as: 'payments' });
Payment.belongsTo(Student, { foreignKey: 'student_id', as: 'student' });

// License relationships
License.belongsTo(Institution, { foreignKey: 'institution_id', as: 'institution' });

// Document relationships
Document.belongsTo(User, { foreignKey: 'uploaded_by', as: 'uploader' });
User.hasMany(Document, { foreignKey: 'uploaded_by', as: 'uploaded_documents' });
Student.hasMany(Document, { foreignKey: 'entity_id', as: 'documents' });
Teacher.hasMany(Document, { foreignKey: 'entity_id', as: 'documents' });

module.exports = {
  User,
  Institution,
  Student,
  Teacher,
  Class,
  Subject,
  Grade,
  Attendance,
  License,
  Payment,
  Document,
};
