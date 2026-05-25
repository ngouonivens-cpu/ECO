/**
 * Middleware d'authentification JWT
 */

const { extractToken, verifyToken } = require('./jwt');
const logger = require('../utils/logger');

/**
 * Middleware pour vérifier le JWT
 */
const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.get('Authorization');
    const token = extractToken(authHeader);

    if (!token) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Token d\'authentification manquant',
        },
      });
    }

    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    logger.warn('Erreur d\'authentification:', error.message);
    return res.status(401).json({
      success: false,
      error: {
        code: 'UNAUTHORIZED',
        message: error.message,
      },
    });
  }
};

/**
 * Middleware optionnel - ne renvoie pas d'erreur si pas de token
 */
const optionalAuthMiddleware = (req, res, next) => {
  try {
    const authHeader = req.get('Authorization');
    const token = extractToken(authHeader);

    if (token) {
      const decoded = verifyToken(token);
      req.user = decoded;
    }
    next();
  } catch (error) {
    logger.debug('Auth optionnelle échouée:', error.message);
    next();
  }
};

module.exports = authMiddleware;
module.exports.optionalAuthMiddleware = optionalAuthMiddleware;
