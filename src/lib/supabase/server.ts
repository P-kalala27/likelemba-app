import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Profile } from "@/types";
 
/**
 * Crée un client Supabase pour une utilisation côté serveur.
 * Doit être appelé à l'intérieur d'une fonction async (Server Component,
 * Route Handler, Server Action) — jamais au niveau du module.
 *
 * Pourquoi recréé à chaque requête (pas de singleton) :
 * Les cookies de session changent à chaque requête HTTP.
 * Un singleton garderait les cookies de la première requête pour toutes
 * les suivantes → failles de sécurité entre utilisateurs différents.
 *
 * Usage dans un Server Component :
 * ```typescript
 * const supabase = await getSupabaseServer()
 * const { data } = await supabase.from('groups').select('*')
 * ```
 */

export async function getSupabaseServer() {
    /* Next.js 15 : cookies() est async — on doit l'attendre.
     cookieStore donne accès aux cookies de la requête HTTP courante. */

     const cookieStore =  await cookies();

     return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
        cookies: {
            /* Lit tous les cookies de la requête entrante.
           Supabase utilise ça pour trouver le token de session. */
           getAll() {
            return cookieStore.getAll()
           },
           /* Écrit les nouveaux cookies dans la réponse sortante.
           Supabase utilise ça pour rafraîchir le token de session.
           Le try/catch est nécessaire car dans certains contextes
           (Server Components en lecture seule), setAll peut échouer.
           Dans ce cas, le middleware prend le relais. */
           setAll(cookiesToSet: any[]){
            try {
                cookiesToSet.forEach(({name, value, options}: any) => {
                    cookieStore.set(name, value, options)
                })
            } catch (error) {
                
            }
           }
        }
    }
 )
}


/**
 * Récupère la session utilisateur courante.
 * Retourne null si l'utilisateur n'est pas connecté.
 *
 * Usage :
 * ```typescript
 * const session = await getSession()
 * if (!session) redirect('/auth')
 * ```
 */

export async function getSession() {
    const supabase = await getSupabaseServer();
    const {
        data: { session },
    } = await supabase.auth.getSession();
    return session;
}

/**
 * Récupère l'utilisateur authentifié de manière sécurisée.
 * Préférer getUser() à getSession() quand on a besoin de l'ID utilisateur —
 * getUser() vérifie le token auprès du serveur Supabase (plus sécurisé).
 *
 * Usage :
 * ```typescript
 * const user = await getUser()
 * if (!user) redirect('/auth')
 * const userId = user.id
 * ```
 */
export async function getUser() {
    const supabase = await getSupabaseServer();
    const {
        data: { user },
        error
    } = await supabase.auth.getUser();

    if (error || !user) return null;
    return user;
}

/**
 * Récupère le profil complet de l'utilisateur connecté.
 * Retourne null si non connecté ou si le profil n'existe pas encore.
 *
 * Usage :
 * ```typescript
 * const profile = await getCurrentProfile()
 * if (!profile) redirect('/auth')
 * console.log(profile.name) // "Mama Céleste"
 * ```
 */

export async function getCurrentProfile(): Promise<Profile | null> {
    const supabase = await getSupabaseServer();
    const user = await getUser();

    if (!user) return null;

    const {data, error} = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    if (error) {
    console.error('[getCurrentProfile]', error.message)
    return null
  }
    return data;
}