# Build Plan — LikelembaApp
# 12 Sprints · 2 semaines chacun · 6 mois

---

## Vue d'ensemble

| Sprint | Nom | Jalon clé |
|---|---|---|
| S1 | Setup & Auth OTP | App déployée, connexion SMS fonctionnelle |
| S2 | Profil & Navigation | Onboarding complet, bottom nav |
| S3 | Création de groupe | Animateur peut créer un groupe |
| S4 | Membres & Invitations | Invitation WhatsApp, rejoindre un groupe |
| S5 | Cotisations (manuel) | Suivi des paiements en temps réel |
| S6 | Notifications WhatsApp | Rappels automatiques |
| S7 | PWA & Offline | Installation + mode hors-ligne |
| S8 | Airtel Money | Paiements Mobile Money |
| S9 | Monétisation | Abonnements payants animateur |
| S10 | Score & Fiabilité | Score membre, badges |
| S11 | Dashboard Analytics | Stats animateur pro |
| S12 | Referral & Landing | Croissance virale |

---

## Sprint 1 — Setup & Auth OTP
**Durée :** Semaines 1–2
**Objectif :** Un utilisateur peut s'inscrire et se connecter avec son numéro de téléphone congolais via SMS OTP.

### Fichiers à créer (dans l'ordre)
```
01. package.json
02. tsconfig.json
03. next.config.ts
04. postcss.config.mjs
05. .env.local.example
06. src/app/globals.css          ← Design tokens + styles de base
07. src/app/layout.tsx           ← Root layout PWA
08. src/types/index.ts           ← Tous les types TypeScript
09. src/lib/supabase/browser.ts  ← Client Supabase navigateur
10. src/lib/supabase/server.ts   ← Client Supabase serveur
11. src/middleware.ts            ← Protection des routes
12. src/app/page.tsx             ← / redirect
13. src/app/(auth)/layout.tsx    ← Layout auth
14. src/app/(auth)/auth/page.tsx ← Page auth (orchestrateur)
15. src/components/features/auth/PhoneStep.tsx
16. src/components/features/auth/OtpStep.tsx
17. src/app/(app)/layout.tsx     ← Layout app protégé
18. src/app/(app)/dashboard/page.tsx ← Dashboard placeholder
19. supabase/schema.sql          ← Base de données
    public/manifest.json         ← PWA manifest
    README.md
```

### Checklist de validation
- [ ] `npm run dev` démarre sans erreur
- [ ] `npm run type-check` → 0 erreur TypeScript
- [ ] `/` redirige vers `/auth` si non connecté
- [ ] Formulaire téléphone accepte `0970000000` et `+243970000000`
- [ ] SMS OTP reçu sur vrai numéro congolais
- [ ] 6 cases OTP : navigation automatique entre cases
- [ ] Paste du code SMS Android fonctionne
- [ ] Après OTP valide → redirect `/dashboard`
- [ ] `/dashboard` inaccessible sans session (test navigation privée)
- [ ] `/manifest.json` accessible dans le navigateur

---

## Sprint 2 — Profil & Navigation
**Durée :** Semaines 3–4
**Objectif :** Un nouvel utilisateur complète son profil après inscription. La navigation bottom bar est fonctionnelle.

### Fichiers à créer/modifier
```
NEW  src/components/ui/Button.tsx
NEW  src/components/ui/Input.tsx
NEW  src/components/ui/Avatar.tsx
NEW  src/components/layout/BottomNav.tsx
NEW  src/components/layout/PageHeader.tsx
NEW  src/app/(app)/profile/page.tsx
NEW  src/hooks/useSession.ts
MOD  src/app/(app)/layout.tsx    ← Ajouter BottomNav
MOD  src/app/(app)/dashboard/page.tsx ← Accueil réel
```

### Checklist de validation
- [ ] Profil : peut saisir son nom
- [ ] Photo de profil : upload vers Supabase Storage
- [ ] Bottom nav : 4 onglets actifs (Accueil, Groupes, Paiements, Profil)
- [ ] L'onglet actif est mis en surbrillance
- [ ] Déconnexion fonctionne depuis le profil

---

## Sprint 3 — Création de groupe
**Durée :** Semaines 5–6
**Objectif :** Un animateur peut créer un groupe likelemba avec tous ses paramètres.

### Fichiers à créer/modifier
```
NEW  src/components/ui/Card.tsx
NEW  src/components/features/groups/GroupCard.tsx
NEW  src/app/(app)/groups/page.tsx
NEW  src/app/(app)/groups/new/page.tsx
NEW  src/hooks/useGroups.ts
NEW  src/lib/utils.ts             ← formatCurrency, formatDate...
```

### Checklist de validation
- [ ] Formulaire création : nom, montant, fréquence, nb de tours
- [ ] Validation des champs (montant > 0, tours entre 2 et 50)
- [ ] Groupe créé visible dans la liste "Mes groupes"
- [ ] Card groupe affiche : nom, montant, fréquence, statut

---

## Sprint 4 — Membres & Invitations
**Durée :** Semaines 7–8
**Objectif :** L'animateur peut inviter des membres par lien WhatsApp. Les membres peuvent rejoindre le groupe.

### Fichiers à créer/modifier
```
NEW  src/app/(app)/groups/[id]/page.tsx   ← Détail groupe
NEW  src/app/join/[code]/page.tsx         ← Lien d'invitation (PUBLIC)
NEW  src/components/features/groups/MemberRow.tsx
MOD  src/hooks/useGroups.ts               ← Ajouter membres
```

### Checklist de validation
- [ ] Lien d'invitation généré et partageable via WhatsApp natif
- [ ] `/join/[code]` accessible sans être connecté
- [ ] Après connexion sur `/join/[code]` → ajouté au groupe automatiquement
- [ ] Liste des membres visible dans le détail groupe
- [ ] Drag-and-drop pour réorganiser l'ordre des tours

---

## Sprint 5 — Cotisations manuelles
**Durée :** Semaines 9–10
**Objectif :** L'animateur peut marquer manuellement les cotisations. Tous les membres voient le statut en temps réel.

### Fichiers à créer/modifier
```
NEW  src/components/features/groups/ProgressBar.tsx
NEW  src/components/features/groups/ContributionRow.tsx
NEW  src/hooks/useContributions.ts
MOD  src/app/(app)/groups/[id]/page.tsx   ← Ajouter cotisations
```

### Checklist de validation
- [ ] Animateur peut marquer une cotisation comme payée
- [ ] Statuts : pending / paid / late (avec couleurs)
- [ ] Barre de progression du cycle visible
- [ ] Supabase Realtime : mise à jour instantanée pour tous les membres
- [ ] Historique des cotisations par membre

---

## Sprint 6 — Notifications WhatsApp
**Durée :** Semaines 11–12
**Objectif :** Rappels automatiques envoyés via WhatsApp le jour de cotisation.

### Fichiers à créer
```
NEW  src/app/api/reminders/send/route.ts   ← API Route (cron)
NEW  src/app/api/webhooks/whatsapp/route.ts
NEW  src/lib/whatsapp.ts
```

---

## Sprint 7 — PWA & Offline
**Durée :** Semaines 13–14
**Objectif :** L'app s'installe depuis WhatsApp et fonctionne hors connexion.

### Fichiers à créer
```
NEW  src/hooks/useOfflineSync.ts
NEW  public/sw.js                         ← Service Worker Workbox
MOD  src/app/layout.tsx                   ← Enregistrement SW
MOD  tous les hooks                       ← Ajouter cache IndexedDB
```

---

## Sprint 8 — Airtel Money
**Durée :** Semaines 15–16
**Objectif :** Un membre peut payer sa cotisation directement via Airtel Money.

### Fichiers à créer
```
NEW  src/lib/mobile-money/airtel.ts
NEW  src/app/api/payments/initiate/route.ts
NEW  src/app/api/webhooks/airtel/route.ts
NEW  src/components/features/payments/PaymentMethodPicker.tsx
```

---

## Sprint 9 — Monétisation
**Durée :** Semaines 17–18
**Objectif :** Premier dollar encaissé. Abonnement animateur activé.

### Fichiers à créer
```
NEW  src/lib/mobile-money/orange.ts
NEW  src/app/api/subscriptions/route.ts
NEW  src/app/(app)/settings/page.tsx
MOD  src/middleware.ts    ← Vérifier abonnement actif
```

---

## Sprints 10–12 (résumé)

**S10 — Score & Fiabilité**
- Algorithme de score basé sur l'historique
- Badges membre (fiable, nouveau, VIP)

**S11 — Dashboard Analytics**
- Graphiques cotisations par semaine
- Taux de recouvrement
- Export CSV

**S12 — Referral & Landing**
- Programme de parrainage (1 mois gratuit)
- Landing page publique
- SEO + Analytics (Plausible)
