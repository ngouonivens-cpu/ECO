/**
 * Middleware global de gestion des erreurs
 */

const logger = require('../utils/logger');

/**
 * Middleware de gestion des erreurs
 */
const errorHandler = (err, req, res, next) => {
  logger.error('Erreur:', {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  // Erreur de validation
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: err.message,
        details: err.details || null,
      },
    });
  }

  // Erreur Sequelize
  if (err.name === 'SequelizeError' || err.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({
      success: false,
      error: {
        code: 'CONFLICT',
        message: 'Cette ressource existe déjà',
        details: err.errors ? err.errors.map(e => e.message) : null,
      },
    });
  }

  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Erreur de validation',
        details: err.errors ? err.errors.map(e => e.message) : null,
      },
    });
  }

  // Erreur d'authentification
  if (err.code === 'UNAUTHORIZED') {
    return res.status(401).json({
      success: false,
      error: {
        code: 'UNAUTHORIZED',
        message: err.message || 'Authentification requise',
      },
    });
  }

  // Erreur d'autorisation
  if (err.code === 'FORBIDDEN') {
    return res.status(403).json({
      success: false,
      error: {
        code: 'FORBIDDEN',
        message: err.message || 'Vous n\'avez pas accès à cette ressource',
      },
    });
  }

  // Not Found
  if (err.statusCode === 404 || err.code === 'NOT_FOUND') {
    return res.status(404).json({
      success: false,
      error: {
        code: 'NOT_FOUND',
        message: err.message || 'Ressource non trouvée',
      },
    });
  }

  // Erreur par défaut
  return res.status(err.statusCode || 500).json({
    success: false,
    error: {
      code: err.code || 'INTERNAL_SERVER_ERROR',
      message: process.env.NODE_ENV === 'production' 
        ? 'Une erreur serveur s\'est produite' 
        : err.message,
      ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
    },
  });
};

module.exports = errorHandler;
