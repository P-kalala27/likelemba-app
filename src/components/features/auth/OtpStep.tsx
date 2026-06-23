'use client'

import { useState, useEffect, useRef } from 'react'
import { LIMITS } from '@/types'

interface OtpStepProps {
  email: string
  onSubmit: (code: string) => Promise<void>
  onBack: () => void
  onResend: () => Promise<void>
  error: string | null
  isPending: boolean
}

/**
 * Étape 2 du flux d'authentification : saisie du code OTP à 6 chiffres.
 *
 * Comportements clés :
 * - 6 cases séparées, navigation automatique entre elles
 * - Support du paste complet (Android auto-remplissage SMS)
 * - Auto-submit dès que les 6 chiffres sont saisis
 * - Countdown de 60s avant de pouvoir renvoyer le SMS
 */
export default function OtpStep({
  email, onSubmit, onBack, onResend, error, isPending,
}: OtpStepProps) {
  const [digits, setDigits]     = useState<string[]>(Array(LIMITS.OTP_LENGTH).fill(''))
  const [loading, setLoading]   = useState(false)
  const [countdown, setCountdown] = useState<number>(LIMITS.RESEND_COOLDOWN_SEC)
  const [resending, setResending] = useState(false)

  /* Référence vers chaque input pour gérer le focus programmatiquement */
  const inputRefs = useRef<(HTMLInputElement | null)[]>(
    Array(LIMITS.OTP_LENGTH).fill(null)
  )

  /* ── Countdown du renvoi SMS ─────────────────────────────────────────── */
  useEffect(() => {
    if (countdown <= 0) return
    const timer = setTimeout(() => setCountdown(c => c - 1), 1000)
    return () => clearTimeout(timer)
  }, [countdown])

  /* ── Focus automatique sur la première case au montage ───────────────── */
  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  /* ── Auto-submit dès que les 6 chiffres sont remplis ──────────────────── */
  useEffect(() => {
    const code = digits.join('')
    if (code.length === LIMITS.OTP_LENGTH && !loading) {
      handleSubmit(code)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [digits])

  async function handleSubmit(code: string) {
    setLoading(true)
    await onSubmit(code)
    setLoading(false)
  }

  /**
   * Gère la saisie d'un chiffre dans une case.
   * Gère aussi le cas où l'utilisateur (ou Android) colle le code entier
   * dans une seule case — on répartit alors les chiffres automatiquement.
   */
  function handleDigitChange(index: number, value: string) {
    /* Cas paste : value contient plusieurs caractères */
    if (value.length > 1) {
      const pasted = value.replace(/\D/g, '').slice(0, LIMITS.OTP_LENGTH)
      const newDigits = Array(LIMITS.OTP_LENGTH).fill('')
      pasted.split('').forEach((digit, i) => { newDigits[i] = digit })
      setDigits(newDigits)

      /* Focus sur la dernière case remplie (ou la dernière case si tout est rempli) */
      const lastFilledIndex = Math.min(pasted.length - 1, LIMITS.OTP_LENGTH - 1)
      inputRefs.current[lastFilledIndex]?.focus()
      return
    }

    /* Cas normal : un seul chiffre */
    const digit = value.replace(/\D/g, '')
    const newDigits = [...digits]
    newDigits[index] = digit
    setDigits(newDigits)

    /* Avancer automatiquement à la case suivante */
    if (digit && index < LIMITS.OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  /**
   * Gère la touche Backspace : si la case actuelle est vide,
   * effacer la case précédente et y revenir.
   */
  function handleKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      const newDigits = [...digits]
      newDigits[index - 1] = ''
      setDigits(newDigits)
      inputRefs.current[index - 1]?.focus()
    }
  }

  async function handleResend() {
    setResending(true)
    setDigits(Array(LIMITS.OTP_LENGTH).fill(''))
    setCountdown(LIMITS.RESEND_COOLDOWN_SEC)
    await onResend()
    setResending(false)
    inputRefs.current[0]?.focus()
  }

  const code     = digits.join('')
  const isFilled = code.length === LIMITS.OTP_LENGTH

  return (
    <div className="animate-fade-up">

      {/* ── Bouton retour ─────────────────────────────────────────────── */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 mb-6 btn-ghost"
        style={{ padding: 0 }}
      >
        <svg
          width="16" height="16" viewBox="0 0 24 24"
          fill="none" stroke="currentColor"
          strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        <span className="text-sm">Changer d&apos;email</span>
      </button>

      {/* ── Titre ─────────────────────────────────────────────────────── */}
      <div className="mb-8">
        <h1
          className="text-[26px] font-medium mb-2 leading-tight"
          style={{ color: 'var(--color-text-gold)' }}
        >
          Code de vérification
        </h1>
        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          On a envoyé un code à 6 chiffres à{' '}
          <span className="font-medium" style={{ color: 'var(--color-text-gold)' }}>
            {maskEmail(email)}
          </span>
        </p>
      </div>

      {/* ── Les 6 cases OTP ───────────────────────────────────────────── */}
      <div
        className="flex gap-2 mb-6"
        role="group"
        aria-label="Code de vérification à 6 chiffres"
      >
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={el => { inputRefs.current[index] = el }}
            type="tel"
            inputMode="numeric"
            /* autoComplete="one-time-code" sur la 1ère case :
               permet à Android/iOS de proposer le remplissage auto depuis SMS */
            autoComplete={index === 0 ? 'one-time-code' : 'off'}
            /* maxLength=6 (pas 1) : permet de recevoir le code complet
               via le paste, qu'on traite ensuite dans handleDigitChange */
            maxLength={LIMITS.OTP_LENGTH}
            value={digit}
            onChange={e => handleDigitChange(index, e.target.value)}
            onKeyDown={e => handleKeyDown(index, e)}
            disabled={loading || isPending}
            aria-label={`Chiffre ${index + 1} sur ${LIMITS.OTP_LENGTH}`}
            className="text-center font-medium"
            style={{
              width: '100%',
              height: '56px',
              fontSize: '22px',
              background: digit ? 'rgba(232,213,183,0.08)' : 'var(--color-surface-3)',
              border: `0.5px solid ${digit ? 'var(--color-border-gold)' : 'var(--color-border)'}`,
              borderRadius: 'var(--radius-md)',
              color: 'var(--color-text-gold)',
              outline: 'none',
              transition: 'border-color 0.15s, background 0.15s',
              caretColor: 'var(--color-gold)',
            }}
          />
        ))}
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
          <p className="text-[13px] leading-relaxed" style={{ color: 'var(--color-red)' }}>
            {error}
          </p>
        </div>
      )}

      {/* ── Bouton de confirmation manuelle (filet de sécurité) ────────── */}
      <button
        onClick={() => isFilled && handleSubmit(code)}
        className="btn-primary text-[15px] mb-4"
        disabled={!isFilled || loading || isPending}
      >
        {loading || isPending ? (
          <span style={{ opacity: 0.7 }}>Vérification...</span>
        ) : (
          'Confirmer le code'
        )}
      </button>

      {/* ── Renvoi du SMS avec countdown ──────────────────────────────── */}
      <div className="text-center">
        {countdown > 0 ? (
          <p className="text-[13px]" style={{ color: 'var(--color-text-muted)' }}>
            Renvoyer le code dans{' '}
            <span className="font-medium" style={{ color: 'var(--color-text-secondary)' }}>
              {countdown}s
            </span>
          </p>
        ) : (
          <button
            onClick={handleResend}
            disabled={resending}
            className="text-[13px] btn-ghost"
            style={{
              color: 'var(--color-gold)',
              opacity: resending ? 0.5 : 1,
              padding: 0,
            }}
          >
            {resending ? 'Envoi en cours...' : 'Renvoyer le SMS'}
          </button>
        )}
      </div>

      {/* ── Aide contextuelle ─────────────────────────────────────────── */}
      <div className="mt-8 card">
        <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
          💡{' '}
          <strong className="font-medium" style={{ color: 'var(--color-text-secondary)' }}>
            Pas d&apos;email reçu ?
          </strong>{' '}
          Vérifie ton dossier spam ou courrier indésirable. L&apos;email peut
          prendre jusqu&apos;à 1 minute pour arriver.
        </p>
      </div>
    </div>
  )
}

/**
 * Masque une adresse email pour l'affichage.
 * Ex: "celeste@gmail.com" → "ce***@gmail.com"
 */
function maskEmail(email: string): string {
  const [local, domain] = email.split('@')
  if (!domain) return email
  const visible = local.slice(0, 2)
  return `${visible}${'*'.repeat(Math.max(local.length - 2, 3))}@${domain}`
}