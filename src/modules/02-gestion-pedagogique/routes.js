/**
 * Routes par défaut pour les modules (stub)
 * Les modules actifs seront implémentés progressivement
 */

const express = require('express');
const router = express.Router();
const { requireRole } = require('../../core/permissions/middleware');

// Module 02 - Gestion pédagogique (stub)
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Module 02 - Gestion Pédagogique (à venir)',
    status: 'coming_soon',
  });
});

module.exports = router;
