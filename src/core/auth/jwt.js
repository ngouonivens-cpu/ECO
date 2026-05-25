/**
 * Gestion des JWT (JSON Web Tokens)
 */

const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

/**
 * Générer un JWT
 * @param {Object} payload - Données à encoder
 * @param {String} expiresIn - Durée d'expiration
 * @returns {String} Token JWT
 */
const generateToken = (payload, expiresIn = JWT_EXPIRES_IN) => {
  try {
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn });
    return token;
  } catch (error) {
    logger.error('Erreur lors de la génération du token:', error);
    throw new Error('Impossible de générer le token');
  }
};

/**
 * Vérifier et décoder un JWT
 * @param {String} token - Token à vérifier
 * @returns {Object} Payload décodé
 */
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error('Token expiré');
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error('Token invalide');
    }
    throw error;
  }
};

/**
 * Décoder un JWT sans vérifier (pour récupérer les données)
 * @param {String} token - Token à décoder
 * @returns {Object} Payload décodé
 */
const decodeToken = (token) => {
  try {
    return jwt.decode(token);
  } catch (error) {
    return null;
  }
};

/**
 * Extraire le token de l'en-tête Authorization
 * @param {String} authHeader - En-tête Authorization
 * @returns {String|null} Token ou null
 */
const extractToken = (authHeader) => {
  if (!authHeader) return null;
  
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0].toLowerCase() !== 'bearer') {
    return null;
  }
  
  return parts[1];
};

module.exports = {
  generateToken,
  verifyToken,
  decodeToken,
  extractToken,
  JWT_SECRET,
  JWT_EXPIRES_IN,
};
