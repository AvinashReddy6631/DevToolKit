/**
 * Text analysis utilities
 * Word count, character count, reading time, etc.
 */

/**
 * Analyses a block of text and returns comprehensive statistics.
 * @param {string} text
 * @returns {{
 *   words: number,
 *   characters: number,
 *   charactersNoSpaces: number,
 *   sentences: number,
 *   paragraphs: number,
 *   readingTime: string,
 *   avgWordLength: number,
 * }}
 */
export function analyzeText(text) {
  if (!text) {
    return {
      words: 0,
      characters: 0,
      charactersNoSpaces: 0,
      sentences: 0,
      paragraphs: 0,
      readingTime: '< 1 sec',
      avgWordLength: 0,
    };
  }

  // Word count — split on whitespace, filter empty tokens
  const wordTokens = text.trim().split(/\s+/).filter(Boolean);
  const words = wordTokens.length;

  // Characters
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, '').length;

  // Sentences — split on . ! ? (followed by space or end)
  const sentenceTokens = text
    .trim()
    .split(/[.!?]+/)
    .filter(s => s.trim().length > 0);
  const sentences = sentenceTokens.length;

  // Paragraphs — split on double newlines
  const paragraphTokens = text
    .trim()
    .split(/\n\s*\n/)
    .filter(p => p.trim().length > 0);
  const paragraphs = paragraphTokens.length;

  // Reading time — average 200 wpm
  const minutes = words / 200;
  let readingTime;
  if (words === 0) {
    readingTime = '—';
  } else if (minutes < 1) {
    const secs = Math.ceil(minutes * 60);
    readingTime = `${secs} sec`;
  } else {
    const mins = Math.floor(minutes);
    const secs = Math.round((minutes - mins) * 60);
    readingTime = secs > 0 ? `${mins}m ${secs}s` : `${mins} min`;
  }

  // Average word length
  const totalLen = wordTokens.reduce((acc, w) => acc + w.replace(/[^a-zA-Z]/g, '').length, 0);
  const avgWordLength = words > 0 ? (totalLen / words).toFixed(1) : 0;

  return { words, characters, charactersNoSpaces, sentences, paragraphs, readingTime, avgWordLength };
}
