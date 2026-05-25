/**
 * Routes Module 01 - Gestion des apprenants
 */

const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { requirePermission } = require('../../core/permissions/middleware');
const { validateBody, validateQuery } = require('../../core/utils/validation');
const { Student, Class, User } = require('../../core/models');
const logger = require('../../core/utils/logger');

// ============================================
// VALIDATION SCHEMAS
// ============================================

const studentSchema = Joi.object({
  matricule: Joi.string().required().messages({
    'any.required': 'Matricule requis',
  }),
  first_name: Joi.string().min(2).required(),
  last_name: Joi.string().min(2).required(),
  date_of_birth: Joi.date().required(),
  gender: Joi.string().valid('M', 'F').required(),
  email: Joi.string().email().required(),
  phone: Joi.string().optional(),
  address: Joi.string().optional(),
  city: Joi.string().optional(),
  country: Joi.string().optional(),
  level: Joi.string().required(),
  class_id: Joi.string().uuid().optional(),
});

const querySchema = Joi.object({
  page: Joi.number().integer().positive().default(1),
  limit: Joi.number().integer().positive().default(10),
  level: Joi.string().optional(),
  status: Joi.string().optional(),
});

// ============================================
// GET ALL STUDENTS
// ============================================

router.get(
  '/',
  requirePermission('module01:read'),
  validateQuery(querySchema),
  async (req, res, next) => {
    try {
      const { page, limit, level, status } = req.query;
      const offset = (page - 1) * limit;

      const where = {};
      if (level) where.level = level;
      if (status) where.status = status;

      const { count, rows } = await Student.findAndCountAll({
        where,
        include: ['class', 'institution'],
        limit,
        offset,
        order: [['created_at', 'DESC']],
      });

      return res.json({
        success: true,
        data: rows,
        pagination: {
          total: count,
          page,
          limit,
          pages: Math.ceil(count / limit),
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

// ============================================
// GET STUDENT BY ID
// ============================================

router.get(
  '/:id',
  requirePermission('module01:read'),
  async (req, res, next) => {
    try {
      const student = await Student.findByPk(req.params.id, {
        include: ['class', 'institution', 'user'],
      });

      if (!student) {
        return res.status(404).json({
          success: false,
          error: {
            code: 'NOT_FOUND',
            message: 'Apprenant non trouvé',
          },
        });
      }

      return res.json({
        success: true,
        data: student,
      });
    } catch (error) {
      next(error);
    }
  }
);

// ============================================
// CREATE STUDENT
// ============================================

router.post(
  '/',
  requirePermission('module01:create'),
  validateBody(studentSchema),
  async (req, res, next) => {
    try {
      const { matricule, class_id, ...studentData } = req.body;

      // Vérifier si le matricule existe déjà
      const existingStudent = await Student.findOne({ where: { matricule } });
      if (existingStudent) {
        return res.status(409).json({
          success: false,
          error: {
            code: 'DUPLICATE_MATRICULE',
            message: 'Ce matricule existe déjà',
          },
        });
      }

      // Vérifier si la classe existe (si fournie)
      if (class_id) {
        const classExists = await Class.findByPk(class_id);
        if (!classExists) {
          return res.status(404).json({
            success: false,
            error: {
              code: 'NOT_FOUND',
              message: 'Classe non trouvée',
            },
          });
        }
      }

      // Créer l'apprenant
      const student = await Student.create({
        matricule,
        class_id,
        institution_id: req.user.institution_id || null,
        ...studentData,
      });

      logger.info(`Nouvel apprenant créé: ${matricule}`);

      return res.status(201).json({
        success: true,
        data: student,
      });
    } catch (error) {
      next(error);
    }
  }
);

// ============================================
// UPDATE STUDENT
// ============================================

router.put(
  '/:id',
  requirePermission('module01:update'),
  validateBody(studentSchema.fork(['matricule'], schema => schema.optional())),
  async (req, res, next) => {
    try {
      const student = await Student.findByPk(req.params.id);

      if (!student) {
        return res.status(404).json({
          success: false,
          error: {
            code: 'NOT_FOUND',
            message: 'Apprenant non trouvé',
          },
        });
      }

      // Mettre à jour l'apprenant
      await student.update(req.body);

      logger.info(`Apprenant mis à jour: ${student.matricule}`);

      return res.json({
        success: true,
        data: student,
      });
    } catch (error) {
      next(error);
    }
  }
);

// ============================================
// DELETE STUDENT
// ============================================

router.delete(
  '/:id',
  requirePermission('module01:delete'),
  async (req, res, next) => {
    try {
      const student = await Student.findByPk(req.params.id);

      if (!student) {
        return res.status(404).json({
          success: false,
          error: {
            code: 'NOT_FOUND',
            message: 'Apprenant non trouvé',
          },
        });
      }

      await student.destroy();

      logger.info(`Apprenant supprimé: ${student.matricule}`);

      return res.json({
        success: true,
        data: {
          message: 'Apprenant supprimé avec succès',
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

// ============================================
// GET STUDENT BY MATRICULE
// ============================================

router.get(
  '/matricule/:matricule',
  requirePermission('module01:read'),
  async (req, res, next) => {
    try {
      const student = await Student.findOne({
        where: { matricule: req.params.matricule },
        include: ['class', 'institution'],
      });

      if (!student) {
        return res.status(404).json({
          success: false,
          error: {
            code: 'NOT_FOUND',
            message: 'Apprenant non trouvé',
          },
        });
      }

      return res.json({
        success: true,
        data: student,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
