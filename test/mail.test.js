const Mail = require('../src/modules/mail');
const mailInstance = new Mail();

describe('maskMail', () => {
  test('should mask the local part of an email address', () => {
    expect(mailInstance.maskMail('test@example.com')).toBe('t***@example.com');
  });

  test('should mask the local part of an email address with multiple dots', () => {
    expect(mailInstance.maskMail('first.last@example.com')).toBe(
      'f****.l***@example.com',
    );
  });

  test('should mask the local part of an email address with a short local part', () => {
    expect(mailInstance.maskMail('a@example.com')).toBe('*@example.com');
  });

  test('should return an empty string for an invalid email address', () => {
    expect(mailInstance.maskMail('invalid-email')).toBe('');
  });

  test('should handle empty string input', () => {
    expect(mailInstance.maskMail('')).toBe('');
  });

  test('should handle null input', () => {
    expect(mailInstance.maskMail(null)).toBe('');
  });

  test('should handle undefined input', () => {
    expect(mailInstance.maskMail(undefined)).toBe('');
  });
});
