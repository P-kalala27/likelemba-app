import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Profil',
}

/**
 * Page de profil — placeholder Sprint 2+.
 * Sera remplacée par le vrai profil utilisateur (nom, photo, etc.)
 */
export default function ProfilePage() {
  return (
    <main className="flex flex-col flex-1 safe-top">
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <h1
          className="text-xl font-medium mb-2"
          style={{ color: 'var(--color-text-gold)' }}
        >
          Profil
        </h1>
        <p
          className="text-sm leading-relaxed"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          Cette page sera disponible prochainement.
        </p>
      </div>
    </main>
  )
}
