const regexPatterns = require('./config/regex');

/**
 * Anonymizes a given SQL content string, optionally targeting specific columns with specified anonymization methods.
 *
 * @param {object} DataMaskerInstance The instance of DataMasker to use for anonymization.
 * @param {string} sqlContent The SQL content to anonymize.
 * @param {object} [columnAnonymizationMap={}] An object mapping column names (lowercase) to DataMasker methods (e.g., `{ name: 'person.fullName', email: 'mail.randomEmail' }`).
 *                                            If empty, all recognized patterns will be anonymized globally.
 * @returns {string} The anonymized SQL content.
 */
function anonymizeSqlContent(
  DataMaskerInstance,
  sqlContent,
  columnAnonymizationMap = {},
) {
  let anonymizedData = sqlContent;

  /**
   * Helper function to apply anonymization to a single value based on the specified method.
   * @param {string} value The original value (not used by current anonymization methods, but kept for potential future use).
   * @param {string} anonymizationMethodPath The path to the DataMasker method (e.g., 'person.fullName').
   * @returns {string} The raw anonymized value (without SQL quotes).
   */
  function applyAnonymizationToValue(value, anonymizationMethodPath) {
    const parts = anonymizationMethodPath.split('.');
    let context = DataMaskerInstance;
    let method = DataMaskerInstance;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (method && typeof method === 'object' && part in method) {
        if (i < parts.length - 1) {
          // If not the last part, update context
          context = method[part];
        }
        method = method[part];
      } else {
        console.warn(
          `Anonymization method not found: ${anonymizationMethodPath}. Returning original value.`,
        );
        return value;
      }
    }

    if (typeof method === 'function') {
      return method.call(context); // Call method with correct 'this' context, returns raw value
    } else {
      console.warn(
        `Anonymization method is not a function: ${anonymizationMethodPath}. Returning original value.`,
      );
      return value;
    }
  }

  // If no specific columns are provided in the map, revert to global anonymization by pattern
  if (Object.keys(columnAnonymizationMap).length === 0) {
    // Anonymize names
    anonymizedData = anonymizedData.replace(regexPatterns.fullName, () => {
      return `'${DataMaskerInstance.person.fullName()}'`; // Ensure quoted
    });

    // Anonymize emails
    anonymizedData = anonymizedData.replace(
      regexPatterns.email,
      (_match, _emailContent) => {
        return `'${DataMaskerInstance.mail.randomEmail()}'`;
      },
    );

    // Anonymize dates
    anonymizedData = anonymizedData.replace(regexPatterns.date, () => {
      return DataMaskerInstance.date.randomDate();
    });

    // Anonymize datetimes
    anonymizedData = anonymizedData.replace(regexPatterns.dateTime, () => {
      return DataMaskerInstance.date.randomDateTime();
    });

    // Anonymize phone numbers
    anonymizedData = anonymizedData.replace(regexPatterns.phoneNumber, () => {
      return DataMaskerInstance.phone.randomNumber();
    });

    // Anonymize IP addresses
    anonymizedData = anonymizedData.replace(regexPatterns.ipAddress, () => {
      return DataMaskerInstance.ip.randomIp();
    });

    // Anonymize credit card numbers
    anonymizedData = anonymizedData.replace(
      regexPatterns.creditCardNumber,
      () => {
        return `'${DataMaskerInstance.creditCard.randomNumber()}'`; // Ensure quoted
      },
    );

    return anonymizedData;
  }

  // Regex to find INSERT statements and capture column names and values
  // This regex is simplified and may not handle all SQL complexities.
  const insertRegex =
    /(INSERT INTO\s+\S+\s*)\(([^)]+)\)\s*VALUES\s*\(([^)]+)\)/gi;

  anonymizedData = anonymizedData.replace(
    insertRegex,
    (match, prefix, colsStr, valsStr) => {
      const columnNames = colsStr
        .split(',')
        .map((col) => col.trim().toLowerCase());
      const values = parseValuesString(valsStr);

      const anonymizedValues = values.map((valInfo, index) => {
        const colName = columnNames[index];
        const anonymizationMethodPath = columnAnonymizationMap[colName];

        if (anonymizationMethodPath) {
          // Anonymize the value, applyAnonymizationToValue returns raw value
          return {
            value: applyAnonymizationToValue(
              valInfo.value,
              anonymizationMethodPath,
            ),
            isQuoted: valInfo.isQuoted,
            isNull: valInfo.isNull,
          };
        }
        return valInfo; // Return original value info if not anonymized
      });

      return `${prefix}(${colsStr}) VALUES (${formatValuesString(anonymizedValues)})`;
    },
  );

  return anonymizedData;
}

/**
 * Helper function to parse a comma-separated string of SQL values.
 * Handles quoted strings, numbers, and NULL.
 * This is a simplified parser and may not handle all edge cases (e.g., escaped quotes).
 * @param {string} valsStr The string containing values (e.g., "'John Doe', 123, NULL").
 * @returns {Array<{value: string, isQuoted: boolean, isNull: boolean}>} An array of parsed value objects.
 */
function parseValuesString(valsStr) {
  const values = [];
  let inQuote = false;
  let start = 0;

  for (let i = 0; i < valsStr.length; i++) {
    const char = valsStr[i];
    if (char === "'" && (i === 0 || valsStr[i - 1] !== '\\')) {
      inQuote = !inQuote;
    } else if (char === ',' && !inQuote) {
      const valStr = valsStr.substring(start, i).trim();
      const isQuoted = valStr.startsWith("'") && valStr.endsWith("'");
      const value = isQuoted ? valStr.substring(1, valStr.length - 1) : valStr;
      const isNull = value.toLowerCase() === 'null';
      values.push({ value: value, isQuoted: isQuoted, isNull: isNull });
      start = i + 1;
    }
  }
  const valStr = valsStr.substring(start).trim();
  const isQuoted = valStr.startsWith("'") && valStr.endsWith("'");
  const value = isQuoted ? valStr.substring(1, valStr.length - 1) : valStr;
  const isNull = value.toLowerCase() === 'null';
  values.push({ value: value, isQuoted: isQuoted, isNull: isNull });
  return values;
}

/**
 * Helper function to format an array of value objects back into a comma-separated SQL string.
 * Adds quotes back to strings based on their original quoting status or if they are string literals.
 * @param {Array<{value: string, isQuoted: boolean, isNull: boolean}>} values An array of value objects.
 * @returns {string} A comma-separated string of formatted values.
 */
function formatValuesString(values) {
  return values
    .map((valInfo) => {
      const val = valInfo.value;
      if (valInfo.isNull) {
        return 'NULL';
      }
      // If it was originally quoted, or if it's a string that isn't a number and isn't NULL
      if (
        valInfo.isQuoted ||
        (typeof val === 'string' && !/^-?\d+(\.\d+)?$/.test(val))
      ) {
        return `'${val}'`;
      }
      return val;
    })
    .join(', ');
}

module.exports = anonymizeSqlContent;
