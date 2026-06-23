module.exports = [
"[project]/src/lib/supabase/browser.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getSupabaseBrowser",
    ()=>getSupabaseBrowser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/createBrowserClient.js [app-ssr] (ecmascript)");
;
/* ── Singleton ───────────────────────────────────────────────────────────────
   On stocke le client dans cette variable au niveau du module.
   La première fois que getSupabaseBrowser() est appelée → client créé.
   Les fois suivantes → le même client est retourné.
 
   Pourquoi c'est important :
   Supabase maintient une connexion WebSocket pour le realtime.
   Si on crée un nouveau client à chaque render, on ouvre des dizaines
   de connexions WebSocket simultanées → crash sur une 3G congolaise. */ let client = null;
function getSupabaseBrowser() {
    if (client) return client;
    /* Les variables NEXT_PUBLIC_ sont accessibles dans le navigateur.
     Le '!' dit à TypeScript "je garantis que cette valeur existe".
     Si elle n'existe pas (pas de .env.local), l'app plantera clairement
     avec un message d'erreur plutôt que silencieusement. */ client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createBrowserClient"])(("TURBOPACK compile-time value", "https://owysibkhoyzisvioxypl.supabase.co"), ("TURBOPACK compile-time value", "sb_publishable_oSgGQZizDpZZoT6XtC8ikg_Fp1s-hRp"));
    return client;
}
}),
"[project]/src/components/features/auth/EmailStep.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>EmailStep
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
function EmailStep({ onSubmit, error }) {
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    /* Validation simple — Supabase refera une validation complète côté serveur */ const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    async function handleSubmit(e) {
        e.preventDefault();
        if (!isValid || loading) return;
        setLoading(true);
        await onSubmit(email);
        setLoading(false);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "animate-fade-up",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-[28px] font-medium mb-2 leading-tight",
                        style: {
                            color: 'var(--color-text-gold)'
                        },
                        children: [
                            "Bienvenue sur",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                fileName: "[project]/src/components/features/auth/EmailStep.tsx",
                                lineNumber: 48,
                                columnNumber: 24
                            }, this),
                            "Likelemba"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/features/auth/EmailStep.tsx",
                        lineNumber: 44,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm",
                        style: {
                            color: 'var(--color-text-secondary)'
                        },
                        children: "Entre ton adresse email pour continuer. On t'envoie un code de vérification."
                    }, void 0, false, {
                        fileName: "[project]/src/components/features/auth/EmailStep.tsx",
                        lineNumber: 50,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/features/auth/EmailStep.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleSubmit,
                noValidate: true,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: "email",
                                className: "block text-xs font-medium mb-2",
                                style: {
                                    color: 'var(--color-text-muted)'
                                },
                                children: "Adresse email"
                            }, void 0, false, {
                                fileName: "[project]/src/components/features/auth/EmailStep.tsx",
                                lineNumber: 63,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                id: "email",
                                type: "email",
                                inputMode: "email",
                                autoComplete: "email",
                                value: email,
                                onChange: (e)=>setEmail(e.target.value),
                                placeholder: "exemple@gmail.com",
                                disabled: loading,
                                autoFocus: true,
                                className: "input text-base"
                            }, void 0, false, {
                                fileName: "[project]/src/components/features/auth/EmailStep.tsx",
                                lineNumber: 71,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/features/auth/EmailStep.tsx",
                        lineNumber: 62,
                        columnNumber: 9
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-start gap-2 p-3 rounded-xl mb-4 animate-fade-up",
                        style: {
                            background: 'rgba(226, 75, 74, 0.1)',
                            border: '0.5px solid rgba(240, 149, 149, 0.2)'
                        },
                        role: "alert",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                width: "16",
                                height: "16",
                                viewBox: "0 0 24 24",
                                fill: "none",
                                stroke: "var(--color-red)",
                                strokeWidth: "1.5",
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                "aria-hidden": "true",
                                style: {
                                    flexShrink: 0,
                                    marginTop: '1px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                        cx: "12",
                                        cy: "12",
                                        r: "10"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/features/auth/EmailStep.tsx",
                                        lineNumber: 102,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                        x1: "12",
                                        y1: "8",
                                        x2: "12",
                                        y2: "12"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/features/auth/EmailStep.tsx",
                                        lineNumber: 103,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                        x1: "12",
                                        y1: "16",
                                        x2: "12.01",
                                        y2: "16"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/features/auth/EmailStep.tsx",
                                        lineNumber: 104,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/features/auth/EmailStep.tsx",
                                lineNumber: 95,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[13px] leading-relaxed",
                                style: {
                                    color: 'var(--color-red)'
                                },
                                children: error
                            }, void 0, false, {
                                fileName: "[project]/src/components/features/auth/EmailStep.tsx",
                                lineNumber: 106,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/features/auth/EmailStep.tsx",
                        lineNumber: 87,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        className: "btn-primary text-[15px]",
                        disabled: !isValid || loading,
                        children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                opacity: 0.7
                            },
                            children: "Envoi en cours..."
                        }, void 0, false, {
                            fileName: "[project]/src/components/features/auth/EmailStep.tsx",
                            lineNumber: 122,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                "Recevoir le code par email",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    width: "16",
                                    height: "16",
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    stroke: "currentColor",
                                    strokeWidth: "1.5",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    "aria-hidden": "true",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M5 12h14M12 5l7 7-7 7"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/features/auth/EmailStep.tsx",
                                        lineNumber: 132,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/features/auth/EmailStep.tsx",
                                    lineNumber: 126,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true)
                    }, void 0, false, {
                        fileName: "[project]/src/components/features/auth/EmailStep.tsx",
                        lineNumber: 116,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/features/auth/EmailStep.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-center mt-6 text-xs leading-relaxed",
                style: {
                    color: 'var(--color-text-muted)'
                },
                children: [
                    "En continuant, tu acceptes nos",
                    ' ',
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: "/terms",
                        style: {
                            color: 'var(--color-gold)'
                        },
                        children: "Conditions d'utilisation"
                    }, void 0, false, {
                        fileName: "[project]/src/components/features/auth/EmailStep.tsx",
                        lineNumber: 145,
                        columnNumber: 9
                    }, this),
                    ".",
                    ' ',
                    "Ton email est utilisé uniquement pour ta connexion."
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/features/auth/EmailStep.tsx",
                lineNumber: 140,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/features/auth/EmailStep.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/types/index.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* ═══════════════════════════════════════════════════════════════════════════
   LIKELEMBAAPP — Types TypeScript partagés
   Source de vérité pour tous les types du projet.
   Importer depuis '@/types' dans chaque fichier qui en a besoin.
   NE JAMAIS redéfinir un type ailleurs dans l'app.
   ═══════════════════════════════════════════════════════════════════════════ */ /* ═══════════════════════════════════════════════════════════════════════════
   UNIONS — Types à valeurs fixes
   On utilise 'type' (pas 'interface') pour les unions de strings.
   Avantage : TypeScript refuse toute valeur non listée.
   Ex: status: 'actif' → erreur TypeScript car 'actif' ∉ GroupStatus
   ═══════════════════════════════════════════════════════════════════════════ */ __turbopack_context__.s([
    "AVATAR_COLORS",
    ()=>AVATAR_COLORS,
    "FREQUENCY_LABELS",
    ()=>FREQUENCY_LABELS,
    "LIMITS",
    ()=>LIMITS,
    "MOBILE_MONEY_OPTIONS",
    ()=>MOBILE_MONEY_OPTIONS,
    "formatCurrency",
    ()=>formatCurrency,
    "getAvatarColor",
    ()=>getAvatarColor,
    "getInitials",
    ()=>getInitials,
    "groupProgress",
    ()=>groupProgress,
    "maskPhone",
    ()=>maskPhone,
    "normalizePhone",
    ()=>normalizePhone
]);
const MOBILE_MONEY_OPTIONS = [
    {
        id: 'airtel_money',
        label: 'Airtel Money',
        color: '#EF9F27',
        prefix: '+243 97',
        logo: '🟠'
    },
    {
        id: 'orange_money',
        label: 'Orange Money',
        color: '#FF6600',
        prefix: '+243 84',
        logo: '🟡'
    },
    {
        id: 'manual',
        label: 'Paiement cash',
        color: '#5DCAA5',
        prefix: '',
        logo: '💵'
    }
];
const FREQUENCY_LABELS = {
    weekly: 'Chaque semaine',
    biweekly: 'Toutes les 2 semaines',
    monthly: 'Chaque mois'
};
const AVATAR_COLORS = [
    {
        bg: '#0F6E56',
        text: '#5DCAA5'
    },
    {
        bg: '#3C3489',
        text: '#AFA9EC'
    },
    {
        bg: '#633806',
        text: '#FAC775'
    },
    {
        bg: '#501313',
        text: '#F09595'
    },
    {
        bg: '#26215C',
        text: '#AFA9EC'
    },
    {
        bg: '#085041',
        text: '#5DCAA5'
    }
];
const LIMITS = {
    MIN_TURNS: 2,
    MAX_TURNS: 50,
    MIN_AMOUNT_CDF: 500,
    MAX_AMOUNT_CDF: 10_000_000,
    MAX_GROUP_NAME_LEN: 50,
    OTP_LENGTH: 6,
    OTP_EXPIRY_SECONDS: 600,
    RESEND_COOLDOWN_SEC: 60
};
function formatCurrency(amount, currency = 'CDF') {
    if (currency === 'USD') {
        return `$${amount.toFixed(2)}`;
    }
    // Séparateur de milliers = espace (format français)
    return `${amount.toLocaleString('fr-FR')} CDF`;
}
function normalizePhone(input) {
    // Supprime espaces, tirets, parenthèses
    const digits = input.replace(/[\s\-\(\)\.]/g, '');
    if (digits.startsWith('+243') && digits.length === 13) return digits;
    if (digits.startsWith('243') && digits.length === 12) return `+${digits}`;
    if (digits.startsWith('0') && digits.length === 10) return `+243${digits.slice(1)}`;
    if (digits.length === 9) return `+243${digits}`;
    return null;
}
function maskPhone(phone) {
    return phone.replace(/(\+243)(\d{2})(\d{3})(\d{4})/, '$1 $2 *** $4');
}
function groupProgress(current, total) {
    if (total === 0) return 0;
    return Math.round(current / total * 100);
}
function getAvatarColor(name) {
    const index = name.charCodeAt(0) % AVATAR_COLORS.length;
    return AVATAR_COLORS[index];
}
function getInitials(name) {
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
}),
"[project]/src/components/features/auth/OtpStep.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>OtpStep
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/types/index.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
function OtpStep({ email, onSubmit, onBack, onResend, error, isPending }) {
    const [digits, setDigits] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(Array(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LIMITS"].OTP_LENGTH).fill(''));
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [countdown, setCountdown] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LIMITS"].RESEND_COOLDOWN_SEC);
    const [resending, setResending] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    /* Référence vers chaque input pour gérer le focus programmatiquement */ const inputRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(Array(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LIMITS"].OTP_LENGTH).fill(null));
    /* ── Countdown du renvoi SMS ─────────────────────────────────────────── */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (countdown <= 0) return;
        const timer = setTimeout(()=>setCountdown((c)=>c - 1), 1000);
        return ()=>clearTimeout(timer);
    }, [
        countdown
    ]);
    /* ── Focus automatique sur la première case au montage ───────────────── */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        inputRefs.current[0]?.focus();
    }, []);
    /* ── Auto-submit dès que les 6 chiffres sont remplis ──────────────────── */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const code = digits.join('');
        if (code.length === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LIMITS"].OTP_LENGTH && !loading) {
            handleSubmit(code);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        digits
    ]);
    async function handleSubmit(code) {
        setLoading(true);
        await onSubmit(code);
        setLoading(false);
    }
    /**
   * Gère la saisie d'un chiffre dans une case.
   * Gère aussi le cas où l'utilisateur (ou Android) colle le code entier
   * dans une seule case — on répartit alors les chiffres automatiquement.
   */ function handleDigitChange(index, value) {
        /* Cas paste : value contient plusieurs caractères */ if (value.length > 1) {
            const pasted = value.replace(/\D/g, '').slice(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LIMITS"].OTP_LENGTH);
            const newDigits = Array(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LIMITS"].OTP_LENGTH).fill('');
            pasted.split('').forEach((digit, i)=>{
                newDigits[i] = digit;
            });
            setDigits(newDigits);
            /* Focus sur la dernière case remplie (ou la dernière case si tout est rempli) */ const lastFilledIndex = Math.min(pasted.length - 1, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LIMITS"].OTP_LENGTH - 1);
            inputRefs.current[lastFilledIndex]?.focus();
            return;
        }
        /* Cas normal : un seul chiffre */ const digit = value.replace(/\D/g, '');
        const newDigits = [
            ...digits
        ];
        newDigits[index] = digit;
        setDigits(newDigits);
        /* Avancer automatiquement à la case suivante */ if (digit && index < __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LIMITS"].OTP_LENGTH - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    }
    /**
   * Gère la touche Backspace : si la case actuelle est vide,
   * effacer la case précédente et y revenir.
   */ function handleKeyDown(index, e) {
        if (e.key === 'Backspace' && !digits[index] && index > 0) {
            const newDigits = [
                ...digits
            ];
            newDigits[index - 1] = '';
            setDigits(newDigits);
            inputRefs.current[index - 1]?.focus();
        }
    }
    async function handleResend() {
        setResending(true);
        setDigits(Array(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LIMITS"].OTP_LENGTH).fill(''));
        setCountdown(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LIMITS"].RESEND_COOLDOWN_SEC);
        await onResend();
        setResending(false);
        inputRefs.current[0]?.focus();
    }
    const code = digits.join('');
    const isFilled = code.length === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LIMITS"].OTP_LENGTH;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "animate-fade-up",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onBack,
                className: "flex items-center gap-2 mb-6 btn-ghost",
                style: {
                    padding: 0
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        width: "16",
                        height: "16",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        strokeWidth: "1.5",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        "aria-hidden": "true",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M19 12H5M12 19l-7-7 7-7"
                        }, void 0, false, {
                            fileName: "[project]/src/components/features/auth/OtpStep.tsx",
                            lineNumber: 135,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/features/auth/OtpStep.tsx",
                        lineNumber: 129,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm",
                        children: "Changer d'email"
                    }, void 0, false, {
                        fileName: "[project]/src/components/features/auth/OtpStep.tsx",
                        lineNumber: 137,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/features/auth/OtpStep.tsx",
                lineNumber: 124,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-[26px] font-medium mb-2 leading-tight",
                        style: {
                            color: 'var(--color-text-gold)'
                        },
                        children: "Code de vérification"
                    }, void 0, false, {
                        fileName: "[project]/src/components/features/auth/OtpStep.tsx",
                        lineNumber: 142,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm",
                        style: {
                            color: 'var(--color-text-secondary)'
                        },
                        children: [
                            "On a envoyé un code à 6 chiffres à",
                            ' ',
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-medium",
                                style: {
                                    color: 'var(--color-text-gold)'
                                },
                                children: maskEmail(email)
                            }, void 0, false, {
                                fileName: "[project]/src/components/features/auth/OtpStep.tsx",
                                lineNumber: 150,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/features/auth/OtpStep.tsx",
                        lineNumber: 148,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/features/auth/OtpStep.tsx",
                lineNumber: 141,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-2 mb-6",
                role: "group",
                "aria-label": "Code de vérification à 6 chiffres",
                children: digits.map((digit, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        ref: (el)=>{
                            inputRefs.current[index] = el;
                        },
                        type: "tel",
                        inputMode: "numeric",
                        /* autoComplete="one-time-code" sur la 1ère case :
               permet à Android/iOS de proposer le remplissage auto depuis SMS */ autoComplete: index === 0 ? 'one-time-code' : 'off',
                        /* maxLength=6 (pas 1) : permet de recevoir le code complet
               via le paste, qu'on traite ensuite dans handleDigitChange */ maxLength: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LIMITS"].OTP_LENGTH,
                        value: digit,
                        onChange: (e)=>handleDigitChange(index, e.target.value),
                        onKeyDown: (e)=>handleKeyDown(index, e),
                        disabled: loading || isPending,
                        "aria-label": `Chiffre ${index + 1} sur ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LIMITS"].OTP_LENGTH}`,
                        className: "text-center font-medium",
                        style: {
                            width: '100%',
                            height: '56px',
                            fontSize: '22px',
                            background: digit ? 'rgba(232,213,183,0.08)' : 'var(--color-surface-3)',
                            border: `0.5px solid ${digit ? 'var(--color-border-gold)' : 'var(--color-border)'}`,
                            borderRadius: 'var(--radius-md)',
                            color: 'var(--color-text-gold)',
                            outline: 'none',
                            transition: 'border-color 0.15s, background 0.15s',
                            caretColor: 'var(--color-gold)'
                        }
                    }, index, false, {
                        fileName: "[project]/src/components/features/auth/OtpStep.tsx",
                        lineNumber: 163,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/features/auth/OtpStep.tsx",
                lineNumber: 157,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start gap-2 p-3 rounded-xl mb-4 animate-fade-up",
                style: {
                    background: 'rgba(226, 75, 74, 0.1)',
                    border: '0.5px solid rgba(240, 149, 149, 0.2)'
                },
                role: "alert",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-[13px] leading-relaxed",
                    style: {
                        color: 'var(--color-red)'
                    },
                    children: error
                }, void 0, false, {
                    fileName: "[project]/src/components/features/auth/OtpStep.tsx",
                    lineNumber: 206,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/features/auth/OtpStep.tsx",
                lineNumber: 198,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>isFilled && handleSubmit(code),
                className: "btn-primary text-[15px] mb-4",
                disabled: !isFilled || loading || isPending,
                children: loading || isPending ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    style: {
                        opacity: 0.7
                    },
                    children: "Vérification..."
                }, void 0, false, {
                    fileName: "[project]/src/components/features/auth/OtpStep.tsx",
                    lineNumber: 219,
                    columnNumber: 11
                }, this) : 'Confirmer le code'
            }, void 0, false, {
                fileName: "[project]/src/components/features/auth/OtpStep.tsx",
                lineNumber: 213,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: countdown > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-[13px]",
                    style: {
                        color: 'var(--color-text-muted)'
                    },
                    children: [
                        "Renvoyer le code dans",
                        ' ',
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-medium",
                            style: {
                                color: 'var(--color-text-secondary)'
                            },
                            children: [
                                countdown,
                                "s"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/features/auth/OtpStep.tsx",
                            lineNumber: 230,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/features/auth/OtpStep.tsx",
                    lineNumber: 228,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: handleResend,
                    disabled: resending,
                    className: "text-[13px] btn-ghost",
                    style: {
                        color: 'var(--color-gold)',
                        opacity: resending ? 0.5 : 1,
                        padding: 0
                    },
                    children: resending ? 'Envoi en cours...' : 'Renvoyer le SMS'
                }, void 0, false, {
                    fileName: "[project]/src/components/features/auth/OtpStep.tsx",
                    lineNumber: 235,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/features/auth/OtpStep.tsx",
                lineNumber: 226,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-8 card",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-xs leading-relaxed",
                    style: {
                        color: 'var(--color-text-muted)'
                    },
                    children: [
                        "💡",
                        ' ',
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                            className: "font-medium",
                            style: {
                                color: 'var(--color-text-secondary)'
                            },
                            children: "Pas d'email reçu ?"
                        }, void 0, false, {
                            fileName: "[project]/src/components/features/auth/OtpStep.tsx",
                            lineNumber: 254,
                            columnNumber: 11
                        }, this),
                        ' ',
                        "Vérifie ton dossier spam ou courrier indésirable. L'email peut prendre jusqu'à 1 minute pour arriver."
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/features/auth/OtpStep.tsx",
                    lineNumber: 252,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/features/auth/OtpStep.tsx",
                lineNumber: 251,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/features/auth/OtpStep.tsx",
        lineNumber: 121,
        columnNumber: 5
    }, this);
}
/**
 * Masque une adresse email pour l'affichage.
 * Ex: "celeste@gmail.com" → "ce***@gmail.com"
 */ function maskEmail(email) {
    const [local, domain] = email.split('@');
    if (!domain) return email;
    const visible = local.slice(0, 2);
    return `${visible}${'*'.repeat(Math.max(local.length - 2, 3))}@${domain}`;
}
}),
"[project]/src/app/(auth)/auth/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AuthPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$browser$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/browser.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$features$2f$auth$2f$EmailStep$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/features/auth/EmailStep.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$features$2f$auth$2f$OtpStep$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/features/auth/OtpStep.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
function AuthPage() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$browser$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSupabaseBrowser"])();
    /* État du flux */ const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('email');
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    /* useTransition : marque la navigation comme non-urgente.
     Empêche le freeze de l'UI pendant la redirection vers /dashboard. */ const [isPending, startTransition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransition"])();
    /* ── Étape 1 : Envoyer l'OTP par email ───────────────────────────────── */ async function handleSendOtp(rawEmail) {
        setError(null);
        const { error: supabaseError } = await supabase.auth.signInWithOtp({
            email: rawEmail,
            options: {
                /* shouldCreateUser: true = crée un compte si l'email est nouveau.
           Le trigger Supabase créera automatiquement le profil (schema.sql). */ shouldCreateUser: true,
                emailRedirectTo: `${window.location.origin}/auth/callback`
            }
        });
        if (supabaseError) {
            /* Traduire les erreurs techniques en messages lisibles */ if (supabaseError.message.includes('rate limit')) {
                setError('Trop de tentatives. Attends 60 secondes avant de réessayer.');
            } else if (supabaseError.message.includes('invalid')) {
                setError('Cette adresse email n\'est pas valide.');
            } else {
                setError('Impossible d\'envoyer l\'email. Vérifie ta connexion réseau.');
            }
            return;
        }
        /* Email envoyé avec succès → passer à l'étape OTP */ setEmail(rawEmail);
        setStep('otp');
    }
    /* ── Étape 2 : Vérifier l'OTP ────────────────────────────────────────── */ async function handleVerifyOtp(code) {
        setError(null);
        const { error: supabaseError } = await supabase.auth.verifyOtp({
            email,
            token: code,
            type: 'email'
        });
        if (supabaseError) {
            if (supabaseError.message.includes('expired')) {
                setError('Code expiré. Demande un nouveau code.');
            } else if (supabaseError.message.includes('invalid')) {
                setError('Code incorrect. Vérifie l\'email et réessaie.');
            } else {
                setError('Erreur de vérification. Réessaie.');
            }
            return;
        }
        /* Vérification réussie → rediriger vers la destination */ startTransition(()=>{
            /* Si l'utilisateur était sur une route protégée avant de se connecter,
         on le renvoie là-bas. Sinon, dashboard par défaut. */ const redirectTo = searchParams.get('redirect') ?? '/dashboard';
            router.push(redirectTo);
            router.refresh();
        /* Force le rechargement des Server Components */ });
    }
    /* ── Renvoyer l'OTP ──────────────────────────────────────────────────── */ async function handleResendOtp() {
        await handleSendOtp(email);
    }
    /* ── Retour à l'étape email ──────────────────────────────────────────── */ function handleBack() {
        setStep('email');
        setError(null);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "flex flex-col flex-1 safe-top",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 px-5 py-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-8 h-8 flex items-center justify-center rounded-[10px]",
                        style: {
                            background: 'var(--color-surface-2)',
                            border: '0.5px solid var(--color-border-gold)'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            width: "16",
                            height: "16",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "var(--color-gold)",
                            strokeWidth: "1.5",
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            "aria-hidden": "true",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M19 9c0-3.87-3.13-7-7-7S5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17a1 1 0 001 1h6a1 1 0 001-1v-2.26C17.81 13.47 19 11.38 19 9z"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(auth)/auth/page.tsx",
                                    lineNumber: 134,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                    x1: "19",
                                    y1: "9",
                                    x2: "21",
                                    y2: "9"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(auth)/auth/page.tsx",
                                    lineNumber: 135,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(auth)/auth/page.tsx",
                            lineNumber: 128,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/(auth)/auth/page.tsx",
                        lineNumber: 121,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[15px] font-medium",
                        style: {
                            color: 'var(--color-text-gold)'
                        },
                        children: "Likelemba"
                    }, void 0, false, {
                        fileName: "[project]/src/app/(auth)/auth/page.tsx",
                        lineNumber: 138,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(auth)/auth/page.tsx",
                lineNumber: 120,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex flex-col justify-center px-5 pb-8",
                children: step === 'email' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$features$2f$auth$2f$EmailStep$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    onSubmit: handleSendOtp,
                    error: error
                }, void 0, false, {
                    fileName: "[project]/src/app/(auth)/auth/page.tsx",
                    lineNumber: 151,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$features$2f$auth$2f$OtpStep$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    email: email,
                    onSubmit: handleVerifyOtp,
                    onBack: handleBack,
                    onResend: handleResendOtp,
                    error: error,
                    isPending: isPending
                }, void 0, false, {
                    fileName: "[project]/src/app/(auth)/auth/page.tsx",
                    lineNumber: 156,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(auth)/auth/page.tsx",
                lineNumber: 147,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(auth)/auth/page.tsx",
        lineNumber: 117,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=src_40a5d483._.js.map