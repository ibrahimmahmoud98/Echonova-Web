import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | ECHONOVA STUDIO',
  description: 'سياسة الخصوصية الخاصة بإيكونوڤا ستوديو — كيف نجمع البيانات ونعالجها ونحميها.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[var(--cinematic-bg)] text-white selection:bg-[var(--nova-gold)] selection:text-black">
      <div className="container mx-auto px-4 py-32 max-w-4xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-copper)] to-[var(--color-champagne)] block mb-2">
              سياسة الخصوصية
            </span>
            <span className="text-2xl md:text-3xl text-[var(--color-ivory)]/80">Privacy Policy</span>
          </h1>
          <p className="text-[var(--color-ivory)]/60 text-sm mt-4">
            إيكونوڤا ستديو | ECHONOVA STUDIO
          </p>
          <p className="text-[var(--color-ivory)]/60 text-sm mt-2">
            تاريخ السريان: ٢٧ أبريل ٢٠٢٦
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none space-y-10 text-[var(--color-ivory)]/80 leading-relaxed" dir="rtl">
          
          <div className="text-lg mb-8">
            <p>تسري أحكام هذه الوثيقة على جميع عمليات معالجة البيانات التي تقوم بها إيكونوڤا ستديو.</p>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-[var(--color-ivory)] mb-4">المقدمة ونطاق التطبيق</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">التعريف بالكيان</h3>
                <p>تُحدِّد هذه الوثيقة السياسة الرسمية لشركة &quot;إيكونوڤا ستديو&quot; (ECHONOVA STUDIO) — المُشار إليها لاحقاً بـ &quot;الاستديو&quot; أو &quot;نحن&quot; أو &quot;لدينا&quot; — فيما يتعلق بجمع البيانات الشخصية وأصول العملاء الرقمية ومعالجتها وحمايتها، عبر منصاتنا الرقمية وخدماتنا الإنتاجية.</p>
                <p className="mt-2">&quot;إيكونوڤا ستديو&quot; استديو إنتاج محتوى رقمي وسينمائي يعتمد على تقنيات الذكاء الاصطناعي، ويتخذ من جمهورية مصر العربية مقراً لعملياته.</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">نطاق التطبيق</h3>
                <p className="mb-2">تُطبَّق هذه السياسة على جميع البيانات والتفاعلات التي تتم عبر:</p>
                <ul className="list-disc list-inside space-y-2 mr-4">
                  <li>موقعنا الإلكتروني وبواباتنا الرقمية الرسمية.</li>
                  <li>الأصول البصرية والصوتية والنصية التي يُقدِّمها العملاء لأغراض الإنتاج.</li>
                  <li>البيانات المتبادلة خلال مراحل التعاقد وإدارة المشاريع.</li>
                  <li>سجلات الاتصال التقني التلقائية عند استخدام خدماتنا.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">الموافقة والإقرار</h3>
                <p>باستخدامك لخدماتنا أو تزويدنا بأي أصول إنتاجية، فإنك تُقِرّ بقراءة هذه السياسة والموافقة على أحكامها. إذا كنت لا توافق على أي بند من بنودها، يُرجى التوقف عن استخدام خدماتنا والتواصل معنا لترتيب إنهاء أي علاقة تعاقدية قائمة.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--color-ivory)] mb-4">١. البيانات التي نجمعها</h2>
            <p className="mb-4">يلتزم الاستديو بمبدأ تحديد الغرض وتقليل البيانات، إذ لا يجمع إلا ما هو ضروري للغرض التشغيلي المباشر. تُصنَّف البيانات في الفئات الأربع التالية:</p>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">أ. بيانات الهوية والتواصل</h3>
                <p className="mb-2">لضمان سلامة التعاقدات والتواصل المؤسسي، نجمع:</p>
                <ul className="list-disc list-inside space-y-2 mr-4">
                  <li>الاسم الكامل والمسمى الوظيفي واسم الكيان التجاري أو المؤسسة.</li>
                  <li>عناوين البريد الإلكتروني وأرقام الهواتف وقنوات التواصل المعتمدة.</li>
                  <li>مستندات التفويض القانوني الخاصة بممثلي الكيانات التجارية عند الاقتضاء.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">ب. الأصول الإبداعية والإنتاجية</h3>
                <p className="mb-2">وهي المواد التي يرفعها العميل طوعاً لغرض الإنتاج، وتتم معالجتها داخل بيئات عمل خاصة بكل مشروع. تشمل هذه الأصول:</p>
                <ul className="list-disc list-inside space-y-2 mr-4">
                  <li>النصوص والسيناريوهات واستراتيجيات الحملات الإعلانية.</li>
                  <li>الهويات البصرية والشعارات ومقاطع الفيديو المرجعية والصور الفوتوغرافية.</li>
                  <li>الملفات الصوتية والتعليق الصوتي البشري المرجعي المُقدَّم لأغراض الإنتاج.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">ج. بيانات البنية التحتية والأداء</h3>
                <p className="mb-2">تُجمع تلقائياً لدى الاتصال بخوادمنا، وتُستخدم حصراً لأغراض الأمن والصيانة التشغيلية:</p>
                <ul className="list-disc list-inside space-y-2 mr-4">
                  <li>سجلات الخادم: عناوين IP، نوع المتصفح، الطوابع الزمنية للطلبات.</li>
                  <li>بيانات الأداء: معدلات الاستجابة، أخطاء الاتصال، واستهلاك الموارد.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">د. البيانات المالية والتعاقدية</h3>
                <p className="mb-2">البيانات اللازمة لإتمام العمليات المحاسبية وإصدار الفواتير، وتشمل:</p>
                <ul className="list-disc list-inside space-y-2 mr-4 mb-2">
                  <li>عناوين الفوترة والأرقام الضريبية وسجلات الدفع.</li>
                </ul>
                <div className="bg-[var(--color-copper)]/10 border-r-4 border-[var(--color-copper)] p-4 rounded-l-lg mt-4">
                  <p className="text-sm font-bold text-[var(--color-ivory)]">ملاحظة هامة:</p>
                  <p className="text-sm mt-1">لا يقوم الاستديو بتخزين بيانات البطاقات الائتمانية الخام على خوادمه الخاصة. تتم جميع المعاملات المالية عبر بوابات دفع خارجية معتمدة.</p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">هـ. ما لا نجمعه</h3>
                <p>لا يجمع الاستديو أي بيانات شخصية خارج النطاق التشغيلي المباشر للخدمات المتعاقد عليها، ولا يُنشئ ملفات تعريف غير مصرح بها للمستخدمين أو الزوار.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--color-ivory)] mb-4">٢. كيفية استخدام البيانات</h2>
            <p className="mb-4">تُستخدم البيانات والأصول المجمعة وفق مبدأ تحديد الغرض (Purpose Limitation)، ولا يجوز توظيفها خارج الأغراض الآتية:</p>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">أ. الإنتاج والمعالجة</h3>
                <p>تُستخدم أصول العميل لإنتاج المخرجات الإبداعية والسينمائية المتفق عليها تعاقدياً، وتتم المعالجة داخل بيئات عمل خاصة بكل مشروع على حدة.</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">ب. حقوق الملكية الفكرية</h3>
                <p>يحتفظ العميل بملكية أصوله الأصلية، ويكتسب حق الاستخدام التجاري للمنتج النهائي المسلَّم عقب استيفاء الالتزامات التعاقدية والمالية كاملةً. تُعدّ الأوامر البرمجية ومسارات العمل التقنية التي يوظفها الاستديو في عملية الإنتاج ملكية فكرية حصرية له، ولا يترتب على استخدام أصول العميل أي التزام بالكشف عنها.</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">ج. الأمن التشغيلي</h3>
                <p>تُستخدم بيانات السجلات والأداء حصراً لأغراض الرصد الأمني وصيانة استقرار الخدمة، ولا تُستخدم لأي غرض تسويقي أو تجاري آخر.</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">د. ما لا نفعله</h3>
                <ul className="list-disc list-inside space-y-2 mr-4">
                  <li>لا نبيع البيانات الشخصية أو أصول العملاء لأي طرف ثالث.</li>
                  <li>لا نستخدم أصول العملاء في حملاتنا التسويقية أو معارض أعمالنا دون موافقة خطية صريحة.</li>
                  <li>لا نستخدم البيانات لأي غرض غير مذكور في هذه السياسة.</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--color-ivory)] mb-4">٣. الذكاء الاصطناعي ومعالجة البيانات</h2>
            <p className="mb-4">نظراً لاعتماد الاستديو على تقنيات الذكاء الاصطناعي في عملياته الإنتاجية، تُطبَّق الضمانات والقيود الإضافية الآتية:</p>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">أ. عدم استخدام البيانات في تدريب النماذج العامة</h3>
                <p>لا تُستخدم أصول العملاء أو مخرجات مشاريعهم لتدريب أي نماذج ذكاء اصطناعي عامة أو مفتوحة للجمهور. تتم المعالجة في وضع الاستنتاج (Inference Mode) فحسب، ضمن بيئات عمل منفصلة خاصة بكل مشروع، مما يمنع اندماج بيانات العميل مع قواعد التدريب العامة.</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">ب. البيانات الصوتية والبيانات الحيوية</h3>
                <p>عند استخدام مقاطع صوتية مرجعية لأغراض إنتاجية — كالتعليق الصوتي أو مزامنة الشفاه — تُعامَل هذه البيانات بوصفها معلومات بالغة الحساسية. تُستخدم حصراً للغرض الإنتاجي المحدد، وتُحذف من الذاكرة النشطة فور اكتمال عملية التوليد المعتمدة. لا يتم الاحتفاظ بها كقوالب قابلة لإعادة الاستخدام دون عقد صريح منفصل يُجيز ذلك.</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">ج. الملكية الفكرية للأوامر البرمجية</h3>
                <p>يحصل العميل على المنتج السينمائي النهائي المتفق عليه تعاقدياً. لا يشمل ذلك الأوامر البرمجية (Prompts)، أو المعلمات التقنية، أو مسارات العمل البرمجية الوسيطة، التي تُصنَّف ملكية فكرية حصرية للاستديو وأسراراً تجارية محمية.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--color-ivory)] mb-4">٤. مزودو الخدمات الخارجيون والبنية التحتية</h2>
            <p className="mb-4">يعتمد الاستديو على مزودي خدمات سحابية وأدوات ذكاء اصطناعي خارجية لتقديم خدماته الإنتاجية. تخضع معالجة البيانات لدى هؤلاء المزودين لسياسات الخصوصية الخاصة بهم واتفاقيات الخدمة المعتمدة لديهم.</p>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">أ. مزودو البنية التحتية السحابية</h3>
                <p>يستخدم الاستديو خدمات سحابية من مزودين معتمدين — من بينهم على سبيل المثال: Google Cloud وVercel — لاستضافة بواباته الرقمية وتشغيل عمليات المعالجة التقنية. تتم معالجة الأصول عبر هذه المنصات وفق معايير الأمان المعمول بها لدى كل مزود.</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">ب. التزاماتنا تجاه عملائنا</h3>
                <ul className="list-disc list-inside space-y-2 mr-4">
                  <li>نسعى إلى اختيار مزودين يُطبِّقون معايير أمان تقنية معتمدة.</li>
                  <li>نحرص على استخدام إعدادات الخصوصية المتاحة التي تحول دون توظيف بيانات العملاء في تحسين النماذج العامة.</li>
                  <li>ننقل الأصول عبر قنوات مشفرة وفق بروتوكولات الأمان التقنية المعيارية.</li>
                  <li>نسعى إلى تقليل فترة بقاء البيانات لدى المزودين الخارجيين إلى الحد الضروري التشغيلي.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">ج. حدود المسؤولية</h3>
                <p>لا يتحمل الاستديو المسؤولية عن أي اختراق أمني يقع على مستوى البنية التحتية لمزودي الخدمات الخارجيين والخارج عن نطاق سيطرته المباشرة. يتعامل الاستديو مع مزودين معتمدين وذوي سمعة تقنية راسخة للحد من هذه المخاطر.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--color-ivory)] mb-4">٥. الاحتفاظ بالبيانات والحذف</h2>
            <p className="mb-4">يُطبِّق الاستديو دورة حياة محددة للبيانات تضمن عدم الاحتفاظ بها لأطول من اللازم:</p>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">أ. فترة التنفيذ النشط</h3>
                <p>تُحفظ أصول العميل الرقمية في بيئات عمل مشفرة طوال فترة تنفيذ المشروع، ويقتصر الوصول إليها على المعنيين بالإنتاج وفق مبدأ الحد الأدنى من الصلاحيات.</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">ب. الأرشفة عقب التسليم</h3>
                <p>عقب التسليم النهائي للمشروع واستيفاء الالتزامات التعاقدية، تُنقل ملفات المشروع إلى أرشفة منفصلة ومعزولة لمدة لا تتجاوز ستة (6) أشهر، وذلك لإتاحة تعديلات مستقبلية محتملة يطلبها العميل.</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">ج. الحذف الآمن</h3>
                <p>عقب انقضاء مدة الأرشفة أو بناءً على طلب العميل، يُطبِّق الاستديو إجراءات الحذف الرقمي المتاحة وفق الإمكانات التقنية لمنصات الاستضافة السحابية المعتمدة لديه، بما يضمن صعوبة استعادة البيانات عبر الوسائل التقنية الاعتيادية.</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">د. الاستثناءات القانونية</h3>
                <p>تُستثنى من بروتوكول الحذف البيانات الإدارية والمحاسبية المجردة — كالعقود الموقعة، سجلات الفوترة، وتراخيص الاستخدام — التي تُحفظ للمدد التي يحددها القانون المصري، والتي تتراوح عادةً بين خمس (5) وسبع (7) سنوات.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--color-ivory)] mb-4">٦. حقوق العميل</h2>
            <p className="mb-4">يمنح الاستديو عملاءه الحقوق التالية فيما يتعلق ببياناتهم الشخصية وأصولهم الأولية:</p>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">أ. حق الاطلاع</h3>
                <p>يحق للعميل طلب تقرير رسمي يوضح طبيعة البيانات الشخصية المحفوظة عنه في سجلاتنا. لا يشمل هذا الحق الأكواد البرمجية والأوامر التقنية التي تُعدّ ملكية فكرية حصرية للاستديو.</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">ب. حق التصحيح</h3>
                <p>يحق للعميل طلب تحديث بياناته الشخصية أو معلومات كيانه التجاري في سجلاتنا، لضمان دقة التعاقدات والمخرجات المستقبلية.</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">ج. حق الحذف</h3>
                <p className="mb-2">يحق للعميل طلب حذف بياناته الشخصية وأصوله الرقمية من خوادمنا الإنتاجية وأرشيفنا، وفق الإجراءات المنصوص عليها في البند الخامس.</p>
                <div className="bg-[var(--color-copper)]/10 border-r-4 border-[var(--color-copper)] p-4 rounded-l-lg mt-2">
                  <p className="text-sm font-bold text-[var(--color-ivory)]">ملاحظة:</p>
                  <p className="text-sm mt-1">يُعلَّق تنفيذ هذا الحق مؤقتاً في حالات وجود التزامات مالية غير مسددة، أو نزاعات قانونية جارية تستلزم الاحتفاظ بالبيانات بوصفها أدلة إثبات قانونية.</p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">د. حق نقل البيانات</h3>
                <p>يحق للعميل استلام أصوله ومخرجاته النهائية المعتمدة بتنسيقات رقمية قياسية (كـ MP4 للفيديو، وWAV للصوت). لا يشمل هذا الحق الملفات الوسيطة أو مسارات التوليد الداخلية.</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">هـ. حق تقديم الشكاوى</h3>
                <p>يحق للعميل تقديم شكوى إلى الجهات الرقابية المختصة في جمهورية مصر العربية، إذا رأى أن معالجة بياناته تنتهك حقوقه القانونية المكفولة.</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">و. آلية تقديم الطلبات</h3>
                <p>تُقدَّم جميع الطلبات المتعلقة بهذه الحقوق كتابةً عبر البريد الإلكتروني المؤسسي الرسمي للعميل المسجل لدينا إلى: <a href="mailto:privacy@echonovastudio.com" className="text-[var(--color-copper)] hover:underline">privacy@echonovastudio.com</a></p>
                <p className="mt-2">يلتزم الاستديو بالرد والتنفيذ خلال ثلاثين (30) يوماً من تاريخ التحقق من هوية مقدم الطلب.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--color-ivory)] mb-4">٧. ملفات تعريف الارتباط وتقنيات التتبع</h2>
            <p className="mb-4">يعتمد الاستديو نهجاً منضبطاً في استخدام تقنيات التتبع، مقتصراً على ما تفرضه الضرورة التشغيلية والأمنية لضمان استقرار منصاته الرقمية.</p>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">أ. ملفات الارتباط الضرورية</h3>
                <p>هذه الملفات ضرورية لتشغيل الموقع ولا يمكن تعطيلها، وتشمل: إدارة جلسات الاتصال، والحماية من الهجمات الآلية (CSRF Tokens)، وحفظ تفضيلات اللغة.</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">ب. ملفات تحليل الأداء</h3>
                <p>نستخدم أدوات قياس مُجهَّلة المصدر لمعرفة أنماط استخدام الموقع بصورة إجمالية، دون ربطها بهويات فردية أو عناوين IP محددة.</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">ج. غياب التتبع التسويقي</h3>
                <p>لا يستخدم الاستديو أي بكسلات تتبع إعلانية أو تقنيات إعادة الاستهداف (Retargeting) على منصاته الرقمية، ولا يشارك بيانات التصفح مع وسطاء البيانات.</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">د. إدارة التفضيلات</h3>
                <p>يمكن للمستخدم إدارة تفضيلاته عبر أداة إدارة ملفات الارتباط المتاحة على الموقع، باستثناء الملفات الضرورية. كما يمكن تكوين إعدادات المتصفح لحظر الملفات الاختيارية، مع مراعاة أن ذلك قد يؤثر على بعض وظائف الموقع.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--color-ivory)] mb-4">٨. الإشعار بالاختراق الأمني</h2>
            <p className="mb-2">في حال تعرَّض الاستديو لأي اختراق أمني يمس بيانات العملاء، يلتزم بما يلي:</p>
            <ul className="list-disc list-inside space-y-2 mr-4">
              <li>إشعار العملاء المتضررين خلال مدة معقولة من اكتشاف الاختراق وتأكيده.</li>
              <li>توضيح طبيعة البيانات المتأثرة وحجم التأثير المحتمل.</li>
              <li>إبلاغ الجهات الرقابية المختصة وفق متطلبات القانون المعمول به.</li>
              <li>اتخاذ الإجراءات التصحيحية الفورية للحد من الأضرار ومنع تكرارها.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--color-ivory)] mb-4">٩. تحديثات السياسة</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">أ. حق التعديل</h3>
                <p>يحتفظ الاستديو بحق تعديل هذه السياسة دورياً لمواكبة التطورات التقنية والقانونية، شريطة الالتزام بآليات الإشعار المنصوص عليها أدناه.</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">ب. التعديلات الجوهرية</h3>
                <p>في حالة أي تعديل يمس حقوق العملاء الجوهرية أو يُغيِّر الغرض الأساسي لمعالجة البيانات، يُشعَر العملاء النشطون عبر البريد الإلكتروني المسجل قبل خمسة عشر (15) يوماً على الأقل من دخول التعديل حيز التنفيذ.</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">ج. التعديلات التقنية والتشغيلية</h3>
                <p>التعديلات التقنية أو اللغوية التي لا تمس حقوق العملاء الجوهرية تُنفَّذ فور تحديث الوثيقة على الموقع دون اشتراط إشعار مسبق.</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">د. الموافقة الضمنية</h3>
                <p>استمرار استخدام خدماتنا بعد تاريخ سريان النسخة المحدثة يُعدّ موافقةً ضمنية على التعديلات. في حال رفض أي تعديل جوهري، يحق للعميل طلب إنهاء التعاقد وحذف بياناته قبل دخول التعديل حيز التنفيذ.</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">هـ. أرشيف النسخ السابقة</h3>
                <p>يحتفظ الاستديو بسجل بنسخ سياسة الخصوصية السابقة مع تواريخها. لا يحق للعميل المطالبة بتطبيق بنود نسخة سابقة انقضت فترة إشعارها القانونية.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--color-ivory)] mb-4">١٠. قنوات التواصل الرسمية</h2>
            <p className="mb-4">لضمان الأمان المؤسسي وسلامة البيانات، تُعدّ القنوات التالية المنافذ الرسمية الوحيدة المعتمدة لأي مطالبات أو استفسارات تتعلق بالخصوصية:</p>
            
            <div className="space-y-4 mb-8">
              <div>
                <h3 className="text-xl font-bold text-[var(--color-copper)] mb-1">أ. استفسارات الخصوصية وطلبات الحقوق</h3>
                <a href="mailto:privacy@echonovastudio.com" className="text-[var(--color-ivory)] hover:text-[var(--color-gold)] transition-colors">privacy@echonovastudio.com</a>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[var(--color-copper)] mb-1">ب. الشؤون القانونية والامتثال</h3>
                <a href="mailto:legal@echonovastudio.com" className="text-[var(--color-ivory)] hover:text-[var(--color-gold)] transition-colors">legal@echonovastudio.com</a>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[var(--color-copper)] mb-1">ج. العمليات الإنتاجية</h3>
                <a href="mailto:production@echonovastudio.com" className="text-[var(--color-ivory)] hover:text-[var(--color-gold)] transition-colors">production@echonovastudio.com</a>
              </div>
            </div>

            <div className="bg-[var(--color-charcoal)]/30 p-6 rounded-xl border border-[var(--color-gold)]/10 mb-6">
              <h3 className="text-lg font-bold text-[var(--color-copper)] mb-2">قاعدة التواصل الرسمي</h3>
              <p className="text-sm">تُقدَّم جميع الطلبات الرسمية المتعلقة بالخصوصية من البريد الإلكتروني المؤسسي للعميل المسجل لدى الاستديو. لا يُعتد بالطلبات الواردة عبر منصات التواصل الاجتماعي أو وسائل الاتصال غير الرسمية.</p>
            </div>

            <div className="bg-[var(--color-charcoal)]/30 p-6 rounded-xl border border-[var(--color-gold)]/10">
              <h3 className="text-lg font-bold text-[var(--color-copper)] mb-2">الأطر الزمنية للاستجابة</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong>تأكيد الاستلام:</strong> خلال أربع وعشرين (24) ساعة عمل.</li>
                <li><strong>الرد الموضوعي:</strong> خلال ثماني وأربعين (48) ساعة عمل.</li>
                <li><strong>التنفيذ الكامل للإجراءات:</strong> خلال ثلاثين (30) يوماً تقويمياً من تاريخ التحقق من هوية مقدم الطلب.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--color-ivory)] mb-4">١١. القانون الحاكم والاختصاص القضائي</h2>
            <p>تخضع هذه السياسة وتُفسَّر أحكامها وفق القوانين والأنظمة المعمول بها في جمهورية مصر العربية. في حال نشوء أي نزاع يتعلق بتطبيق أو تفسير هذه السياسة أو خصوصية البيانات بوجه عام، تختص محاكم جمهورية مصر العربية بالنظر فيه والفصل في مسائله.</p>
          </section>

          <section className="text-center pt-8 border-t border-[var(--color-gold)]/10 mt-12">
            <p className="text-[var(--color-gold)] font-bold mb-2">
              إيكونوڤا ستديو | ECHONOVA STUDIO
            </p>
            <a href="mailto:privacy@echonovastudio.com" className="text-[var(--color-ivory)]/80 hover:text-white transition-colors">
              privacy@echonovastudio.com
            </a>
          </section>

        </div>
      </div>
    </main>
  );
}
