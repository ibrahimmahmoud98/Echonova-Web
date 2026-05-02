import DOMPurify from 'isomorphic-dompurify';

// What does DOMPurify do with INPUT MEANT FOR PLAIN TEXT (form fields)?
const cases = [
  ['Plain name:', 'Ibrahim Eldawoody'],
  ['HTML in name:', '<b>Ibrahim</b>'],
  ['Script in name:', '<script>alert(1)</script>Ibrahim'],
  ['Anchor in name (phishing):', '<a href="https://evil.com">Click</a>'],
  ['Unicode + symbols:', "Hello & 'world' < bracket >"],
  ['Image with URL:', '<img src="https://attacker.com/track?u=victim">'],
  ['Onerror img:', '<img src=x onerror="alert(1)">'],
  ['JavaScript URL:', '<a href="javascript:alert(1)">click</a>'],
  ['Article content:', '<p class="mb-6"><a href="/services" class="copper">link</a></p>'],
  ['SVG with onload:', '<svg onload="alert(1)"></svg>'],
];
for (const [label, input] of cases) {
  console.log('—', label);
  console.log('  IN :', JSON.stringify(input));
  console.log('  OUT:', JSON.stringify(DOMPurify.sanitize(input)));
}
