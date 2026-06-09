# Architecture — LikelembaApp

## Structure des dossiers

```
likelemba-app/
├── context/                    ← CE DOSSIER — référence permanente pour Claude Code
│   ├── project-overview.md
│   ├── architecture.md
│   ├── build-plan.md
│   ├── code-standards.md
│   ├── library-docs.md
│   ├── progress-tracker.md
│   ├── ui-registry.md
│   ├── ui-rules.md
│   └── ui-tokens.md
│
├── src/
│   ├── app/                    ← Next.js App Router (pages + layouts)
│   │   ├── (auth)/             ← Groupe de routes auth (pas dans l'URL)
│   │   │   ├── layout.tsx      ← Layout spécifique auth (fond night, logo centré)
│   │   │   └── auth/
│   │   │       └── page.tsx    ← Page /auth
│   │   ├── (app)/              ← Groupe de routes app protégées
│   │   │   ├── layout.tsx      ← Layout avec bottom nav + protection session
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx    ← Page /dashboard
│   │   │   ├── groups/
│   │   │   │   ├── page.tsx    ← Liste des groupes /groups
│   │   │   │   ├── new/
│   │   │   │   │   └── page.tsx ← Créer un groupe /groups/new
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx ← Détail groupe /groups/[id]
│   │   │   ├── payments/
│   │   │   │   └── page.tsx    ← Historique paiements
│   │   │   └── profile/
│   │   │       └── page.tsx    ← Profil utilisateur
│   │   ├── join/
│   │   │   └── [code]/
│   │   │       └── page.tsx    ← Lien d'invitation /join/abc123 (public)
│   │   ├── globals.css          ← Design tokens + styles de base
│   │   ├── layout.tsx           ← Root layout (html, body, fonts, PWA)
│   │   └── page.tsx             ← / → redirect dashboard ou auth
│   │
│   ├── components/
│   │   ├── ui/                 ← Composants atomiques réutilisables
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Avatar.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── BottomSheet.tsx
│   │   │   ├── Toast.tsx
│   │   │   └── Spinner.tsx
│   │   ├── layout/             ← Composants de mise en page
│   │   │   ├── BottomNav.tsx
│   │   │   ├── PageHeader.tsx
│   │   │   └── SafeArea.tsx
│   │   └── features/           ← Composants métier (groupes, paiements...)
│   │       ├── auth/
│   │       │   ├── PhoneStep.tsx
│   │       │   └── OtpStep.tsx
│   │       ├── groups/
│   │       │   ├── GroupCard.tsx
│   │       │   ├── MemberRow.tsx
│   │       │   └── ProgressBar.tsx
│   │       └── payments/
│   │           └── PaymentMethodPicker.tsx
│   │
│   ├── lib/                    ← Logique métier pure (pas de UI)
│   │   ├── supabase/
│   │   │   ├── browser.ts      ← Client Supabase navigateur (singleton)
│   │   │   └── server.ts       ← Client Supabase serveur + helpers session
│   │   ├── mobile-money/
│   │   │   ├── airtel.ts       ← Airtel Money API (Sprint 8)
│   │   │   └── orange.ts       ← Orange Money API (Sprint 9)
│   │   └── utils.ts            ← Fonctions utilitaires (formatCurrency, etc.)
│   │
│   ├── hooks/                  ← React hooks personnalisés
│   │   ├── useSession.ts       ← Session utilisateur (client)
│   │   ├── useGroups.ts        ← Groupes de l'utilisateur
│   │   ├── useContributions.ts ← Cotisations d'un groupe
│   │   └── useOfflineSync.ts   ← Synchronisation offline (Sprint 7)
│   │
│   ├── types/
│   │   └── index.ts            ← Tous les types TypeScript partagés
│   │
│   └── middleware.ts           ← Protection des routes + refresh token
│
├── supabase/
│   └── schema.sql              ← SQL à coller dans Supabase SQL Editor
│
├── public/
│   ├── manifest.json           ← PWA Web App Manifest
│   └── icons/                  ← Icônes PWA (192px, 512px, apple-touch)
│
├── .env.local.example          ← Template variables d'environnement
├── next.config.ts
├── postcss.config.mjs
├── tsconfig.json
└── package.json
```

---

## Les 3 couches de l'application

```
┌─────────────────────────────────────────────────┐
│  COUCHE UI (src/app/ + src/components/)         │
│  → Pages Next.js, composants React              │
│  → Jamais de logique métier directement ici     │
└─────────────────┬───────────────────────────────┘
                  │ appelle
┌─────────────────▼───────────────────────────────┐
│  COUCHE HOOKS (src/hooks/)                      │
│  → State management, data fetching              │
│  → Cache Supabase, sync offline                 │
└─────────────────┬───────────────────────────────┘
                  │ appelle
┌─────────────────▼───────────────────────────────┐
│  COUCHE LIB (src/lib/)                          │
│  → Clients Supabase, API Mobile Money           │
│  → Fonctions pures, pas de state React          │
└─────────────────────────────────────────────────┘
```

---

## Flux de données : connexion

```
User tape téléphone
    ↓
PhoneStep.tsx → supabase.auth.signInWithOtp({ phone })
    ↓
Supabase → Africa's Talking → SMS OTP envoyé
    ↓
User tape le code
    ↓
OtpStep.tsx → supabase.auth.verifyOtp({ phone, token })
    ↓
Supabase retourne session (JWT dans cookie httpOnly)
    ↓
middleware.ts refresh le token à chaque requête
    ↓
router.push('/dashboard')
```

## Flux de données : cotisation (Sprint 5+)

```
Member clique "Payer"
    ↓
PaymentMethodPicker → sélectionne Airtel Money
    ↓
API Route /api/payments/initiate
    ↓
Airtel Money API → push payment sur le téléphone du membre
    ↓
Membre confirme sur son téléphone Airtel
    ↓
Webhook Airtel → /api/webhooks/airtel (Vercel Edge Function)
    ↓
Supabase UPDATE contributions SET status = 'paid'
    ↓
Supabase Realtime → tous les membres voient la mise à jour live
    ↓
WhatsApp notification → "Jean-Marc a payé ✓"
```

---

## Schéma de base de données

```
profiles (id, phone, name, avatar_url, role, mobile_money_number, reliability_score)
    │
    ├─── groups (id, name, organizer_id→profiles, cotisation_amount, frequency,
    │            total_turns, current_turn, status, invite_code)
    │        │
    │        ├─── group_members (id, group_id→groups, user_id→profiles, turn_order)
    │        │
    │        ├─── contributions (id, group_id, member_id→profiles, turn_number,
    │        │                   amount, status, payment_method, tx_ref)
    │        │
    │        ├─── payouts (id, group_id, recipient_id→profiles, turn_number,
    │        │             amount, status)
    │        │
    │        └─── reminders (id, group_id, member_id, channel, status)
```

---

## Règles de routage Next.js 15

| Route | Accès | Protection |
|---|---|---|
| `/` | Public | Redirect → `/auth` ou `/dashboard` |
| `/auth` | Public | Redirect → `/dashboard` si connecté |
| `/dashboard` | Privé | middleware → `/auth` si non connecté |
| `/groups` | Privé | middleware → `/auth` si non connecté |
| `/groups/new` | Privé (organisateur) | middleware + role check |
| `/groups/[id]` | Privé (membre du groupe) | middleware + RLS Supabase |
| `/join/[code]` | Public | Aucune — invitation ouverte |
| `/profile` | Privé | middleware |

---

## Stratégie offline (Sprint 7)

```
Requête Supabase
    ↓
Hook useGroups vérifie si réseau disponible
    ├─ OUI → fetch Supabase → stocke dans IndexedDB → retourne data
    └─ NON → lit IndexedDB → retourne data en cache
                ↓
         Action utilisateur (ex: marquer payé)
                ↓
         Stockée dans queue IndexedDB
                ↓
         Workbox Background Sync détecte réseau
                ↓
         Rejoue les requêtes en attente
```
