# Library Docs — LikelembaApp
# Référence rapide des APIs des librairies utilisées

> Ce fichier évite d'aller chercher la documentation à chaque fois.
> Claude Code doit s'y référer pour utiliser correctement chaque librairie.

---

## Next.js 15 — App Router

### Navigation
```typescript
import { useRouter } from 'next/navigation'
import { redirect }  from 'next/navigation'  // Server Components
import Link          from 'next/link'

// Client Component
const router = useRouter()
router.push('/dashboard')
router.back()
router.refresh()  // Re-fetch Server Components sans rechargement de page

// Server Component
redirect('/auth')  // Redirect côté serveur

// Lien (préféré au router.push pour la navigation standard)
<Link href="/groups/new">Créer un groupe</Link>
```

### Params et SearchParams
```typescript
// Server Component — page.tsx
interface PageProps {
  params: Promise<{ id: string }>          // Next.js 15 : params est une Promise
  searchParams: Promise<{ redirect?: string }>
}

export default async function Page({ params, searchParams }: PageProps) {
  const { id } = await params
  const { redirect } = await searchParams
}

// Client Component — useParams
import { useParams, useSearchParams } from 'next/navigation'
const { id } = useParams<{ id: string }>()
```

### Server Actions
```typescript
'use server'

export async function createGroup(formData: FormData) {
  const name = formData.get('name') as string
  // ... logique serveur
}
```

### Metadata et Viewport
```typescript
// page.tsx ou layout.tsx — Server uniquement
import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'Mes groupes | LikelembaApp',
}

export const viewport: Viewport = {
  themeColor: '#0f0f1a',
}
```

---

## Supabase — Auth

### OTP SMS (inscription + connexion)
```typescript
import { getSupabaseBrowser } from '@/lib/supabase/browser'
const supabase = getSupabaseBrowser()

// Étape 1 : Envoyer l'OTP
const { error } = await supabase.auth.signInWithOtp({
  phone: '+243970000000',  // TOUJOURS format E.164
  options: { channel: 'sms' }
})

// Étape 2 : Vérifier l'OTP
const { data, error } = await supabase.auth.verifyOtp({
  phone: '+243970000000',
  token: '123456',
  type: 'sms',
})
// data.session contient le JWT si succès

// Déconnexion
await supabase.auth.signOut()
```

### Récupérer la session (Client)
```typescript
// Hook natif Supabase
const { data: { session } } = await supabase.auth.getSession()
const { data: { user } }    = await supabase.auth.getUser()

// Écouter les changements de session
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN')  console.log('Connecté')
  if (event === 'SIGNED_OUT') router.push('/auth')
})
```

---

## Supabase — Database (CRUD)

### SELECT
```typescript
// Simple
const { data, error } = await supabase
  .from('groups')
  .select('*')

// Avec filtres
const { data, error } = await supabase
  .from('groups')
  .select('id, name, status')
  .eq('organizer_id', userId)
  .eq('status', 'active')
  .order('created_at', { ascending: false })

// Avec jointure (relations)
const { data, error } = await supabase
  .from('groups')
  .select(`
    *,
    organizer:profiles(id, name, avatar_url),
    group_members(
      id, turn_order,
      profile:profiles(id, name, phone)
    )
  `)
  .eq('id', groupId)
  .single()  // retourne un objet au lieu d'un tableau

// Avec pagination
const { data, error, count } = await supabase
  .from('groups')
  .select('*', { count: 'exact' })
  .range(0, 9)  // page 1, 10 éléments
```

### INSERT
```typescript
const { data, error } = await supabase
  .from('groups')
  .insert({
    name: 'Groupe Bureau',
    organizer_id: userId,
    cotisation_amount: 10000,
    frequency: 'weekly',
    total_turns: 12,
  })
  .select()   // retourne les données insérées
  .single()
```

### UPDATE
```typescript
const { error } = await supabase
  .from('contributions')
  .update({ status: 'paid', paid_at: new Date().toISOString() })
  .eq('id', contributionId)
  .eq('member_id', userId)  // double sécurité RLS
```

### DELETE
```typescript
const { error } = await supabase
  .from('group_members')
  .delete()
  .eq('group_id', groupId)
  .eq('user_id', userId)
```

---

## Supabase — Realtime

```typescript
// S'abonner aux changements d'une table
const channel = supabase
  .channel('group-contributions')
  .on(
    'postgres_changes',
    {
      event: '*',              // INSERT | UPDATE | DELETE | *
      schema: 'public',
      table: 'contributions',
      filter: `group_id=eq.${groupId}`,
    },
    (payload) => {
      console.log('Changement:', payload)
      // payload.new = nouvelles données
      // payload.old = anciennes données
      // payload.eventType = 'INSERT' | 'UPDATE' | 'DELETE'
    }
  )
  .subscribe()

// Se désabonner (dans le cleanup useEffect)
return () => {
  supabase.removeChannel(channel)
}
```

---

## Supabase — Storage

```typescript
// Upload d'une photo de profil
const { data, error } = await supabase.storage
  .from('avatars')
  .upload(`${userId}/avatar.jpg`, file, {
    contentType: 'image/jpeg',
    upsert: true,  // remplacer si existe
  })

// URL publique
const { data: { publicUrl } } = supabase.storage
  .from('avatars')
  .getPublicUrl(`${userId}/avatar.jpg`)
```

---

## idb-keyval — Stockage offline

```typescript
import { get, set, del, keys } from 'idb-keyval'

// Stocker des données
await set('groups', JSON.stringify(groups))

// Récupérer
const raw = await get('groups')
const groups = raw ? JSON.parse(raw) : []

// Supprimer
await del('groups')

// Lister toutes les clés
const allKeys = await keys()

// Pattern recommandé pour le cache Supabase
const CACHE_KEY = (groupId: string) => `group:${groupId}`
await set(CACHE_KEY(groupId), JSON.stringify(groupData))
const cached = await get(CACHE_KEY(groupId))
```

---

## Lucide React — Icônes

```typescript
import {
  Home, Users, ArrowLeftRight, User,     // Bottom nav
  ChevronRight, ChevronLeft, ArrowLeft,  // Navigation
  Plus, X, Check, AlertCircle,           // Actions
  Phone, CreditCard, Wallet,             // Paiements
  Bell, BellOff,                         // Notifications
  WifiOff,                               // Offline
  Share2,                                // Partage
  Loader2,                               // Spinner (animate-spin)
  Pig, PiggyBank,                        // Logo related
} from 'lucide-react'

// Usage standard
<Home size={22} strokeWidth={1.5} />

// Spinner animé
<Loader2 size={20} className="animate-spin" />
```

---

## Tailwind v4 — Spécificités

### Plus de fichier tailwind.config.js
```css
/* Tout est dans globals.css via @theme */
@import "tailwindcss";

@theme {
  --color-gold: #e8d5b7;
  /* → génère automatiquement les classes text-gold, bg-gold, border-gold */
}
```

### Valeurs arbitraires (toujours préférer les tokens)
```tsx
// Toléré pour des valeurs uniques
<div className="h-[52px] max-w-[480px]" />

// Interdit si le token existe
<div className="text-[#e8d5b7]" />  // ❌ Utiliser text-gold
```

### Responsive — JAMAIS sur ce projet
```tsx
// ❌ INTERDIT (app mobile uniquement)
<div className="md:flex-row" />

// ✅ CORRECT (mobile uniquement)
<div className="flex-col" />
```
