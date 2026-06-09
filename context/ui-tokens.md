# UI Tokens — LikelembaApp
# Source de vérité pour toutes les valeurs de design

> Ces tokens sont définis dans `src/app/globals.css` via `@theme {}`.
> Ne jamais utiliser de valeurs brutes (#hex, px) dans les composants.
> Toujours référencer ces tokens via `var(--nom)` ou les classes Tailwind.

---

## Couleurs

### Palette de marque
| Token | Valeur | Usage |
|---|---|---|
| `--color-night` | `#0f0f1a` | Fond le plus profond (body, surfaces primaires) |
| `--color-night-mid` | `#1a1a2e` | Cards, modals, surfaces surélevées |
| `--color-night-light` | `#252545` | Elements au-dessus des cards (inputs, chips) |
| `--color-gold` | `#e8d5b7` | Couleur d'accent principale, textes importants, CTA |
| `--color-gold-muted` | `#c4b48a` | Gold moins prononcé (placeholders, subtitles) |
| `--color-teal` | `#5dcaa5` | Succès, confirmations, actions positives |
| `--color-teal-dark` | `#1d9e75` | Backgrounds teal (badges, highlights) |
| `--color-teal-deep` | `#0f6e56` | Avatars teal sombres |
| `--color-amber` | `#ef9f27` | Avertissements, en attente, Airtel Money |
| `--color-amber-dark` | `#854f0b` | Backgrounds amber |
| `--color-red` | `#f09595` | Erreurs, retards de paiement |
| `--color-red-dark` | `#e24b4a` | Backgrounds erreur |
| `--color-purple` | `#afa9ec` | Éléments décoratifs, avatars secondaires |
| `--color-purple-dark` | `#534ab7` | Backgrounds purple |

### Surfaces (dark-first)
| Token | Valeur | Usage |
|---|---|---|
| `--color-surface-1` | `#0f0f1a` | Fond de page |
| `--color-surface-2` | `#1a1a2e` | Cards de premier niveau |
| `--color-surface-3` | `#252545` | Inputs, éléments dans les cards |
| `--color-surface-4` | `rgba(255,255,255,0.04)` | Hover states |

### Bordures
| Token | Valeur | Usage |
|---|---|---|
| `--color-border` | `rgba(255,255,255,0.08)` | Bordure standard |
| `--color-border-light` | `rgba(255,255,255,0.14)` | Bordure légèrement visible |
| `--color-border-gold` | `rgba(232,213,183,0.2)` | Bordure accent (cards actives) |

### Texte
| Token | Valeur | Usage |
|---|---|---|
| `--color-text-primary` | `#ffffff` | Corps de texte principal |
| `--color-text-secondary` | `rgba(255,255,255,0.6)` | Texte secondaire, descriptions |
| `--color-text-muted` | `rgba(255,255,255,0.35)` | Labels, placeholders, métadonnées |
| `--color-text-gold` | `#e8d5b7` | Titres, éléments importants |

---

## Typographie

### Police
```css
--font-display: 'DM Sans', sans-serif;
--font-body:    'DM Sans', sans-serif;
```

**Pourquoi DM Sans ?**
- Très lisible sur petits écrans Android
- Excellent rendu à 12-14px (tailles fréquentes en mobile)
- Chargement rapide (Google Fonts, 2 weights seulement)
- Caractère moderne sans être générique

### Échelle typographique

| Usage | Taille | Poids | Token classe |
|---|---|---|---|
| Titre de page (h1) | 28px | 500 | `text-[28px] font-medium` |
| Titre de section (h2) | 22px | 500 | `text-[22px] font-medium` |
| Titre de card (h3) | 16px | 500 | `text-base font-medium` |
| Corps principal | 14px | 400 | `text-sm` |
| Corps secondaire | 13px | 400 | `text-[13px]` |
| Label / Caption | 12px | 400 | `text-xs` |
| Micro / Badge | 10-11px | 500 | `text-[10px] font-medium` |
| Montant CDF (important) | 22-28px | 500 | `text-[22px] font-medium` |

### Ligne de base
```css
line-height: 1.6;      /* Corps de texte */
line-height: 1.25;     /* Titres */
line-height: 1.55;     /* Descriptions */
```

---

## Espacements

```css
/* Padding horizontal des pages */
--page-px: 20px;   /* px-5 */

/* Padding vertical des sections */
--section-py: 16px; /* py-4 */

/* Gap entre cards */
--gap-cards: 10px;  /* gap-2.5 */

/* Padding interne des cards */
--card-p: 16px 20px; /* p-4 px-5 */

/* Hauteur de la bottom nav */
--bottom-nav-h: 64px;

/* Hauteur des inputs et boutons */
--input-h: 52px;
--btn-h: 52px;
```

---

## Rayons (border-radius)

| Token | Valeur | Usage |
|---|---|---|
| `--radius-sm` | `8px` | Petits éléments (badges, chips) |
| `--radius-md` | `12px` | Inputs, petites cards |
| `--radius-lg` | `16px` | Cards principales |
| `--radius-xl` | `24px` | Bottom sheets, modals |
| `--radius-full` | `9999px` | Pills, boutons arrondis, avatars |

---

## Ombres

```css
/* Ombre légère pour cards surélevées */
--shadow-card: 0 1px 3px rgba(0,0,0,0.4);

/* Ombre de la bottom nav */
--shadow-nav: 0 -1px 0 rgba(255,255,255,0.06);

/* Ombre pour les bottom sheets */
--shadow-sheet: 0 -8px 32px rgba(0,0,0,0.6);
```

---

## Animations

```css
/* Easing standard */
--ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);

/* Durées */
--duration-fast:   100ms;  /* Feedback immédiat (press) */
--duration-normal: 200ms;  /* Transitions standard */
--duration-slow:   350ms;  /* Entrées de page, bottom sheets */
```

### Classes d'animation prédéfinies
```css
.animate-fade-up           { animation: fadeUp 0.4s ease both; }
.animate-fade-up-delay-1   { animation: fadeUp 0.4s 0.1s ease both; }
.animate-fade-up-delay-2   { animation: fadeUp 0.4s 0.2s ease both; }
.animate-slide-up          { animation: slideUp 0.35s ease both; }
```

---

## Breakpoints

LikelembaApp est **mobile-only**. Il n'y a qu'un seul breakpoint utile :

| Token | Valeur | Usage |
|---|---|---|
| `max-w-[480px]` | 480px | Largeur max du conteneur app |
| Pas de `md:` ou `lg:` | — | On n'utilise jamais ces breakpoints |

---

## Couleurs sémantiques des statuts

| Statut | Couleur texte | Couleur fond | Couleur bordure |
|---|---|---|---|
| `paid` / succès | `--color-teal` | `rgba(29,158,117,0.1)` | `rgba(93,202,165,0.2)` |
| `pending` / attente | `--color-amber` | `rgba(239,159,39,0.1)` | `rgba(239,159,39,0.2)` |
| `late` / erreur | `--color-red` | `rgba(226,75,74,0.1)` | `rgba(240,149,149,0.2)` |
| `active` / info | `--color-purple` | `rgba(175,169,236,0.1)` | `rgba(175,169,236,0.2)` |
| neutre | `--color-text-muted` | `var(--color-surface-3)` | `var(--color-border)` |

---

## Couleurs des avatars (générées depuis l'initiale du nom)

```typescript
const AVATAR_COLORS = [
  { bg: '#0F6E56', text: '#5DCAA5' },  // teal
  { bg: '#3C3489', text: '#AFA9EC' },  // purple
  { bg: '#633806', text: '#FAC775' },  // amber
  { bg: '#501313', text: '#F09595' },  // red
  { bg: '#26215C', text: '#AFA9EC' },  // deep purple
  { bg: '#085041', text: '#5DCAA5' },  // deep teal
]

// Usage : AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length]
```
