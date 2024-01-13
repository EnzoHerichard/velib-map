# Velib-Map

Projet permettant de créer un itinéraire avec l'utilisation de Velib', le sauvegarder puis l'imprimer au format pdf. Développé en NodeJS et ReactJS avec l'utilisation d'OpenStreetMaps et Leaflet.

## Lancer le projet en local

(Toutes les commandes `cd` se font à partir du dossier velib, donc de la racine du projet)

### Lancer le serveur d'authentification:

Il faut se déplacer dans le dossier auth, lancer le script d'initialisation de la DB, installer les dépendances et ensuite lancer le serveur

```bash
cd auth
node scripts/initDb
npm install
node server.js
```

### Lancer le serveur pdf:

Il faut se déplacer dans le dossier pdf, lancer le script d'initialisation de la DB, installer les dépendances et ensuite lancer le serveur

```bash
cd pdf
node scripts/initDb
npm install
node server.js
```

### Lancer le serveur itinéraire + le front:

Il faut se déplacer dans le dossier app

```bash
cd app
```

Commençons par lancer le serveur en se déplaçant dans server, installez les dépendance et lancez le serveur

```bash
cd server
npm install
node server.js
```

Ensuite lançons le front, deplacez-vous dans le dossier client, installez les dépendances et lancer React

```bash
cd client
npm install
npm run start
```

Vous avez maintenant accès à l'application et toutes ses fonctionnalités sur la route http://localhost:3000 😉