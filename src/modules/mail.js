class Mail {
  firstName() {
    const names = ["Alice", "Bob", "Charlie", "David", "Eve"];
    return names[Math.floor(Math.random() * names.length)];
  }

  lastName() {
    const names = ["Smith", "Johnson", "Williams", "Brown", "Jones"];
    return names[Math.floor(Math.random() * names.length)];
  }

  randomEmail() {
    const domains = ["example.com", "mail.com", "test.org", "demo.net"];
    const first = this.firstName().toLowerCase();
    const last = this.lastName().toLowerCase();
    const domain = domains[Math.floor(Math.random() * domains.length)];
    return `${first}.${last}@${domain}`;
  }
}

module.exports = Mail;