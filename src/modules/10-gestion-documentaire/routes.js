/**
 * Routes par défaut pour les modules (stub)
 */

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Module 10 - Gestion Documentaire (à venir)',
    status: 'coming_soon',
  });
});

module.exports = router;
