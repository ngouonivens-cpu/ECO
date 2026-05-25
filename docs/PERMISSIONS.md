# Système de Permissions ECO

## Vue d'ensemble

ECO utilise un système **RBAC (Role-Based Access Control)** pour gérer les permissions. Chaque utilisateur a un rôle qui détermine ses permissions.

## Rôles Disponibles

```javascript
{
  'super_admin': 'Super Administrateur',
  'admin': 'Administrateur',
  'direction': 'Direction',
  'direction_rh': 'Direction RH',
  'censeur': 'Censeur/Inspecteur',
  'doyen': 'Doyen',
  'comptable': 'Comptable',
  'scolarite': 'Service Scolarité',
  'secretariat': 'Secrétariat',
  'enseignant': 'Enseignant',
  'surveillant': 'Surveillant',
  'parent': 'Parent',
  'etudiant': 'Étudiant'
}
```

## Matrice des Permissions

### Module 01 - Gestion des Apprenants

| Permission | Super Admin | Direction | Scolarité | Secrétariat | Enseignant | Parent | Étudiant |
|------------|:-----------:|:---------:|:---------:|:-----------:|:----------:|:------:|:--------:|
| Create | ✅ | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Read | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Update | ✅ | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Delete | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |

### Module 02 - Gestion Pédagogique

| Permission | Super Admin | Direction | Censeur | Doyen | Enseignant | Parent | Étudiant |
|------------|:-----------:|:---------:|:-------:|:-----:|:----------:|:------:|:--------:|
| Create | ✅ | ❌ | ✅ | ✅ | ✅ | ❌ | ❌ |
| Read | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Update | ✅ | ❌ | ✅ | ✅ | ✅ | ❌ | ❌ |
| Delete | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |

### Module 03 - Examens & Certifications

| Permission | Super Admin | Direction | Censeur | Comptable | Parent | Étudiant |
|------------|:-----------:|:---------:|:-------:|:---------:|:------:|:--------:|
| Create | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Read | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ |
| Update | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Delete | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |

### Module 04 - Présences

| Permission | Super Admin | Surveillant | Enseignant | Parent | Étudiant |
|------------|:-----------:|:-----------:|:----------:|:------:|:--------:|
| Create | ✅ | ✅ | ✅ | ❌ | ❌ |
| Read | ✅ | ✅ | ✅ | ✅ | ❌ |
| Update | ✅ | ✅ | ✅ | ❌ | ❌ |
| Delete | ✅ | ❌ | ❌ | ❌ | ❌ |

### Module 05 - Gestion Financière

| Permission | Super Admin | Direction | Comptable | Parent | Étudiant |
|------------|:-----------:|:---------:|:---------:|:------:|:--------:|
| Create | ✅ | ❌ | ✅ | ❌ | ❌ |
| Read | ✅ | ✅ | ✅ | ✅ | ❌ |
| Update | ✅ | ❌ | ✅ | ❌ | ❌ |
| Delete | ✅ | ❌ | ✅ | ❌ | ❌ |

### Module 06 - Ressources Humaines

| Permission | Super Admin | Direction | Direction RH | Autres |
|------------|:-----------:|:---------:|:------------:|:------:|
| Create | ✅ | ❌ | ✅ | ❌ |
| Read | ✅ | ✅ | ✅ | ❌ |
| Update | ✅ | ❌ | ✅ | ❌ |
| Delete | ✅ | ❌ | ✅ | ❌ |

### Module 07 - Communication

| Permission | Super Admin | Direction | Enseignant | Parent | Étudiant |
|------------|:-----------:|:---------:|:----------:|:------:|:--------:|
| Create | ✅ | ✅ | ✅ | ❌ | ❌ |
| Read | ✅ | ✅ | ✅ | ✅ | ✅ |
| Update | ✅ | ✅ | ❌ | ❌ | ❌ |
| Delete | ✅ | ✅ | ❌ | ❌ | ❌ |

### Module 08 - Système de Licence

| Permission | Super Admin | Direction | Autres |
|------------|:-----------:|:---------:|:------:|
| Manage | ✅ | ❌ | ❌ |
| View | ✅ | ✅ | ❌ |

### Module 09 - Programmes & Contenus

| Permission | Super Admin | Direction | Censeur | Enseignant | Parent | Étudiant |
|------------|:-----------:|:---------:|:-------:|:----------:|:------:|:--------:|
| Create | ✅ | ❌ | ✅ | ✅ | ❌ | ❌ |
| Read | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| Update | ✅ | ❌ | ✅ | ✅ | ❌ | ❌ |
| Delete | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ |

### Module 10 - Gestion Documentaire

| Permission | Super Admin | Direction | Scolarité | Secrétariat | Enseignant | Parent | Étudiant |
|------------|:-----------:|:---------:|:---------:|:-----------:|:----------:|:------:|:--------:|
| Upload | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| Read | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| Delete | ✅ | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ |

## Utilisation dans le Code

### Vérifier une permission

```javascript
const { requirePermission } = require('./core/permissions/middleware');

router.post('/students',
  requirePermission('module01:create'),
  (req, res) => {
    // Créer un apprenant
  }
);
```

### Vérifier un rôle

```javascript
const { requireRole } = require('./core/permissions/middleware');

router.get('/admin/dashboard',
  requireRole(['super_admin', 'direction']),
  (req, res) => {
    // Afficher le tableau de bord
  }
);
```

### Vérifier programmatiquement

```javascript
const { userHasPermission } = require('./core/permissions/roles');

if (userHasPermission(req.user, 'module01:delete')) {
  // Permettre la suppression
}
```

## Hiérarchie des Rôles

```
┌─ Super Admin (accès total)
│
├─ Admin
│  └─ Direction
│     ├─ Direction RH
│     ├─ Censeur
│     └─ Doyen
│
├─ Équipe Scolaire
│  ├─ Scolarité
│  ├─ Secrétariat
│  ├─ Comptable
│  ├─ Surveillant
│  └─ Enseignant
│
└─ Utilisateurs
   ├─ Parent
   └─ Étudiant
```

## Assignation de Rôles

### Via la Base de Données

```sql
UPDATE users 
SET role = 'enseignant' 
WHERE id = 'user-uuid';
```

### Via l'API (à implémenter)

```bash
POST /api/admin/users/:id/role
{
  "role": "enseignant"
}
```

## Audit des Permissions

Tous les accès refusés sont loggés :

```
[WARN] Accès refusé: user@example.com (parent) à module01:delete
```

## Gestion des Permissions Personnalisées

Pour ajouter une nouvelle permission :

1. Ajouter dans `src/core/permissions/roles.js` :
```javascript
'module11:custom': [ROLES.SUPER_ADMIN, ROLES.DIRECTION]
```

2. Utiliser dans une route :
```javascript
requirePermission('module11:custom')
```

## Best Practices

1. ✅ Toujours vérifier les permissions côté serveur
2. ✅ Ne pas exposer les données sensibles selon le rôle
3. ✅ Logger les accès refusés
4. ✅ Utiliser les middlewares de permission
5. ❌ Ne pas faire confiance aux données du client
6. ❌ Ne pas hardcoder les rôles

---

**Politique de sécurité** : Les permissions sont vérifiées à chaque requête. Les modifications de rôles sont journalisées.
