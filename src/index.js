const Person = require('./modules/person');
const Mail = require('./modules/mail');

class DataMasker {
  constructor() {
    this.person = new Person();
    this.mail = new Mail();
  }
}

module.exports = new DataMasker();
