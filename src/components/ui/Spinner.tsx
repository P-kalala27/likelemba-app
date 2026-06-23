'use client'

/* ── Tailles disponibles ─────────────────────────────────────────────────
   sm  : 16px — dans les boutons (à côté du texte)
   md  : 24px — inline dans une section
   lg  : 40px — centre de page (chargement initial) */

type SpinnerSize = 'sm' | 'md' | 'lg'

interface spinnerProps {
    size?: SpinnerSize
    /* Couleur de l'arc animé — par défaut la couleur gold de la marque */
    color?:string
    /* Label accessible pour les lecteurs d'écran */
    label?:string
}

const SIZE_MAP: Record<SpinnerSize, number> = {
    sm:16,
    md:24,
    lg:40
}

/**
 * Indicateur de chargement circulaire.
 *
 * Usage :
 * ```tsx
 * <Spinner />                          // md, gold
 * <Spinner size="sm" />                // dans un bouton
 * <Spinner size="lg" color="#5DCAA5" /> // plein écran, teal
 * ```
 */

export default function Spinner({
    size= 'md',
    color='var(--color-gold)',
    label = 'Chargement en cours...'
}: spinnerProps) {
    const px = SIZE_MAP[size]
    /* Rayon du cercle SVG — légèrement en retrait du bord pour que
     le trait ne soit pas coupé par le viewBox */
     const r = (px -4 ) / 2
    
     /* Périmètre du cercle = 2πr — utilisé pour l'animation dash */

    const circumference = 2 * Math.PI * r

    return(
        <svg
      width={px}
      height={px}
      viewBox={`0 0 ${px} ${px}`}
      /* role="status" + aria-label : annoncé par les lecteurs d'écran */
      role="status"
      aria-label={label}
      style={{ flexShrink: 0 }}
    >
      {/* Cercle de fond (piste) — très discret */}
      <circle
        cx={px / 2}
        cy={px / 2}
        r={r}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        style={{ color: 'rgba(255,255,255,0.1)' }}
      />
 
      {/* Arc animé — tourne en continu */}
      <circle
        cx={px / 2}
        cy={px / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        /* dasharray : longueur de l'arc visible (75% du périmètre) */
        strokeDasharray={`${circumference * 0.75} ${circumference * 0.25}`}
        /* dashoffset : point de départ de l'arc (rotation initiale) */
        strokeDashoffset={circumference * 0.25}
        style={{
          transformOrigin: 'center',
          animation: 'spin 0.75s linear infinite',
        }}
      />
    </svg>
    )
}