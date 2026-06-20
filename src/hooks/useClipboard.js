/**
 * useClipboard — custom hook for copy-to-clipboard with status feedback
 */
import { useState, useCallback } from 'react';

/**
 * @param {number} resetDelay - ms before "copied" state resets (default 2000)
 */
export function useClipboard(resetDelay = 2000) {
  const [copied, setCopied] = useState(false);
  const [error, setError]   = useState(null);

  const copy = useCallback(async (text) => {
    if (!text) return;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for non-secure contexts
        const el = document.createElement('textarea');
        el.value = text;
        el.style.position = 'fixed';
        el.style.opacity = '0';
        document.body.appendChild(el);
        el.focus();
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
      }
      setCopied(true);
      setError(null);
      setTimeout(() => setCopied(false), resetDelay);
    } catch (err) {
      setError('Failed to copy to clipboard.');
      console.error('Clipboard error:', err);
    }
  }, [resetDelay]);

  return { copy, copied, error };
}
