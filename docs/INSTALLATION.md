# Guide d'Installation ECO

## Prérequis

- **Node.js** : 16.0.0 ou supérieur
- **npm** : 8.0.0 ou supérieur (ou yarn)
- **PostgreSQL** : 13.0 ou supérieur
- **Git**

## Installation Locale

### 1. Cloner le dépôt

```bash
git clone https://github.com/ngouonivens-cpu/ECO.git
cd ECO
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer l'environnement

```bash
cp .env.example .env
```

Éditer `.env` avec vos paramètres :

```env
# Application
NODE_ENV=development
PORT=3000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=eco_school
DB_USER=postgres
DB_PASSWORD=votre_mot_de_passe

# JWT
JWT_SECRET=your_secret_key_change_in_production
JWT_EXPIRES_IN=24h

# Modules
MODULE_01_GESTION_APPRENANTS=true
MODULE_02_GESTION_PEDAGOGIQUE=true
# ... autres modules
```

### 4. Créer la base de données

```bash
# Connectez-vous à PostgreSQL
psql -U postgres

# Créer la base de données
CREATE DATABASE eco_school;

# Quitter
\q
```

### 5. Initialiser la base de données

```bash
npm run db:init
```

Ou manuellement :
```bash
node_modules/.bin/sequelize db:migrate
```

### 6. Démarrer le serveur

**Mode développement** (avec rechargement automatique) :
```bash
npm run dev
```

**Mode production** :
```bash
npm start
```

Le serveur devrait démarrer sur `http://localhost:3000`

## Vérifier l'installation

```bash
# Health check
curl http://localhost:3000/health

# Devrait retourner :
# {"status":"healthy","timestamp":"2026-05-25T...","version":"1.0.0"}
```

## Installation avec Docker (Optionnel)

### 1. Créer un Dockerfile

```dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

### 2. Créer un docker-compose.yml

```yaml
version: '3.8'

services:
  db:
    image: postgres:13
    environment:
      POSTGRES_DB: eco_school
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: development
      DB_HOST: db
      DB_USER: postgres
      DB_PASSWORD: postgres
      DB_NAME: eco_school
    depends_on:
      - db
    volumes:
      - .:/app

volumes:
  postgres_data:
```

### 3. Démarrer avec Docker

```bash
docker-compose up
```

## Scripts NPM Disponibles

```bash
# Démarrage
npm start              # Mode production
npm run dev            # Mode développement (nodemon)

# Base de données
npm run db:init        # Initialiser la BD
npm run db:migrate     # Exécuter les migrations
npm run db:seed        # Ajouter les données de test
npm run db:reset       # Réinitialiser complètement

# Tests
npm test               # Exécuter tous les tests
npm run test:watch     # Mode watch
npm run test:coverage  # Couverture des tests

# Qualité du code
npm run lint           # Vérifier et corriger ESLint
```

## Dépannage

### Erreur : "Cannot find module"

```bash
rm -rf node_modules package-lock.json
npm install
```

### Erreur de connexion à PostgreSQL

Vérifiez :
```bash
# PostgreSQL tourne-t-il ?
ps aux | grep postgres

# Port 5432 écoute-t-il ?
netstat -an | grep 5432

# Credentials corrects ?
psql -U postgres -d postgres
```

### Port 3000 déjà utilisé

```bash
# Trouver le processus
lsof -i :3000

# Tuer le processus
kill -9 <PID>

# Ou utiliser un autre port
PORT=3001 npm run dev
```

### Erreur de migration

```bash
# Voir l'état des migrations
node_modules/.bin/sequelize db:migrate:status

# Annuler dernière migration
node_modules/.bin/sequelize db:migrate:undo
```

## Commandes PostgreSQL Utiles

```bash
# Connecter
psql -U postgres -d eco_school

# Lister les tables
\dt

# Voir la structure d'une table
\d users

# Exécuter une requête
SELECT * FROM users;

# Quitter
\q
```

## Prochaines Étapes

1. **Tester l'API** avec Postman ou cURL
2. **Créer un utilisateur** via la route `/api/auth/register`
3. **Se connecter** via `/api/auth/login`
4. **Explorer les modules** avec le token obtenu
5. **Consulter la documentation API** complète

## Support

En cas de problème :
1. Vérifier les logs : `logs/error.log`
2. Lire la documentation : `docs/`
3. Ouvrir une issue : GitHub Issues
4. Contacter : support@eco-school.com

---

**Bienvenue dans ECO ! 🎓**
