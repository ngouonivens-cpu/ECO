/**
 * Configuration de la connexion à la base de données
 * Utilise Sequelize ORM avec PostgreSQL
 */

const { Sequelize } = require('sequelize');
const logger = require('../utils/logger');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'eco_school',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || 'postgres',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: process.env.DB_DIALECT || 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: parseInt(process.env.DB_POOL_MAX) || 10,
      min: parseInt(process.env.DB_POOL_MIN) || 2,
      acquire: 30000,
      idle: 10000,
    },
    define: {
      timestamps: true,
      underscored: true,
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci',
    },
    timezone: process.env.TIMEZONE || 'Africa/Douala',
  }
);

// Test connection
sequelize.authenticate()
  .then(() => {
    logger.info('✓ Connexion à la base de données établie avec succès');
  })
  .catch(err => {
    logger.error('✗ Erreur de connexion à la base de données:', err);
  });

module.exports = { sequelize, Sequelize };
