class Mail {
  firstName() {
    const names = ['Alice', 'Bob', 'Charlie', 'David', 'Eve'];
    return names[Math.floor(Math.random() * names.length)];
  }

  lastName() {
    const names = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones'];
    return names[Math.floor(Math.random() * names.length)];
  }

  randomEmail() {
    const domains = ['example.com', 'mail.com', 'test.org', 'demo.net'];
    const first = this.firstName().toLowerCase();
    const last = this.lastName().toLowerCase();
    const domain = domains[Math.floor(Math.random() * domains.length)];
    return `${first}.${last}@${domain}`;
  }

  maskMail(email) {
    if (!email || typeof email !== 'string') {
      return '';
    }

    // Use a local regex for masking plain email strings
    const plainEmailRegex =
      /^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    const match = email.match(plainEmailRegex);

    if (!match) {
      return '';
    }

    const [, localPart, domainPart] = match;

    const maskedLocalPart = localPart
      .split('.')
      .map((part) => {
        if (part.length <= 1) {
          return '*';
        }
        return part.charAt(0) + '*'.repeat(part.length - 1);
      })
      .join('.');

    return `${maskedLocalPart}@${domainPart}`;
  }
}

module.exports = Mail;
