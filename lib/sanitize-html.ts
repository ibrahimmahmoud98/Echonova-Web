import DOMPurify from 'isomorphic-dompurify';

export { escapeHtml } from './escape-html';


/**
 * Robust HTML sanitizer using DOMPurify.
 * Defends against XSS via dangerouslySetInnerHTML in rich-text articles.
 */
export function sanitizeHtml(input: string | undefined | null): string {
  if (!input) return '';
  return DOMPurify.sanitize(String(input));
}
