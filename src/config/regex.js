// Regex patterns for data anonymization in SQL files.

const regexPatterns = {
  /**
   * Regex to match full names enclosed in single quotes.
   * Example: 'John Doe'
   * This pattern assumes names are capitalized and separated by a space.
   * It captures the first and last names.
   */
  fullName: /'([A-Z][a-z]+)\s([A-Z][a-z]+)'/g,

  /**
   * Regex to match email addresses enclosed in single quotes.
   * Example: 'john.doe@example.com'
   * This pattern covers a wide range of valid email formats.
   */
  email: /'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'/g,

  /**
   * Regex to match dates in 'YYYY-MM-DD' format enclosed in single quotes.
   * Example: '2023-10-26'
   */
  date: /'\d{4}-\d{2}-\d{2}'/g,

  /**
   * Regex to match datetimes in 'YYYY-MM-DD HH:MM:SS' format enclosed in single quotes.
   * Example: '2023-10-26 14:30:00'
   */
  dateTime: /'\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}'/g,

  /**
   * Regex to match phone numbers in common formats (e.g., 'XXX-XXX-XXXX') enclosed in single quotes.
   */
  phoneNumber: /'\d{3}-\d{3}-\d{4}'/g,

  /**
   * Regex to match IPv4 addresses enclosed in single quotes.
   * Example: '192.168.1.1'
   */
  ipAddress: /'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}'/g,

  /**
   * Regex to match 16-digit numbers (e.g., credit card numbers) enclosed in single quotes.
   * This is a generic pattern and might match other 16-digit numbers.
   */
  creditCardNumber: /'\d{16}'/g,
};

module.exports = regexPatterns;
