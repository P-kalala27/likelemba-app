"use client"

import { useState, useTransition } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { getSupabaseBrowser } from "@/lib/supabase/browser"
import { normalizePhone } from "@/types"
import PhoneStep from "@/components/features/auth/PhoneStep"
import OtpStep from "@/components/features/auth/OtpStep"

/* Les deux étapes possibles du flux d'authentification */

type AuthStep = "phone" | "otp"

/**
 * Page d'authentification — orchestrateur du flux OTP.
 *
 * Flux complet :
 * 1. PhoneStep  → utilisateur saisit son numéro congolais
 * 2. handleSendOtp → Supabase envoie un SMS via Africa's Talking
 * 3. OtpStep    → utilisateur saisit le code à 6 chiffres
 * 4. handleVerifyOtp → Supabase vérifie le code
 * 5. Succès     → redirect vers /dashboard (ou l'URL d'origine)
 */

export default function AuthPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const supabase = getSupabaseBrowser()

      /* État du flux */

    const [step, setStep] = useState<AuthStep>("phone")
    const [phone, setPhone] = useState<string>("")
    const [error, setError] = useState<string| null> (null)

    /* useTransition : marque la navigation comme non-urgente.
     Empêche le freeze de l'UI pendant la redirection vers /dashboard. */

    const [isPending, startTransation] = useTransition()

     /* ── Étape 1 : Envoyer l'OTP ─────────────────────────────────────────── */
     async function handleSendOtp(rawPhone: string) {
        setError(null) // reset de l'erreur à chaque tentative

         /* Normaliser le numéro au format E.164 (+243XXXXXXXXX)
       La fonction vient de @/types — centralisée pour toute l'app */

       const normalize = normalizePhone(rawPhone)
       if(!normalize) {
        setError('Numéro invalide. Exemples : 0970000000 ou +243970000000');
        return
       }

       const {error: supabaseError} = await supabase.auth.signInWithOtp({
        phone: normalize,
        options: {
            /* redirectTo : URL de redirection après vérification réussie.
             Doit être dans la liste des URLs autorisées dans Supabase. */
            shouldCreateUser: true,
            channel: 'sms'
        }
       })

       if(supabaseError){
        /* Traduire les erreurs techniques en messages lisibles */
        if(supabaseError.message.includes('rate limite')){
            setError('Trop de tentatives. Attends 60 secondes avant de réessayer.')
        } else if (supabaseError.message.includes('invalid')){
            setError('Ce numéro n\'est pas valide. Vérifie le format et réessaie.')
        }
        else {
            setError('Impossible d\'envoyer le SMS. Vérifie ta connexion réseau.')
        }
        return 
       }
       /* SMS envoyé avec succès → passer à l'étape OTP */
        setPhone(normalize)
        setStep('otp')
     }

      /* ── Étape 2 : Vérifier l'OTP ────────────────────────────────────────── */

      async function handleVerifyOtp(code:string) {
        setError(null)

        const {error: supabaseError} = await supabase.auth.verifyOtp({
            phone,
            token: code,
            type:'sms'
        })

        if (supabaseError) {
      if (supabaseError.message.includes('expired')) {
        setError('Code expiré. Demande un nouveau code.')
      } else if (supabaseError.message.includes('invalid')) {
        setError('Code incorrect. Vérifie le SMS et réessaie.')
      } else {
        setError('Erreur de vérification. Réessaie.')
      }
      return
    }
    /* Vérification réussie → rediriger vers la destination */

    startTransation(() => {
        /* Si l'utilisateur était sur une route protégée avant de se connecter,
         on le renvoie là-bas. Sinon, dashboard par défaut. */

         const redirectTo = searchParams.get('redirect') ?? '/dashboard'
         router.push(redirectTo)
         router.refresh() /* Force le rechargement des Server Components */
    })

  }

  /* ── Renvoyer l'OTP ──────────────────────────────────────────────────── */

  async function handleResendOtp() {
    /* On réutilise handleSendOtp avec le numéro déjà normalisé */
    await handleSendOtp(phone)
  }

   /* ── Retour à l'étape téléphone ──────────────────────────────────────── */
   function handleBack(){
    setStep('phone');
    setError(null)
   }

   return(
    <main className="flex flex-col flex-1 safe-top">
        {/* Logo en haut à gauche */}
        <div className="flex items-center justify-center rounded-[10px]">
             <div
          className="w-8 h-8 flex items-center justify-center rounded-[10px]"
          style={{
            background: 'var(--color-surface-2)',
            border: '0.5px solid var(--color-border-gold)',
          }}
        >
            {/* Icône cochon tirelire — représente l'épargne */}
            <svg
            width="16" height="16" viewBox="0 0 24 24"
            fill="none" stroke="var(--color-gold)"
            strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M19 9c0-3.87-3.13-7-7-7S5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17a1 1 0 001 1h6a1 1 0 001-1v-2.26C17.81 13.47 19 11.38 19 9z" />
            <line x1="19" y1="9" x2="21" y2="9" />
          </svg>  
        </div>
        <span
          className="text-[15px] font-medium"
          style={{ color: 'var(--color-text-gold)' }}
        >   Likelemba </span>
        {/* Rendu conditionnel selon l'étape courante */}

        {step === 'phone' ? (
            <PhoneStep 
            onSubmit={handleSendOtp}
            error={error}
            />
        ) : (
            <OtpStep 
            phone={phone}
            onSubmit={handleVerifyOtp}
            onBack={handleBack}
            onResend={handleResendOtp}
            error={error}
            isPending={isPending}
            />
        )}
        </div>
    </main>
   )
    
 }