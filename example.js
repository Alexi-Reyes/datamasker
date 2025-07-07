const DataMasker = require('./src/index');

console.log('Generated Name:', DataMasker.person.fullName());
console.log('Generated First Name:', DataMasker.person.firstName());
console.log('Generated Last Name:', DataMasker.person.lastName());
console.log('Generated Mail:', DataMasker.mail.randomEmail());
