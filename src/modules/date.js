class DateGenerator {
  /**
   * Generates a random date within a specified range.
   * @param {Date} start - The start date of the range.
   * @param {Date} end - The end date of the range.
   * @returns {string} A random date in 'YYYY-MM-DD' format.
   */
  randomDate(start = new Date(1900, 0, 1), end = new Date()) {
    const date = new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime()),
    );
    return date.toISOString().split('T')[0];
  }

  /**
   * Generates a random datetime within a specified range.
   * @param {Date} start - The start date of the range.
   * @param {Date} end - The end date of the range.
   * @returns {string} A random datetime in 'YYYY-MM-DD HH:MM:SS' format.
   */
  randomDateTime(start = new Date(1900, 0, 1), end = new Date()) {
    const date = new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime()),
    );
    return date.toISOString().replace('T', ' ').substring(0, 19);
  }
}

module.exports = DateGenerator;
