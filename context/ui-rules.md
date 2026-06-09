# UI Rules — LikelembaApp
# Règles d'interface non négociables pour le contexte Kinshasa

---

## Règle 1 : Mobile-first absolu

- Largeur de référence : **375px** (iPhone SE / Galaxy A12)
- Jamais de layout qui nécessite un écran > 480px
- Jamais de `hover:` comme seule interaction (les téléphones n'ont pas de hover)
- Toujours tester le design avec la main tenant le téléphone : le pouce atteint-il tous les éléments importants ?

```
Zone d'accès pouce (droitier) :
┌──────────────────┐
│   Zone difficile │  ← navigation, actions secondaires
│                  │
│   Zone normale   │  ← contenu, labels
│                  │
│   Zone facile ✓  │  ← CTA principal, bottom nav
└──────────────────┘
```

---

## Règle 2 : Tailles des zones cliquables

- Zone touchable minimum : **44px × 44px** (Apple HIG / Android Material)
- Boutons principaux : hauteur **52px minimum**
- Bottom nav : hauteur **64px**, icônes **22px**
- Cases OTP : hauteur **56px**, largeur proportionnelle

```tsx
// ❌ INTERDIT — trop petit
<button className="p-1 text-xs">Payer</button>

// ✅ CORRECT — taille suffisante
<button className="h-[52px] px-6 text-sm">Payer</button>
```

---

## Règle 3 : États de chargement — toujours explicites

Sur une connexion 3G lente, une action peut prendre 2-5 secondes.
L'utilisateur DOIT voir que quelque chose se passe.

```tsx
// Toujours désactiver le bouton + montrer un état pendant l'action
<button disabled={loading} className="btn-primary">
  {loading ? 'Envoi en cours...' : 'Payer 10 000 CDF'}
</button>
```

**Règle des 3 états :** tout élément interactif doit avoir :
1. État normal
2. État chargement (loading)
3. État erreur

---

## Règle 4 : Messages d'erreur — toujours en français, toujours utiles

```tsx
// ❌ INTERDIT — message technique inutile
"Error: network request failed with status 503"

// ❌ INTERDIT — trop vague
"Une erreur est survenue."

// ✅ CORRECT — actionnable et en contexte
"Pas de connexion. Vérifie que tu as du réseau et réessaie."
"Code incorrect. Vérifie le SMS et entre les 6 chiffres."
"Airtel Money indisponible. Essaie Orange Money à la place."
```

---

## Règle 5 : Montants toujours en CDF

```tsx
// ❌ INTERDIT — confusant pour les Kinois
"1.00 USD" ou "1$"

// ✅ CORRECT — format local
"10 000 CDF"    // séparateur de milliers = espace
"120 000 CDF"   // pas de décimales pour les CDF

// Conversion USD uniquement dans les paramètres d'abonnement
"3 000 CDF/mois (~$1)"  // avec approximation entre parenthèses
```

---

## Règle 6 : Feedback visuel immédiat sur les actions

```tsx
// Tout bouton doit avoir un feedback visuel au press (< 100ms)
<button
  style={{ transition: 'transform 0.1s' }}
  onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
  onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
>
```

En Tailwind : `active:scale-[0.97] transition-transform`

---

## Règle 7 : Indicateur de mode offline

Quand l'utilisateur n'a pas de réseau, toujours l'indiquer clairement.

```tsx
// Bandeau en haut de page quand offline
{!isOnline && (
  <div className="bg-amber/20 border-b border-amber/30 px-5 py-2 flex items-center gap-2">
    <WifiOff size={14} className="text-amber" />
    <span className="text-xs text-amber">Mode hors-ligne — données en cache</span>
  </div>
)}
```

---

## Règle 8 : Hiérarchie des CTA

Chaque écran ne peut avoir qu'**un seul bouton primaire** (gold plein).
Les actions secondaires sont en outline ou texte.

```
Hiérarchie :
1. btn-primary (gold plein)     → action principale de la page
2. btn-secondary (outline)      → action alternative
3. Lien texte (underline)       → action tertiaire
4. Icône seule (avec label)     → action utilitaire
```

---

## Règle 9 : Listes vides — toujours un état vide significatif

```tsx
// ❌ INTERDIT — liste vide sans explication
{groups.length === 0 && <div />}

// ✅ CORRECT — état vide guidant l'utilisateur
{groups.length === 0 && (
  <div className="flex flex-col items-center py-12 text-center">
    <div className="w-14 h-14 rounded-2xl bg-surface-2 flex items-center justify-center mb-4">
      <Users size={24} className="text-gold opacity-50" />
    </div>
    <p className="text-[15px] font-medium text-gold mb-1">Aucun groupe pour l'instant</p>
    <p className="text-sm text-muted max-w-[220px]">
      Crée ton premier groupe likelemba et invite tes membres.
    </p>
    <button className="btn-primary mt-6 max-w-[200px]">
      Créer un groupe
    </button>
  </div>
)}
```

---

## Règle 10 : Bottom sheet pour les actions contextuelles

Ne jamais naviguer vers une nouvelle page pour des actions rapides
(confirmer, choisir un opérateur, voir les détails).
Utiliser un `BottomSheet` à la place.

```
Actions en bottom sheet :
- Choisir un opérateur Mobile Money
- Confirmer un paiement
- Options sur un membre (rappel, voir historique)
- Partager un lien d'invitation

Actions en page dédiée :
- Créer un groupe (formulaire long)
- Modifier le profil
- Voir l'historique complet
```

---

## Règle 11 : Skeleton screens pour les chargements

Jamais de spinner seul pour le chargement des listes.
Toujours un skeleton qui reflète la forme du contenu à venir.

```tsx
function GroupCardSkeleton() {
  return (
    <div className="card animate-pulse">
      <div className="h-4 bg-surface-3 rounded w-3/4 mb-2" />
      <div className="h-3 bg-surface-3 rounded w-1/2" />
    </div>
  )
}
```

---

## Règle 12 : Navigation — toujours indiquer où on est

```tsx
// Bottom nav : onglet actif visible avec couleur gold + label
// Page interne : bouton retour en haut à gauche TOUJOURS

// Fil d'Ariane textuel sur les pages profondes
// "Groupes › Bureau BCDC › Cotisations"
```

---

## Règle 13 : Formulaires

- Un seul formulaire par écran (jamais deux formulaires superposés)
- Le clavier mobile ne doit pas cacher le bouton de submit
  → Utiliser `pb-[env(keyboard-inset-height)]` ou placer le CTA avant les inputs
- `inputMode="tel"` pour les numéros de téléphone et montants
- `autoComplete` toujours défini sur les inputs connus
- `autoFocus` uniquement sur le premier input d'un flux

```tsx
// Montant en CDF — clavier numérique
<input
  type="text"
  inputMode="numeric"
  pattern="[0-9]*"
  placeholder="Ex: 10 000"
/>
```

---

## Anti-patterns interdits

```
❌ Modals plein écran (utiliser BottomSheet)
❌ Tooltips (pas de hover sur mobile)
❌ Texte en dessous de 11px (illisible sur Android bas de gamme)
❌ Contraste texte/fond < 4.5:1 (accessibilité WCAG AA)
❌ Animations > 400ms (lent sur vieux Android)
❌ Images sans dimensions explicites (layout shift)
❌ Lancer une requête réseau sans état de chargement
❌ Redirect silencieuse sans feedback utilisateur
❌ Formulaire qui se réinitialise après une erreur (perdre les données saisies)
```
