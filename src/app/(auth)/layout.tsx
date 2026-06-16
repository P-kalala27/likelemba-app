import type {Metadata} from 'next'

export const metadata : Metadata = {
    title: "Connexion"
    /* Le template du root layout donnera : "Connexion | LikelembaApp" */
}

/**
 * Layout du groupe de routes (auth).
 * S'applique à : /auth (et toutes les futures pages d'auth)
 *
 * Design intentionnel :
 * - Fond entièrement sombre (surface-1)
 * - Pas de bottom navigation
 * - Pas de header
 * - Centrage vertical du contenu sur toute la hauteur
 *
 * children = la page auth qui sera rendue à l'intérieur
 */

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        /* min-h-[100dvh] : occupe toute la hauteur visible du navigateur.
       dvh = dynamic viewport height, s'adapte à la barre d'URL mobile.
       flex flex-col : les enfants (children) s'empilent verticalement. */
       <div className='min-h-[100vh] flex flex-col'
       style={{background: 'var(--color-night)'}}>
        {children}
       </div>
    )
}