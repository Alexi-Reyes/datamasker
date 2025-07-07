const Person = require('./modules/person');
const Mail = require('./modules/mail');
const DateGenerator = require('./modules/date');
const PhoneGenerator = require('./modules/phone');
const IpGenerator = require('./modules/ip');
const CreditCardGenerator = require('./modules/creditCard');

class DataMasker {
  constructor() {
    this.person = new Person();
    this.mail = new Mail();
    this.date = new DateGenerator();
    this.phone = new PhoneGenerator();
    this.ip = new IpGenerator();
    this.creditCard = new CreditCardGenerator();
  }
}

module.exports = new DataMasker();
