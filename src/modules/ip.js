class IpGenerator {
  /**
   * Generates a random IPv4 address.
   * @returns {string} A random IPv4 address.
   */
  randomIp() {
    return Array.from({ length: 4 }, () => Math.floor(Math.random() * 256)).join('.');
  }
}

module.exports = IpGenerator;
