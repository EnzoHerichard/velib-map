# velib-map

Description du projet: Projet permettant de créer un itinéraire avec l'utilisation de Velib', le sauvergarder puis l'imprimer au format pdf. Développé en NodeJS et ReactJS puis grâce à OpenStreetMaps et leaflet.

-----Lancer le projet en local-----

(Tout les cd se font à partir du dossier velib donc de la racine du projet)

Lancer le serveur d'authentification :

Se déplacer dans le dossier auth
-cd auth
Créer la base de données
-node scripts/initDb 
Installer les dépendances
-npm i
Démarrer le serveur
-node server.js

Lancer le serveur itinéraires + le front:

BACK
Se déplacer dans le dossier client
-cd app/client
Installer les dépendances
-npm i
Démarrer le serveur
-npm run start

FRONT
Se déplacer dans le dossier server
-cd app/server
Installer les dépendances
-npm i
Démarrer le serveur
-node server.js


Lancer le serveur pdf:

Se déplacer dans le dossier pdf
-cd pdf
Créer la base de données
-node scripts/initDb 
Installer les dépendances
-npm i
Démarrer le serveur
-node server.js


Vous avez maintenant accès à l'application et toutes ces fonctionnalités sur la route http://localhost:3000 😉
