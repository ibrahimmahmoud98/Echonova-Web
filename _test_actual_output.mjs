// محاكاة دقيقة لما يحصل في app/api/send-email/route.ts
import DOMPurify from 'isomorphic-dompurify';

function sanitizeHtml(input) {
  if (!input) return '';
  return DOMPurify.sanitize(String(input));
}

// نفس الـ payload اللي اتبعت دلوقتي
const name = 'TEST <a href="https://evil.com/phish">CLICK URGENT</a> Ibrahim';
const email = 'audit@example.com';
const phone = '1031118110';
const countryKey = '+20';
const services = ['NOVA SAGA'];
const message = 'Hello <img src="https://attacker.com/pixel.png?id=12345"> and <b>bold text</b>';

const safeName = sanitizeHtml(name);
const safeEmail = sanitizeHtml(email);
const safePhone = sanitizeHtml(phone || 'N/A');
const safeCountryKey = sanitizeHtml(countryKey || '');
const safeServices = sanitizeHtml(Array.isArray(services) ? services.join(', ') : (services || 'None'));
const safeMessage = sanitizeHtml(message || 'No additional message.');

console.log('====================================================');
console.log('  ما الذي وصل فعلياً في صندوق contact@echonovastudio.com:');
console.log('====================================================\n');

const html = `
        <div style="font-family: sans-serif; padding: 20px;">
          <h1 style="color: #333;">New Project Inquiry</h1>
          <hr style="border: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Phone:</strong> ${safeCountryKey} ${safePhone}</p>
          <p><strong>Services:</strong> ${safeServices}</p>

          <div style="margin-top: 20px; background-color: #f9f9f9; padding: 15px; border-radius: 5px;">
            <p style="margin-top: 0; font-weight: bold;">Message:</p>
            <p style="white-space: pre-wrap;">${safeMessage}</p>
          </div>
        </div>
      `;

console.log(html);

console.log('\n====================================================');
console.log('  تحليل النتائج:');
console.log('====================================================');
console.log('Name field (يفترض نص عادي):');
console.log('  - الإدخال     :', JSON.stringify(name));
console.log('  - بعد التنقية :', JSON.stringify(safeName));
console.log('  - يحتوي رابط؟ :', /<a\s+[^>]*href/i.test(safeName) ? '✅ نعم — رابط فِشينج وصل!' : '❌ لا');
console.log();
console.log('Message field (يفترض نص عادي):');
console.log('  - الإدخال     :', JSON.stringify(message));
console.log('  - بعد التنقية :', JSON.stringify(safeMessage));
console.log('  - يحتوي صورة؟ :', /<img\s+[^>]*src/i.test(safeMessage) ? '✅ نعم — بكسل تتبّع وصل!' : '❌ لا');
console.log('  - يحتوي تنسيق؟:', /<(b|i|strong|em|h\d)\b/i.test(safeMessage) ? '✅ نعم' : '❌ لا');
