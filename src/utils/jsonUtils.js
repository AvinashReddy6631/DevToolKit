/**
 * JSON utility functions
 * Handles parsing, formatting, and validation of JSON strings
 */

/**
 * Attempts to parse and prettify JSON input.
 * @param {string} raw - Raw JSON string
 * @param {number} indent - Spaces for indentation
 * @returns {{ formatted: string|null, error: string|null }}
 */
export function formatJson(raw, indent = 2) {
  if (!raw || !raw.trim()) {
    return { formatted: null, error: 'Input is empty.' };
  }
  try {
    const parsed = JSON.parse(raw);
    const formatted = JSON.stringify(parsed, null, indent);
    return { formatted, error: null };
  } catch (err) {
    return { formatted: null, error: parseJsonError(err.message) };
  }
}

/**
 * Validates JSON and returns a user-friendly error message if invalid.
 * @param {string} raw
 * @returns {{ valid: boolean, error: string|null, message: string }}
 */
export function validateJson(raw) {
  if (!raw || !raw.trim()) {
    return { valid: false, error: 'Input is empty.', message: '' };
  }
  try {
    JSON.parse(raw);
    return { valid: true, error: null, message: '✓ Valid JSON' };
  } catch (err) {
    return { valid: false, error: parseJsonError(err.message), message: '' };
  }
}

/**
 * Extracts a clean error message from a JSON parse error.
 * @param {string} errMsg
 * @returns {string}
 */
function parseJsonError(errMsg) {
  // Chrome-style: "Unexpected token '}' at position 45"
  // Firefox-style: "JSON.parse: expected property name or '}' at line 3 column 2"
  const posMatch = errMsg.match(/position (\d+)/i);
  const lineMatch = errMsg.match(/line (\d+) column (\d+)/i);

  if (lineMatch) {
    return `Syntax error at line ${lineMatch[1]}, column ${lineMatch[2]}: ${errMsg}`;
  }
  if (posMatch) {
    return `Syntax error at position ${posMatch[1]}: ${errMsg}`;
  }
  return `Invalid JSON: ${errMsg}`;
}

/**
 * Minifies JSON by removing all whitespace.
 * @param {string} raw
 * @returns {{ minified: string|null, error: string|null }}
 */
export function minifyJson(raw) {
  if (!raw || !raw.trim()) return { minified: null, error: 'Input is empty.' };
  try {
    const parsed = JSON.parse(raw);
    return { minified: JSON.stringify(parsed), error: null };
  } catch (err) {
    return { minified: null, error: parseJsonError(err.message) };
  }
}
