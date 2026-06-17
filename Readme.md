# Icônes PWA — à générer

Ce dossier doit contenir 3 fichiers que le manifest.json référence :

- icon-192.png        (192×192 px)
- icon-512.png        (512×512 px)
- apple-touch-icon.png (180×180 px, pour iOS)

## Comment les générer rapidement

Option 1 — Générateur en ligne (le plus simple) :
1. Va sur https://realfavicongenerator.net ou https://www.pwabuilder.com/imageGenerator
2. Upload un logo carré simple (le cochon tirelire 🐷 sur fond #0f0f1a fonctionne bien)
3. Télécharge le pack et place les 3 fichiers ici

Option 2 — Avec un outil de design (Figma, Canva) :
1. Crée un carré 512×512px, fond #0f0f1a
2. Centre l'icône du cochon tirelire en #e8d5b7 (couleur gold)
3. Exporte en 512px, 192px, et 180px

Sans ces fichiers, l'app fonctionne quand même mais :
- L'icône d'installation PWA sera vide/cassée
- iOS affichera une capture d'écran à la place de l'icône