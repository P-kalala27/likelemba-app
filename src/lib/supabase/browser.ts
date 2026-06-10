import { createBrowserClient } from "@supabase/ssr";
/* ── Singleton ───────────────────────────────────────────────────────────────
   On stocke le client dans cette variable au niveau du module.
   La première fois que getSupabaseBrowser() est appelée → client créé.
   Les fois suivantes → le même client est retourné.
 
   Pourquoi c'est important :
   Supabase maintient une connexion WebSocket pour le realtime.
   Si on crée un nouveau client à chaque render, on ouvre des dizaines
   de connexions WebSocket simultanées → crash sur une 3G congolaise. */

let client : ReturnType<typeof createBrowserClient> | null = null;
/**
 * Retourne le client Supabase pour une utilisation côté navigateur.
 *
 * Usage dans les Client Components ('use client') :
 * ```typescript
 * const supabase = getSupabaseBrowser()
 * const { data } = await supabase.from('groups').select('*')
 * ```
 *
 * NE PAS utiliser dans :
 * - Les Server Components (utiliser getSupabaseServer() à la place)
 * - Le middleware (utiliser createServerClient directement)
 */

export function getSupabaseBrowser() {
  if(client) return client;

  /* Les variables NEXT_PUBLIC_ sont accessibles dans le navigateur.
     Le '!' dit à TypeScript "je garantis que cette valeur existe".
     Si elle n'existe pas (pas de .env.local), l'app plantera clairement
     avec un message d'erreur plutôt que silencieusement. */

    client = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );
    return client;
}