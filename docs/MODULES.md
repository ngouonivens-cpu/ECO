# Documentation des 10 Modules ECO

## 📋 Module 01 - Gestion des Apprenants

**Profils concernés** : Scolarité / Secrétariat

### Fonctionnalités
- ✅ Inscription des apprenants
- ✅ Gestion de dossiers (documents requis)
- ✅ Transferts d'établissement
- ✅ Attribution de matricules
- ✅ Historique d'inscription
- ✅ Données personnelles & contact
- ✅ Situation financière
- ✅ Statut d'apprenant (actif, suspendu, diplômé)

### Entités principales
```javascript
Student {
  id, matricule, first_name, last_name, date_of_birth,
  gender, email, phone, address, city, country,
  parent_id, level_id, class_id, status,
  enrollment_date, created_at, updated_at
}

Parent {
  id, first_name, last_name, relationship,
  email, phone, address
}

Enrollment {
  id, student_id, academic_year, status,
  enrollment_date, graduation_date
}
```

### API Endpoints
```
GET    /api/module01/students
POST   /api/module01/students
GET    /api/module01/students/:id
PUT    /api/module01/students/:id
DELETE /api/module01/students/:id
GET    /api/module01/students/:id/enrollments
POST   /api/module01/students/:id/transfer
```

### Validations
- Email unique
- Matricule unique
- Age minimum (fonction du niveau)
- Documents obligatoires fournis
- Contact parent valide

---

## 📚 Module 02 - Gestion Pédagogique

**Profils concernés** : Censeur / Doyen / Enseignants

### Fonctionnalités
- ✅ Gestion des notes et bulletins
- ✅ Création et configuration des emplois du temps
- ✅ Gestion des unités d'enseignement (UE)
- ✅ Attribution des crédits ECTS
- ✅ Calcul des moyennes et classements
- ✅ Génération de bulletins scolaires
- ✅ Rattrapage et évaluations continues
- ✅ Transcription de notes

### Entités principales
```javascript
Grade {
  id, student_id, subject_id, teacher_id,
  continuous_assessment, exam_grade, final_grade,
  academic_year, semester, updated_at
}

Subject {
  id, name, code, credit_hours, level_id,
  description, coefficient
}

Schedule {
  id, class_id, teacher_id, subject_id,
  day_of_week, start_time, end_time, room,
  academic_year
}

CourseUnit {
  id, name, code, credits, level,
  prerequisite_id, status
}

Report {
  id, student_id, academic_year, semester,
  average, ranking, generated_at
}
```

### API Endpoints
```
POST   /api/module02/grades
GET    /api/module02/grades/:student_id
PUT    /api/module02/grades/:id
GET    /api/module02/schedules
POST   /api/module02/schedules
GET    /api/module02/reports/:student_id/:year
POST   /api/module02/reports/generate
GET    /api/module02/subjects
```

### Validations
- Notes entre 0 et 20
- Pas de note après clôture d'année
- Horaires sans chevauchement
- Codes UE uniques
- Crédits positifs

---

## 🎓 Module 03 - Examens & Certifications

**Profils concernés** : Direction

### Fonctionnalités
- ✅ Gestion d'examens (BEPC, BAC, concours)
- ✅ Calendrier d'examens
- ✅ Affectation des salles et surveillants
- ✅ Délibérations et admissions
- ✅ Génération de PV d'examens
- ✅ Attestations et certificats
- ✅ Archivage des résultats
- ✅ Recours et contestations

### Entités principales
```javascript
Exam {
  id, name, type, code, level,
  start_date, end_date, academic_year,
  status, created_by
}

ExamSession {
  id, exam_id, subject_id, date,
  start_time, end_time, room_id,
  supervisor_id, candidate_count
}

ExamResult {
  id, student_id, exam_id, subject_id,
  score, passed, status
}

Deliberation {
  id, exam_id, date, status,
  minutes, decisions_count
}

Certificate {
  id, student_id, exam_id, certificate_type,
  issue_date, issued_by
}
```

### API Endpoints
```
POST   /api/module03/exams
GET    /api/module03/exams
GET    /api/module03/exams/:id/sessions
POST   /api/module03/exams/:id/sessions
POST   /api/module03/results
GET    /api/module03/results/:exam_id
POST   /api/module03/deliberations
GET    /api/module03/certificates/:student_id
```

### Validations
- Dates d'examen cohérentes
- Salles disponibles
- Surveillants qualifiés
- Candidats enregistrés
- Scores valides
- Une délibération par exam

---

## 👁️ Module 04 - Présences

**Profils concernés** : Surveillants / Enseignants

### Fonctionnalités
- ✅ Appel des apprenants
- ✅ Suivi présence des enseignants
- ✅ Justifications d'absences
- ✅ Alertes de décrochage
- ✅ Rapports de présence
- ✅ Intégration biométrique (optionnel)
- ✅ Notifications parents
- ✅ Analyse de tendances

### Entités principales
```javascript
Attendance {
  id, student_id, class_id, date,
  status, marked_by, time, notes
}

TeacherAttendance {
  id, teacher_id, date, status,
  time_in, time_out, marked_by
}

Absence {
  id, student_id, date, reason,
  justified, documents, reason_type
}

AttendanceAlert {
  id, student_id, absences_count,
  threshold_exceeded_date, status
}
```

### API Endpoints
```
POST   /api/module04/attendance/mark
GET    /api/module04/attendance/:class_id/:date
GET    /api/module04/attendance/student/:student_id
POST   /api/module04/absences/justify
GET    /api/module04/alerts
POST   /api/module04/reports/generate
```

### Validations
- Appel après début cours
- Justification dans délai
- Classe et date valides
- Un appel par jour par apprenant

---

## 💰 Module 05 - Gestion Financière

**Profils concernés** : Comptable / Direction

### Fonctionnalités
- ✅ Gestion des frais scolaires
- ✅ Suivi des paiements
- ✅ Relances de paiement
- ✅ Gestion des dépenses
- ✅ Allocation de bourses
- ✅ Rapports financiers
- ✅ Factures et quittances
- ✅ Soldes et arrérages

### Entités principales
```javascript
Fee {
  id, name, code, academic_year,
  amount, due_date, payment_type,
  level_id, created_at
}

Payment {
  id, student_id, fee_id, amount,
  date, payment_method, reference,
  receipt_number, status
}

Expense {
  id, category, description, amount,
  date, paid_by, budget_line, receipt
}

Scholarship {
  id, student_id, amount, academic_year,
  type, allocation_date, disbursement_date
}

FinancialReport {
  id, period, total_fees, total_collected,
  pending_amount, expenses, balance
}
```

### API Endpoints
```
GET    /api/module05/fees
POST   /api/module05/fees
POST   /api/module05/payments
GET    /api/module05/payments/student/:student_id
GET    /api/module05/students/unpaid-fees
POST   /api/module05/scholarships
GET    /api/module05/reports/financial
POST   /api/module05/receipts/:payment_id
```

### Validations
- Montants positifs
- Dates cohérentes
- Un paiement par student/fee
- Méthode paiement valide
- Solde positif global

---

## 👔 Module 06 - Ressources Humaines

**Profils concernés** : Direction RH

### Fonctionnalités
- ✅ Gestion des dossiers personnels
- ✅ Gestion des contrats
- ✅ Suivi des congés et permissions
- ✅ Gestion de la paie (vacataires)
- ✅ Evaluations du personnel
- ✅ Formation continue
- ✅ Documents RH (certificats, attestations)
- ✅ Historique de carrière

### Entités principales
```javascript
Employee {
  id, first_name, last_name, email, phone,
  position_id, hiring_date, salary,
  employment_status, education
}

Contract {
  id, employee_id, type, start_date,
  end_date, salary, position, status
}

Leave {
  id, employee_id, leave_type, start_date,
  end_date, days_count, status, approval_date
}

Salary {
  id, employee_id, period, gross_salary,
  deductions, net_salary, payment_date
}

Evaluation {
  id, employee_id, evaluator_id, date,
  performance_score, comments
}
```

### API Endpoints
```
POST   /api/module06/employees
GET    /api/module06/employees
PUT    /api/module06/employees/:id
POST   /api/module06/contracts
GET    /api/module06/leaves
POST   /api/module06/leaves/request
PUT    /api/module06/leaves/:id/approve
POST   /api/module06/salaries/calculate
GET    /api/module06/evaluations
```

### Validations
- Email unique
- Dates d'embauche cohérentes
- Congés dans limites annuelles
- Statut de contrat valide
- Évaluations entre 0-5

---

## 📢 Module 07 - Communication

**Profils concernés** : Direction / Enseignants

### Fonctionnalités
- ✅ Notifications push/email/SMS
- ✅ Tableaux de bord personnalisés
- ✅ Rapports de gestion
- ✅ Messagerie parent-établissement
- ✅ Circulaires et annonces
- ✅ Calendrier académique
- ✅ News et actualités
- ✅ Intégration avec parent portal

### Entités principales
```javascript
Notification {
  id, user_id, type, title, message,
  related_entity, date, is_read, priority
}

Report {
  id, title, type, generated_by,
  date, file_path, recipients
}

Message {
  id, sender_id, recipient_id, subject,
  content, date, is_read, attachments
}

Announcement {
  id, title, content, author_id,
  publication_date, target_audience,
  expiry_date
}

AcademicCalendar {
  id, academic_year, events,
  start_date, end_date
}
```

### API Endpoints
```
POST   /api/module07/notifications/send
GET    /api/module07/notifications/:user_id
PUT    /api/module07/notifications/:id/read
POST   /api/module07/messages
GET    /api/module07/messages/:user_id
POST   /api/module07/announcements
GET    /api/module07/reports
POST   /api/module07/reports/generate
```

### Validations
- Destinataires existent
- Contenu non vide
- Types notification valides
- Dates cohérentes

---

## 🔐 Module 08 - Système de Licence

**Profils concernés** : Super Admin

### Fonctionnalités
- ✅ Activation et gestion de licences
- ✅ Validation d'expiration
- ✅ Limitation du nombre d'utilisateurs
- ✅ Sélection des modules actifs
- ✅ Alertes d'expiration
- ✅ Renouvellement
- ✅ Usage tracking
- ✅ Vérification d'intégrité

### Entités principales
```javascript
License {
  id, license_key, institution_id,
  issue_date, expiry_date, status,
  max_users, active_modules, created_by
}

LicenseUsage {
  id, license_id, active_users_count,
  modules_used, check_date
}

LicenseAlert {
  id, license_id, alert_type,
  threshold_date, notified_at, status
}

Institution {
  id, name, code, contact_email,
  address, city, country,
  license_id
}
```

### API Endpoints
```
POST   /api/module08/licenses/activate
GET    /api/module08/licenses/status
PUT    /api/module08/licenses/:id
GET    /api/module08/licenses/validate
POST   /api/module08/licenses/renew
GET    /api/module08/alerts
```

### Validations
- Clé de licence valide
- Expiration vérifiée
- Nombre utilisateurs respecté
- Modules activés cohérents
- Une licence par institution

---

## 📖 Module 09 - Programmes & Contenus

**Profils concernés** : Enseignants / Censeur

### Fonctionnalités
- ✅ Création et gestion de programmes
- ✅ Contenus par matière et niveau
- ✅ Progression pédagogique
- ✅ Ressources pédagogiques
- ✅ Journal de cours
- ✅ Compétences et objectifs
- ✅ Alignement curriculaire
- ✅ Évaluation par compétences

### Entités principales
```javascript
Program {
  id, name, level, academic_year,
  created_by, creation_date, version
}

Curriculum {
  id, program_id, subject_id, total_hours,
  competencies, learning_objectives
}

CourseContent {
  id, curriculum_id, week, topic,
  description, resources, duration
}

CourseLog {
  id, teacher_id, class_id, date,
  topics_covered, progress_percentage,
  notes, assessments
}

Resource {
  id, title, type, content_type,
  file_path, author, created_at
}
```

### API Endpoints
```
POST   /api/module09/programs
GET    /api/module09/programs
GET    /api/module09/programs/:id/curriculum
POST   /api/module09/courses/log
GET    /api/module09/courses/logs/:teacher_id
POST   /api/module09/resources
GET    /api/module09/resources
GET    /api/module09/competencies
```

### Validations
- Programmes uniques par level/année
- Heures cohérentes
- Topics définis
- Ressources accessibles

---

## 📁 Module 10 - Gestion Documentaire

**Profils concernés** : Tous profils

### Fonctionnalités
- ✅ Stockage de dossiers électroniques (étudiants)
- ✅ Dossiers employés
- ✅ Archivage de documents
- ✅ Génération d'attestations
- ✅ Gestion des versions
- ✅ Recherche documentaire
- ✅ Contrôle d'accès par document
- ✅ Sauvegarde et archivage

### Entités principales
```javascript
StudentFile {
  id, student_id, documents,
  last_updated, archived_date,
  total_size
}

Document {
  id, file_name, entity_type, entity_id,
  file_path, file_type, file_size,
  upload_date, uploaded_by, version,
  access_control
}

Archive {
  id, archive_date, documents_count,
  total_size, location, status,
  created_by
}

Certificate {
  id, student_id, cert_type, issue_date,
  expiry_date, file_path, status
}

FileVersion {
  id, document_id, version_number,
  file_path, created_by, date,
  change_description
}
```

### API Endpoints
```
POST   /api/module10/documents/upload
GET    /api/module10/files/:entity_type/:entity_id
GET    /api/module10/documents/:id/download
DELETE /api/module10/documents/:id
POST   /api/module10/certificates/generate
GET    /api/module10/archives
POST   /api/module10/search
```

### Validations
- Formats de fichiers acceptés
- Taille maximale respectée
- Accès autorisé
- Intégrité des fichiers

---

## 🔗 Interactions entre modules

```
Module 01 (Apprenants)
  ↓
Module 02 (Pédagogique)
  ↓
Module 03 (Examens)
  ↓
Module 04 (Présences) ←→ Module 02 & 03
  ↓
Module 05 (Financière)
  ↓
Module 07 (Communication) ←→ Tous

Module 06 (RH)
  ↓
Module 07 (Communication)

Module 09 (Programmes)
  ↓
Module 02 (Notes)

Module 10 (Documentaire) ←→ Tous modules
```

---

**Version** : 1.0.0  
**Dernière mise à jour** : 2026-05-25
