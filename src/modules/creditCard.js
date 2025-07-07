class CreditCardGenerator {
  /**
   * Generates a random 16-digit credit card number (for demonstration purposes).
   * This does not generate valid credit card numbers for real transactions.
   * @returns {string} A random 16-digit number.
   */
  randomNumber() {
    let cardNumber = '';
    for (let i = 0; i < 16; i++) {
      cardNumber += Math.floor(Math.random() * 10);
    }
    return cardNumber;
  }
}

module.exports = CreditCardGenerator;
