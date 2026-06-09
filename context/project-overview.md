# LikelembaApp — Project Overview

## Vision

LikelembaApp digitalise les tontines collectives (likelemba) à Kinshasa, RDC.
Une tontine = un groupe de personnes qui cotisent régulièrement, et chaque membre
reçoit la cagnotte à son tour. Aujourd'hui c'est géré à la main : carnet papier,
WhatsApp, confiance orale. On remplace ça par une PWA mobile transparente et fiable.

---

## Le problème réel

- Arnaques fréquentes (animateur qui disparaît avec la cagnotte)
- Disputes sur qui a payé quoi (carnet perdu, mémoire défaillante)
- Aucune traçabilité, aucune preuve de paiement
- Zéro outil numérique adapté au contexte congolais (Mobile Money, offline, lingala)

---

## Les utilisateurs

### Animateur de groupe (client payant)
- Gère 1 à 10 groupes likelemba dans son entourage
- Collègues de bureau, membres d'église, voisins de quartier
- Paie 3 000 CDF/groupe/mois (~$1)
- Besoin : transparence, moins de courses derrière les membres, preuve de paiement

### Membre du groupe (gratuit)
- Participe à 1 ou plusieurs groupes
- Veut voir son statut, son tour, les autres membres
- Paie sa cotisation via Airtel Money ou Orange Money
- Besoin : confiance dans le système, rappels automatiques, reçus

---

## Marché

- **Ville cible :** Kinshasa, RDC (15M+ habitants)
- **Marché secondaire :** Lubumbashi, Goma, Brazzaville (an 2)
- **TAM (Total Addressable Market) :** millions de participants à des likelemba en RDC
- **Concurrence :** zéro solution numérique locale sérieuse sur ce segment

---

## Contraintes techniques impératives

Ces contraintes ne sont PAS négociables. Tout le code doit en tenir compte.

| Contrainte | Raison | Impact code |
|---|---|---|
| Offline-first | Réseau 3G instable à Kinshasa | IndexedDB + Workbox sync |
| Mobile-first 375px | 95% des users sur Android entrée de gamme | Jamais de layout desktop-first |
| Connexion lente | 3G partagée, données limitées | Bundle < 200KB, images optimisées |
| Pas de carte bancaire | Majorité non bancarisée | Mobile Money UNIQUEMENT |
| OTP par SMS | Pas de compte Google/Apple actif | Auth téléphone, pas OAuth |
| Android bas de gamme | Galaxy A12, 2GB RAM, Android 10 | Pas d'animations lourdes, pas de WebGL |
| Langue | Français + termes lingala naturels | UI en français, pas en anglais |

---

## Modèle économique

```
Membre       → GRATUIT (rejoindre et participer à des groupes)
Animateur    → 3 000 CDF/groupe/mois  (~$1)
Pro Animateur → 12 000 CDF/mois       (~$4) — groupes illimités
```

**Objectifs MRR :**
- Mois 3  : $300  (30 groupes payants — beta fermée)
- Mois 6  : $600  (60 groupes — lancement public)
- Mois 12 : $1500 (150 groupes)
- An 2    : $10K  (expansion Lubumbashi + fonctionnalités fintech)

---

## Stack décidée (non négociable pour la cohérence)

```
Frontend  : Next.js 15 (App Router) + Tailwind CSS v4
Auth      : Supabase Auth (OTP SMS via Africa's Talking)
Database  : Supabase PostgreSQL + Row Level Security
Realtime  : Supabase Realtime (WebSocket)
Offline   : IndexedDB via idb-keyval + Workbox (Sprint 7)
Paiements : Airtel Money API + Orange Money API (Sprint 8-9)
Notifs    : WhatsApp Business Cloud API (Sprint 6)
Hosting   : Vercel (Edge Functions pour les webhooks)
```

---

## Ce que ce projet N'EST PAS

- Pas une banque (on ne détient jamais l'argent des utilisateurs)
- Pas une app de crédit ou de prêt (Sprint 10+ potentiellement)
- Pas une app desktop (PWA mobile uniquement)
- Pas multilingue au lancement (français d'abord)
