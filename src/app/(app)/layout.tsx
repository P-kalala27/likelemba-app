import { redirect } from 'next/navigation'
import { getUser } from '@/lib/supabase/server'
 
/**
 * Layout du groupe de routes (app).
 * S'applique à : /dashboard, /groups, /profile, /payments, /settings...
 *
 * Rôle :
 * 1. Vérifier la session côté serveur (défense en profondeur en plus du middleware)
 * 2. Afficher la structure commune à toutes les pages protégées
 *    (à partir du Sprint 2 : bottom navigation)
 *
 * Pourquoi vérifier la session ici alors que le middleware le fait déjà :
 * Le middleware travaille au niveau de la requête HTTP brute (cookies).
 * Ici, on a un objet `user` Next.js complet, vérifié auprès de Supabase.
 * Cette double vérification suit le principe de "défense en profondeur" —
 * standard pour toute app qui touche à l'argent des utilisateurs.
 */
export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getUser()
 
  /* Filet de sécurité : si jamais le middleware n'a pas intercepté
     (cache navigateur agressif, edge case), on bloque ici aussi. */
  if (!user) {
    redirect('/auth')
  }
 
  return (
    <div className="flex flex-col flex-1 min-h-dvh">
 
      {/* Zone de contenu principal — chaque page s'affiche ici.
          flex-1 : prend tout l'espace disponible, repousse la nav en bas
          (la bottom nav sera ajoutée au Sprint 2 dans ce layout) */}
      <div className="flex-1 flex flex-col">
        {children}
      </div>
 
      {/*
        Sprint 2 ajoutera ici :
        <BottomNav activeTab={...} />
      */}
 
    </div>
  )
}