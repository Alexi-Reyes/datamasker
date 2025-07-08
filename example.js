const DataMasker = require('./src/index');

console.log('Generated Name:', DataMasker.person.fullName());
console.log('Generated First Name:', DataMasker.person.firstName());
console.log('Generated Last Name:', DataMasker.person.lastName());
console.log('Generated Mail:', DataMasker.mail.randomEmail());
console.log('Generated Date:', DataMasker.date.randomDate());
console.log('Generated DateTime:', DataMasker.date.randomDateTime());
console.log('Generated Phone Number:', DataMasker.phone.randomNumber());
console.log('Generated IP Address:', DataMasker.ip.randomIp());
console.log('Generated Credit Card Number:', DataMasker.creditCard.randomNumber());
