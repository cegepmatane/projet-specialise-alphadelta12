 Comparaison : Next.js vs React (classique)

Caractéristique
Next.js (Framework)
React (Bibliothèque UI)
Nature
Framework « batteries-included » (tout-en-un).
Bibliothèque JavaScript pour construire des interfaces.
Rendu (Rendering)
Supporte le rendu côté serveur (SSR), la génération statique (SSG/ISR) et le client.
Rendu principalement côté client (CSR) par défaut.
Routage (Routing)
Basé sur le système de fichiers (automatique via le dossier /app ou /pages).
Nécessite l'installation et la configuration de React Router.
SEO
Optimisé nativement grâce au pré-rendu HTML envoyé directement au navigateur.
Plus complexe car les robots d'indexation ont du mal avec le contenu rendu dynamiquement sur le client.
Capacités Backend
Full-stack : inclut des API Routes pour exécuter du code serveur (Node.js).
Front-end uniquement ; nécessite un serveur backend séparé (ex: Express).
Optimisation
Découpage de code automatique ("code splitting") et optimisation des images/polices.
Nécessite des configurations manuelles complexes (lazy loading, suspense) à mesure que l'app grandit.
Configuration
Aucune configuration nécessaire pour démarrer ("zero config").
Souvent associé à des configurations manuelles de compilation (Babel, Webpack).
