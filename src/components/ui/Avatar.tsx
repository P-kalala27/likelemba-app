import Image from 'next/image'
import { getAvatarColor, getInitials } from '@/types'

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg'

interface AvatarProps {
  /* Nom utilisé pour générer les initiales et la couleur de fond.
     Toujours requis même si src est fourni (pour l'alt text). */
  name: string
  /* URL d'une photo de profil (Supabase Storage). Optionnel. */
  src?: string | null
  size?: AvatarSize
  className?: string
}

/* Correspondance taille → pixels */
const SIZE_PX: Record<AvatarSize, number> = {
  xs: 20,
  sm: 28,
  md: 36,
  lg: 48,
}

/* Correspondance taille → taille du texte des initiales */
const TEXT_SIZE: Record<AvatarSize, string> = {
  xs: '9px',
  sm: '11px',
  md: '13px',
  lg: '16px',
}

/**
 * Avatar utilisateur — affiche une photo si disponible,
 * sinon des initiales sur un fond coloré déterministe.
 *
 * Usage :
 * ```tsx
 * <Avatar name="Mama Céleste" size="md" />
 * <Avatar name="Jean-Karl" size="sm" src={profile.avatar_url} />
 * ```
 *
 * Note : Server Component (pas de 'use client') car aucun état local.
 */
export default function Avatar({
  name,
  src,
  size = 'md',
  className = '',
}: AvatarProps) {
  const px      = SIZE_PX[size]
  const colors  = getAvatarColor(name)
  const initials = getInitials(name)

  /* Conteneur commun aux deux variantes */
  const containerStyle: React.CSSProperties = {
    width: px,
    height: px,
    borderRadius: '50%',
    flexShrink: 0,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  /* ── Variante photo ────────────────────────────────────────────────── */
  if (src) {
    return (
      <div style={containerStyle} className={className}>
        <Image
          src={src}
          alt={`Photo de profil de ${name}`}
          width={px}
          height={px}
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
        />
      </div>
    )
  }

  /* ── Variante initiales ────────────────────────────────────────────── */
  return (
    <div
      style={{
        ...containerStyle,
        background: colors.bg,
      }}
      className={className}
      aria-label={`Avatar de ${name}`}
    >
      <span
        style={{
          color: colors.text,
          fontSize: TEXT_SIZE[size],
          fontWeight: 500,
          lineHeight: 1,
          userSelect: 'none',
        }}
        aria-hidden="true"
      >
        {initials}
      </span>
    </div>
  )
}