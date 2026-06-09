import type { Metadata, Viewport } from "next";
import {DM_Sans} from "next/font/google";
import "./globals.css";


/* ── Police DM Sans ──────────────────────────────────────────────────────────
   On charge uniquement 2 weights (400 et 500) pour minimiser la taille
   du fichier de police — important sur les connexions 3G de Kinshasa.
   'swap' = affiche la police système en attendant le chargement de DM Sans. */

const dmSans = DM_Sans({
    subsets: ["latin"],
    weight: ["400", "500"],
    display: "swap",
    variable: "--font-dm-sans",
})

/* ── Métadonnées PWA ─────────────────────────────────────────────────────────
   Ces informations apparaissent dans :
   - L'onglet du navigateur (title)
   - Les résultats de recherche Google (description)
   - L'écran d'installation PWA (appleWebApp)
   - Les partages sur WhatsApp (openGraph — Sprint 12) */


export const metadata: Metadata = {
    title: {
        /* Template : "Mes groupes | LikelembaApp"
       Les pages enfants définissent uniquement leur propre titre,
       le suffixe "| LikelembaApp" est ajouté automatiquement. */
        template: "%s | LikelembaApp",
        default: "LikelembaApp - Tontine Numérique à Kinshasa",
    },
    description: 
        'Gérez vos groupes likelemba en toute transparence. ' +
        'Chaque cotisation tracée, chaque tour planifié. Fini les disputes.',
    
        /* Lien vers le manifest PWA dans /public/manifest.json */

    manifest: '/manifest.json',
     /* Configuration pour iOS (Safari "Ajouter à l'écran d'accueil") */
    appleWebApp: {
        capable: true,
        statusBarStyle: 'black-translucent',
        title: 'Likelemba',
    },

     /* Désactive la détection automatique des numéros de téléphone par iOS.
     Sans ça, iOS transforme "10 000 CDF" en lien cliquable. */
    formatDetection:{
        telephone: false,
    },
     /* Icônes de l'app (navigateur + PWA installée) */
    icons: {
        icon: [
            { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
            { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
        apple: '/icons/apple-touch-icon.png',
    }
}

/* ── Viewport ────────────────────────────────────────────────────────────────
   IMPORTANT : En Next.js 15, viewport DOIT être exporté séparément de metadata.
   Le mettre dans metadata génère une erreur de compilation.
 
   themeColor : couleur de la barre de statut Android quand l'app est installée.
   maximumScale: 1 empêche le zoom involontaire sur double-tap (Android). */


export const viewport: Viewport = {
  themeColor: '#0f0f1a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}


/* ── Root Layout ─────────────────────────────────────────────────────────────
   Enveloppe toutes les pages de l'application.
   children = le contenu de chaque page qui sera rendu ici. */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      /* Applique la variable CSS de la police au niveau HTML
         pour qu'elle soit disponible via var(--font-sans) dans globals.css */
      className={dmSans.variable}
    >
      <body className="antialiased">
 
        {/* Conteneur principal de l'app
            - mx-auto     : centré horizontalement
            - max-w-[480px]: jamais plus large que 480px (design mobile)
            - min-h-[100dvh]: occupe toute la hauteur visible (dvh = dynamic)
            - flex flex-col: les enfants s'empilent verticalement
            - relative    : référence pour les éléments positionnés en absolu */}
        <div
          id="app-root"
          className="relative mx-auto w-full max-w-[480px] min-h-[100dvh] flex flex-col"
          style={{ background: 'var(--color-night)' }}
        >
          {children}
        </div>
 
      </body>
    </html>
  );
}