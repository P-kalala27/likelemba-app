module.exports = [
"[next]/internal/font/google/dm_sans_b908b7f7.module.css [app-rsc] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "className": "dm_sans_b908b7f7-module__8RTlOW__className",
  "variable": "dm_sans_b908b7f7-module__8RTlOW__variable",
});
}),
"[next]/internal/font/google/dm_sans_b908b7f7.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$dm_sans_b908b7f7$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__ = __turbopack_context__.i("[next]/internal/font/google/dm_sans_b908b7f7.module.css [app-rsc] (css module)");
;
const fontData = {
    className: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$dm_sans_b908b7f7$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].className,
    style: {
        fontFamily: "'DM Sans', 'DM Sans Fallback'",
        fontStyle: "normal"
    }
};
if (__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$dm_sans_b908b7f7$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].variable != null) {
    fontData.variable = __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$dm_sans_b908b7f7$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].variable;
}
const __TURBOPACK__default__export__ = fontData;
}),
"[project]/src/app/layout.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RootLayout,
    "metadata",
    ()=>metadata,
    "viewport",
    ()=>viewport
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$dm_sans_b908b7f7$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[next]/internal/font/google/dm_sans_b908b7f7.js [app-rsc] (ecmascript)");
;
;
;
const metadata = {
    title: {
        /* Template : "Mes groupes | LikelembaApp"
       Les pages enfants définissent uniquement leur propre titre,
       le suffixe "| LikelembaApp" est ajouté automatiquement. */ template: "%s | LikelembaApp",
        default: "LikelembaApp - Tontine Numérique à Kinshasa"
    },
    description: 'Gérez vos groupes likelemba en toute transparence. ' + 'Chaque cotisation tracée, chaque tour planifié. Fini les disputes.',
    /* Lien vers le manifest PWA dans /public/manifest.json */ manifest: '/manifest.json',
    /* Configuration pour iOS (Safari "Ajouter à l'écran d'accueil") */ appleWebApp: {
        capable: true,
        statusBarStyle: 'black-translucent',
        title: 'Likelemba'
    },
    /* Désactive la détection automatique des numéros de téléphone par iOS.
     Sans ça, iOS transforme "10 000 CDF" en lien cliquable. */ formatDetection: {
        telephone: false
    },
    /* Icônes de l'app (navigateur + PWA installée) */ icons: {
        icon: [
            {
                url: '/icons/icon-192.png',
                sizes: '192x192',
                type: 'image/png'
            },
            {
                url: '/icons/icon-512.png',
                sizes: '512x512',
                type: 'image/png'
            }
        ],
        apple: '/icons/apple-touch-icon.png'
    }
};
const viewport = {
    themeColor: '#0f0f1a',
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false
};
function RootLayout({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("html", {
        lang: "fr",
        /* Applique la variable CSS de la police au niveau HTML
         pour qu'elle soit disponible via var(--font-sans) dans globals.css */ className: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$dm_sans_b908b7f7$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].variable,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("body", {
            className: "antialiased",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                id: "app-root",
                className: "relative mx-auto w-full max-w-[480px] min-h-[100dvh] flex flex-col",
                style: {
                    background: 'var(--color-night)'
                },
                children: children
            }, void 0, false, {
                fileName: "[project]/src/app/layout.tsx",
                lineNumber: 104,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/layout.tsx",
            lineNumber: 96,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/layout.tsx",
        lineNumber: 90,
        columnNumber: 5
    }, this);
}
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-rsc] (ecmascript)").vendored['react-rsc'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__507541e5._.js.map