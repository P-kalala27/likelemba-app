# Code Standards — LikelembaApp

> Ces règles s'appliquent à TOUS les fichiers sans exception.
> Claude Code doit les respecter dans chaque génération de code.

---

## 1. TypeScript

### Toujours strict — jamais de `any`
```typescript
// ❌ INTERDIT
function getGroup(id: any) { ... }

// ✅ CORRECT
function getGroup(id: string): Promise<Group | null> { ... }
```

### Typer les retours de fonction
```typescript
// ❌ INTERDIT — retour implicite
async function fetchGroups() {
  return supabase.from('groups').select('*')
}

// ✅ CORRECT — retour explicite
async function fetchGroups(): Promise<Group[]> {
  const { data, error } = await supabase.from('groups').select('*')
  if (error || !data) return []
  return data
}
```

### Interfaces pour les objets de données, types pour les unions
```typescript
// ✅ Interface pour les objets métier
interface Group {
  id: string
  name: string
  status: GroupStatus
}

// ✅ Type pour les unions/primitives
type GroupStatus = 'active' | 'paused' | 'completed'
type PaymentMethod = 'airtel_money' | 'orange_money' | 'cash'
```

---

## 2. Composants React

### Toujours des composants fonctionnels avec types explicites
```typescript
// ❌ INTERDIT
export default function GroupCard(props) { ... }

// ✅ CORRECT
interface GroupCardProps {
  group: Group
  onPress?: () => void
}

export default function GroupCard({ group, onPress }: GroupCardProps) { ... }
```

### Server vs Client Components — règle claire
```typescript
// Server Component (défaut dans App Router) — PAS de 'use client'
// → Pas de hooks, pas d'événements, données fetchées directement
export default async function GroupsPage() {
  const groups = await fetchGroups()  // fetch direct côté serveur
  return <GroupList groups={groups} />
}

// Client Component — TOUJOURS déclarer 'use client' en première ligne
'use client'
// → Peut utiliser useState, useEffect, event handlers
export default function GroupCard({ group }: GroupCardProps) {
  const [expanded, setExpanded] = useState(false)
  ...
}
```

### Règle : descendre 'use client' au plus bas possible
```
Page (Server) → Layout (Server) → Card (Server) → Button (Client ← seulement ici)
```
Cela réduit le JS envoyé au client → app plus rapide sur 3G.

---

## 3. Gestion des erreurs — TOUJOURS explicite

```typescript
// ❌ INTERDIT — erreur silencieuse
const { data } = await supabase.from('groups').select('*')
return data

// ✅ CORRECT — toujours vérifier error
const { data, error } = await supabase.from('groups').select('*')
if (error) {
  console.error('[fetchGroups]', error.message)
  return []
}
return data ?? []
```

### Pour les erreurs utilisateur (UI)
```typescript
// Toujours des messages en français, adaptés au contexte
const ERROR_MESSAGES: Record<string, string> = {
  'rate_limit':    'Trop de tentatives. Attends 60 secondes.',
  'invalid_otp':   'Code incorrect. Vérifie le SMS et réessaie.',
  'network':       'Pas de connexion. Vérifie ton réseau.',
  'generic':       'Une erreur est survenue. Réessaie.',
}
```

---

## 4. Nommage

| Élément | Convention | Exemple |
|---|---|---|
| Composants | PascalCase | `GroupCard`, `PhoneStep` |
| Hooks | camelCase + `use` | `useGroups`, `useSession` |
| Fonctions utilitaires | camelCase | `formatCurrency`, `normalizePhone` |
| Constantes | SCREAMING_SNAKE | `MAX_GROUP_MEMBERS`, `OTP_LENGTH` |
| Types/Interfaces | PascalCase | `Group`, `GroupMember` |
| Fichiers composants | PascalCase | `GroupCard.tsx` |
| Fichiers utils/hooks | camelCase | `useGroups.ts`, `utils.ts` |
| Variables CSS | kebab-case | `--color-gold`, `--radius-md` |

---

## 5. Structure d'un composant (ordre des sections)

```typescript
'use client' // si nécessaire

// 1. Imports externes
import { useState } from 'react'
import { ChevronRight } from 'lucide-react'

// 2. Imports internes (types, lib, hooks)
import type { Group } from '@/types'
import { formatCurrency } from '@/lib/utils'

// 3. Types/Interfaces du composant
interface GroupCardProps {
  group: Group
  onPress?: () => void
}

// 4. Composant principal (export default)
export default function GroupCard({ group, onPress }: GroupCardProps) {
  // 4a. Hooks
  const [expanded, setExpanded] = useState(false)

  // 4b. Handlers
  function handlePress() {
    setExpanded(!expanded)
    onPress?.()
  }

  // 4c. JSX
  return (
    <div onClick={handlePress}>
      ...
    </div>
  )
}

// 5. Sous-composants internes (si nécessaire)
function GroupCardSkeleton() { ... }

// 6. Fonctions utilitaires locales (si nécessaire)
function computeProgress(current: number, total: number): number {
  return Math.round((current / total) * 100)
}
```

---

## 6. Styling — Tailwind v4

### Utiliser les variables CSS du design system, pas les valeurs brutes
```tsx
// ❌ INTERDIT — valeur hardcodée
<div style={{ background: '#1a1a2e' }}>

// ✅ CORRECT — variable CSS du design system
<div style={{ background: 'var(--color-surface-2)' }}>

// ✅ AUSSI CORRECT — classe Tailwind si mappée dans @theme
<div className="bg-night-mid">
```

### Ordre des classes Tailwind (lisibilité)
```tsx
// Ordre : layout → dimensions → spacing → typography → colors → effects
<div className="flex flex-col w-full px-5 py-4 text-sm font-medium text-gold rounded-xl border border-border-light">
```

### Jamais d'inline style pour les animations
```tsx
// ❌ INTERDIT
<div style={{ transition: 'all 0.3s ease' }}>

// ✅ CORRECT — classe CSS dédiée
<div className="transition-all duration-300 ease-smooth">
```

---

## 7. Accessibilité (a11y) — non négociable

```tsx
// Toujours un aria-label sur les boutons sans texte visible
<button aria-label="Fermer la modale">
  <X size={20} />
</button>

// Toujours un alt sur les images
<img src={avatar} alt={`Photo de ${name}`} />

// Rôles sémantiques sur les éléments interactifs
<nav aria-label="Navigation principale">
<main>
<header>
```

---

## 8. Performance — règles spécifiques Kinshasa

```typescript
// Images : toujours next/image avec width/height explicites
import Image from 'next/image'
<Image src={url} alt={alt} width={48} height={48} />

// Lazy loading des composants lourds
const BottomSheet = dynamic(() => import('@/components/ui/BottomSheet'), {
  loading: () => <div className="h-screen" />,
})

// Pas de dépendances lourdes côté client
// ❌ import moment from 'moment'  // 67KB
// ✅ import { format } from 'date-fns/format'  // 2KB tree-shaken
```

---

## 9. Commentaires

```typescript
// ✅ Commenter le POURQUOI, pas le QUOI
// Normaliser en +243 car Supabase Auth n'accepte que le format E.164
const normalized = `+243${digits.slice(1)}`

// ✅ Commenter les décisions spécifiques au contexte Kinshasa
// Timeout de 30s car les API Airtel Money peuvent être lentes en RDC
const AIRTEL_TIMEOUT_MS = 30_000

// ❌ INUTILE — commentaire évident
// Retourne le nom de l'utilisateur
function getUserName() { ... }
```
