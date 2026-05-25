/**
 * Routes d'authentification
 */

const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { generateToken } = require('../../core/auth/jwt');
const { hashPassword, comparePassword } = require('../../core/auth/password');
const { validateBody } = require('../../core/utils/validation');
const logger = require('../../core/utils/logger');
const { User } = require('../../core/models');

// ============================================
// VALIDATION SCHEMAS
// ============================================

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Email invalide',
    'any.required': 'Email requis',
  }),
  password: Joi.string().required().messages({
    'any.required': 'Mot de passe requis',
  }),
});

const registerSchema = Joi.object({
  first_name: Joi.string().min(2).required(),
  last_name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string()
    .valid('student', 'parent', 'teacher', 'admin')
    .default('student'),
});

// ============================================
// LOGIN
// ============================================

router.post('/login', validateBody(loginSchema), async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Chercher l'utilisateur
    const user = await User.findOne({ where: { email } });

    if (!user) {
      logger.warn(`Tentative de connexion avec email inexistant: ${email}`);
      return res.status(401).json({
        success: false,
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Email ou mot de passe incorrect',
        },
      });
    }

    // Vérifier si l'utilisateur est actif
    if (!user.is_active) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'ACCOUNT_DISABLED',
          message: 'Ce compte est désactivé',
        },
      });
    }

    // Vérifier le mot de passe
    const isPasswordValid = await user.validatePassword(password);

    if (!isPasswordValid) {
      // Incrémenter les tentatives échouées
      user.login_attempts = (user.login_attempts || 0) + 1;

      // Verrouiller le compte après 5 tentatives
      if (user.login_attempts >= 5) {
        user.locked_until = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes
        await user.save();
        return res.status(401).json({
          success: false,
          error: {
            code: 'ACCOUNT_LOCKED',
            message: 'Compte verrouillé suite à trop de tentatives. Réessayez dans 30 minutes.',
          },
        });
      }

      await user.save();
      logger.warn(`Tentative de connexion échouée pour: ${email}`);
      return res.status(401).json({
        success: false,
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Email ou mot de passe incorrect',
        },
      });
    }

    // Vérifier si le compte est verrouillé
    if (user.locked_until && new Date() < user.locked_until) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'ACCOUNT_LOCKED',
          message: 'Compte verrouillé suite à trop de tentiples. Réessayez plus tard.',
        },
      });
    }

    // Réinitialiser les tentatives échouées
    user.login_attempts = 0;
    user.locked_until = null;
    user.last_login = new Date();
    await user.save();

    // Générer le token
    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
      first_name: user.first_name,
      last_name: user.last_name,
    });

    logger.info(`Connexion réussie: ${email}`);

    return res.json({
      success: true,
      data: {
        user: user.toJSON(),
        token,
      },
    });
  } catch (error) {
    next(error);
  }
});

// ============================================
// REGISTER
// ============================================

router.post('/register', validateBody(registerSchema), async (req, res, next) => {
  try {
    const { first_name, last_name, email, password, role } = req.body;

    // Vérifier si l'email existe déjà
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: {
          code: 'EMAIL_ALREADY_EXISTS',
          message: 'Cet email est déjà utilisé',
        },
      });
    }

    // Créer l'utilisateur
    const user = await User.create({
      first_name,
      last_name,
      email,
      password,
      role,
      is_verified: false,
    });

    // Générer le token
    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
      first_name: user.first_name,
      last_name: user.last_name,
    });

    logger.info(`Nouvelle inscription: ${email}`);

    return res.status(201).json({
      success: true,
      data: {
        user: user.toJSON(),
        token,
        message: 'Inscript ion réussie. Veuillez vérifier votre email.',
      },
    });
  } catch (error) {
    next(error);
  }
});

// ============================================
// REFRESH TOKEN
// ============================================

router.post('/refresh', async (req, res, next) => {
  try {
    const user = req.user; // Nécessite authMiddleware

    if (!user) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Authentification requise',
        },
      });
    }

    // Générer un nouveau token
    const newToken = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
      first_name: user.first_name,
      last_name: user.last_name,
    });

    return res.json({
      success: true,
      data: {
        token: newToken,
      },
    });
  } catch (error) {
    next(error);
  }
});

// ============================================
// CHANGE PASSWORD
// ============================================

const changePasswordSchema = Joi.object({
  old_password: Joi.string().required(),
  new_password: Joi.string().min(6).required(),
  confirm_password: Joi.string().valid(Joi.ref('new_password')).required(),
});

router.post('/change-password', validateBody(changePasswordSchema), async (req, res, next) => {
  try {
    const user = req.user;
    const { old_password, new_password } = req.body;

    if (!user) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Authentification requise',
        },
      });
    }

    // Récupérer l'utilisateur complet
    const dbUser = await User.findByPk(user.id);

    if (!dbUser) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Utilisateur non trouvé',
        },
      });
    }

    // Vérifier l'ancien mot de passe
    const isOldPasswordValid = await dbUser.validatePassword(old_password);

    if (!isOldPasswordValid) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'INVALID_PASSWORD',
          message: 'Ancien mot de passe incorrect',
        },
      });
    }

    // Mettre à jour le mot de passe
    dbUser.password = new_password;
    await dbUser.save();

    logger.info(`Mot de passe changé pour: ${user.email}`);

    return res.json({
      success: true,
      data: {
        message: 'Mot de passe changé avec succès',
      },
    });
  } catch (error) {
    next(error);
  }
});

// ============================================
// LOGOUT (Client-side)
// ============================================

router.post('/logout', (req, res) => {
  // Logout est géré côté client (supprimer le token)
  return res.json({
    success: true,
    data: {
      message: 'Déconnexion réussie',
    },
  });
});

module.exports = router;
