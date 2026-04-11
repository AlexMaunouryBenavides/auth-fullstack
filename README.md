```js
Fullstack Project (Client & Server)
Ce projet est composé d'une interface frontend (React Router) et d'une API backend (Express + TypeORM).

📋 Prérequis
Node.js (dernière version LTS recommandée)

MySQL (installé et en cours d'exécution)

Un gestionnaire de paquets (npm ou yarn)

🛠️ Installation & Setup
1. Clonage du projet

git clone <url-du-repo>
cd <nom-du-projet>
2. Configuration du Serveur (Backend)
Allez dans le dossier server :


cd server
Installez les dépendances :


npm install
Configurez l'environnement :

Copiez le fichier .env.sample et renommez-le en .env.

Remplissez vos accès MySQL et définissez un JWT_SECRET.

Base de données :

Créez manuellement la base de données dans MySQL (ex: CREATE DATABASE authfullstack;).

L'ORM (TypeORM) se chargera de synchroniser les tables au lancement si la config le permet.

3. Configuration du Client (Frontend)
Ouvrez un nouveau terminal et allez dans le dossier client :


cd client
Installez les dépendances :


npm install
🏃 Lancement
Mode Développement
Il est recommandé de lancer le serveur en premier, puis le client.

Backend :


cd server
npm run dev
Frontend :


cd client
npm run dev
Build pour la Production
Backend : npm run build puis npm start

Frontend : npm run build puis npm start

🧪 Tests & Utilitaires
Cypress (Tests E2E) : Dans le dossier client, lancez npm run cy:open.

Typecheck : Pour vérifier les types TypeScript dans le client, lancez npm run typecheck.
```
