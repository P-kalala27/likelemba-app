import { redirect } from "next/navigation";
import { getUser } from "@/lib/supabase/server";


/**
 * Page racine "/" — ne s'affiche jamais, redirige immédiatement.
 *
 * Logique :
 * - Utilisateur connecté  → /dashboard
 * - Utilisateur non connecté → /auth
 *
 * Note : le middleware gère déjà la protection des routes /dashboard/*.
 * Cette page gère uniquement la route "/" elle-même.
 */

export default async function RootPage() {
    const user = await getUser();

    if (user) {
        redirect("/dashboard");
    } else {
        redirect("/auth");
    }
}