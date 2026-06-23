'use client'

import { useState } from 'react'

interface InputProps {
  /* Label affiché au-dessus du champ */
  label?:        string
  placeholder?:  string
  value?:        string
  onChange?:     (value: string) => void
  /* Message d'erreur — colore la bordure en rouge et affiche le message */
  error?:        string | null
  /* Message d'aide discret sous le champ (grisé) */
  hint?:         string
  /* Élément affiché à gauche dans le champ (ex: flag + préfixe) */
  prefix?:       React.ReactNode
  /* Texte ou élément à droite dans le champ (ex: "CDF", "kg") */
  suffix?:       string
  disabled?:     boolean
  inputMode?:    'text' | 'numeric' | 'tel' | 'email' | 'decimal'
  autoComplete?: string
  autoFocus?:    boolean
  maxLength?:    number
  type?:         'text' | 'email' | 'password' | 'tel'
  name?:         string
  id?:           string
  required?:     boolean
}

/**
 * Champ de saisie unifié.
 *
 * Usage :
 * ```tsx
 * <Input
 *   label="Nom du groupe"
 *   placeholder="Ex: Groupe Bureau BCDC"
 *   value={name}
 *   onChange={setName}
 *   error={errors.name}
 *   hint="Maximum 50 caractères"
 * />
 *
 * <Input
 *   label="Montant de cotisation"
 *   inputMode="numeric"
 *   suffix="CDF"
 *   value={amount}
 *   onChange={setAmount}
 * />
 * ```
 */
export default function Input({
  label,
  placeholder,
  value,
  onChange,
  error,
  hint,
  prefix,
  suffix,
  disabled   = false,
  inputMode  = 'text',
  autoComplete,
  autoFocus  = false,
  maxLength,
  type       = 'text',
  name,
  id,
  required,
}: InputProps) {

  /* État de focus local pour animer la bordure */
  const [focused, setFocused] = useState(false)

  /* Couleur de la bordure selon l'état */
  const borderColor = error
    ? 'var(--color-red)'
    : focused
    ? 'var(--color-gold)'
    : 'var(--color-border)'

  const inputId = id ?? name ?? label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div style={{ width: '100%' }}>

      {/* ── Label ──────────────────────────────────────────────────────── */}
      {label && (
        <label
          htmlFor={inputId}
          style={{
            display:      'block',
            fontSize:     '12px',
            fontWeight:   500,
            marginBottom: '6px',
            color:        error
              ? 'var(--color-red)'
              : 'var(--color-text-muted)',
          }}
        >
          {label}
          {required && (
            <span style={{ color: 'var(--color-red)', marginLeft: '2px' }}>*</span>
          )}
        </label>
      )}

      {/* ── Conteneur du champ ─────────────────────────────────────────── */}
      <div
        style={{
          display:      'flex',
          alignItems:   'center',
          gap:          '8px',
          height:       '52px',
          background:   'var(--color-surface-3)',
          border:       `0.5px solid ${borderColor}`,
          borderRadius: 'var(--radius-md)',
          padding:      '0 1rem',
          transition:   'border-color 0.15s',
          opacity:      disabled ? 0.5 : 1,
        }}
      >
        {/* Préfixe (ex: flag + "+243") */}
        {prefix && (
          <div style={{ flexShrink: 0 }}>
            {prefix}
          </div>
        )}

        {/* Input principal */}
        <input
          id={inputId}
          name={name}
          type={type}
          inputMode={inputMode}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          maxLength={maxLength}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          required={required}
          onChange={e => onChange?.(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            flex:       1,
            height:     '100%',
            background: 'transparent',
            border:     'none',
            outline:    'none',
            color:      'var(--color-text-primary)',
            fontSize:   '15px',
            fontFamily: 'var(--font-sans)',
          }}
        />

        {/* Suffixe (ex: "CDF", "kg") */}
        {suffix && (
          <span
            style={{
              flexShrink: 0,
              fontSize:   '13px',
              color:      'var(--color-text-muted)',
              userSelect: 'none',
            }}
          >
            {suffix}
          </span>
        )}
      </div>

      {/* ── Message d'erreur ou d'aide ─────────────────────────────────── */}
      {(error || hint) && (
        <p
          style={{
            marginTop: '6px',
            fontSize:  '12px',
            color:     error ? 'var(--color-red)' : 'var(--color-text-muted)',
            lineHeight: 1.5,
          }}
          role={error ? 'alert' : undefined}
        >
          {error ?? hint}
        </p>
      )}

    </div>
  )
}