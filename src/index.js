const Person = require('./modules/person');

class DataMasker {
  constructor() {
    this.person = new Person();
  }
}

module.exports = new DataMasker();
