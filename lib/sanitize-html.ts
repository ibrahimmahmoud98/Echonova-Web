import DOMPurify from 'isomorphic-dompurify';

/**
 * Escapes HTML special characters into entities.
 * Used for plain text inputs (like form fields) to prevent ANY HTML from rendering.
 * Defends against phishing links <a> and tracking pixels <img> in emails.
 */
export function escapeHtml(value: unknown): string {
  if (value === null || value === undefined) return '';
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Robust HTML sanitizer using DOMPurify.
 * Defends against XSS via dangerouslySetInnerHTML in rich-text articles.
 */
export function sanitizeHtml(input: string | undefined | null): string {
  if (!input) return '';
  return DOMPurify.sanitize(String(input));
}
