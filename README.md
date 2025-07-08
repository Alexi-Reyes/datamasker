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

### Exemple 1 – En ligne de commande

**Anonymisation d’un fichier SQL en remplaçant directement le fichier d’origine :**

```bash
node bin/datamasker.js anonymize test/test.sql
```

👉 Cette commande modifie le fichier `test/test.sql` en place avec des données masquées.

---

**Anonymisation d’un fichier SQL en créant un nouveau fichier de sortie (exemple test/test.masked.sql) :**

```bash
node bin/datamasker.js anonymize test/test.sql -o test/test.masked.sql
```

👉 Cette commande génère un nouveau fichier contenant les données masquées, sans modifier le fichier d’origine.

### Exemple 2 : Masquage dans un fichier SQL

```javascript
const fs = require('fs');
const masker = require('datamasker');
const regex = require('./config/regex'); // chemin vers regex.js

let sql = fs.readFileSync('test.sql', 'utf-8');

sql = sql.replace(regex.email, () => `'${masker.mail.randomEmail()}'`);
sql = sql.replace(regex.fullName, () => `'${masker.person.fullName()}'`);
sql = sql.replace(regex.date, () => `'${masker.date.randomDate()}'`);
sql = sql.replace(regex.phoneNumber, () => `'${masker.phone.randomNumber()}'`);
sql = sql.replace(regex.ipAddress, () => `'${masker.ip.randomIp()}'`);
sql = sql.replace(
  regex.creditCardNumber,
  () => `'${masker.creditCard.randomNumber()}'`,
);

fs.writeFileSync('masked.sql', sql);
```

### Exemple 3 – Génération de données aléatoires en console

```js
const DataMasker = require('datamasker');

console.log('Generated Name:', DataMasker.person.fullName());
console.log('Generated First Name:', DataMasker.person.firstName());
console.log('Generated Last Name:', DataMasker.person.lastName());
console.log('Generated Mail:', DataMasker.mail.randomEmail());
console.log('Generated Date:', DataMasker.date.randomDate());
console.log('Generated DateTime:', DataMasker.date.randomDateTime());
console.log('Generated Phone Number:', DataMasker.phone.randomNumber());
console.log('Generated IP Address:', DataMasker.ip.randomIp());
console.log(
  'Generated Credit Card Number:',
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

Cette section est en cours de développement. N’hésitez pas à contribuer en ajoutant des tests unitaires.

## 📁 Structure du projet

```
├── src/
│   ├── index.js               # Point d’entrée
│   └── modules/               # Générateurs de données (email, nom, etc.)
├── config/
│   └── regex.js               # Expressions régulières utilisées pour le masquage
├── bin/
│   └── datamasker.js          # CLI
├── test/
│   └── test.sql               # Fichier de test
└── example.js                 # Exemple de génération en console
```

## 📄 Licence

Ce projet est sous licence MIT. Consultez le fichier [LICENSE](LICENSE) pour plus de détails.
