# ECO - Système de Gestion Scolaire Intégré

**ECO** est une plateforme de gestion scolaire complète, modulaire et évolutive, conçue pour les établissements d'enseignement (primaire, secondaire, supérieur).

## 🎯 Vision

Fournir une solution intégrée et modulaire pour la gestion administrative, pédagogique et financière des établissements scolaires, activable selon le type et les besoins de chaque institution.

## 📦 Architecture Modulaire

Le système est organisé en **10 modules fonctionnels indépendants et activables** :

| # | Module | Fonctionnalités Principales | Profils |
|---|--------|-----|---------|
| 01 | **Gestion des apprenants** | Inscriptions, dossiers, transferts, matricules | Scolarité / Secrétariat |
| 02 | **Gestion pédagogique** | Notes, bulletins, emplois du temps, UE/crédits | Censeur / Doyen |
| 03 | **Examens & certifications** | BEPC, BAC, concours, délibérations, PV | Direction |
| 04 | **Présences** | Appel élèves/étudiants, présence enseignants, alertes | Surveillants / Enseignants |
| 05 | **Gestion financière** | Frais, paiements, relances, dépenses, bourses | Comptable |
| 06 | **Ressources humaines** | Dossiers personnel, contrats, congés, paie vacataires | Direction RH |
| 07 | **Communication** | Notifications parents, tableaux de bord, rapports | Direction |
| 08 | **Système de licence** | Activation, durée, renouvellement, alertes expiration | Super Admin |
| 09 | **Programmes & Contenus** | Programme par matière/niveau, journal de cours | Enseignants |
| 10 | **Gestion documentaire** | Dossiers élèves et enseignants, archives, attestations | Tous profils |

## 📂 Structure du Projet

```
ECO/
├── docs/                          # Documentation complète
│   ├── README.md
│   ├── ARCHITECTURE.md
│   ├── MODULES.md
│   ├── API.md
│   ├── INSTALLATION.md
│   ├── CONFIGURATION.md
│   └── PERMISSIONS.md
├── src/
│   ├── core/                      # Système de base
│   │   ├── auth/                  # Authentification & JWT
│   │   ├── permissions/           # Contrôle d'accès RBAC
│   │   ├── database/              # Configuration DB
│   │   ├── middleware/            # Express middlewares
│   │   └── utils/                 # Utilitaires
│   ├── modules/                   # 10 modules métier
│   │   ├── 01-gestion-apprenants/
│   │   ├── 02-gestion-pedagogique/
│   │   ├── 03-examens-certifications/
│   │   ├── 04-presences/
│   │   ├── 05-gestion-financiere/
│   │   ├── 06-ressources-humaines/
│   │   ├── 07-communication/
│   │   ├── 08-systeme-licence/
│   │   ├── 09-programmes-contenus/
│   │   └── 10-gestion-documentaire/
│   ├── api/                       # Routes API centralisées
│   │   └── routes.js
│   └── app.js                     # Point d'entrée principal
├── tests/                         # Tests unitaires & intégration
│   ├── unit/
│   ├── integration/
│   └── fixtures/
├── config/                        # Fichiers de configuration
│   ├── database.js
│   ├── env.example
│   └── permissions.json
├── .github/                       # GitHub Actions & CI/CD
│   └── workflows/
├── .gitignore
├── .env.example
├── package.json
├── package-lock.json
└── server.js
```

## 🚀 Démarrage Rapide

### Prérequis
- Node.js 16+
- PostgreSQL 13+
- npm ou yarn

### Installation

```bash
# Cloner le dépôt
git clone https://github.com/ngouonivens-cpu/ECO.git
cd ECO

# Installer les dépendances
npm install

# Configurer l'environnement
cp .env.example .env
# Éditer .env avec vos paramètres

# Initialiser la base de données
npm run db:init

# Démarrer le serveur
npm start
```

## 📋 Configuration des Modules

Activez/désactivez les modules selon vos besoins dans `.env` :

```env
MODULE_01_GESTION_APPRENANTS=true
MODULE_02_GESTION_PEDAGOGIQUE=true
MODULE_03_EXAMENS_CERTIFICATIONS=true
MODULE_04_PRESENCES=true
MODULE_05_GESTION_FINANCIERE=true
MODULE_06_RESSOURCES_HUMAINES=true
MODULE_07_COMMUNICATION=true
MODULE_08_SYSTEME_LICENCE=true
MODULE_09_PROGRAMMES_CONTENUS=true
MODULE_10_GESTION_DOCUMENTAIRE=true
```

## 👥 Profils & Permissions

Le système supporte les profils suivants avec contrôle d'accès granulaire :

- **Super Admin** : Accès total + gestion des licences
- **Direction** : Gestion globale + examens + communication
- **Direction RH** : Gestion du personnel
- **Censeur / Doyen** : Gestion pédagogique
- **Comptable** : Gestion financière
- **Scolarité / Secrétariat** : Gestion des apprenants
- **Enseignants** : Programmes, contenus, présences, notes
- **Surveillants** : Gestion des présences
- **Parents** : Consultation bulletins et notifications

## 🔐 Sécurité

- ✅ Authentification JWT
- ✅ Contrôle d'accès RBAC (Role-Based Access Control)
- ✅ Chiffrement des données sensibles
- ✅ Validation des entrées
- ✅ CORS configuré
- ✅ Rate limiting
- ✅ Audit trail des actions

## 📚 Documentation

- [Architecture détaillée](docs/ARCHITECTURE.md)
- [Description des modules](docs/MODULES.md)
- [API complète](docs/API.md)
- [Guide d'installation](docs/INSTALLATION.md)
- [Système de permissions](docs/PERMISSIONS.md)

## 📊 Rapports & Statistiques

Le système propose plusieurs types de rapports :
- Bulletins scolaires
- Procès-verbaux d'examens
- États financiers
- Rapports RH
- Tableaux de bord personnalisés

## 🔄 Workflow de Développement

```bash
# Créer une branche de feature
git checkout -b feature/nom-du-module

# Travailler et committer
git add .
git commit -m "feat: description"

# Créer une Pull Request
git push origin feature/nom-du-module
```

## 🤝 Contribution

Les contributions sont les bienvenues ! Veuillez :
1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Committer vos modifications (`git commit -m 'Add some AmazingFeature'`)
4. Pousser vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

Pour toute question ou problème, veuillez [ouvrir une issue](https://github.com/ngouonivens-cpu/ECO/issues).

## 👨‍💼 Auteur

**Ngouonivens CPU**

---

**Dernière mise à jour** : 2026-05-25
