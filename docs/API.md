# API REST Documentation

## Base URL

```
http://localhost:3000/api
```

## Authentication

Tous les endpoints (sauf `/auth/*`) nécessitent un token JWT dans l'en-tête :

```
Authorization: Bearer <token>
```

## Response Format

### Succès (2xx)
```json
{
  "success": true,
  "data": { /* données */ },
  "pagination": { /* optionnel */ }
}
```

### Erreur (4xx, 5xx)
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Description de l'erreur",
    "details": { /* optionnel */ }
  }
}
```

## Endpoints Authentification

### POST /auth/register

Inscrire un nouvel utilisateur

**Request :**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "Jean",
    "last_name": "Dupont",
    "email": "jean@example.com",
    "password": "Password123",
    "role": "student"
  }'
```

**Response (201) :**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "first_name": "Jean",
      "last_name": "Dupont",
      "email": "jean@example.com",
      "role": "student",
      "is_active": true,
      "is_verified": false
    },
    "token": "eyJhbGc...",
    "message": "Inscription réussie..."
  }
}
```

### POST /auth/login

Connexion utilisateur

**Request :**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jean@example.com",
    "password": "Password123"
  }'
```

**Response (200) :**
```json
{
  "success": true,
  "data": {
    "user": { /* user object */ },
    "token": "eyJhbGc..."
  }
}
```

### POST /auth/refresh

Renouveler le token

**Request :**
```bash
curl -X POST http://localhost:3000/api/auth/refresh \
  -H "Authorization: Bearer <token>"
```

**Response (200) :**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGc..."
  }
}
```

### POST /auth/change-password

Changer le mot de passe

**Request :**
```bash
curl -X POST http://localhost:3000/api/auth/change-password \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "old_password": "Password123",
    "new_password": "NewPassword456",
    "confirm_password": "NewPassword456"
  }'
```

## Module 01 - Gestion des Apprenants

### GET /module01

Obtenir la liste des apprenants

**Query Parameters :**
- `page` (number) : Page (défaut: 1)
- `limit` (number) : Nombre par page (défaut: 10)
- `level` (string) : Filtrer par niveau
- `status` (string) : Filtrer par statut

**Request :**
```bash
curl http://localhost:3000/api/module01?page=1&limit=10 \
  -H "Authorization: Bearer <token>"
```

**Response (200) :**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "matricule": "STU-2024-001",
      "first_name": "Marie",
      "last_name": "Martin",
      "date_of_birth": "2008-05-15",
      "gender": "F",
      "level": "6e",
      "status": "active",
      "enrollment_date": "2024-09-01"
    }
  ],
  "pagination": {
    "total": 150,
    "page": 1,
    "limit": 10,
    "pages": 15
  }
}
```

### POST /module01

Créer un nouvel apprenant

**Request :**
```bash
curl -X POST http://localhost:3000/api/module01 \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "matricule": "STU-2024-001",
    "first_name": "Marie",
    "last_name": "Martin",
    "date_of_birth": "2008-05-15",
    "gender": "F",
    "email": "marie@example.com",
    "level": "6e"
  }'
```

**Response (201) :**
```json
{
  "success": true,
  "data": { /* objet apprenant créé */ }
}
```

### GET /module01/:id

Obtenir un apprenant par ID

**Request :**
```bash
curl http://localhost:3000/api/module01/uuid \
  -H "Authorization: Bearer <token>"
```

### PUT /module01/:id

Mettre à jour un apprenant

**Request :**
```bash
curl -X PUT http://localhost:3000/api/module01/uuid \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newemail@example.com",
    "status": "suspended"
  }'
```

### DELETE /module01/:id

Supprimer un apprenant

**Request :**
```bash
curl -X DELETE http://localhost:3000/api/module01/uuid \
  -H "Authorization: Bearer <token>"
```

### GET /module01/matricule/:matricule

Obtenir un apprenant par matricule

**Request :**
```bash
curl http://localhost:3000/api/module01/matricule/STU-2024-001 \
  -H "Authorization: Bearer <token>"
```

## Codes d'Erreur

| Code | HTTP | Description |
|------|------|-------------|
| VALIDATION_ERROR | 400 | Erreur de validation |
| UNAUTHORIZED | 401 | Authentification requise ou invalide |
| FORBIDDEN | 403 | Permission insuffisante |
| NOT_FOUND | 404 | Ressource non trouvée |
| CONFLICT | 409 | Ressource déjà existe (unicité) |
| INTERNAL_SERVER_ERROR | 500 | Erreur serveur |

## Rate Limiting

Le système applique un rate limit de 100 requêtes par 15 minutes par IP.

En-têtes de réponse :
```
RateLimit-Limit: 100
RateLimit-Remaining: 95
RateLimit-Reset: 1641234567
```

## Pagination

La pagination utilise `page` et `limit` :

```bash
# Page 2, 20 résultats par page
?page=2&limit=20
```

Réponse :
```json
{
  "pagination": {
    "total": 500,
    "page": 2,
    "limit": 20,
    "pages": 25
  }
}
```

## Filtrage

Chaque endpoint supporte le filtrage selon ses paramètres :

```bash
# Filtrer par niveau
/module01?level=6e

# Filtrer par statut
/module01?status=active

# Combiner
/module01?level=6e&status=active&page=1&limit=20
```

## Tri

Le tri par défaut est par date de création décroissante.

## Timestamps

Tous les timestamps sont en ISO 8601 format :
```
2026-05-25T10:30:00.000Z
```

---

**Pour la documentation complète des 10 modules, voir MODULES.md**
