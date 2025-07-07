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

  // Add more regex patterns here as needed for other data types.
  // For example:
  // phoneNumber: /'\d{3}-\d{3}-\d{4}'/g,
  // ipAddress: /'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}'/g,
};

module.exports = regexPatterns;
