'use client'

import { useState } from 'react'

/* ── Props ────────────────────────────────────────────────────────────────
   onSubmit : fonction async fournie par la page parente (auth/page.tsx)
              qui envoie l'OTP par email via Supabase.
   error    : message d'erreur affiché si l'envoi échoue (vient du parent). */
interface EmailStepProps {
  onSubmit: (email: string) => Promise<void>
  error: string | null
}

/**
 * Étape 1 du flux d'authentification : saisie de l'email.
 *
 * NOTE TEMPORAIRE (Sprint 1-5) :
 * On utilise l'email plutôt que le SMS car Supabase l'envoie gratuitement
 * et sans limite, pendant qu'on valide le produit avec de vrais utilisateurs.
 * Au Sprint 6+, ce composant sera remplacé par PhoneStep.tsx (déjà prêt,
 * conservé dans le projet) une fois Africa's Talking configuré pour les SMS.
 */
export default function EmailStep({ onSubmit, error }: EmailStepProps) {
  const [email, setEmail]     = useState('')
  const [loading, setLoading] = useState(false)

  /* Validation simple — Supabase refera une validation complète côté serveur */
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isValid || loading) return

    setLoading(true)
    await onSubmit(email)
    setLoading(false)
  }

  return (
    <div className="animate-fade-up">

      {/* ── Titre et description ──────────────────────────────────────── */}
      <div className="mb-8">
        <h1
          className="text-[28px] font-medium mb-2 leading-tight"
          style={{ color: 'var(--color-text-gold)' }}
        >
          Bienvenue sur<br />Likelemba
        </h1>
        <p
          className="text-sm"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          Entre ton adresse email pour continuer.
          On t&apos;envoie un code de vérification.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate>

        {/* ── Champ email ────────────────────────────────────────────── */}
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-xs font-medium mb-2"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Adresse email
          </label>

          <input
            id="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="exemple@gmail.com"
            disabled={loading}
            autoFocus
            className="input text-base"
          />
        </div>

        {/* ── Message d'erreur ──────────────────────────────────────────── */}
        {error && (
          <div
            className="flex items-start gap-2 p-3 rounded-xl mb-4 animate-fade-up"
            style={{
              background: 'rgba(226, 75, 74, 0.1)',
              border: '0.5px solid rgba(240, 149, 149, 0.2)',
            }}
            role="alert"
          >
            <svg
              width="16" height="16" viewBox="0 0 24 24"
              fill="none" stroke="var(--color-red)"
              strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
              aria-hidden="true"
              style={{ flexShrink: 0, marginTop: '1px' }}
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p
              className="text-[13px] leading-relaxed"
              style={{ color: 'var(--color-red)' }}
            >
              {error}
            </p>
          </div>
        )}

        {/* ── Bouton d'envoi ─────────────────────────────────────────────── */}
        <button
          type="submit"
          className="btn-primary text-[15px]"
          disabled={!isValid || loading}
        >
          {loading ? (
            <span style={{ opacity: 0.7 }}>Envoi en cours...</span>
          ) : (
            <>
              Recevoir le code par email
              <svg
                width="16" height="16" viewBox="0 0 24 24"
                fill="none" stroke="currentColor"
                strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </>
          )}
        </button>
      </form>

      {/* ── Note de confidentialité ──────────────────────────────────────── */}
      <p
        className="text-center mt-6 text-xs leading-relaxed"
        style={{ color: 'var(--color-text-muted)' }}
      >
        En continuant, tu acceptes nos{' '}
        <a href="/terms" style={{ color: 'var(--color-gold)' }}>
          Conditions d&apos;utilisation
        </a>.
        {' '}Ton email est utilisé uniquement pour ta connexion.
      </p>
    </div>
  )
}