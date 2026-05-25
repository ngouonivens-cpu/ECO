/**
 * Utilitaires de validation
 */

const Joi = require('joi');

/**
 * Schémas de validation réutilisables
 */
const schemas = {
  email: Joi.string()
    .email()
    .required()
    .messages({ 'string.email': 'Email invalide' }),

  password: Joi.string()
    .min(6)
    .required()
    .messages({ 'string.min': 'Le mot de passe doit contenir au moins 6 caractères' }),

  strongPassword: Joi.string()
    .min(8)
    .pattern(/[A-Z]/, 'uppercase')
    .pattern(/[a-z]/, 'lowercase')
    .pattern(/[0-9]/, 'number')
    .required()
    .messages({
      'string.min': 'Le mot de passe doit contenir au moins 8 caractères',
      'string.pattern.uppercase': 'Le mot de passe doit contenir au moins une majuscule',
      'string.pattern.lowercase': 'Le mot de passe doit contenir au moins une minuscule',
      'string.pattern.number': 'Le mot de passe doit contenir au moins un chiffre',
    }),

  phone: Joi.string()
    .pattern(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/)
    .messages({ 'string.pattern.base': 'Numéro de téléphone invalide' }),

  date: Joi.date().iso(),

  uuid: Joi.string().guid({ version: 'uuidv4' }),

  id: Joi.number().integer().positive(),

  name: Joi.string().min(2).max(100),

  url: Joi.string().uri(),
};

/**
 * Valider des données avec Joi
 * @param {Object} data - Données à valider
 * @param {Object} schema - Schéma Joi
 * @returns {Object} { value, error }
 */
const validate = (data, schema) => {
  const { value, error } = schema.validate(data, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    const errors = {};
    error.details.forEach(detail => {
      errors[detail.path.join('.')] = detail.message;
    });
    return { value, error: errors };
  }

  return { value, error: null };
};

/**
 * Middleware pour valider le body d'une requête
 * @param {Object} schema - Schéma Joi
 * @returns {Function} Middleware
 */
const validateBody = (schema) => {
  return (req, res, next) => {
    const { value, error } = validate(req.body, schema);

    if (error) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Erreur de validation',
          details: error,
        },
      });
    }

    req.body = value;
    next();
  };
};

/**
 * Middleware pour valider les paramètres de requête
 * @param {Object} schema - Schéma Joi
 * @returns {Function} Middleware
 */
const validateQuery = (schema) => {
  return (req, res, next) => {
    const { value, error } = validate(req.query, schema);

    if (error) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Erreur de validation',
          details: error,
        },
      });
    }

    req.query = value;
    next();
  };
};

module.exports = {
  schemas,
  validate,
  validateBody,
  validateQuery,
  Joi,
};
