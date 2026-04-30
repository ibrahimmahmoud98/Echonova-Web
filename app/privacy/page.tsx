import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | ECHONOVA STUDIO',
  description: 'سياسة الخصوصية الخاصة بإيكونوڤا ستوديو — كيف نجمع ونستخدم ونحمي بياناتك.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[var(--cinematic-bg)] text-white selection:bg-[var(--nova-gold)] selection:text-black">
      <div className="container mx-auto px-4 py-32 max-w-4xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-copper)] to-[var(--color-champagne)]">
              Privacy Policy
            </span>
          </h1>
          <p className="text-[var(--color-ivory)]/60 text-sm">
            آخر تحديث: {new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none space-y-10 text-[var(--color-ivory)]/80 leading-relaxed" dir="rtl">
          
          <section>
            <h2 className="text-2xl font-bold text-[var(--color-ivory)] mb-4">١. مقدمة</h2>
            <p>
              مرحباً بكم في إيكونوڤا ستوديو (&quot;ECHONOVA STUDIO&quot;، &quot;نحن&quot;، &quot;لنا&quot;). نحن نحترم خصوصيتكم ونلتزم بحماية بياناتكم الشخصية. توضح سياسة الخصوصية هذه كيفية جمعنا لمعلوماتكم واستخدامها وحمايتها عند زيارتكم لموقعنا الإلكتروني
              <strong> www.echonovastudio.com</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--color-ivory)] mb-4">٢. المعلومات التي نجمعها</h2>
            <p>قد نقوم بجمع الأنواع التالية من المعلومات:</p>
            <ul className="list-disc list-inside space-y-2 mr-4">
              <li><strong>معلومات الاتصال:</strong> الاسم، البريد الإلكتروني، رقم الهاتف — عند تعبئتكم لنموذج التواصل.</li>
              <li><strong>معلومات المشروع:</strong> تفاصيل المشروع التي تشاركونها معنا عبر نماذج الطلب.</li>
              <li><strong>بيانات الاستخدام:</strong> معلومات تقنية مثل عنوان IP، نوع المتصفح، الصفحات المزارة، ومدة الزيارة — يتم جمعها تلقائياً عبر أدوات التحليل.</li>
              <li><strong>ملفات تعريف الارتباط (Cookies):</strong> ملفات صغيرة تُخزّن على جهازكم لتحسين تجربة التصفح.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--color-ivory)] mb-4">٣. كيف نستخدم معلوماتكم</h2>
            <p>نستخدم المعلومات التي نجمعها للأغراض التالية:</p>
            <ul className="list-disc list-inside space-y-2 mr-4">
              <li>الرد على استفساراتكم والتواصل معكم بشأن المشاريع.</li>
              <li>تحسين تجربة المستخدم وتطوير خدماتنا.</li>
              <li>تحليل حركة المرور على الموقع وفهم سلوك المستخدمين.</li>
              <li>إرسال تحديثات أو محتوى تسويقي (بعد الحصول على موافقتكم).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--color-ivory)] mb-4">٤. حماية البيانات</h2>
            <p>
              نتخذ إجراءات أمنية مناسبة لحماية معلوماتكم الشخصية من الوصول غير المصرح به أو التعديل أو الإفشاء أو الإتلاف. يشمل ذلك استخدام تشفير SSL/TLS لجميع الاتصالات عبر موقعنا.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--color-ivory)] mb-4">٥. مشاركة البيانات مع أطراف ثالثة</h2>
            <p>
              لا نبيع أو نؤجر أو نتاجر بمعلوماتكم الشخصية. قد نشارك بياناتكم مع مزودي خدمات موثوقين (مثل Google Analytics) لغرض تحليل الأداء فقط، وذلك ضمن اتفاقيات صارمة لحماية البيانات.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--color-ivory)] mb-4">٦. حقوقكم</h2>
            <p>لديكم الحق في:</p>
            <ul className="list-disc list-inside space-y-2 mr-4">
              <li>الوصول إلى بياناتكم الشخصية التي نحتفظ بها.</li>
              <li>طلب تصحيح أو حذف بياناتكم.</li>
              <li>الاعتراض على معالجة بياناتكم أو تقييدها.</li>
              <li>سحب موافقتكم في أي وقت.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--color-ivory)] mb-4">٧. تواصلوا معنا</h2>
            <p>
              إذا كانت لديكم أي أسئلة حول سياسة الخصوصية هذه، يمكنكم التواصل معنا عبر البريد الإلكتروني:
              <a href="mailto:contact@echonovastudio.com" className="text-[var(--color-copper)] hover:underline mx-1">
                contact@echonovastudio.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
