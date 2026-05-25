# Architecture du Système ECO

## Vue d'ensemble

ECO est construit sur une architecture **modulaire et évolutive** basée sur Node.js/Express avec PostgreSQL comme base de données. Le système est conçu pour être facilement extensible avec de nouveaux modules.

## Architecture en Couches

```
┌─────────────────────────────────────────────────┐
│         CLIENT (Web/Mobile)                      │
└──────────────────┬──────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────┐
│     API REST (Express.js / Node.js)             │
│  ┌─────────────────────────────────────────┐   │
│  │  Routes API Publiques (Auth)            │   │
│  └─────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────┐   │
│  │  Middleware (Auth, Permissions, CORS)   │   │
│  └─────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────┐   │
│  │  Routes Modules (01-10)                 │   │
│  │  ┌──────────┬──────────┬──────────┐    │   │
│  │  │Module 01 │Module 02 │... Mod 10│    │   │
│  │  └──────────┴──────────┴──────────┘    │   │
│  └─────────────────────────────────────────┘   │
└──────────────────┬──────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────┐
│        Business Logic & Controllers             │
│  ┌──────────────────────────────────────────┐  │
│  │  Service Layer (Validation, Calculs)     │  │
│  └──────────────────────────────────────────┘  │
└──────────────────┬──────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────┐
│       Data Access Layer (Sequelize ORM)        │
│  ┌──────────────────────────────────────────┐  │
│  │  Models (User, Student, Teacher, etc)    │  │
│  └──────────────────────────────────────────┘  │
└──────────────────┬──────────���───────────────────┘
                   │
┌──────────────────▼──────────────────────────────┐
│      Database Layer (PostgreSQL)               │
│  ┌──────────────────────────────────────────┐  │
│  │  Tables & Relations                      │  │
│  └──────────────────────────────────────────┘  │
└──────────────────────────────────────────────────┘
```

## Structure des Dossiers

```
ECO/
├── src/
│   ├── core/                          # Système de base
│   │   ├── auth/                      # Authentification JWT
│   │   │   ├── jwt.js                 # Gestion des tokens
│   │   │   ├── password.js            # Hachage & validation
│   │   │   └── middleware.js          # Middleware auth
│   │   ├── permissions/               # Contrôle d'accès
│   │   │   ├── roles.js               # Définition des rôles
│   │   │   └── middleware.js          # Middleware permissions
│   │   ├── database/                  # Configuration BD
│   │   │   └── connection.js          # Connexion Sequelize
│   │   ├── models/                    # Modèles de données
│   │   │   ├── User.js
│   │   │   ├── Student.js
│   │   │   ├── Teacher.js
│   │   │   ├── Grade.js
│   │   │   ├── Attendance.js
│   │   │   ├── Payment.js
│   │   │   ├── License.js
│   │   │   └── ...
│   │   ├── middleware/                # Middlewares globaux
│   │   │   └── errorHandler.js
│   │   └── utils/                     # Utilitaires
│   │       ├── logger.js              # Logging Winston
│   │       └── validation.js          # Validation Joi
│   ├── api/
│   │   └── routes/
│   │       └── auth.routes.js         # Routes authentification
│   ├── modules/                       # 10 modules métier
│   │   ├── 01-gestion-apprenants/
│   │   │   ├── routes.js
│   │   │   ├── controller.js
│   │   │   └── index.js
│   │   ├── 02-gestion-pedagogique/
│   │   ├── 03-examens-certifications/
│   │   └── ... (modules 04-10)
│   └── app.js                         # App Express
├── tests/                             # Tests
├── docs/                              # Documentation
│   ├── README.md
│   ├── ARCHITECTURE.md
│   ├── MODULES.md
│   ├── API.md
│   └── PERMISSIONS.md
├── config/                            # Configuration
├── scripts/                           # Scripts utilitaires
├── package.json
├── .env.example
├── server.js                          # Point d'entrée
└── .gitignore
```

## Flux de Requête

```
1. Requête Client HTTP
   ↓
2. Express Server (server.js)
   ↓
3. Middleware Global (CORS, Helmet, etc)
   ↓
4. Authentication Middleware (JWT)
   ↓
5. Permission Middleware (RBAC)
   ↓
6. Route Handler / Controller
   ↓
7. Business Logic / Validation
   ↓
8. Sequelize ORM (Models)
   ↓
9. PostgreSQL Database
   ↓
10. Response JSON
```

## Sécurité

### 1. Authentification
- **JWT (JSON Web Tokens)** pour les sessions sans état
- **Bcrypt** pour le hachage des mots de passe
- Expiration des tokens configurable
- Refresh token support

### 2. Autorisation
- **RBAC (Role-Based Access Control)**
- Permissions granulaires par module
- Middleware de vérification des permissions

### 3. Protection
- **Helmet.js** pour les en-têtes de sécurité
- **CORS** configuré et restreint
- **Rate limiting** pour prévenir les abus
- **Validation des entrées** avec Joi
- **SQL Injection** prévenue par Sequelize ORM

### 4. Audit
- Logging de toutes les actions sensibles
- Winston pour la gestion des logs

## Gestion des Erreurs

```javascript
// Erreur structurée
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Erreur de validation",
    "details": { /* détails */ }
  }
}
```

Les codes d'erreur standardisés :
- `VALIDATION_ERROR` (400)
- `UNAUTHORIZED` (401)
- `FORBIDDEN` (403)
- `NOT_FOUND` (404)
- `CONFLICT` (409)
- `INTERNAL_SERVER_ERROR` (500)

## Patterns et Conventions

### Nommage
- Fichiers : `camelCase.js`
- Fonctions : `camelCase()`
- Classes/Models : `PascalCase`
- Constantes : `SCREAMING_SNAKE_CASE`
- Routes : `kebab-case`

### Structure d'une Route
```javascript
router.post('/endpoint', 
  authMiddleware,           // Authentication
  requirePermission(...),   // Authorization
  validateBody(schema),     // Validation
  async (req, res, next) => {  // Handler
    try {
      // Logique
      res.json({ success: true, data: ... });
    } catch (error) {
      next(error);
    }
  }
);
```

### Réponse Standardisée
```javascript
{
  "success": true,
  "data": { /* données */ },
  "pagination": {  // optionnel
    "total": 100,
    "page": 1,
    "limit": 10,
    "pages": 10
  }
}
```

## Performance

- **Connection Pooling** : Min 2, Max 10 connexions DB
- **Eager Loading** : Include pour éviter N+1 queries
- **Pagination** : Limitée à 100 par défaut
- **Caching** : À implémenter avec Redis
- **Indexation** : Sur les clés étrangères et recherches fréquentes

## Scalabilité

- Architecture stateless (pas de session serveur)
- Facilement déployable en cluster
- Séparation des concerns (modules indépendants)
- API RESTful découplée du frontend
- Base de données relationnelle bien normalisée

## Monitoring & Logging

- **Winston** : Logs à la fois en fichier et console
- Niveaux : debug, info, warn, error
- Fichiers séparés pour erreurs et logs combinés
- Timezone configurable (défaut : Africa/Douala)

## Technologies Utilisées

| Couche | Technologie | Raison |
|--------|-------------|--------|
| Runtime | Node.js 16+ | Performance, JavaScript |
| Framework | Express 4 | Léger, populaire, modulaire |
| DB | PostgreSQL 13+ | Robuste, relationnelle |
| ORM | Sequelize 6 | Migrations, relations faciles |
| Auth | JWT + Bcrypt | Sans état, sécurisé |
| Validation | Joi | Schémas déclaratifs |
| Logging | Winston 3 | Multiple transports |
| Sécurité | Helmet, CORS | En-têtes, protection |

---

**Version** : 1.0.0
**Dernière mise à jour** : 2026-05-25
