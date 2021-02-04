# ESGI_TDD_projet

## Démarrer l'environnement de dev

### Installer l'ensemble des dépendances du projet
- se placer à la racine du projet
```
npm install
```

### Créer un fichier config/dev.env
- se placer à la racine du projet
- créer un dossier config
- créer un fichier dev.env
```
PORT={portSurLequelDemarreVotreAppExpress}
JWT_SECRET={LeSecretSetupDansLeProjetPourLesJsonWebToken}
MONGODB_URL="mongodb://{ipAdress}:{port}/{nameOfTheDbDeDev}"
```

### mettre en place une db mongodb et la lancer
suivant le type d'installation que vous voulez suivre [mongodb install](https://docs.mongodb.com/manual/installation/)

### exec la commande dans la cli pour start l'application en mode dev
- se placer à la racine du projet
```
npm run dev
```

## Démarrer l'environnement de test

### Créer un fichier config/test.env
- se placer dans le dossier config créer dans l'environnement de dev
- créer un fichier test.env
```
PORT={portSurLequelDemarreVotreAppExpress}
JWT_SECRET={LeSecretSetupDansLeProjetPourLesJsonWebToken}
MONGODB_URL="mongodb://{ipAdress}:{port}/{nameOfTheDbDeTest}"
```

### mettre en place une db mongodb et la lancer
suivant le type d'installation que vous voulez suivre [mongodb install](https://docs.mongodb.com/manual/installation/)

### exec la commande dans la cli pour start l'application en mode test
- se placer à la racine du projet
```
npm run dev
```

## Démarrer les tests de charge

### Prérequis
- l'utilitaire k6 doit-être installé
- si ce n'est pas le cas vous pouvez l'installer via [k6 install](https://k6.io/docs/getting-started/installation)


### exec la commande pour lancer les tests de charge
- dans deux shell différents
- lance l'app en mode dev
```
npm run dev
```
- lance le script pour tester l'app en mode dev
```
k6 run test_charge/loadTestsScript.js
```


## Test de charge Avec une visualisation grafana

### Prérequis
- On install grafana et influxdb
- si grafana n'est pas installé vous pouvez l'installer via [Grafana install](https://grafana.com/docs/grafana/latest/installation/)
- si influxdb n'est pas installé vous pouvez l'installer via [influxdb install](https://archive.docs.influxdata.com/influxdb/v1.2/introduction/installation/)

### Démarrer Grafana et influxdb (pour Mac)
- dans deux shell différents
```
influxd -config /usr/local/etc/influxdb.conf

brew services start grafana
```

### exec la commande pour lancer les tests de charge
```
k6 run --out influxdb=http://adresse:port/nomDB test_charge/loadTestSrcipt.js
```

### visualisation

- ce rendre sur l'url http://localhost:3000 qui fait fonctionner grafana pour notre exemple


