# Contribution Guide

## Code de Conduite

Ce projet adhère au [Code of Conduct](CODE_OF_CONDUCT.md). En participant, vous acceptez de respecter ce code.

## Comment Contribuer

### 1. Fork le projet

```bash
git clone https://github.com/YOUR_USERNAME/ECO.git
cd ECO
```

### 2. Créer une branche

```bash
git checkout -b feature/votre-feature
# ou
git checkout -b fix/votre-correction
```

### 3. Faire vos modifications

- Respectez le style de code existant
- Écrivez des tests pour les nouvelles fonctionnalités
- Mettez à jour la documentation

### 4. Commit et Push

```bash
git add .
git commit -m "feat: description courte de votre changement"
git push origin feature/votre-feature
```

### 5. Créer une Pull Request

- Donnez un titre descriptif
- Expliquez les changements
- Référencez les issues liées (#123)
- Attendez la review

## Standards de Code

### Style
- ESLint configuration fournie
- 2 espaces d'indentation
- Noms en camelCase
- Noms de classes en PascalCase

### Exécuter ESLint

```bash
npm run lint
```

## Tests

### Écrire des tests

```bash
# Tests unitaires
npm test

# Mode watch
npm run test:watch

# Couverture
npm run test:coverage
```

### Couverture minimale requise
- 80% pour les lignes
- 75% pour les branches
- 80% pour les fonctions

## Documentation

- Documentez les nouvelles API
- Mettez à jour MODULES.md si nécessaire
- Ajoutez des exemples cURL

## Commits

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat`: Nouvelle fonctionnalité
- `fix`: Correction de bug
- `docs`: Documentation
- `style`: Formatage
- `refactor`: Refactorisation
- `perf`: Performance
- `test`: Tests
- `chore`: Dépendances

### Exemples

```
feat(module02): Ajouter gestion des notes

Permet aux enseignants de saisir les notes des apprenants
par matière et classe.

Closes #123
```

## Processus de Review

1. Au moins 1 review obligatoire
2. Tests doivent passer
3. Coverage doit être maintenu
4. Documentation à jour

## Signaler un Bug

### Créer une Issue

1. Vérifiez que le bug n'existe pas
2. Donnez un titre descriptif
3. Décrivez le comportement attendu vs réel
4. Fournissez des étapes pour reproduire
5. Incluez des captures d'écran si pertinent

### Template

```markdown
## Description
[Description claire du problème]

## Étapes pour reproduire
1. ...
2. ...
3. ...

## Comportement attendu
[Ce qui devrait se passer]

## Comportement réel
[Ce qui se passe actuellement]

## Environnement
- OS: [Windows/Mac/Linux]
- Node: [version]
- npm: [version]
```

## Questions et Discussions

- Discussions GitHub pour les questions
- Discussions générales dans les Issues
- Chat: Slack (lien à venir)

## Développement Local

```bash
# Dépendances
npm install

# Variables d'environnement
cp .env.example .env

# Base de données
npm run db:reset

# Mode développement
npm run dev
```

## Ressources Utiles

- [README](README.md) - Vue d'ensemble
- [Architecture](docs/ARCHITECTURE.md) - Architecture détaillée
- [API Documentation](docs/API.md) - API Reference
- [Installation](docs/INSTALLATION.md) - Setup guide

## Besoin d'aide?

- 📧 Email: support@eco-school.com
- 💬 Issues: GitHub Issues
- 📚 Docs: /docs

---

Merci pour votre contribution! 🙏
