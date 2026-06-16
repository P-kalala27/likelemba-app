import type { Metadata } from "next";
import { getUser } from "@/lib/supabase/server";


export const metadata : Metadata = {
    title: 'Accueil'
}

/**
 * Page dashboard — Server Component (pas de 'use client').
 *
 * Au Sprint 1, cette page sert de PREUVE que le flux d'authentification
 * fonctionne entièrement : si tu vois ton numéro de téléphone affiché ici,
 * ça veut dire que Supabase a bien créé ta session.
 *
 * Le Sprint 2 remplacera ce contenu par le vrai dashboard
 * (liste des groupes, activité récente, etc.)
 */


export default async function DashboardPage() {
    /* Pas besoin de vérifier `if (!user)` ici — le layout (app)/layout.tsx
     l'a déjà fait et aurait redirigé vers /auth si nécessaire. */

    const user = await getUser()

    return (
        <main className="flex flex-col flex-1 safe-top">
            {/* ── Header simple ─────────────────────────────────────────────── */}
            <header className="flex items-center justify-between px-5 py-4"
            style={{borderBottom: '0.5px solid var(--color-border)'}}
            >
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 flex items-center justify-center rounded-lg"
                        style={{
                            background: 'var(--color-surface-2)',
                            border: '0.5px solid var(--color-border-gold)'
                        }}
                    >
                         <svg
              width="14" height="14" viewBox="0 0 24 24"
              fill="none" stroke="var(--color-gold)"
              strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
              aria-hidden="true"
            >
                <path d="M19 9c0-3.87-3.13-7-7-7S5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17a1 1 0 001 1h6a1 1 0 001-1v-2.26C17.81 13.47 19 11.38 19 9z" />
            </svg>
                    </div>
                    <span className="text-sm font-medium"
                        style={{color: 'var(--color-text-gold)'}}
                    >
                        Likelemba
                    </span>
                </div>
                {/* Avatar — initiales basées sur les 2 derniers chiffres du téléphone
            (avant le Sprint 2 où on aura un vrai profil avec nom) */}

            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium"
                style={{
                    background: 'var(--color-purple-dark)',
                    color: 'var(--color-purple)',}}
                    aria-label="Avatar utilisateur"
            >
                {user?.phone?.slice(-2) ?? '?'}
            </div>
            </header>
            {/* ── Contenu central — confirmation visuelle du Sprint 1 ─────────── */}

            <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                    style={{
                        background: 'var(--color-surface-2)',
                        border: '0.5px solid var(--color-border'
                    }}
                >
                    <svg
            width="28" height="28" viewBox="0 0 24 24"
            fill="none" stroke="var(--color-gold)"
            strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75M9 7a4 4 0 110 8 4 4 0 010-8z" />
          </svg>
                </div>
                <h1 className="text-xl font-medium mb-2"
                style={{color: 'var(--color-text-gold)'}}
                >
                    Connexion réussie ! 🎉
                </h1>
                <p
          className="text-sm leading-relaxed max-w-70"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          Sprint 1 terminé. Le vrai dashboard (groupes, activité)
          arrivera au Sprint 2.
        </p>
        <div className="mt-6 card w-full max-w-xs">
          <p
            className="text-[11px] mb-1"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Connecté avec
          </p>
          <p
            className="text-sm font-medium"
            style={{ color: 'var(--color-text-gold)' }}
          >
            {user?.phone ?? 'Numéro inconnu'}
          </p>
        </div>
            </div>
        </main>
    )
}
