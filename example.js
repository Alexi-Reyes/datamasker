const fs = require('fs');
const path = require('path');
const DataMasker = require('./');

const inputFilePath = path.resolve(__dirname, 'example.sql');

fs.readFile(inputFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error(`Error reading file ${inputFilePath}:`, err);
    return;
  }

  // Anonymize specific columns: pass an object mapping column names (case-insensitive)
  // to the desired DataMasker method path (e.g., 'person.fullName', 'mail.randomEmail').
  // Example: anonymize 'name' with a random full name and 'email' with a random email.
  const columnAnonymizationMap = {
    name: 'person.fullName',
    email: 'mail.randomEmail',
    // Add other columns and their desired anonymization methods here:
    // dob: 'date.randomDate',
    // phone: 'phone.randomNumber',
    // ip_address: 'ip.randomIp',
    // credit_card: 'creditCard.randomNumber',
    // If you have a generic text column, you might use:
    // text: 'person.fullName'
  };
  const anonymizedData = DataMasker.anonymizeSql(data, columnAnonymizationMap);
  console.log('Anonymized SQL Content:\n', anonymizedData);

  // Optional: Write to an output file
  // const outputFilePath = path.resolve(__dirname, 'anonymized_example.sql');
  // fs.writeFile(outputFilePath, anonymizedData, 'utf8', (writeErr) => {
  //   if (writeErr) {
  //     console.error(`Error writing to file ${outputFilePath}:`, writeErr);
  //     return;
  //   }
  //   console.log(`Anonymized content written to ${outputFilePath}`);
  // });
});
