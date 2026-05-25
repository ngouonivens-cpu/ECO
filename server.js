/**
 * ECO - Système de Gestion Scolaire
 * Point d'entrée principal de l'application
 */

require('dotenv').config();
require('express-async-errors');

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const winston = require('winston');

// Import des modules locaux
const authMiddleware = require('./src/core/auth/middleware');
const permissionMiddleware = require('./src/core/permissions/middleware');
const errorHandler = require('./src/core/middleware/errorHandler');
const logger = require('./src/core/utils/logger');
const { sequelize } = require('./src/core/database/connection');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// ============================================
// MIDDLEWARE GLOBAL
// ============================================

// Security headers
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: (process.env.CORS_ORIGIN || 'http://localhost:3000').split(','),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.API_RATE_LIMIT || 100,
  message: 'Trop de requêtes, réessayez plus tard',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`, {
    ip: req.ip,
    userAgent: req.get('user-agent')
  });
  next();
});

// ============================================
// HEALTH CHECK ROUTE
// ============================================

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.APP_VERSION || '1.0.0'
  });
});

// ============================================
// API ROUTES
// ============================================

// Authentication routes (public)
app.use('/api/auth', require('./src/api/routes/auth.routes'));

// Protected routes (require authentication)
app.use('/api/', authMiddleware);

// Module routes (with permission checks)
app.use('/api/module01', require('./src/modules/01-gestion-apprenants/routes'));
app.use('/api/module02', require('./src/modules/02-gestion-pedagogique/routes'));
app.use('/api/module03', require('./src/modules/03-examens-certifications/routes'));
app.use('/api/module04', require('./src/modules/04-presences/routes'));
app.use('/api/module05', require('./src/modules/05-gestion-financiere/routes'));
app.use('/api/module06', require('./src/modules/06-ressources-humaines/routes'));
app.use('/api/module07', require('./src/modules/07-communication/routes'));
app.use('/api/module08', require('./src/modules/08-systeme-licence/routes'));
app.use('/api/module09', require('./src/modules/09-programmes-contenus/routes'));
app.use('/api/module10', require('./src/modules/10-gestion-documentaire/routes'));

// ============================================
// 404 HANDLER
// ============================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: `Route ${req.path} non trouvée`
    }
  });
});

// ============================================
// ERROR HANDLER (Must be last)
// ============================================

app.use(errorHandler);

// ============================================
// DATABASE & SERVER START
// ============================================

async function startServer() {
  try {
    // Test database connection
    await sequelize.authenticate();
    logger.info('✓ Connexion à la base de données réussie');

    // Sync database (in development mode only)
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: false });
      logger.info('✓ Modèles synchronisés avec la base de données');
    }

    // Start server
    app.listen(PORT, () => {
      logger.info(`
╔════════════════════════════════════════════════╗
║        ECO - Système de Gestion Scolaire       ║
║                                                ║
║  Serveur démarré avec succès!                 ║
║  URL : http://localhost:${PORT}                     
║  Env : ${process.env.NODE_ENV || 'development'}                      
║  Version : ${process.env.APP_VERSION || '1.0.0'}                   
╚════════════════════════════════════════════════╝
      `);
    });

  } catch (error) {
    logger.error('Erreur au démarrage du serveur:', error);
    process.exit(1);
  }
}

// ============================================
// GRACEFUL SHUTDOWN
// ============================================

process.on('SIGINT', async () => {
  logger.info('Signal SIGINT reçu. Arrêt gracieux en cours...');
  try {
    await sequelize.close();
    logger.info('✓ Connexion à la base de données fermée');
    process.exit(0);
  } catch (error) {
    logger.error('Erreur lors de l\'arrêt:', error);
    process.exit(1);
  }
});

process.on('SIGTERM', async () => {
  logger.info('Signal SIGTERM reçu. Arrêt gracieux en cours...');
  try {
    await sequelize.close();
    logger.info('✓ Connexion à la base de données fermée');
    process.exit(0);
  } catch (error) {
    logger.error('Erreur lors de l\'arrêt:', error);
    process.exit(1);
  }
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Exception non capturée:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Promise rejection non gérée:', reason);
  process.exit(1);
});

// ============================================
// START SERVER
// ============================================

startServer();

module.exports = app;
