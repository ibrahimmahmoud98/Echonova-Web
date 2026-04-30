import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | ECHONOVA STUDIO',
  description: 'شروط الخدمة الخاصة بإيكونوڤا ستوديو — الشروط والأحكام التي تحكم استخدام خدماتنا وموقعنا.',
};

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-[var(--cinematic-bg)] text-white selection:bg-[var(--nova-gold)] selection:text-black">
      <div className="container mx-auto px-4 py-32 max-w-4xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-copper)] to-[var(--color-champagne)]">
              Terms of Service
            </span>
          </h1>
          <p className="text-[var(--color-ivory)]/60 text-sm">
            آخر تحديث: {new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none space-y-10 text-[var(--color-ivory)]/80 leading-relaxed" dir="rtl">
          
          <section>
            <h2 className="text-2xl font-bold text-[var(--color-ivory)] mb-4">١. القبول بالشروط</h2>
            <p>
              باستخدامكم لموقع إيكونوڤا ستوديو (&quot;ECHONOVA STUDIO&quot;) على العنوان <strong>www.echonovastudio.com</strong>، فإنكم توافقون على الالتزام بهذه الشروط والأحكام. إذا كنتم لا توافقون على أي من هذه الشروط، يُرجى عدم استخدام الموقع.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--color-ivory)] mb-4">٢. وصف الخدمات</h2>
            <p>
              إيكونوڤا ستوديو هو استوديو إنتاج إبداعي متخصص في إنتاج المحتوى المرئي باستخدام تقنيات الذكاء الاصطناعي التوليدي. تشمل خدماتنا على سبيل المثال لا الحصر:
            </p>
            <ul className="list-disc list-inside space-y-2 mr-4">
              <li><strong>NOVA LIFE:</strong> إنتاج إعلانات واقعية بتقنيات الذكاء الاصطناعي.</li>
              <li><strong>NOVA AURA:</strong> تصميم هويات بصرية وشخصيات رقمية للعلامات التجارية.</li>
              <li><strong>NOVA CINEMA:</strong> إنتاج مسلسلات قصيرة ومحتوى درامي يُدمج فيه المنتج بطريقة سينمائية.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--color-ivory)] mb-4">٣. الملكية الفكرية</h2>
            <p>
              جميع المحتويات المعروضة على هذا الموقع — بما في ذلك النصوص والصور والشعارات والتصاميم ومقاطع الفيديو — هي ملكية فكرية لإيكونوڤا ستوديو أو مرخّصة لنا. يُحظر نسخ أو إعادة إنتاج أو توزيع أي محتوى من الموقع دون إذن كتابي مسبق.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--color-ivory)] mb-4">٤. مسؤوليات المستخدم</h2>
            <p>عند استخدام موقعنا أو خدماتنا، توافقون على:</p>
            <ul className="list-disc list-inside space-y-2 mr-4">
              <li>تقديم معلومات دقيقة وصحيحة عند تعبئة نماذج الاتصال.</li>
              <li>عدم استخدام الموقع لأي غرض غير قانوني أو غير مصرح به.</li>
              <li>عدم محاولة الوصول غير المصرح به إلى أنظمتنا أو خوادمنا.</li>
              <li>احترام حقوق الملكية الفكرية لجميع المحتويات.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--color-ivory)] mb-4">٥. إخلاء المسؤولية</h2>
            <p>
              يُقدَّم الموقع وخدماته &quot;كما هي&quot; دون أي ضمانات صريحة أو ضمنية. لا نضمن أن الموقع سيكون متاحاً بشكل مستمر أو خالياً من الأخطاء. لن نتحمل أي مسؤولية عن أي أضرار مباشرة أو غير مباشرة ناتجة عن استخدام الموقع.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--color-ivory)] mb-4">٦. شروط المشاريع والعقود</h2>
            <p>
              تخضع جميع المشاريع التعاقدية لاتفاقيات منفصلة تُحدد نطاق العمل والجدول الزمني والتكلفة وشروط الدفع. هذه الشروط العامة لا تحل محل أي اتفاقية تعاقدية خاصة بمشروع محدد.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--color-ivory)] mb-4">٧. التعديلات على الشروط</h2>
            <p>
              نحتفظ بحق تعديل هذه الشروط في أي وقت. ستُنشر التعديلات على هذه الصفحة مع تحديث تاريخ &quot;آخر تحديث&quot;. استمراركم في استخدام الموقع بعد التعديلات يعني موافقتكم عليها.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--color-ivory)] mb-4">٨. القانون الحاكم</h2>
            <p>
              تخضع هذه الشروط وتُفسَّر وفقاً للقوانين المعمول بها في منطقة عمل إيكونوڤا ستوديو، وتختص المحاكم المعنية بالفصل في أي نزاع ينشأ عن استخدام الموقع أو الخدمات.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--color-ivory)] mb-4">٩. تواصلوا معنا</h2>
            <p>
              لأي استفسارات حول هذه الشروط، يمكنكم التواصل معنا عبر البريد الإلكتروني:
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
