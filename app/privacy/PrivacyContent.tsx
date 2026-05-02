"use client";

import React, { useState } from 'react';

export default function PrivacyContent() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');

  const toggleLang = () => {
    setLang(prev => prev === 'ar' ? 'en' : 'ar');
  };

  return (
    <div className="container mx-auto px-4 py-32 max-w-4xl relative">
      {/* Language Toggle Button */}
      <div className="flex justify-center md:justify-end mb-12">
        <button
          onClick={toggleLang}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-gold)]/20 bg-black/40 hover:bg-[var(--color-charcoal)] transition-colors text-[var(--color-ivory)] font-medium text-sm backdrop-blur-sm"
        >
          <span>{lang === 'ar' ? 'English' : 'العربية'}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
          </svg>
        </button>
      </div>

      {lang === 'ar' ? (
        // Arabic Content
        <>
          {/* Header AR */}
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

          {/* Content AR */}
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
        </>
      ) : (
        // English Content
        <>
          {/* Header EN */}
          <div className="mb-16 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-copper)] to-[var(--color-champagne)] block mb-2 tracking-wide">
                PRIVACY POLICY
              </span>
            </h1>
            <p className="text-[var(--color-ivory)]/60 text-sm mt-4 uppercase tracking-wider">
              ECHONOVA STUDIO | إيكونوڤا ستديو
            </p>
            <p className="text-[var(--color-ivory)]/60 text-sm mt-2">
              Effective Date: 27 April 2026
            </p>
          </div>

          {/* Content EN */}
          <div className="prose prose-invert max-w-none space-y-10 text-[var(--color-ivory)]/80 leading-relaxed" dir="ltr">
            
            <div className="text-lg mb-8">
              <p>This Policy governs all data processing activities carried out by Echonova Studio.</p>
            </div>

            <section>
              <h2 className="text-2xl font-bold text-[var(--color-ivory)] mb-4">Introduction &amp; Scope</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">About Echonova Studio</h3>
                  <p>This document sets out the official Privacy Policy of &quot;Echonova Studio&quot; (ECHONOVA STUDIO) — hereinafter referred to as &quot;the Studio&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot; — governing the collection, processing, and protection of personal data and clients’ digital assets across our platforms and production services.</p>
                  <p className="mt-2">Echonova Studio is a digital and cinematic content production studio leveraging artificial intelligence technologies, operating from the Arab Republic of Egypt.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">Scope of Application</h3>
                  <p className="mb-2">This Policy applies to all data and interactions conducted through:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Our official website and digital portals.</li>
                    <li>Visual, audio, and textual assets submitted by clients for production purposes.</li>
                    <li>Data exchanged during contracting and project management phases.</li>
                    <li>Automatic technical connection logs generated when using our services.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">Consent &amp; Acknowledgement</h3>
                  <p>By using our services or providing us with any production assets, you acknowledge that you have read this Policy and agree to its terms. If you do not agree with any provision herein, please discontinue your use of our services and contact us to arrange the termination of any existing contractual relationship.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--color-ivory)] mb-4">1. Data We Collect</h2>
              <p className="mb-4">The Studio adheres to the principles of purpose limitation and data minimisation, collecting only what is strictly necessary for the immediate operational purpose. Data is classified into the following four categories:</p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">A. Identity &amp; Contact Data</h3>
                  <p className="mb-2">To ensure the integrity of contracts and institutional communication, we collect:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Full name, job title, and the name of the commercial entity or organisation.</li>
                    <li>Email addresses, phone numbers, and approved communication channels.</li>
                    <li>Legal authorisation documents for representatives of corporate entities, where applicable.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">B. Creative &amp; Production Assets</h3>
                  <p className="mb-2">These are materials voluntarily submitted by the client for production processing, handled within project-specific isolated environments:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Scripts, texts, and marketing campaign strategies.</li>
                    <li>Brand identities, logos, reference video footage, and photographic materials.</li>
                    <li>Audio files and human voice reference recordings submitted for production purposes.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">C. Infrastructure &amp; Performance Data</h3>
                  <p className="mb-2">Collected automatically upon connection to our servers, used exclusively for security and operational maintenance:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Server logs: IP addresses, browser type, and request timestamps.</li>
                    <li>Performance data: response rates, connection errors, and resource consumption metrics.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">D. Financial &amp; Contractual Data</h3>
                  <p className="mb-2">Data required to complete billing and invoicing operations, including:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4 mb-2">
                    <li>Billing addresses, tax identification numbers, and payment records.</li>
                  </ul>
                  <div className="bg-[var(--color-copper)]/10 border-l-4 border-[var(--color-copper)] p-4 rounded-r-lg mt-4">
                    <p className="text-sm font-bold text-[var(--color-ivory)]">Important Note:</p>
                    <p className="text-sm mt-1">The Studio does not store raw credit card data on its own servers. All financial transactions are processed through approved third-party payment gateways.</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">E. What We Do Not Collect</h3>
                  <p>The Studio does not collect any personal data outside the direct operational scope of the contracted services, and does not create unauthorised user profiles or shadow profiles.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--color-ivory)] mb-4">2. How We Use Your Data</h2>
              <p className="mb-4">All collected data and assets are used in strict accordance with the principle of purpose limitation and may not be employed outside the following specified purposes:</p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">A. Production &amp; Processing</h3>
                  <p>Client assets are used to produce the creative and cinematic outputs agreed upon contractually. Processing takes place within project-specific environments, independently from other projects.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">B. Intellectual Property Rights</h3>
                  <p>The client retains ownership of their original assets and acquires commercial usage rights to the final delivered product upon fulfilment of all contractual and financial obligations. The programming commands, technical workflows, and configurations employed by the Studio in the production process constitute its exclusive intellectual property, and the use of client assets does not create any obligation to disclose them.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">C. Operational Security</h3>
                  <p>Log and performance data are used exclusively for security monitoring and service stability maintenance, and are not used for any marketing or commercial purpose.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">D. What We Do Not Do</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>We do not sell personal data or client assets to any third party.</li>
                    <li>We do not use client assets in our marketing campaigns or portfolio showcases without explicit written consent.</li>
                    <li>We do not use data for any purpose not stated in this Policy.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--color-ivory)] mb-4">3. Artificial Intelligence &amp; Data Processing</h2>
              <p className="mb-4">Given the Studio’s reliance on artificial intelligence technologies in its production operations, the following additional safeguards and restrictions apply:</p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">A. No Use of Data for Training General Models</h3>
                  <p>Client assets and project outputs are not used to train any general-purpose or publicly accessible AI models. Processing takes place in Inference Mode only, within project-specific isolated environments, preventing the integration of client data into general training datasets.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">B. Audio &amp; Biometric Data</h3>
                  <p>When reference audio recordings are used for production purposes — such as voice-over generation or lip-sync — such data is treated as highly sensitive information. It is used exclusively for the specified production purpose and is deleted from active memory upon completion of the approved generation process. It is not retained as a reusable template without a separate, explicit agreement authorising such retention.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">C. Intellectual Property of Programming Commands</h3>
                  <p>The client receives the final cinematic product as contractually agreed. This does not include programming prompts, technical parameters, or intermediate processing workflows, which are classified as the Studio’s exclusive intellectual property and protected trade secrets.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--color-ivory)] mb-4">4. Third-Party Service Providers &amp; Cloud Infrastructure</h2>
              <p className="mb-4">The Studio relies on external cloud service providers and AI tools to deliver its production services. The processing of data by these providers is governed by their own privacy policies and service agreements.</p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">A. Cloud Infrastructure Providers</h3>
                  <p>The Studio uses cloud services from recognised providers — including, for example, Google Cloud and Vercel — to host its digital portals and run technical processing operations. Assets are processed through these platforms in accordance with each provider’s applicable security standards.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">B. Our Commitments to Clients</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>We seek to engage providers that apply established, industry-recognised security standards.</li>
                    <li>We endeavour to utilise available privacy settings that prevent client data from being used to improve general-purpose AI models.</li>
                    <li>We transmit assets through encrypted channels in accordance with standard security protocols.</li>
                    <li>We aim to minimise the duration of data retention by external providers to what is operationally necessary.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">C. Limitation of Liability</h3>
                  <p>The Studio does not accept liability for any security breach occurring at the level of external service providers’ infrastructure that falls outside its direct control. The Studio engages reputable providers with established technical credentials in order to mitigate such risks.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--color-ivory)] mb-4">5. Data Retention &amp; Deletion</h2>
              <p className="mb-4">The Studio applies a defined data lifecycle to ensure that data is not retained longer than necessary:</p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">A. Active Production Period</h3>
                  <p>Client digital assets are stored in encrypted working environments throughout the project execution period, with access restricted to those directly involved in production, in accordance with the principle of least privilege.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">B. Post-Delivery Archiving</h3>
                  <p>Following final project delivery and fulfilment of all contractual obligations, project files are transferred to a separate, isolated archive for a period not exceeding six (6) months, to facilitate potential future revisions requested by the client.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">C. Secure Deletion</h3>
                  <p>Upon expiry of the archiving period, or upon the client’s request, the Studio applies digital deletion procedures in accordance with the technical capabilities of the cloud hosting platforms in use, ensuring that data cannot be recovered through conventional technical means.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">D. Statutory Retention Exceptions</h3>
                  <p>Administrative and accounting records — including signed contracts, billing records, and usage licences — are exempt from the deletion protocol and are retained for the periods stipulated by Egyptian law, typically ranging between five (5) and seven (7) years.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--color-ivory)] mb-4">6. Client Rights</h2>
              <p className="mb-4">The Studio extends to its clients the following rights with respect to their personal data and original assets:</p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">A. Right of Access</h3>
                  <p>The client is entitled to request an official report detailing the nature of personal data held about them in our records. This right does not extend to programming commands and technical configurations, which constitute the Studio’s exclusive intellectual property.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">B. Right to Rectification</h3>
                  <p>The client is entitled to request the correction or updating of their personal data or corporate entity information in our records, to ensure the accuracy of future outputs and contractual dealings.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">C. Right to Erasure</h3>
                  <p className="mb-2">The client is entitled to request the deletion of their personal data and digital assets from our production servers and archive, in accordance with the procedures set out in Section 5.</p>
                  <div className="bg-[var(--color-copper)]/10 border-l-4 border-[var(--color-copper)] p-4 rounded-r-lg mt-2">
                    <p className="text-sm font-bold text-[var(--color-ivory)]">Note:</p>
                    <p className="text-sm mt-1">The exercise of this right is temporarily suspended in cases where outstanding financial obligations exist, or where ongoing legal disputes require the retention of data as legal evidence.</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">D. Right to Data Portability</h3>
                  <p>The client is entitled to receive their approved final assets and outputs in standard digital formats (such as MP4 for video and WAV for audio). This right does not extend to intermediate files or internal generation workflows.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">E. Right to Lodge a Complaint</h3>
                  <p>The client is entitled to lodge a complaint with the competent supervisory authorities in the Arab Republic of Egypt, should they consider that the processing of their data violates their legally protected rights.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">F. Request Procedure</h3>
                  <p>All requests pertaining to these rights must be submitted in writing via the client’s official registered email address to: <a href="mailto:privacy@echonovastudio.com" className="text-[var(--color-copper)] hover:underline">privacy@echonovastudio.com</a></p>
                  <p className="mt-2">The Studio undertakes to respond and implement the required measures within thirty (30) calendar days of verifying the identity of the requesting party.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--color-ivory)] mb-4">7. Cookies &amp; Tracking Technologies</h2>
              <p className="mb-4">The Studio adopts a disciplined approach to tracking technologies, limiting their use to what is operationally and technically necessary to ensure the stability of its digital portals.</p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">A. Strictly Necessary Cookies</h3>
                  <p>These cookies are essential to the functioning of the website and cannot be disabled. They include: session management, bot mitigation and CSRF protection, and language preference retention.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">B. Performance &amp; Analytics Cookies</h3>
                  <p>We use anonymised measurement tools to understand aggregate website usage patterns — such as peak hours and page performance — without linking data to individual users or specific IP addresses.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">C. No Marketing Tracking</h3>
                  <p>The Studio does not use advertising tracking pixels or retargeting technologies on its digital platforms, and does not share browsing data with data brokers.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">D. Preference Management</h3>
                  <p>Users may manage their cookie preferences through the Cookie Management tool available on the website, except for strictly necessary cookies. Browser settings may also be configured to block non-essential cookies, though this may affect certain website functionalities.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--color-ivory)] mb-4">8. Security Breach Notification</h2>
              <p className="mb-2">In the event that the Studio suffers a security breach affecting client data, it undertakes to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Notify affected clients within a reasonable timeframe following discovery and confirmation of the breach.</li>
                <li>Provide a clear description of the nature of the affected data and the scope of the potential impact.</li>
                <li>Report the incident to the competent supervisory authorities in accordance with applicable legal requirements.</li>
                <li>Take immediate corrective measures to contain the damage and prevent recurrence.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--color-ivory)] mb-4">9. Policy Updates</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">A. Right to Amend</h3>
                  <p>The Studio reserves the right to update this Policy periodically to reflect technological or regulatory developments, subject to the notification mechanisms set out below.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">B. Material Updates</h3>
                  <p>Any amendment materially affecting client rights or altering the primary purpose of data processing shall be communicated to active clients via their registered email address no less than fifteen (15) calendar days prior to the amendment’s entry into effect.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">C. Operational &amp; Technical Updates</h3>
                  <p>Technical or linguistic amendments that do not materially affect client rights take effect immediately upon publication on the website, without requiring prior notice.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">D. Implied Consent</h3>
                  <p>Continued use of our services after the updated Policy’s effective date constitutes implicit acceptance of the amendments. Should a client object to any material amendment, they are entitled to request termination of the contract and deletion of their data prior to the amendment’s entry into effect.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">E. Version Archive</h3>
                  <p>The Studio maintains a record of previous versions of this Privacy Policy with their respective dates. Clients may not demand the application of provisions from a previous version whose notice period has expired under the current version.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--color-ivory)] mb-4">10. Official Contact Channels</h2>
              <p className="mb-4">To ensure institutional security and data integrity, the following channels are the sole officially recognised points of contact for any privacy-related claims or enquiries:</p>
              
              <div className="space-y-4 mb-8">
                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-1">A. Privacy Enquiries &amp; Rights Requests</h3>
                  <a href="mailto:privacy@echonovastudio.com" className="text-[var(--color-ivory)] hover:text-[var(--color-gold)] transition-colors">privacy@echonovastudio.com</a>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-1">B. Legal Affairs &amp; Compliance</h3>
                  <a href="mailto:legal@echonovastudio.com" className="text-[var(--color-ivory)] hover:text-[var(--color-gold)] transition-colors">legal@echonovastudio.com</a>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-1">C. Production Operations</h3>
                  <a href="mailto:production@echonovastudio.com" className="text-[var(--color-ivory)] hover:text-[var(--color-gold)] transition-colors">production@echonovastudio.com</a>
                </div>
              </div>

              <div className="bg-[var(--color-charcoal)]/30 p-6 rounded-xl border border-[var(--color-gold)]/10 mb-6">
                <h3 className="text-lg font-bold text-[var(--color-copper)] mb-2">Official Communication Rule</h3>
                <p className="text-sm">All formal privacy requests must be submitted from the client’s official registered email address on file with the Studio. Requests submitted via social media platforms or informal communication channels will not be recognised as valid.</p>
              </div>

              <div className="bg-[var(--color-charcoal)]/30 p-6 rounded-xl border border-[var(--color-gold)]/10">
                <h3 className="text-lg font-bold text-[var(--color-copper)] mb-2">Response Timeframes</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li><strong>Acknowledgement of receipt:</strong> within twenty-four (24) business hours.</li>
                  <li><strong>Substantive response:</strong> within forty-eight (48) business hours.</li>
                  <li><strong>Full execution of requested measures:</strong> within thirty (30) calendar days of identity verification.</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--color-ivory)] mb-4">11. Governing Law &amp; Jurisdiction</h2>
              <p>This Policy is governed by and shall be construed in accordance with the laws and regulations in force in the Arab Republic of Egypt. In the event of any dispute arising from the application or interpretation of this Policy or data privacy matters generally, the courts of the Arab Republic of Egypt shall have exclusive jurisdiction to hear and determine the matter.</p>
            </section>

            <section className="text-center pt-8 border-t border-[var(--color-gold)]/10 mt-12">
              <p className="text-[var(--color-gold)] font-bold mb-2">
                ECHONOVA STUDIO  |  إيكونوڤا ستديو
              </p>
              <a href="mailto:privacy@echonovastudio.com" className="text-[var(--color-ivory)]/80 hover:text-white transition-colors">
                privacy@echonovastudio.com
              </a>
            </section>

          </div>
        </>
      )}
    </div>
  );
}
