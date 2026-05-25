# Frequently Asked Questions (FAQ)

## Installation & Configuration

### Q: Quelle version de Node.js est requise?
A: Node.js 16.0.0 ou supérieur. Nous recommandons la version LTS actuelle.

### Q: Puis-je utiliser MySQL au lieu de PostgreSQL?
A: Actuellement, le projet est optimisé pour PostgreSQL. Vous pouvez adapter Sequelize, mais ce n'est pas supporté officiellement.

### Q: Comment changer le port du serveur?
A: Modifiez la variable `PORT` dans votre fichier `.env`
```env
PORT=3001
```

### Q: Comment activer/désactiver les modules?
A: Modifiez les variables `MODULE_XX_*` dans `.env`
```env
MODULE_01_GESTION_APPRENANTS=true
MODULE_02_GESTION_PEDAGOGIQUE=false
```

## Authentification & Sécurité

### Q: Mon token a expiré, comment le renouveler?
A: Appelez l'endpoint `/api/auth/refresh` avec votre token actuel (même expiré).

### Q: Comment réinitialiser un mot de passe utilisateur?
A: Pour l'instant, directement en base de données. Une feature de "mot de passe oublié" sera ajoutée.

### Q: Comment sécuriser le JWT_SECRET en production?
A: Utilisez un gestionnaire de secrets comme HashiCorp Vault ou AWS Secrets Manager.

### Q: Puis-je utiliser OAuth2 pour l'authentification?
A: Ce n'est pas implémenté pour le moment, mais c'est prévu pour la version 2.0.

## Base de Données

### Q: Comment créer une migration Sequelize?
A: ```bash
npm run db:migrate:new -- --name ma-migration
```

### Q: Comment réinitialiser complètement la base de données?
A: ```bash
npm run db:reset
```
⚠️ Attention: Cela supprime toutes les données!

### Q: Comment faire une sauvegarde de la base de données?
A: ```bash
pg_dump -U postgres -d eco_school > backup.sql
```

### Q: Comment restaurer depuis une sauvegarde?
A: ```bash
psql -U postgres -d eco_school < backup.sql
```

## API & Développement

### Q: Comment tester l'API?
A: Utilisez Postman, cURL, ou l'extension REST Client de VSCode.

### Q: Où voir les logs d'erreur?
A: Consultez `logs/error.log` pour les erreurs détaillées.

### Q: Comment ajouter un nouvel endpoint?
A: 
1. Créez une route dans `src/modules/XX-module/routes.js`
2. Ajoutez les validations avec Joi
3. Implémentez la logique métier
4. Testez avec les permissions requises

### Q: Comment paginer les résultats?
A: Utilisez les paramètres `page` et `limit`:
```bash
/api/module01?page=2&limit=20
```

### Q: Comment filtrer les données?
A: Certains endpoints supportent le filtrage:
```bash
/api/module01?level=6e&status=active
```

## Permissions & Rôles

### Q: Comment assigner un rôle à un utilisateur?
A: Modifiez directement en base de données:
```sql
UPDATE users SET role = 'enseignant' WHERE id = 'user-id';
```

### Q: Comment créer un nouveau rôle?
A: 
1. Ajoutez le rôle dans `src/core/permissions/roles.js`
2. Définissez les permissions associées
3. Redémarrez le serveur

### Q: Puis-je avoir plusieurs rôles?
A: Non actuellement. Un utilisateur a un seul rôle. C'est prévu pour une future version.

## Déploiement

### Q: Comment déployer en production?
A: Consultez le guide de déploiement (à venir) pour Docker, Heroku, AWS, etc.

### Q: Dois-je compiler ou build le projet?
A: Non, ECO est du JavaScript pur. Pas de build nécessaire.

### Q: Comment configurer HTTPS?
A: Le proxy reverse (Nginx, Apache) devrait gérer HTTPS en production.

## Performance

### Q: Comment améliorer les performances?
A: 
- Utilisez un cache Redis (prévu)
- Indexez les colonnes fréquemment recherchées
- Utilisez la pagination
- Évitez les N+1 queries (utilisez eager loading)

### Q: Combien d'utilisateurs peut supporter ECO?
A: La version actuelle est testée pour ~10 000 utilisateurs avec PostgreSQL standard. Plus d'utilisateurs nécessitent une optimisation.

## Support & Maintenance

### Q: Comment signaler un bug?
A: Créez une issue sur GitHub avec les détails:
- Description du problème
- Étapes pour reproduire
- Environnement (OS, Node version, etc.)
- Logs d'erreur

### Q: À quelle fréquence les mises à jour sortent-elles?
A: 
- Bug fixes: Selon les besoins
- Nouvelles features: Mensuellement
- Versions majeure: Tous les 6 mois

### Q: Où trouver la documentation?
A: 
- `/docs/` - Documentation complète
- `README.md` - Vue d'ensemble
- `docs/API.md` - API Reference

### Q: Comment contribuer au projet?
A: Consultez `CONTRIBUTING.md` pour les guidelines détaillées.

## Troubleshooting

### Q: "Port 3000 already in use"
A: ```bash
# Tue le processus utilisant le port
lsof -i :3000
kill -9 <PID>
# Ou utilise un autre port
PORT=3001 npm run dev
```

### Q: "Cannot connect to database"
A: Vérifiez:
- PostgreSQL tourne-t-il? `psql --version`
- Credentials corrects dans `.env`?
- Base de données existe? `createdb eco_school`

### Q: "Module not found"
A: ```bash
rm -rf node_modules
npm install
```

### Q: "Token expired"
A: Utilisez `/api/auth/refresh` pour obtenir un nouveau token.

## Contact & Support

- 📧 Email: support@eco-school.com
- 💬 GitHub Issues: Bugs et features
- 📚 Documentation: `/docs/`
- 🐛 Bug Reports: GitHub Issues
- 💡 Suggestions: GitHub Discussions

---

**Vous avez d'autres questions?** Ouvrez une [Discussion GitHub](https://github.com/ngouonivens-cpu/ECO/discussions) ou contactez-nous!
