# Progress Tracker — LikelembaApp
# Mise à jour à chaque fichier créé ou sprint terminé

---

## Statut global

| Phase | Statut | MRR actuel |
|---|---|---|
| Sprint 1 — Setup & Auth | 🟡 En cours | $0 |
| Sprint 2 — Profil & Nav | ⬜ À faire | — |
| Sprint 3 — Groupes | ⬜ À faire | — |
| Sprint 4 — Membres | ⬜ À faire | — |
| Sprint 5 — Cotisations | ⬜ À faire | — |
| Sprint 6 — WhatsApp | ⬜ À faire | — |
| Sprint 7 — PWA Offline | ⬜ À faire | — |
| Sprint 8 — Airtel Money | ⬜ À faire | — |
| Sprint 9 — Monétisation | ⬜ À faire | $0 → $300 |
| Sprint 10 — Score | ⬜ À faire | — |
| Sprint 11 — Analytics | ⬜ À faire | — |
| Sprint 12 — Referral | ⬜ À faire | $600 |

---

## Sprint 1 — Setup & Auth OTP

**Objectif :** Connexion SMS OTP fonctionnelle, app déployée sur Vercel.

### Fichiers

| # | Fichier | Statut | Notes |
|---|---|---|---|
| 01 | `package.json` | ✅ Créé | Next.js 15, Tailwind v4, Supabase |
| 02 | `tsconfig.json` | ✅ fait | |
| 03 | `next.config.ts` | ✅ À faire | |
| 04 | `postcss.config.mjs` | ✅ fait| |
| 05 | `.env.local.example` | ✅ fait| |
| 06 | `src/app/globals.css` | ✅fait | Design tokens Tailwind v4 |
| 07 | `src/app/layout.tsx` | ✅ fait| PWA metadata |
| 08 | `src/types/index.ts` | ✅ fait| Tous les types TS |
| 09 | `src/lib/supabase/browser.ts` | ✅fait | |
| 10 | `src/lib/supabase/server.ts` | ✅ fait| |
| 11 | `src/middleware.ts` | ✅fait | Protection des routes |
| 12 | `src/app/page.tsx` | ✅ fait| Redirect racine |
| 13 | `src/app/(auth)/layout.tsx` | ✅ fait |
| 14 | `src/app/(auth)/auth/page.tsx` | ✅ fait  | Orchestrateur auth |
| 15 | `src/components/features/auth/PhoneStep.tsx` | ✅ fait | |
| 16 | `src/components/features/auth/OtpStep.tsx` | ✅ fait | |
| 17 | `src/app/(app)/layout.tsx` | ✅ fait | Layout protégé |
| 18 | `src/app/(app)/dashboard/page.tsx` | ✅ fait | Placeholder S1 |
| 19 | `supabase/schema.sql` | ✅ fait| |
| 20 | `public/manifest.json` | ✅ fait | PWA |
| 21 | `README.md` | ✅ fait  | Instructions setup |

### Checklist de validation finale

- [ ] `npm run dev` → aucune erreur
- [ ] `npm run type-check` → 0 erreur TypeScript
- [ ] `/` redirige vers `/auth` (non connecté)
- [ ] Formulaire téléphone : formats `0970000000` et `+243970000000` acceptés
- [ ] SMS OTP reçu sur vrai numéro congolais
- [ ] 6 cases OTP : navigation automatique OK
- [ ] Paste code SMS Android OK
- [ ] Après OTP valide → `/dashboard`
- [ ] `/dashboard` bloqué sans session
- [ ] `/manifest.json` accessible

---

## Sprint 2 — Profil & Navigation ⬜

**Prérequis :** Sprint 1 checklist 100% validée

| # | Fichier | Statut |
|---|---|---|
| 01 | `src/components/ui/Button.tsx` | ⬜ |
| 02 | `src/components/ui/Input.tsx` | ⬜ |
| 03 | `src/components/ui/Avatar.tsx` | ⬜ |
| 04 | `src/components/ui/Spinner.tsx` | ⬜ |
| 05 | `src/components/layout/BottomNav.tsx` | ⬜ |
| 06 | `src/components/layout/PageHeader.tsx` | ⬜ |
| 07 | `src/hooks/useSession.ts` | ⬜ |
| 08 | `src/app/(app)/profile/page.tsx` | ⬜ |
| 09 | `src/app/(app)/layout.tsx` (mise à jour) | ⬜ |
| 10 | `src/app/(app)/dashboard/page.tsx` (mise à jour) | ⬜ |

---

## Décisions techniques prises

> Documenter ici chaque décision importante pour ne pas y revenir.

| Date | Décision | Raison |
|---|---|---|
| S1 | Next.js 15 au lieu de 16 | v16 inexistante. v15 = LTS stable |
| S1 | Africa's Talking pour SMS | Moins cher que Twilio en RDC, supporte Airtel/Orange |
| S1 | DM Sans au lieu d'Inter | Meilleur rendu sur Android bas de gamme |
| S1 | Tailwind v4 | Plus de config JS, tokens CSS natifs |
| S1 | idb-keyval pour offline | API plus simple que Dexie.js, bundle < 5KB |

---

## Bugs connus

> Documenter ici les bugs identifiés et leur statut.

| Bug | Sprint | Statut |
|---|---|---|
| — | — | — |

---

## Comment mettre à jour ce fichier

Après chaque fichier créé :
1. Changer `⬜ À faire` en `✅ Créé`
2. Ajouter une note si une décision importante a été prise
3. Cocher la checklist quand les tests sont passés
