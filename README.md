# 🕵️‍♂️ Datamasker

![npm](https://img.shields.io/npm/v/datamasker)
![Node.js CI](https://img.shields.io/github/actions/workflow/status/Alexi-Reyes/datamasker/node.js.yml?branch=main)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Datamasker** est une bibliothèque Node.js permettant d’anonymiser des données sensibles dans des fichiers SQL.
Elle détecte automatiquement noms, emails, dates, numéros de téléphone, IP et numéros de cartes bancaires pour les remplacer
par des valeurs réalistes générées dynamiquement.

**Créateurs**  
`Alexi Reyes - Hermione Tetard - Cynthia Apura`

---

## ✨ Fonctionnalités

- Détection automatique des données sensibles via expressions régulières
- Génération de données fictives : noms, emails, IPs, dates, CB, etc.
- Masquage des valeurs dans les fichiers SQL d’insertion (`INSERT INTO`)
- Architecture modulaire et facilement extensible

---

## 📦 Installation

```bash
npm install datamasker
```

## 🚀 Utilisation

### Exemple 1 – En ligne de commande (CLI)

La CLI de Datamasker permet d'anonymiser des fichiers SQL directement depuis votre terminal.

#### Anonymisation d'un fichier SQL avec remplacement direct

```bash
datamasker anonymize <fichier_source>
```

**Exemple :**
```bash
datamasker anonymize example.sql
```
👉 Cette commande lit `example.sql`, anonymise son contenu et écrase le fichier original avec les données masquées.

#### Anonymisation d'un fichier SQL vers un nouveau fichier de sortie

```bash
datamasker anonymize <fichier_source> -o <fichier_destination>
```

**Exemple :**
```bash
datamasker anonymize example.sql -o example.masked.sql
```
👉 Cette commande lit `example.sql`, anonymise son contenu et écrit le résultat dans `example.masked.sql` sans modifier le fichier original.

#### Affichage de l'aide de la CLI

Pour obtenir des informations sur les commandes disponibles et leurs options :

```bash
datamasker --help
```

### Exemple 2 : Anonymisation de colonnes spécifiques via la bibliothèque

Utilisez la méthode `anonymizeSql` pour anonymiser des colonnes spécifiques en mappant les noms de colonnes (insensibles à la casse) aux méthodes de masquage souhaitées.

```javascript
const fs = require('fs');
const path = require('path');
const DataMasker = require('datamasker');

const inputFilePath = path.resolve(__dirname, 'example.sql');

fs.readFile(inputFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error(`Erreur lors de la lecture du fichier ${inputFilePath}:`, err);
    return;
  }

  // Anonymiser des colonnes spécifiques : passez un objet mappant les noms de colonnes (insensibles à la majuscule)
  // au chemin de la méthode DataMasker souhaitée (par exemple, 'person.fullName', 'mail.randomEmail').
  // Exemple : anonymiser 'name' avec un nom complet aléatoire et 'email' avec un email aléatoire.
  const columnAnonymizationMap = {
    name: 'person.fullName',
    email: 'mail.randomEmail',
    // Ajoutez d'autres colonnes et leurs méthodes d'anonymisation souhaitées ici :
    // dob: 'date.randomDate',
    // phone: 'phone.randomNumber',
    // ip_address: 'ip.randomIp',
    // credit_card: 'creditCard.randomNumber',
    // Si vous avez une colonne de texte générique, vous pouvez utiliser :
    // text: 'person.fullName'
  };
  const anonymizedData = DataMasker.anonymizeSql(data, columnAnonymizationMap);
  console.log('Contenu SQL anonymisé :\n', anonymizedData);

  // Optionnel : Écrire dans un fichier de sortie
  // const outputFilePath = path.resolve(__dirname, 'anonymized_example.sql');
  // fs.writeFile(outputFilePath, anonymizedData, 'utf8', (writeErr) => {
  //   if (writeErr) {
  //     console.error(`Erreur lors de l'écriture dans le fichier ${outputFilePath}:`, writeErr);
  //     return;
  //   }
  //   console.log(`Contenu anonymisé écrit dans ${outputFilePath}`);
  // });
});
```


### Exemple 3 – Génération de données aléatoires en console

```js
const DataMasker = require('datamasker');

console.log('Nom généré :', DataMasker.person.fullName());
console.log('Prénom généré :', DataMasker.person.firstName());
console.log('Nom de famille généré :', DataMasker.person.lastName());
console.log('Email généré :', DataMasker.mail.randomEmail());
console.log('Date générée :', DataMasker.date.randomDate());
console.log('Date et heure générées :', DataMasker.date.randomDateTime());
console.log('Numéro de téléphone généré :', DataMasker.phone.randomNumber());
console.log('Adresse IP générée :', DataMasker.ip.randomIp());
console.log(
  'Numéro de carte de crédit généré :',
  DataMasker.creditCard.randomNumber(),
);
```

## 🔧 Développement

Cloner le dépôt et installer les dépendances :

```bash
git clone https://github.com/Alexi-Reyes/datamasker.git
cd datamasker
npm install
```

🤝 Contribution

Les contributions sont les bienvenues ! Vous pouvez :

    Forker le projet

    Créer une branche pour votre fonctionnalité (git checkout -b feature/ma-fonctionnalite)

    Committer vos modifications (git commit -m "Ajout d’une fonctionnalité")

    Pousser la branche (git push origin feature/ma-fonctionnalite)

    Ouvrir une Pull Request

Lignes directrices :

    Assurez-vous que tous les tests passent

    Respectez le style de code (utilisez npm run lint et npm run format)

    Ajoutez des tests pour toute nouvelle fonctionnalité

    Mettez à jour la documentation si nécessaire

## 🧪 Tests

Les tests unitaires sont écrits avec Jest. Pour les exécuter :

```bash
npm test
```

Les tests couvrent actuellement :
- L'interface en ligne de commande (`test/cli.test.js`)
- Le module de génération d'emails (`test/mail.test.js`)

## 📁 Structure du projet

```
├── src/
│   ├── anonymizer.js          # Logique d'anonymisation
│   ├── index.js               # Point d’entrée de la bibliothèque
│   ├── config/
│   │   └── regex.js           # Expressions régulières utilisées pour le masquage
│   └── modules/               # Générateurs de données
│       ├── creditCard.js      # Génération de numéros de cartes de crédit
│       ├── date.js            # Génération de dates et heures
│       ├── ip.js              # Génération d'adresses IP
│       ├── mail.js            # Génération d'adresses email
│       ├── person.js          # Génération de noms et prénoms
│       └── phone.js           # Génération de numéros de téléphone
├── bin/
│   └── datamasker.js          # Script CLI principal
├── test/
│   ├── cli.test.js            # Tests pour l'interface en ligne de commande
│   └── mail.test.js           # Tests pour le module de mail
├── example.js                 # Exemple d'utilisation de la bibliothèque
└── example.sql                # Fichier SQL d'exemple pour le masquage
```

## 📄 Licence

Ce projet est sous licence MIT. Consultez le fichier [LICENSE](LICENSE) pour plus de détails.
