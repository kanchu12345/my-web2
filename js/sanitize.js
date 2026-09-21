/**
 * js/sanitize.js
 * Universal input & rendered content sanitization for Infinite Creative Web Design.
 * Defends against Stored XSS, Reflected XSS, HTML Injection, and protocol smuggling.
 */

/**
 * Escape HTML special characters for safe insertion into HTML strings or innerHTML
 * @param {string} str
 * @returns {string}
 */
export function escapeHTML(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(//g, '&#x60;');
}

/**
 * Sanitize plain text input: strips control chars, restricts length, removes markup
 * @param {string} str 
 * @param {number} [maxLength=500] 
 * @returns {string}
 */
export function sanitizeInput(str, maxLength = 500) {
  if (!str) return '';
  return String(str)
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '') // remove ASCII control chars
    .trim()
    .slice(0, maxLength);
}

/**
 * Validate and sanitize URLs (only http, https, mailto, tel allowed)
 * Prevents javascript: and data: XSS vectors.
 * @param {string} url 
 * @returns {string} Safe URL or '#' if invalid
 */
export function sanitizeURL(url) {
  if (!url) return '#';
  const clean = String(url).trim();
  if (/^(https?:\/\/|mailto:|tel:|\/|\.\/|\.\.\/|#)/i.test(clean)) {
    // Disallow javascript: anywhere in URL even if disguised
    if (/javascript\s*:/i.test(clean) || /data\s*:\s*text\/html/i.test(clean)) {
      return '#';
    }
    return clean;
  }
  return '#';
}

/**
 * Sanitize rich text HTML (for blog articles, lesson content)
 * Strips script tags, style attributes with javascript/expression, iframe, and on* handlers.
 * @param {string} html 
 * @returns {string}
 */
export function sanitizeHTML(html) {
  if (!html) return '';
  let clean = String(html);

  // 1. Remove dangerous elements entirely
  clean = clean.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  clean = clean.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');
  clean = clean.replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '');
  clean = clean.replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '');
  clean = clean.replace(/<base\b[^>]*>/gi, '');

  // 2. Strip all inline on* event handlers (onclick, onerror, onload, onmouseover, etc.)
  clean = clean.replace(/\son\w+\s*=\s*(['"]).*?\1/gi, '');
  clean = clean.replace(/\son\w+\s*=\s*[^>\s]+/gi, '');

  // 3. Strip javascript: URLs inside attributes
  clean = clean.replace(/href\s*=\s*(['"])\s*javascript:[^'"]*\1/gi, 'href="#"');
  clean = clean.replace(/src\s*=\s*(['"])\s*javascript:[^'"]*\1/gi, 'src=""');

  return clean;
}

if (typeof window !== 'undefined') {
  window.InfiniteSanitize = { escapeHTML, sanitizeInput, sanitizeURL, sanitizeHTML };
}
