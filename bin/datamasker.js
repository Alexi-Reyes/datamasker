#!/usr/bin/env node

const yargs = require('yargs');
const fs = require('fs');
const path = require('path');
const DataMasker = require('../src/index');
const regexPatterns = require('../src/config/regex');

yargs(process.argv.slice(2))
  .command({
    command: 'anonymize <file>',
    desc: 'Anonymize a SQL file',
    builder: (yargs) => {
      yargs.positional('file', {
        description: 'The SQL file to anonymize',
        type: 'string',
      });
      yargs.option('output', {
        alias: 'o',
        description: 'Output file path (defaults to stdout)',
        type: 'string',
      });
    },
    handler: (argv) => {
      const inputFile = argv.file;
      const outputFile = argv.output;

      if (!inputFile) {
        console.error('Error: No input file specified.');
        process.exit(1);
      }

      const inputFilePath = path.resolve(process.cwd(), inputFile);

      fs.readFile(inputFilePath, 'utf8', (err, data) => {
        if (err) {
          console.error(`Error reading file ${inputFilePath}:`, err);
          process.exit(1);
        }

        let anonymizedData = data;

        // Anonymize names
        anonymizedData = anonymizedData.replace(regexPatterns.fullName, () => {
          return `'${DataMasker.person.fullName()}'`;
        });

        // Anonymize emails
        anonymizedData = anonymizedData.replace(regexPatterns.email, () => {
          return `'${DataMasker.mail.randomEmail()}'`;
        });

        const finalOutputPath = outputFile
          ? path.resolve(process.cwd(), outputFile)
          : inputFilePath;

        fs.writeFile(finalOutputPath, anonymizedData, 'utf8', (writeErr) => {
          if (writeErr) {
            console.error(
              `Error writing to file ${finalOutputPath}:`,
              writeErr,
            );
            process.exit(1);
          }
          console.log(`Anonymized data written to ${finalOutputPath}`);
        });
      });
    },
  })
  .help()
  .alias('h', 'help')
  .parse();
