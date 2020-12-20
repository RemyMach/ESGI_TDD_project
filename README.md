# ESGI_TDD_projet

## Démarrer l'environnement de dev

### Créer un fichier config/dev.env
```
PORT={portSurLequelDemarreVotreAppExpress}
JWT_SECRET={LeSecretSetupDansLeProjetPourLesJsonWebToken}
MONGODB_URL="mongodb://{ipAdress}:{port}/{nameOfTheDbDeDev}"
```

### exec la commande dans la cli pour start l'application en mode dev
```
npm run dev
```

## Démarrer l'environnement de test

### Créer un fichier config/test.env
```
PORT={portSurLequelDemarreVotreAppExpress}
JWT_SECRET={LeSecretSetupDansLeProjetPourLesJsonWebToken}
MONGODB_URL="mongodb://{ipAdress}:{port}/{nameOfTheDbDeTest}"
```

### exec la commande dans la cli pour start l'application en mode test
```
npm run test
```