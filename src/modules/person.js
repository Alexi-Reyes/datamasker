class Person {
  firstName() {
    const names = ['Alice', 'Bob', 'Charlie', 'David', 'Eve'];
    return names[Math.floor(Math.random() * names.length)];
  }

  lastName() {
    const names = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones'];
    return names[Math.floor(Math.random() * names.length)];
  }

  fullName() {
    return `${this.firstName()} ${this.lastName()}`;
  }
}

module.exports = Person;
