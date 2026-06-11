/**
 * escapeHtml — تحويل محارف HTML الخاصة إلى كيانات نصية.
 * ملف مستقل بدون أي استيرادات خارجية حتى يمكن استخدامه بأمان داخل
 * دوال السيرفرلس (مسار /api/send-email) دون جرّ DOMPurify/jsdom
 * التي تنهار على بيئة Vercel وتُسقط الدالة بالكامل.
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
