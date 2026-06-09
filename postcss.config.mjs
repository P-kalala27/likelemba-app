/* PostCSS transforme le CSS avant qu'il soit envoyé au navigateur.
   Tailwind v4 s'intègre comme plugin PostCSS.

   Différence avec Tailwind v3 :
   - v3 nécessitait : tailwindcss + autoprefixer + un fichier tailwind.config.js
   - v4 fait tout en un seul plugin, plus besoin de fichier de config séparé.
   Les tokens de design sont définis directement dans globals.css via @theme. */

const config = {
  plugins: {
    // Tailwind v4 : plugin PostCSS officiel
    // Gère automatiquement les préfixes navigateur (ce qu'autoprefixer faisait avant)
    '@tailwindcss/postcss': {},
  },
}

export default config
