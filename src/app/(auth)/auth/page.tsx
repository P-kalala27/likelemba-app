'use client'

import { Suspense, useState, useTransition } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { getSupabaseBrowser } from '@/lib/supabase/browser'
import EmailStep from '@/components/features/auth/EmailStep'
import OtpStep from '@/components/features/auth/OtpStep'

/* Les deux étapes possibles du flux d'authentification */
type AuthStep = 'email' | 'otp'

/**
 * Page d'authentification — orchestrateur du flux OTP.
 *
 * NOTE TEMPORAIRE (Sprint 1-5) : auth par EMAIL, pas par téléphone.
 * Raison : Supabase envoie les OTP email gratuitement et sans limite,
 * alors que les SMS nécessitent un provider payant (Africa's Talking).
 * On garde PhoneStep.tsx dans le projet (non utilisé pour l'instant) —
 * il sera réactivé au Sprint 6+ quand le SMS sera configuré et qu'on
 * aura des vrais utilisateurs payants pour justifier le coût.
 *
 * Flux complet :
 * 1. EmailStep  → utilisateur saisit son email
 * 2. handleSendOtp → Supabase envoie un code par email
 * 3. OtpStep    → utilisateur saisit le code à 6 chiffres
 * 4. handleVerifyOtp → Supabase vérifie le code
 * 5. Succès     → redirect vers /dashboard (ou l'URL d'origine)
 */
function AuthPageContent() {
  const router       = useRouter()
  const searchParams = useSearchParams()
  const supabase     = getSupabaseBrowser()

  /* État du flux */
  const [step,  setStep]  = useState<AuthStep>('email')
  const [email, setEmail] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  /* useTransition : marque la navigation comme non-urgente.
     Empêche le freeze de l'UI pendant la redirection vers /dashboard. */
  const [isPending, startTransition] = useTransition()

  /* ── Étape 1 : Envoyer l'OTP par email ───────────────────────────────── */
  async function handleSendOtp(rawEmail: string) {
    setError(null)

    const { error: supabaseError } = await supabase.auth.signInWithOtp({
      email: rawEmail,
      options: {
        /* shouldCreateUser: true = crée un compte si l'email est nouveau.
           Le trigger Supabase créera automatiquement le profil (schema.sql). */
        shouldCreateUser: true,
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (supabaseError) {
      /* Traduire les erreurs techniques en messages lisibles */
      if (supabaseError.message.includes('rate limit')) {
        setError('Trop de tentatives. Attends 60 secondes avant de réessayer.')
      } else if (supabaseError.message.includes('invalid')) {
        setError('Cette adresse email n\'est pas valide.')
      } else {
        setError('Impossible d\'envoyer l\'email. Vérifie ta connexion réseau.')
      }
      return
    }

    /* Email envoyé avec succès → passer à l'étape OTP */
    setEmail(rawEmail)
    setStep('otp')
  }

  /* ── Étape 2 : Vérifier l'OTP ────────────────────────────────────────── */
  async function handleVerifyOtp(code: string) {
    setError(null)

    const { error: supabaseError } = await supabase.auth.verifyOtp({
      email,
      token: code,
      type: 'email',
    })

    if (supabaseError) {
      if (supabaseError.message.includes('expired')) {
        setError('Code expiré. Demande un nouveau code.')
      } else if (supabaseError.message.includes('invalid')) {
        setError('Code incorrect. Vérifie l\'email et réessaie.')
      } else {
        setError('Erreur de vérification. Réessaie.')
      }
      return
    }

    /* Vérification réussie → rediriger vers la destination */
    startTransition(() => {
      /* Si l'utilisateur était sur une route protégée avant de se connecter,
         on le renvoie là-bas. Sinon, dashboard par défaut. */
      const redirectTo = searchParams.get('redirect') ?? '/dashboard'
      router.push(redirectTo)
      router.refresh() /* Force le rechargement des Server Components */
    })
  }

  /* ── Renvoyer l'OTP ──────────────────────────────────────────────────── */
  async function handleResendOtp() {
    await handleSendOtp(email)
  }

  /* ── Retour à l'étape email ──────────────────────────────────────────── */
  function handleBack() {
    setStep('email')
    setError(null)
  }

  return (
    <main className="flex flex-col flex-1 safe-top">

      {/* Logo en haut à gauche */}
      <div className="flex items-center gap-2 px-5 py-5">
        <div
          className="w-8 h-8 flex items-center justify-center rounded-[10px]"
          style={{
            background: 'var(--color-surface-2)',
            border: '0.5px solid var(--color-border-gold)',
          }}
        >
          <svg
            width="16" height="16" viewBox="0 0 24 24"
            fill="none" stroke="var(--color-gold)"
            strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M19 9c0-3.87-3.13-7-7-7S5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17a1 1 0 001 1h6a1 1 0 001-1v-2.26C17.81 13.47 19 11.38 19 9z" />
            <line x1="19" y1="9" x2="21" y2="9" />
          </svg>
        </div>
        <span
          className="text-[15px] font-medium"
          style={{ color: 'var(--color-text-gold)' }}
        >
          Likelemba
        </span>
      </div>

      {/* Zone de contenu — centrée verticalement */}
      <div className="flex-1 flex flex-col justify-center px-5 pb-8">

        {/* Rendu conditionnel selon l'étape courante */}
        {step === 'email' ? (
          <EmailStep
            onSubmit={handleSendOtp}
            error={error}
          />
        ) : (
          <OtpStep
            email={email}
            onSubmit={handleVerifyOtp}
            onBack={handleBack}
            onResend={handleResendOtp}
            error={error}
            isPending={isPending}
          />
        )}

      </div>
    </main>
  )
}

/**
 * Wrapper avec Suspense — requis par Next.js 15 pour useSearchParams().
 * Sans ça, le build échoue car Next ne peut pas prérender la page.
 */
export default function AuthPage() {
  return (
    <Suspense>
      <AuthPageContent />
    </Suspense>
  )
}