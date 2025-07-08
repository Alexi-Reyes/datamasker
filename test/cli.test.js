const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const cliPath = path.resolve(__dirname, '../bin/datamasker.js');
const testFilePath = path.resolve(__dirname, 'test_data.sql');
const outputFilePath = path.resolve(__dirname, 'output_data.sql');

describe('CLI Tool', () => {
  beforeEach(() => {
    // Create a dummy SQL file for testing
    const dummyContent = `
INSERT INTO users (id, name, email, dob, created_at, phone, ip, credit_card) VALUES
(1, 'John Doe', 'john.doe@example.com', '1990-01-15', '2023-01-01 10:00:00', '123-456-7890', '192.168.1.1', '1234567890123456');
`;
    fs.writeFileSync(testFilePath, dummyContent, 'utf8');
  });

  afterEach(() => {
    // Clean up dummy files
    if (fs.existsSync(testFilePath)) {
      fs.unlinkSync(testFilePath);
    }
    if (fs.existsSync(outputFilePath)) {
      fs.unlinkSync(outputFilePath);
    }
  });

  test('should anonymize a file and output to stdout', (done) => {
    const originalContent = fs.readFileSync(testFilePath, 'utf8');
    exec(
      `node "${cliPath}" anonymize "${testFilePath}"`,
      (error, stdout, stderr) => {
        expect(error).toBeNull();
        expect(stderr).toBe('');
        expect(stdout).not.toContain('John Doe');
        expect(stdout).not.toContain('john.doe@example.com');
        expect(stdout).not.toContain('1990-01-15');
        expect(stdout).not.toContain('123-456-7890');
        expect(stdout).not.toContain('192.168.1.1');
        expect(stdout).not.toContain('1234567890123456');

        // Ensure the original file is NOT modified
        const currentContent = fs.readFileSync(testFilePath, 'utf8');
        expect(currentContent).toBe(originalContent);
        done();
      },
    );
  }, 10000); // Increase timeout for CLI execution

  test('should anonymize a file and output to a specified file', (done) => {
    exec(
      `node "${cliPath}" anonymize "${testFilePath}" -o "${outputFilePath}"`,
      (error, stdout, stderr) => {
        expect(error).toBeNull();
        expect(stderr).toBe('');
        expect(stdout).toBe(''); // No stdout when outputting to a file

        const anonymizedContent = fs.readFileSync(outputFilePath, 'utf8');
        expect(anonymizedContent).not.toContain('John Doe');
        expect(anonymizedContent).not.toContain('john.doe@example.com');
        expect(anonymizedContent).not.toContain('1990-01-15');
        expect(anonymizedContent).not.toContain('123-456-7890');
        expect(anonymizedContent).not.toContain('192.168.1.1');
        expect(anonymizedContent).not.toContain('1234567890123456');
        done();
      },
    );
  }, 10000); // Increase timeout for CLI execution

  test('should show an error if no input file is specified', (done) => {
    exec(`node "${cliPath}" anonymize`, (error, stdout, stderr) => {
      expect(error).not.toBeNull(); // Expect an error because no file is specified
      expect(stderr).toContain(
        'Not enough non-option arguments: got 0, need at least 1',
      );
      done();
    });
  });

  test('should show an error for a non-existent input file', (done) => {
    exec(
      `node "${cliPath}" anonymize "non_existent_file.sql"`,
      (error, stdout, stderr) => {
        expect(error).not.toBeNull(); // Expect an error because the file doesn't exist
        expect(stderr).toContain(
          `Error reading file ${path.resolve(process.cwd(), 'non_existent_file.sql')}`,
        );
        done();
      },
    );
  });
});
