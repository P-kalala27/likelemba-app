import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

/**
 * Route Handler — Callback d'authentification Supabase.
 *
 * Après un magic link, Supabase redirige ici avec ?code=...
 * On échange ce code contre une session, puis on redirige vers /dashboard.
 *
 * IMPORTANT : On crée le client Supabase manuellement ici (pas via
 * getSupabaseServer) car on doit attacher les cookies de session
 * directement sur la réponse de redirection. Si on utilise cookies()
 * de next/headers puis NextResponse.redirect(), les cookies sont
 * perdus car ce sont deux objets réponse indépendants.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // si "next" est présent, on redirige vers cette destination après connexion, sinon /dashboard
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    /* Créer la réponse de redirection EN PREMIER,
       puis y attacher les cookies de session. */
    const redirectUrl = new URL(next, origin)
    const response = NextResponse.redirect(redirectUrl)

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            /* Lire les cookies depuis la requête entrante */
            return request.headers.get('cookie')
              ?.split('; ')
              .map(cookie => {
                const [name, ...rest] = cookie.split('=')
                return { name, value: rest.join('=') }
              }) ?? []
          },
          setAll(cookiesToSet: { name: string; value: string; options?: any }[]) {
            /* Écrire les cookies directement sur la réponse de redirection.
               C'est la clé : les tokens de session seront inclus dans
               la réponse HTTP que le navigateur recevra. */
            cookiesToSet.forEach(({ name, value, options }) => {
              response.cookies.set(name, value, options)
            })
          },
        },
      }
    )

    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      return response
    }
  }

  // Redirection vers la page d'authentification en cas d'erreur
  return NextResponse.redirect(`${origin}/auth?error=auth-callback-failed`)
}
