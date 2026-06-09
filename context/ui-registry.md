# UI Registry — LikelembaApp
# Catalogue complet de tous les composants de l'application

> Quand Claude Code crée un nouveau composant, il DOIT l'ajouter ici.
> Avant de créer un composant, vérifier qu'il n'existe pas déjà dans ce registre.

---

## Composants UI atomiques (`src/components/ui/`)

### `Button`
**Fichier :** `src/components/ui/Button.tsx`
**Sprint :** S2
**Variants :** `primary` | `secondary` | `ghost` | `danger`

```tsx
<Button variant="primary" loading={false} disabled={false}>
  Payer 10 000 CDF
</Button>

<Button variant="secondary" leftIcon={<Share2 />}>
  Partager
</Button>

<Button variant="ghost" size="sm">
  Annuler
</Button>
```

**Props :**
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'   // sm=40px, md=52px (défaut), lg=56px
  loading?: boolean
  disabled?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
}
```

---

### `Input`
**Fichier :** `src/components/ui/Input.tsx`
**Sprint :** S2

```tsx
<Input
  label="Montant de la cotisation"
  placeholder="Ex: 10 000"
  inputMode="numeric"
  suffix="CDF"
  error="Le montant doit être supérieur à 0"
  hint="Montant que chaque membre paiera à chaque tour"
/>
```

**Props :**
```typescript
interface InputProps {
  label?: string
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  error?: string
  hint?: string
  prefix?: string | React.ReactNode
  suffix?: string | React.ReactNode
  disabled?: boolean
  inputMode?: 'text' | 'numeric' | 'tel' | 'email'
  autoComplete?: string
  autoFocus?: boolean
  maxLength?: number
}
```

---

### `Badge`
**Fichier :** `src/components/ui/Badge.tsx`
**Sprint :** S2

```tsx
<Badge variant="success">Payé ✓</Badge>
<Badge variant="warning">En attente</Badge>
<Badge variant="error">Retard</Badge>
<Badge variant="info">Tour 7/12</Badge>
<Badge variant="neutral">Nouveau</Badge>
```

**Props :**
```typescript
interface BadgeProps {
  variant: 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'gold'
  size?: 'sm' | 'md'
  children: React.ReactNode
}
```

---

### `Avatar`
**Fichier :** `src/components/ui/Avatar.tsx`
**Sprint :** S2

```tsx
<Avatar name="Mama Céleste" size="md" />
<Avatar name="Jean-Karl" size="sm" src="/uploads/jk.jpg" />
<Avatar name="Groupe Bureau" size="lg" />
```

**Props :**
```typescript
interface AvatarProps {
  name: string           // Utilisé pour les initiales et la couleur dérivée
  src?: string           // URL photo (optionnel)
  size?: 'xs' | 'sm' | 'md' | 'lg'  // 20 | 28 | 36 | 48px
}
```

---

### `Card`
**Fichier :** `src/components/ui/Card.tsx`
**Sprint :** S3

```tsx
<Card>
  <p>Contenu de la card</p>
</Card>

<Card variant="elevated" onPress={() => {}}>
  Contenu cliquable
</Card>

<Card variant="highlight">
  Card avec bordure gold (group actif, tour actuel)
</Card>
```

**Props :**
```typescript
interface CardProps {
  variant?: 'default' | 'elevated' | 'highlight'
  onPress?: () => void
  children: React.ReactNode
  className?: string
}
```

---

### `BottomSheet`
**Fichier :** `src/components/ui/BottomSheet.tsx`
**Sprint :** S4

```tsx
<BottomSheet
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Choisir l'opérateur"
>
  <PaymentMethodPicker />
</BottomSheet>
```

**Props :**
```typescript
interface BottomSheetProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
}
```

---

### `Toast`
**Fichier :** `src/components/ui/Toast.tsx`
**Sprint :** S5

```tsx
// Usage via hook
const { toast } = useToast()
toast.success('Cotisation enregistrée !')
toast.error('Erreur de paiement. Réessaie.')
toast.info('Rappel envoyé à tous les membres.')
```

---

### `Spinner`
**Fichier :** `src/components/ui/Spinner.tsx`
**Sprint :** S2

```tsx
<Spinner size="sm" />  // 16px — dans les boutons
<Spinner size="md" />  // 24px — inline
<Spinner size="lg" />  // 40px — plein écran
```

---

## Composants Layout (`src/components/layout/`)

### `BottomNav`
**Fichier :** `src/components/layout/BottomNav.tsx`
**Sprint :** S2

4 onglets fixes : Accueil | Groupes | Paiements | Profil
Hauteur : 64px + safe area iOS.

```tsx
// Utilisé dans src/app/(app)/layout.tsx
<BottomNav activeTab="dashboard" />
```

**Props :**
```typescript
interface BottomNavProps {
  activeTab: 'dashboard' | 'groups' | 'payments' | 'profile'
}
```

---

### `PageHeader`
**Fichier :** `src/components/layout/PageHeader.tsx`
**Sprint :** S2

```tsx
<PageHeader title="Groupe Bureau BCDC" showBack />
<PageHeader title="Mes groupes" rightAction={<button>+</button>} />
```

**Props :**
```typescript
interface PageHeaderProps {
  title: string
  showBack?: boolean
  onBack?: () => void    // si non fourni, utilise router.back()
  rightAction?: React.ReactNode
  subtitle?: string
}
```

---

## Composants Features (`src/components/features/`)

### `GroupCard`
**Fichier :** `src/components/features/groups/GroupCard.tsx`
**Sprint :** S3

```tsx
<GroupCard
  group={group}
  onPress={() => router.push(`/groups/${group.id}`)}
/>
```

Affiche : nom, montant, fréquence, progression, statut.

---

### `MemberRow`
**Fichier :** `src/components/features/groups/MemberRow.tsx`
**Sprint :** S4

```tsx
<MemberRow
  member={member}
  contribution={contribution}
  isOrganizer={true}
  onMarkPaid={() => handleMarkPaid(member.id)}
/>
```

---

### `ContributionRow`
**Fichier :** `src/components/features/groups/ContributionRow.tsx`
**Sprint :** S5

```tsx
<ContributionRow
  contribution={contribution}
  profile={member.profile}
  showTurn
/>
```

---

### `ProgressBar`
**Fichier :** `src/components/features/groups/ProgressBar.tsx`
**Sprint :** S5

```tsx
<ProgressBar current={7} total={12} color="teal" />
```

---

### `PaymentMethodPicker`
**Fichier :** `src/components/features/payments/PaymentMethodPicker.tsx`
**Sprint :** S8

```tsx
<PaymentMethodPicker
  selected={selectedMethod}
  onSelect={(method) => setSelectedMethod(method)}
  phone={userPhone}
/>
```

---

### `PhoneStep`
**Fichier :** `src/components/features/auth/PhoneStep.tsx`
**Sprint :** S1

```tsx
<PhoneStep
  onSubmit={handleSendOtp}
  error={error}
/>
```

---

### `OtpStep`
**Fichier :** `src/components/features/auth/OtpStep.tsx`
**Sprint :** S1

```tsx
<OtpStep
  phone={phone}
  onSubmit={handleVerifyOtp}
  onBack={handleBack}
  onResend={handleResend}
  error={error}
  isPending={isPending}
/>
```

---

## Hooks (`src/hooks/`)

| Hook | Sprint | Rôle |
|---|---|---|
| `useSession` | S1 | Session utilisateur côté client |
| `useGroups` | S3 | CRUD groupes + cache |
| `useContributions` | S5 | Cotisations d'un groupe + realtime |
| `useOfflineSync` | S7 | Détection réseau + sync queue |
| `useToast` | S5 | Notifications toast |

---

## Règle d'ajout au registre

Quand tu crées un nouveau composant, ajouter dans ce fichier :
1. Le nom et chemin du fichier
2. Le sprint de création
3. Un exemple d'usage minimal
4. L'interface des props TypeScript
