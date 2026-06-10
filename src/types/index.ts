
/* ═══════════════════════════════════════════════════════════════════════════
   LIKELEMBAAPP — Types TypeScript partagés
   Source de vérité pour tous les types du projet.
   Importer depuis '@/types' dans chaque fichier qui en a besoin.
   NE JAMAIS redéfinir un type ailleurs dans l'app.
   ═══════════════════════════════════════════════════════════════════════════ */
 
 
/* ═══════════════════════════════════════════════════════════════════════════
   UNIONS — Types à valeurs fixes
   On utilise 'type' (pas 'interface') pour les unions de strings.
   Avantage : TypeScript refuse toute valeur non listée.
   Ex: status: 'actif' → erreur TypeScript car 'actif' ∉ GroupStatus
   ═══════════════════════════════════════════════════════════════════════════ */

   export type UserRole  = 'member' | 'organizer';
   export type GroupStatus = 'active' | 'paused' | 'completed';
   export type ContribStatus = 'pending' | 'paid' | 'late';
   export type PaymentMethod = 'airtel_money' | 'orange_money' | 'Mpesa' | 'cash' | 'manual';
   export type NotifChannel = 'email' | 'sms' | 'push' | 'in_app' | 'whatsapp';
   export type GroupFrequency = 'weekly' | 'biweekly' | 'monthly';
   export type Currency = 'USD' | 'CDF' ;
   export type PayoutStatus = 'pending' | 'paid';
   export type ReminderStatus = 'sent' | 'delivered' | 'failed';
   export type SubscriptionPlan = 'free' | 'organizer' | 'pro';


   
/* ═══════════════════════════════════════════════════════════════════════════
   ENTITÉS — Correspondent exactement aux tables Supabase
   On utilise 'interface' pour les objets de données.
   Chaque champ correspond à une colonne de la base de données.
   ═══════════════════════════════════════════════════════════════════════════ */

   /* ── Profil utilisateur ──────────────────────────────────────────────────── */
   export interface Profile{
     id: string                    // uuid — même ID que auth.users
     email: string;
     phone: string                 // format E.164 : +243970000000
     name: string | null           // null si l'utilisateur n'a pas encore complété son profil
     avatar_url: string | null     // URL Supabase Storage (null = avatar généré)
     role: UserRole                // 'member' par défaut, 'organizer' si abonnement actif
     mobile_money_number: string | null  // numéro pour recevoir les versements
     reliability_score: number     // 0–100, calculé depuis l'historique des cotisations
     created_at: string            // ISO 8601 : "2025-01-15T09:30:00Z"
     updated_at: string
   }

   /* ── Groupe likelemba ────────────────────────────────────────────────────── */

   export interface Group {
  id: string
  name: string
  organizer_id: string          // référence profiles.id
  cotisation_amount: number     // montant en CDF (ex: 10000)
  currency: Currency            // 'CDF' dans 99% des cas
  frequency: GroupFrequency     // 'weekly' | 'biweekly' | 'monthly'
  start_date: string            // ISO date : "2025-01-20"
  total_turns: number           // nombre de membres = nombre de tours
  current_turn: number          // tour en cours (1 à total_turns)
  status: GroupStatus
  description: string | null
  invite_code: string           // code court unique pour /join/[code]
  created_at: string
  updated_at: string
}

/* ── Membre d'un groupe ──────────────────────────────────────────────────── */
export interface GroupMember {
  id: string
  group_id: string              // référence groups.id
  user_id: string               // référence profiles.id
  turn_order: number            // position dans l'ordre de réception (1, 2, 3...)
  joined_at: string
}

/* ── Cotisation ──────────────────────────────────────────────────────────── */
export interface Contribution {
  id: string
  group_id: string
  member_id: string             // référence profiles.id
  turn_number: number           // pour quel tour cette cotisation est faite
  amount: number                // en CDF
  status: ContribStatus
  paid_at: string | null        // null si pas encore payé
  payment_method: PaymentMethod | null
  tx_ref: string | null         // référence transaction Airtel/Orange Money
  created_at: string
}

/* ── Versement de cagnotte ───────────────────────────────────────────────── */
export interface Payout {
  id: string
  group_id: string
  recipient_id: string          // référence profiles.id — qui reçoit la cagnotte
  turn_number: number
  amount: number                // montant total (cotisation × nb membres)
  status: PayoutStatus
  paid_at: string | null
  created_at: string
}

/* ── Rappel envoyé ───────────────────────────────────────────────────────── */
export interface Reminder {
  id: string
  group_id: string
  member_id: string
  sent_at: string
  channel: NotifChannel
  status: ReminderStatus
}
 
 
/* ═══════════════════════════════════════════════════════════════════════════
   TYPES ENRICHIS — Entités avec leurs relations chargées
   Supabase peut retourner des jointures (select avec relations).
   Ces types représentent les données avec les relations incluses.
   ═══════════════════════════════════════════════════════════════════════════ */

/* Groupe avec l'organisateur et les membres chargés */
export interface GroupWithMembers extends Group {
  organizer: Profile
  group_members: (GroupMember & {
    profile: Profile
  })[]
}

/* Membre avec son profil et sa cotisation pour le tour actuel */
export interface MemberWithContribution extends GroupMember {
  profile: Profile
  current_contribution: Contribution | null
}

/* Contribution avec le profil du membre */
export interface ContributionWithProfile extends Contribution {
  profile: Profile
}

/* ═══════════════════════════════════════════════════════════════════════════
   TYPES UTILITAIRES — Pour les formulaires et les états UI
   ═══════════════════════════════════════════════════════════════════════════ */

/* État async générique — utilisé dans tous les hooks */
export interface AsyncState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

/* Données du formulaire de création de groupe */
export interface CreateGroupForm {
  name: string
  cotisation_amount: number
  frequency: GroupFrequency
  total_turns: number
  description?: string
  currency: Currency
}
 
/* Données du formulaire de profil */
export interface UpdateProfileForm {
  name: string
  mobile_money_number?: string
}

/* Option pour le sélecteur d'opérateur Mobile Money */
export interface MobileMoneyOption {
  id: PaymentMethod
  label: string
  color: string           // couleur hex de l'opérateur
  prefix: string          // préfixe du numéro (ex: "+243 97" pour Airtel)
  logo: string            // emoji ou chemin d'icône
}

/* Résultat d'une opération de paiement Mobile Money */
export interface PaymentResult {
  success: boolean
  tx_ref: string | null
  message: string         // toujours en français, lisible par l'utilisateur
}


/* ═══════════════════════════════════════════════════════════════════════════
   CONSTANTES — Valeurs fixes utilisées dans toute l'app
   ═══════════════════════════════════════════════════════════════════════════ */

/* Opérateurs Mobile Money disponibles en RDC */
export const MOBILE_MONEY_OPTIONS: MobileMoneyOption[] = [
  {
    id: 'airtel_money',
    label: 'Airtel Money',
    color: '#EF9F27',
    prefix: '+243 97',
    logo: '🟠',
  },
  {
    id: 'orange_money',
    label: 'Orange Money',
    color: '#FF6600',
    prefix: '+243 84',
    logo: '🟡',
  },
  {
    id: 'Mpesa',
    label: 'M-Pesa',
    color: '#0080FF',
    prefix: '+243 84',
    logo: '🟡',
  },
  {
    id: 'manual',
    label: 'Paiement cash',
    color: '#5DCAA5',
    prefix: '',
    logo: '💵',
  },
]

/* Labels lisibles pour les fréquences */
export const FREQUENCY_LABELS: Record<GroupFrequency, string> = {
  weekly:   'Chaque semaine',
  biweekly: 'Toutes les 2 semaines',
  monthly:  'Chaque mois',
}

/* Couleurs des avatars générées depuis l'initiale du nom.
   Usage : AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length] */
export const AVATAR_COLORS: { bg: string; text: string }[] = [
  { bg: '#0F6E56', text: '#5DCAA5' },   // teal
  { bg: '#3C3489', text: '#AFA9EC' },   // purple
  { bg: '#633806', text: '#FAC775' },   // amber
  { bg: '#501313', text: '#F09595' },   // red
  { bg: '#26215C', text: '#AFA9EC' },   // deep purple
  { bg: '#085041', text: '#5DCAA5' },   // deep teal
]


/* Limites métier */
export const LIMITS = {
  MIN_TURNS:           2,
  MAX_TURNS:           50,
  MIN_AMOUNT_CDF:      500,
  MAX_AMOUNT_CDF:      10_000_000,
  MAX_GROUP_NAME_LEN:  50,
  OTP_LENGTH:          6,
  OTP_EXPIRY_SECONDS:  600,      // 10 minutes
  RESEND_COOLDOWN_SEC: 60,
} as const


/* ═══════════════════════════════════════════════════════════════════════════
   FONCTIONS UTILITAIRES PURES — Sans effets de bord, sans state
   ═══════════════════════════════════════════════════════════════════════════ */

/**
 * Formate un montant en CDF ou USD.
 * Ex: formatCurrency(10000)       → "10 000 CDF"
 * Ex: formatCurrency(1, 'USD')    → "$1.00"
 */
export function formatCurrency(
  amount: number,
  currency: Currency = 'CDF'
): string {
  if (currency === 'USD') {
    return `$${amount.toFixed(2)}`
  }
  // Séparateur de milliers = espace (format français)
  return `${amount.toLocaleString('fr-FR')} CDF`
}

/**
 * Normalise un numéro de téléphone congolais au format E.164.
 * Accepte : "0970000000", "+243970000000", "970000000", "243970000000"
 * Retourne null si le format est invalide.
 */

export function normalizePhone(input: string): string | null {
  // Supprime espaces, tirets, parenthèses
  const digits = input.replace(/[\s\-\(\)\.]/g, '')
 
  if (digits.startsWith('+243') && digits.length === 13) return digits
  if (digits.startsWith('243') && digits.length === 12)  return `+${digits}`
  if (digits.startsWith('0') && digits.length === 10)    return `+243${digits.slice(1)}`
  if (digits.length === 9)                               return `+243${digits}`
 
  return null
}

/**
 * Masque un numéro de téléphone pour l'affichage.
 * Ex: "+243970001234" → "+243 97 *** 1234"
 */
export function maskPhone(phone: string): string {
  return phone.replace(
    /(\+243)(\d{2})(\d{3})(\d{4})/,
    '$1 $2 *** $4'
  )
}
 
/**
 * Calcule la progression d'un groupe en pourcentage.
 * Ex: progress(7, 12) → 58
 */
export function groupProgress(current: number, total: number): number {
  if (total === 0) return 0
  return Math.round((current / total) * 100)
}
 
/**
 * Retourne la couleur d'avatar pour un nom donné.
 * Déterministe : le même nom retourne toujours la même couleur.
 */
export function getAvatarColor(name: string): { bg: string; text: string } {
  const index = name.charCodeAt(0) % AVATAR_COLORS.length
  return AVATAR_COLORS[index]
}
 
/**
 * Retourne les initiales d'un nom (1 ou 2 lettres).
 * Ex: "Mama Céleste" → "MC"
 * Ex: "Jean" → "J"
 */
export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0][0].toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}
 