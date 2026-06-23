'use client'

import Spinner from '@/components/ui/Spinner'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
type ButtonSize    = 'sm' | 'md' | 'lg'

interface ButtonProps {
  variant?:   ButtonVariant
  size?:      ButtonSize
  loading?:   boolean
  disabled?:  boolean
  fullWidth?: boolean
  leftIcon?:  React.ReactNode
  rightIcon?: React.ReactNode
  type?:      'button' | 'submit' | 'reset'
  onClick?:   () => void
  children:   React.ReactNode
  className?: string
}

/* ── Styles par variante ────────────────────────────────────────────────── */
const VARIANT_STYLES: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    background:  'var(--color-gold)',
    color:       'var(--color-night)',
    border:      'none',
  },
  secondary: {
    background:  'transparent',
    color:       'var(--color-text-secondary)',
    border:      '0.5px solid var(--color-border-light)',
  },
  ghost: {
    background:  'transparent',
    color:       'var(--color-text-secondary)',
    border:      'none',
  },
  danger: {
    background:  'rgba(226, 75, 74, 0.12)',
    color:       'var(--color-red)',
    border:      '0.5px solid rgba(240, 149, 149, 0.2)',
  },
}

/* ── Hauteur par taille ────────────────────────────────────────────────── */
const SIZE_STYLES: Record<ButtonSize, React.CSSProperties> = {
  sm: { height: '40px', fontSize: '13px', padding: '0 1rem' },
  md: { height: '52px', fontSize: '15px', padding: '0 1.5rem' },
  lg: { height: '56px', fontSize: '16px', padding: '0 1.75rem' },
}

/* ── Couleur du spinner selon la variante ──────────────────────────────── */
const SPINNER_COLOR: Record<ButtonVariant, string> = {
  primary:   'var(--color-night)',
  secondary: 'var(--color-text-secondary)',
  ghost:     'var(--color-text-secondary)',
  danger:    'var(--color-red)',
}

/**
 * Composant bouton unifié.
 *
 * Usage :
 * ```tsx
 * <Button onClick={handleSave} loading={saving}>
 *   Sauvegarder
 * </Button>
 *
 * <Button variant="secondary" leftIcon={<Share2 size={16} />}>
 *   Partager
 * </Button>
 *
 * <Button variant="danger" size="sm">
 *   Supprimer le groupe
 * </Button>
 * ```
 */
export default function Button({
  variant   = 'primary',
  size      = 'md',
  loading   = false,
  disabled  = false,
  fullWidth = true,
  leftIcon,
  rightIcon,
  type      = 'button',
  onClick,
  children,
  className = '',
}: ButtonProps) {

  const isDisabled = disabled || loading

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={className}
      style={{
        /* Layout */
        display:        'inline-flex',
        alignItems:     'center',
        justifyContent: 'center',
        gap:            '0.5rem',
        width:          fullWidth ? '100%' : 'auto',
        borderRadius:   'var(--radius-full)',
        fontFamily:     'var(--font-sans)',
        fontWeight:     500,
        cursor:         isDisabled ? 'not-allowed' : 'pointer',
        transition:     'opacity 0.15s, transform 0.1s',
        opacity:        isDisabled ? 0.45 : 1,
        /* Variante et taille */
        ...VARIANT_STYLES[variant],
        ...SIZE_STYLES[size],
      }}
      /* Feedback tactile : légère compression au press */
      onMouseDown={e => {
        if (!isDisabled) (e.currentTarget as HTMLElement).style.transform = 'scale(0.97)'
      }}
      onMouseUp={e => {
        (e.currentTarget as HTMLElement).style.transform = 'scale(1)'
      }}
      onTouchStart={e => {
        if (!isDisabled) (e.currentTarget as HTMLElement).style.transform = 'scale(0.97)'
      }}
      onTouchEnd={e => {
        (e.currentTarget as HTMLElement).style.transform = 'scale(1)'
      }}
    >
      {/* Spinner OU icône gauche — jamais les deux en même temps */}
      {loading
        ? <Spinner size="sm" color={SPINNER_COLOR[variant]} />
        : leftIcon
      }

      {/* Texte principal */}
      <span style={{ opacity: loading ? 0.7 : 1 }}>
        {children}
      </span>

      {/* Icône droite — masquée pendant le chargement */}
      {!loading && rightIcon}
    </button>
  )
}