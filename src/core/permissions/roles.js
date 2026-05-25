/**
 * Définition des rôles et permissions
 */

const ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  DIRECTION: 'direction',
  DIRECTION_RH: 'direction_rh',
  CENSEUR: 'censeur',
  DOYEN: 'doyen',
  COMPTABLE: 'comptable',
  SCOLARITE: 'scolarite',
  SECRETARIAT: 'secretariat',
  ENSEIGNANT: 'enseignant',
  SURVEILLANT: 'surveillant',
  PARENT: 'parent',
  ETUDIANT: 'etudiant',
};

/**
 * Permissions par module et rôle
 */
const PERMISSIONS = {
  // Module 01 - Gestion des apprenants
  'module01:create': [ROLES.SUPER_ADMIN, ROLES.SCOLARITE, ROLES.SECRETARIAT],
  'module01:read': [ROLES.SUPER_ADMIN, ROLES.DIRECTION, ROLES.SCOLARITE, ROLES.SECRETARIAT, ROLES.ENSEIGNANT],
  'module01:update': [ROLES.SUPER_ADMIN, ROLES.SCOLARITE, ROLES.SECRETARIAT],
  'module01:delete': [ROLES.SUPER_ADMIN, ROLES.SCOLARITE],
  
  // Module 02 - Gestion pédagogique
  'module02:create': [ROLES.SUPER_ADMIN, ROLES.CENSEUR, ROLES.DOYEN, ROLES.ENSEIGNANT],
  'module02:read': [ROLES.SUPER_ADMIN, ROLES.DIRECTION, ROLES.CENSEUR, ROLES.DOYEN, ROLES.ENSEIGNANT, ROLES.PARENT],
  'module02:update': [ROLES.SUPER_ADMIN, ROLES.CENSEUR, ROLES.DOYEN, ROLES.ENSEIGNANT],
  'module02:delete': [ROLES.SUPER_ADMIN, ROLES.CENSEUR],
  
  // Module 03 - Examens & certifications
  'module03:create': [ROLES.SUPER_ADMIN, ROLES.DIRECTION],
  'module03:read': [ROLES.SUPER_ADMIN, ROLES.DIRECTION, ROLES.CENSEUR, ROLES.PARENT],
  'module03:update': [ROLES.SUPER_ADMIN, ROLES.DIRECTION],
  'module03:delete': [ROLES.SUPER_ADMIN, ROLES.DIRECTION],
  
  // Module 04 - Présences
  'module04:create': [ROLES.SUPER_ADMIN, ROLES.SURVEILLANT, ROLES.ENSEIGNANT],
  'module04:read': [ROLES.SUPER_ADMIN, ROLES.DIRECTION, ROLES.SURVEILLANT, ROLES.ENSEIGNANT, ROLES.PARENT],
  'module04:update': [ROLES.SUPER_ADMIN, ROLES.SURVEILLANT, ROLES.ENSEIGNANT],
  'module04:delete': [ROLES.SUPER_ADMIN],
  
  // Module 05 - Gestion financière
  'module05:create': [ROLES.SUPER_ADMIN, ROLES.COMPTABLE],
  'module05:read': [ROLES.SUPER_ADMIN, ROLES.DIRECTION, ROLES.COMPTABLE, ROLES.PARENT],
  'module05:update': [ROLES.SUPER_ADMIN, ROLES.COMPTABLE],
  'module05:delete': [ROLES.SUPER_ADMIN, ROLES.COMPTABLE],
  
  // Module 06 - Ressources humaines
  'module06:create': [ROLES.SUPER_ADMIN, ROLES.DIRECTION_RH],
  'module06:read': [ROLES.SUPER_ADMIN, ROLES.DIRECTION, ROLES.DIRECTION_RH],
  'module06:update': [ROLES.SUPER_ADMIN, ROLES.DIRECTION_RH],
  'module06:delete': [ROLES.SUPER_ADMIN, ROLES.DIRECTION_RH],
  
  // Module 07 - Communication
  'module07:create': [ROLES.SUPER_ADMIN, ROLES.DIRECTION, ROLES.ENSEIGNANT],
  'module07:read': [ROLES.SUPER_ADMIN, ROLES.DIRECTION, ROLES.PARENT, ROLES.ETUDIANT],
  'module07:update': [ROLES.SUPER_ADMIN, ROLES.DIRECTION],
  'module07:delete': [ROLES.SUPER_ADMIN, ROLES.DIRECTION],
  
  // Module 08 - Système de licence
  'module08:manage': [ROLES.SUPER_ADMIN],
  'module08:view': [ROLES.SUPER_ADMIN, ROLES.DIRECTION],
  
  // Module 09 - Programmes & Contenus
  'module09:create': [ROLES.SUPER_ADMIN, ROLES.ENSEIGNANT, ROLES.CENSEUR],
  'module09:read': [ROLES.SUPER_ADMIN, ROLES.DIRECTION, ROLES.ENSEIGNANT, ROLES.PARENT],
  'module09:update': [ROLES.SUPER_ADMIN, ROLES.ENSEIGNANT, ROLES.CENSEUR],
  'module09:delete': [ROLES.SUPER_ADMIN, ROLES.CENSEUR],
  
  // Module 10 - Gestion documentaire
  'module10:upload': [ROLES.SUPER_ADMIN, ROLES.DIRECTION, ROLES.SCOLARITE, ROLES.SECRETARIAT, ROLES.ENSEIGNANT],
  'module10:read': [ROLES.SUPER_ADMIN, ROLES.DIRECTION, ROLES.SCOLARITE, ROLES.SECRETARIAT, ROLES.ENSEIGNANT, ROLES.PARENT],
  'module10:delete': [ROLES.SUPER_ADMIN, ROLES.SCOLARITE, ROLES.SECRETARIAT],
};

/**
 * Vérifier si un rôle a une permission
 * @param {String} role - Rôle de l'utilisateur
 * @param {String} permission - Permission à vérifier
 * @returns {Boolean}
 */
const hasPermission = (role, permission) => {
  const allowedRoles = PERMISSIONS[permission] || [];
  return allowedRoles.includes(role);
};

/**
 * Vérifier si un utilisateur a une permission
 * @param {Object} user - Objet utilisateur avec role
 * @param {String} permission - Permission à vérifier
 * @returns {Boolean}
 */
const userHasPermission = (user, permission) => {
  if (!user || !user.role) {
    return false;
  }
  return hasPermission(user.role, permission);
};

module.exports = {
  ROLES,
  PERMISSIONS,
  hasPermission,
  userHasPermission,
};
