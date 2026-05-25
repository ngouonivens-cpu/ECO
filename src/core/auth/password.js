/**
 * Gestion des mots de passe avec bcrypt
 */

const bcrypt = require('bcryptjs');
const logger = require('../utils/logger');

const BCRYPT_ROUNDS = parseInt(process.env.BCRYPT_ROUNDS) || 10;

/**
 * Hasher un mot de passe
 * @param {String} password - Mot de passe en clair
 * @returns {Promise<String>} Mot de passe hashé
 */
const hashPassword = async (password) => {
  try {
    if (!password || password.length < 6) {
      throw new Error('Le mot de passe doit contenir au moins 6 caractères');
    }
    const salt = await bcrypt.genSalt(BCRYPT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    logger.error('Erreur lors du hachage du mot de passe:', error);
    throw error;
  }
};

/**
 * Comparer un mot de passe en clair avec un hash
 * @param {String} password - Mot de passe en clair
 * @param {String} hash - Hash du mot de passe
 * @returns {Promise<Boolean>} true si les mots de passe correspondent
 */
const comparePassword = async (password, hash) => {
  try {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  } catch (error) {
    logger.error('Erreur lors de la comparaison des mots de passe:', error);
    return false;
  }
};

/**
 * Générer un mot de passe aléatoire
 * @param {Number} length - Longueur du mot de passe
 * @returns {String} Mot de passe aléatoire
 */
const generateRandomPassword = (length = 12) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

/**
 * Valider la force d'un mot de passe
 * @param {String} password - Mot de passe à valider
 * @returns {Object} { isValid: boolean, errors: string[] }
 */
const validatePasswordStrength = (password) => {
  const errors = [];
  
  if (!password || password.length < 6) {
    errors.push('Minimum 6 caractères');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Au moins une lettre majuscule');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Au moins une lettre minuscule');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Au moins un chiffre');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

module.exports = {
  hashPassword,
  comparePassword,
  generateRandomPassword,
  validatePasswordStrength,
  BCRYPT_ROUNDS,
};
