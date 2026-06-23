import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";


 
/* ── Routes protégées ────────────────────────────────────────────────────────
   Toute route qui commence par un de ces préfixes nécessite une session.
   Si l'utilisateur n'est pas connecté → redirect vers /auth */

const PROTECTED_PREFIXES = [
    '/dashboard',
    '/groups',
    '/profile',
    '/settings',
    '/payments',
]

/* ── Routes publiques avec redirect si déjà connecté ────────────────────────
   Si l'utilisateur est déjà connecté et va sur /auth → redirect /dashboard */

const AUTH_ROUTES = [
    '/auth',
]

/* ── Routes entièrement publiques ────────────────────────────────────────────
   Accessibles sans session, même pour les non-inscrits.
   /join/[code] → lien d'invitation (membres rejoignent depuis WhatsApp) */


const PUBLIC_PREFIXES = [
    '/join',
    '/auth/callback',
]

/**
 * Middleware Next.js — s'exécute avant chaque requête.
 *
 * IMPORTANT : ne pas écrire de logique entre createServerClient et getUser().
 * Le SDK Supabase doit pouvoir lire et écrire les cookies immédiatement
 * après sa création pour que le rafraîchissement de token fonctionne.
 */

export async function middleware(request: NextRequest) {
    const { pathname, searchParams } = request.nextUrl;

    /* ── 0. Routes publiques → court-circuit immédiat ──────────────────────
       On vérifie AVANT de créer le client Supabase pour éviter un appel
       réseau inutile (getUser) sur /auth/callback, /join, etc. */

    const isPublic = PUBLIC_PREFIXES.some(prefix =>
      pathname.startsWith(prefix)
    )
    if (isPublic) return NextResponse.next({ request });

    /* ── 1. Intercepter les ?code= sur d'autres routes ────────────────────
       Si Supabase redirige vers une route autre que /auth/callback avec
       un code, on reroute vers le callback. */
    if (searchParams.has('code') && pathname !== '/auth/callback') {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = '/auth/callback';
        return NextResponse.redirect(redirectUrl);
    }

    /* On crée une réponse "passe-partout" par défaut.
     On la modifie si besoin (redirect) ou on la retourne telle quelle. */

    let response = NextResponse.next({request});
    /* Créer le client Supabase avec accès aux cookies de la requête.
     Les callbacks getAll/setAll propagent les cookies sur requête ET réponse
     — nécessaire pour que le token rafraîchi soit bien sauvegardé. */

     const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,

        {
            cookies : {
                getAll() {
                    return request.cookies.getAll();
                }, 
                setAll(cookiesToSet: any[]) {
                    /* Étape 1 : mettre à jour les cookies sur la requête */
                    cookiesToSet.forEach(({name, value}: any) => 
                    request.cookies.set(name, value)
                )
                /* Étape 2 : recréer la réponse avec les cookies mis à jour */
                response = NextResponse.next({request})
                /* Étape 3 : mettre à jour les cookies sur la réponse
             (c'est ce que le navigateur recevra et sauvegardera) */
             cookiesToSet.forEach(({name, value, options}: any) =>
                response.cookies.set(name, value, options)
             )
                }
            }
        }
     );

     /* Vérifier la session auprès du serveur Supabase.
     Cet appel rafraîchit automatiquement le token s'il est expiré.
     Retourne null si l'utilisateur n'est pas connecté. */

    const {data : {user} } = await supabase.auth.getUser();

    /* ── Vérifications dans l'ordre de priorité ─────────────────────────── */

  /* 2. Route protégée + utilisateur non connecté → redirect /auth */

  const isProtected = PROTECTED_PREFIXES.some(prefix =>
    pathname.startsWith(prefix)
  )

  if (isProtected && !user) {
   const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/auth';
    
    /* On sauvegarde l'URL cible pour rediriger après connexion.
       Ex: /auth?redirect=/groups/abc123 */
       redirectUrl.searchParams.set('redirect', pathname);

    return NextResponse.redirect(redirectUrl);
  }
   /* 3. Route d'auth + utilisateur déjà connecté → redirect /dashboard */

   const isAuthRoute = AUTH_ROUTES.some( route => pathname.startsWith(route));

   if(isAuthRoute && user) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/dashboard';
    return NextResponse.redirect(redirectUrl);
   }
   /* 4. Tout le reste → laisser passer avec la réponse (tokens rafraîchis) */
    return response;
}

/* ── Configuration du matcher ────────────────────────────────────────────────
   Définit sur quelles routes le middleware s'exécute.
   On exclut les fichiers statiques pour ne pas ralentir leur chargement :
   - _next/static  → JS, CSS compilés par Next.js
   - _next/image   → images optimisées
   - favicon.ico   → icône du navigateur
   - manifest.json → PWA manifest
   - icons/        → icônes PWA
   - sw.js         → Service Worker (Sprint 7)
   ────────────────────────────────────────────────────────────────────────── */
   export const config = {
    matcher : [
         '/((?!_next/static|_next/image|favicon.ico|manifest.json|icons|sw.js).*)',
    ]
   }