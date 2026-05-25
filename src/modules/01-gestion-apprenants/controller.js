/**
 * Controleur Module 01 - Gestion des apprenants
 */

const { Student, Class, Grade, Attendance, Payment } = require('../../core/models');
const logger = require('../../core/utils/logger');

/**
 * Obtenir les statistiques d'un apprenant
 */
const getStudentStats = async (studentId) => {
  try {
    const student = await Student.findByPk(studentId);

    if (!student) {
      throw new Error('Apprenant non trouvé');
    }

    const [gradesCount, gradesAverage] = await Promise.all([
      Grade.count({ where: { student_id: studentId } }),
      Grade.findAll({
        where: { student_id: studentId },
        attributes: [[require('sequelize').fn('AVG', require('sequelize').col('final_grade')), 'average']],
        raw: true,
      }),
    ]);

    const [attendanceCount, absencesCount] = await Promise.all([
      Attendance.count({ where: { student_id: studentId, status: 'present' } }),
      Attendance.count({ where: { student_id: studentId, status: 'absent' } }),
    ]);

    const totalPayments = await Payment.sum('amount', {
      where: { student_id: studentId, status: 'completed' },
    });

    return {
      grades: {
        count: gradesCount,
        average: gradesAverage[0]?.average || 0,
      },
      attendance: {
        present: attendanceCount,
        absent: absencesCount,
      },
      payments: {
        total: totalPayments || 0,
      },
    };
  } catch (error) {
    logger.error('Erreur lors du calcul des statistiques:', error);
    throw error;
  }
};

/**
 * Transférer un apprenant vers une autre classe
 */
const transferStudent = async (studentId, newClassId) => {
  try {
    const student = await Student.findByPk(studentId);

    if (!student) {
      throw new Error('Apprenant non trouvé');
    }

    const newClass = await Class.findByPk(newClassId);

    if (!newClass) {
      throw new Error('Classe non trouvée');
    }

    // Mettre à jour l'apprenant
    student.class_id = newClassId;
    await student.save();

    logger.info(`Apprenant ${student.matricule} transféré vers la classe ${newClass.name}`);

    return student;
  } catch (error) {
    logger.error('Erreur lors du transfert:', error);
    throw error;
  }
};

/**
 * Suspendre un apprenant
 */
const suspendStudent = async (studentId, reason) => {
  try {
    const student = await Student.findByPk(studentId);

    if (!student) {
      throw new Error('Apprenant non trouvé');
    }

    student.status = 'suspended';
    await student.save();

    logger.info(`Apprenant ${student.matricule} suspendu. Raison: ${reason}`);

    return student;
  } catch (error) {
    logger.error('Erreur lors de la suspension:', error);
    throw error;
  }
};

module.exports = {
  getStudentStats,
  transferStudent,
  suspendStudent,
};
