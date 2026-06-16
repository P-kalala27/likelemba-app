'use client'
import React, { useState } from "react"

/* ── Props ────────────────────────────────────────────────────────────────
   onSubmit : fonction async fournie par la page parente (auth/page.tsx)
              qui envoie l'OTP via Supabase.
   error    : message d'erreur affiché si l'envoi échoue (vient du parent). */

interface PhoneStepProps {
    onSubmit: (phone: string) => Promise<void>
    error: string | null
}

/**
 * Étape 1 du flux d'authentification : saisie du numéro de téléphone.
 *
 * Composant "présentationnel" — toute la logique métier (normalisation,
 * appel API) est gérée par le parent. Ce composant gère uniquement :
 * - L'état local du champ de saisie
 * - L'état de chargement local (pendant l'envoi du SMS)
 * - L'affichage
 */

export default function PhoneStep({onSubmit, error}: PhoneStepProps) {
    const  [phone, setPhone] = useState('')
    const [loading, setLoading] = useState(false)

     /* Un numéro congolais local fait 9 chiffres (ex: 970000000) */
    
    const isValid = phone.length >= 9

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if(!isValid || loading) return 

        setLoading(true)
        await onSubmit(phone)
        setLoading(false)
    }

    /* Ne garder que les chiffres, limiter à 10 (au cas où l'utilisateur
     tape un 0 au début par habitude — normalizePhone() le gère côté parent) */
    
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const digitsOnly = e.target.value.replace(/\D/g, '').slice(0,10)
        setPhone(digitsOnly)
    }

    return(
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
          Entre ton numéro de téléphone pour continuer.
          On t&apos;envoie un code par SMS.
        </p>
      </div>
 
      <form onSubmit={handleSubmit} noValidate>
 
        {/* ── Champ téléphone avec préfixe pays ─────────────────────────── */}
        <div className="mb-3">
          <label
            htmlFor="phone"
            className="block text-xs font-medium mb-2"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Numéro de téléphone
          </label>
 
          <div className="flex items-center gap-2">
 
            {/* Préfixe pays — non modifiable, juste informatif */}
            <div
              className="flex items-center gap-1.5 px-3 h-[52px] rounded-xl flex-shrink-0 text-sm"
              style={{
                background: 'var(--color-surface-3)',
                border: '0.5px solid var(--color-border)',
                color: 'var(--color-text-secondary)',
              }}
            >
              <span aria-hidden="true">🇨🇩</span>
              <span>+243</span>
            </div>
 
            {/* Input principal — clavier numérique forcé via inputMode */}
            <input
              id="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={phone}
              onChange={handleChange}
              placeholder="970 000 000"
              disabled={loading}
              autoFocus
              className="input flex-1 text-base tracking-wide"
            />
 
          </div>
        </div>
 
        {/* ── Badges opérateurs supportés ───────────────────────────────── */}
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          <span
            className="text-[11px]"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Compatible avec
          </span>
          {['Airtel', 'Orange', 'Vodacom', 'Africell'].map(operator => (
            <span key={operator} className="badge badge-gold">
              {operator}
            </span>
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
            <span style={{ opacity: 0.7 }}>Envoi du SMS...</span>
          ) : (
            <>
              Recevoir le code SMS
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
        {' '}Ton numéro est utilisé uniquement pour ta connexion.
      </p>
    </div>
    )
}