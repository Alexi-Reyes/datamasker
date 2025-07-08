class PhoneGenerator {
  /**
   * Generates a random phone number in a common format (e.g., XXX-XXX-XXXX).
   * @returns {string} A random phone number.
   */
  randomNumber() {
    const areaCode = Math.floor(100 + Math.random() * 900);
    const prefix = Math.floor(100 + Math.random() * 900);
    const suffix = Math.floor(1000 + Math.random() * 9000);
    return `${areaCode}-${prefix}-${suffix}`;
  }
}

module.exports = PhoneGenerator;
