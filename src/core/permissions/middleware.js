/**
 * Middleware pour la vérification des permissions
 */

const { hasPermission } = require('./roles');
const logger = require('../utils/logger');

/**
 * Middleware pour vérifier si l'utilisateur a une permission spécifique
 * @param {String} permission - Permission requise
 * @returns {Function} Middleware
 */
const requirePermission = (permission) => {
  return (req, res, next) => {
    try {
      const user = req.user;

      if (!user) {
        return res.status(401).json({
          success: false,
          error: {
            code: 'UNAUTHORIZED',
            message: 'Authentification requise',
          },
        });
      }

      if (!hasPermission(user.role, permission)) {
        logger.warn(`Accès refusé: ${user.email} (${user.role}) à ${permission}`);
        return res.status(403).json({
          success: false,
          error: {
            code: 'FORBIDDEN',
            message: 'Vous n\'avez pas les permissions nécessaires pour accéder à cette ressource',
          },
        });
      }

      next();
    } catch (error) {
      logger.error('Erreur de vérification des permissions:', error);
      return res.status(500).json({
        success: false,
        error: {
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Erreur serveur',
        },
      });
    }
  };
};

/**
 * Middleware pour vérifier si l'utilisateur a l'un des rôles spécifiés
 * @param {String|Array} roles - Rôle(s) requis
 * @returns {Function} Middleware
 */
const requireRole = (roles) => {
  const rolesArray = Array.isArray(roles) ? roles : [roles];

  return (req, res, next) => {
    try {
      const user = req.user;

      if (!user) {
        return res.status(401).json({
          success: false,
          error: {
            code: 'UNAUTHORIZED',
            message: 'Authentification requise',
          },
        });
      }

      if (!rolesArray.includes(user.role)) {
        logger.warn(`Accès refusé: ${user.email} (${user.role}) à ${rolesArray.join(', ')}`);
        return res.status(403).json({
          success: false,
          error: {
            code: 'FORBIDDEN',
            message: 'Rôle insuffisant pour accéder à cette ressource',
          },
        });
      }

      next();
    } catch (error) {
      logger.error('Erreur de vérification du rôle:', error);
      return res.status(500).json({
        success: false,
        error: {
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Erreur serveur',
        },
      });
    }
  };
};

module.exports = {
  requirePermission,
  requireRole,
};
