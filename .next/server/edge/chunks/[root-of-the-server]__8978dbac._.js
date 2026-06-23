(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__8978dbac._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/src/middleware.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "middleware",
    ()=>middleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/index.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/createServerClient.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript)");
;
;
/* ── Routes protégées ────────────────────────────────────────────────────────
   Toute route qui commence par un de ces préfixes nécessite une session.
   Si l'utilisateur n'est pas connecté → redirect vers /auth */ const PROTECTED_PREFIXES = [
    '/dashboard',
    '/groups',
    '/profile',
    '/settings',
    '/payments'
];
/* ── Routes publiques avec redirect si déjà connecté ────────────────────────
   Si l'utilisateur est déjà connecté et va sur /auth → redirect /dashboard */ const AUTH_ROUTES = [
    '/auth'
];
/* ── Routes entièrement publiques ────────────────────────────────────────────
   Accessibles sans session, même pour les non-inscrits.
   /join/[code] → lien d'invitation (membres rejoignent depuis WhatsApp) */ const PUBLIC_PREFIXES = [
    '/join',
    '/auth/callback'
];
async function middleware(request) {
    const { pathname, searchParams } = request.nextUrl;
    /* ── 0. Routes publiques → court-circuit immédiat ──────────────────────
       On vérifie AVANT de créer le client Supabase pour éviter un appel
       réseau inutile (getUser) sur /auth/callback, /join, etc. */ const isPublic = PUBLIC_PREFIXES.some((prefix)=>pathname.startsWith(prefix));
    if (isPublic) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next({
        request
    });
    /* ── 1. Intercepter les ?code= sur d'autres routes ────────────────────
       Si Supabase redirige vers une route autre que /auth/callback avec
       un code, on reroute vers le callback. */ if (searchParams.has('code') && pathname !== '/auth/callback') {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = '/auth/callback';
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(redirectUrl);
    }
    /* On crée une réponse "passe-partout" par défaut.
     On la modifie si besoin (redirect) ou on la retourne telle quelle. */ let response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next({
        request
    });
    /* Créer le client Supabase avec accès aux cookies de la requête.
     Les callbacks getAll/setAll propagent les cookies sur requête ET réponse
     — nécessaire pour que le token rafraîchi soit bien sauvegardé. */ const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["createServerClient"])(("TURBOPACK compile-time value", "https://owysibkhoyzisvioxypl.supabase.co"), ("TURBOPACK compile-time value", "sb_publishable_oSgGQZizDpZZoT6XtC8ikg_Fp1s-hRp"), {
        cookies: {
            getAll () {
                return request.cookies.getAll();
            },
            setAll (cookiesToSet) {
                /* Étape 1 : mettre à jour les cookies sur la requête */ cookiesToSet.forEach(({ name, value })=>request.cookies.set(name, value));
                /* Étape 2 : recréer la réponse avec les cookies mis à jour */ response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next({
                    request
                });
                /* Étape 3 : mettre à jour les cookies sur la réponse
             (c'est ce que le navigateur recevra et sauvegardera) */ cookiesToSet.forEach(({ name, value, options })=>response.cookies.set(name, value, options));
            }
        }
    });
    /* Vérifier la session auprès du serveur Supabase.
     Cet appel rafraîchit automatiquement le token s'il est expiré.
     Retourne null si l'utilisateur n'est pas connecté. */ const { data: { user } } = await supabase.auth.getUser();
    /* ── Vérifications dans l'ordre de priorité ─────────────────────────── */ /* 2. Route protégée + utilisateur non connecté → redirect /auth */ const isProtected = PROTECTED_PREFIXES.some((prefix)=>pathname.startsWith(prefix));
    if (isProtected && !user) {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = '/auth';
        /* On sauvegarde l'URL cible pour rediriger après connexion.
       Ex: /auth?redirect=/groups/abc123 */ redirectUrl.searchParams.set('redirect', pathname);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(redirectUrl);
    }
    /* 3. Route d'auth + utilisateur déjà connecté → redirect /dashboard */ const isAuthRoute = AUTH_ROUTES.some((route)=>pathname.startsWith(route));
    if (isAuthRoute && user) {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = '/dashboard';
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(redirectUrl);
    }
    /* 4. Tout le reste → laisser passer avec la réponse (tokens rafraîchis) */ return response;
}
const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|manifest.json|icons|sw.js).*)'
    ]
};
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__8978dbac._.js.map