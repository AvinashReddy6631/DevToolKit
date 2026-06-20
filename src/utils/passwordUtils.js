/**
 * Password generation utilities
 * Provides secure random password generation with strength evaluation
 */

const CHARSETS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers:   '0123456789',
  symbols:   '!@#$%^&*()_+-=[]{}|;:,.<>?',
};

/**
 * Generates a cryptographically random password.
 * @param {{ length: number, uppercase: boolean, lowercase: boolean, numbers: boolean, symbols: boolean }} options
 * @returns {string}
 */
export function generatePassword(options) {
  const { length, uppercase, lowercase, numbers, symbols } = options;

  let charset = '';
  const guaranteed = [];

  if (uppercase) { charset += CHARSETS.uppercase; guaranteed.push(randomChar(CHARSETS.uppercase)); }
  if (lowercase) { charset += CHARSETS.lowercase; guaranteed.push(randomChar(CHARSETS.lowercase)); }
  if (numbers)   { charset += CHARSETS.numbers;   guaranteed.push(randomChar(CHARSETS.numbers));   }
  if (symbols)   { charset += CHARSETS.symbols;   guaranteed.push(randomChar(CHARSETS.symbols));   }

  if (!charset) return '';

  // Fill remaining characters
  const remaining = length - guaranteed.length;
  const randomChars = Array.from({ length: Math.max(0, remaining) }, () => randomChar(charset));

  // Shuffle the combined array using Fisher-Yates
  const combined = [...guaranteed, ...randomChars];
  for (let i = combined.length - 1; i > 0; i--) {
    const j = cryptoRandInt(i + 1);
    [combined[i], combined[j]] = [combined[j], combined[i]];
  }

  return combined.join('');
}

/**
 * Evaluates password strength on a 0–4 scale.
 * Returns { score, label, color, percentage }
 */
export function evaluateStrength(password) {
  if (!password) return { score: 0, label: 'None', color: 'transparent', percentage: 0 };

  let score = 0;

  // Length bonuses
  if (password.length >= 8)  score++;
  if (password.length >= 12) score++;
  if (password.length >= 16) score++;

  // Character variety bonuses
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  // Normalize to 0–4
  const normalized = Math.min(4, Math.floor(score / 2));

  const levels = [
    { label: 'Weak',      color: '#ef4444', percentage: 25  },
    { label: 'Fair',      color: '#f97316', percentage: 50  },
    { label: 'Good',      color: '#eab308', percentage: 75  },
    { label: 'Strong',    color: '#22c55e', percentage: 100 },
  ];

  const level = levels[Math.max(0, normalized - 1)] || levels[0];
  return { score: normalized, ...level };
}

/** Returns a random character from a string using crypto */
function randomChar(str) {
  return str[cryptoRandInt(str.length)];
}

/** Returns a cryptographically random integer in [0, max) */
function cryptoRandInt(max) {
  const arr = new Uint32Array(1);
  crypto.getRandomValues(arr);
  return arr[0] % max;
}
