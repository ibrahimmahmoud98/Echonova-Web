"use client";

import React, { useState } from 'react';

export default function TermsContent() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');

  const toggleLang = () => {
    setLang(prev => prev === 'ar' ? 'en' : 'ar');
  };

  return (
    <div className="container mx-auto px-4 py-32 max-w-4xl relative">
      {/* Language Toggle Button */}
      <div className="absolute top-8 right-4 md:right-8 z-10">
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
                شروط الخدمة
              </span>
              <span className="text-2xl md:text-3xl text-[var(--color-ivory)]/80">Terms of Service</span>
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
            
            <div className="text-lg">
              <p>تُشكّل هذه الوثيقة العقد القانوني الملزم بين إيكونوڤا ستديو وعملائها فيما يتعلق بجميع الخدمات الإنتاجية المُقدَّمة.</p>
              <p>يُرجى قراءة هذه الشروط بعناية قبل الشروع في استخدام أي من خدماتنا أو الدخول في أي علاقة تعاقدية مع الاستديو.</p>
            </div>

            <section>
              <h2 className="text-2xl font-bold text-[var(--color-ivory)] mb-4">أولاً: التعريفات والتفسير</h2>
              <p className="mb-4">لأغراض تطبيق هذه الشروط، تحمل المصطلحات الآتية المعاني المحددة لها:</p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li><strong>&quot;الاستديو&quot; أو &quot;نحن&quot; أو &quot;لدينا&quot;:</strong> يُقصد به إيكونوڤا ستديو (ECHONOVA STUDIO)، الكيان المُشغِّل لجميع الخدمات المشار إليها في هذه الوثيقة.</li>
                <li><strong>&quot;العميل&quot; أو &quot;أنت&quot;:</strong> أي شخص طبيعي أو كيان قانوني يتعاقد مع الاستديو للحصول على خدماته الإنتاجية.</li>
                <li><strong>&quot;الخدمات&quot;:</strong> جميع خدمات الإنتاج الإبداعي والسينمائي المدعوم بالذكاء الاصطناعي التي يُقدِّمها الاستديو، بما تشمله من إنتاج فيديو، وتوليد صوتي، وتصميم بصري.</li>
                <li><strong>&quot;أصول العميل&quot;:</strong> جميع المواد التي يُقدِّمها العميل للاستديو، بما تشمله من نصوص وشعارات وملفات صوتية وفيديوهات مرجعية وهويات بصرية.</li>
                <li><strong>&quot;المنتج النهائي&quot;:</strong> المخرجات الإبداعية المسلَّمة للعميل وفق بنود العقد المُبرَم، من فيديوهات ومقاطع صوتية وغيرها من الأعمال الإنتاجية.</li>
                <li><strong>&quot;اتفاقية المشروع&quot;:</strong> الوثيقة التعاقدية المحددة لكل مشروع، المتضمنة نطاق العمل والتسعير والمواصفات التقنية وجداول التسليم.</li>
                <li><strong>&quot;الأسرار التجارية&quot;:</strong> جميع الأوامر البرمجية ومسارات العمل الخوارزمية والإعدادات التقنية التي يطوِّرها ويمتلكها الاستديو.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--color-ivory)] mb-4">ثانياً: القبول والموافقة</h2>
              <div className="space-y-4">
                <p>يُمثّل تقديم أي طلب خدمة، أو توقيع اتفاقية المشروع، أو تسديد أي دفعة، أو الشروع في استخدام خدمات الاستديو بأي صورة؛ قبولاً كاملاً وغير مشروط لجميع بنود هذه الشروط.</p>
                <p>في حال التعارض بين بنود هذه الشروط وأي اتفاقية المشروع خاصة، تسود بنود اتفاقية المشروع في حدود نطاقها المحدد، وتكمّلها هذه الشروط فيما لم يرد فيها نص صريح.</p>
                <p>لا يحق لأي طرف الاحتجاج بجهله لهذه الشروط بعد الشروع في التعامل مع الاستديو.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--color-ivory)] mb-4">ثالثاً: وصف الخدمات</h2>
              <p className="mb-4">يُقدِّم إيكونوڤا ستديو خدمات إنتاج إبداعي متكاملة تعتمد على محركات الذكاء الاصطناعي التوليدي، وتشمل على سبيل المثال لا الحصر:</p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">أ. الإنتاج السينمائي والمرئي</h3>
                  <ul className="list-disc list-inside space-y-2 mr-4">
                    <li>إنتاج مقاطع فيديو إعلانية وترويجية مدعومة بالذكاء الاصطناعي.</li>
                    <li>تحويل الصور إلى فيديو (Image-to-Video) ومعالجة المقاطع المرئية المرجعية.</li>
                    <li>تصميم الهوية البصرية للعلامات التجارية وتطويرها سينمائياً.</li>
                    <li>إنتاج محتوى ترفيهي وقصصي مرئي بتقنيات الذكاء الاصطناعي.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">ب. الإنتاج الصوتي</h3>
                  <ul className="list-disc list-inside space-y-2 mr-4">
                    <li>توليد التعليق الصوتي والمزامنة الصوتية (Voice-over &amp; Lip-Sync).</li>
                    <li>معالجة المقاطع الصوتية المرجعية وتوليد أصوات مُخصَّصة لأغراض الإنتاج.</li>
                    <li>إنتاج الموسيقى التصويرية والمقاطع الصوتية الإبداعية.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">ج. الاستشارات الإبداعية</h3>
                  <ul className="list-disc list-inside space-y-2 mr-4">
                    <li>تطوير المفاهيم الإبداعية والسيناريوهات الإنتاجية.</li>
                    <li>تقديم الاستشارات الاستراتيجية في مجال إنتاج المحتوى الرقمي.</li>
                    <li>مراجعة وتحرير الأصول الإبداعية المُقدَّمة من العميل.</li>
                  </ul>
                </div>
              </div>
              <p className="mt-4">يحتفظ الاستديو بالحق في إضافة خدمات جديدة أو تعديل نطاق الخدمات القائمة بإشعار معقول، دون أن يُشكِّل ذلك انتهاكاً لأي اتفاقية قائمة.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--color-ivory)] mb-4">رابعاً: التعاقد وإدارة المشاريع</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">أ. مرحلة الاستكشاف والتقديم</h3>
                  <p>يبدأ كل مشروع بجلسة استكشافية يُحدَّد خلالها نطاق العمل والمتطلبات التقنية. لا تُلزَم هذه الجلسة الاستديو بتنفيذ أي عمل إنتاجي ما لم يُوقَّع عقد رسمي وتُسدَّد الدفعة الأولى.</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">ب. اتفاقية المشروع</h3>
                  <p className="mb-2">يُشترط لبدء أي مشروع إبرام اتفاقية خطية موقعة تُحدِّد:</p>
                  <ul className="list-disc list-inside space-y-2 mr-4">
                    <li>نطاق العمل التفصيلي والمخرجات المتوقعة.</li>
                    <li>جدول التسليم والمراحل الإنتاجية.</li>
                    <li>آلية الدفع والسعر الإجمالي.</li>
                    <li>عدد جولات التعديل المُدرَجة ضمن السعر المتفق عليه.</li>
                    <li>متطلبات العميل من أصول وملفات مرجعية.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">ج. التعديلات على نطاق العمل</h3>
                  <p>أي تعديل على نطاق العمل أو المتطلبات بعد توقيع الاتفاقية يستوجب موافقة خطية من الطرفين وقد يستلزم مراجعة السعر والجدول الزمني. يحق للاستديو وقف الإنتاج حتى اعتماد أي تغييرات جوهرية.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--color-ivory)] mb-4">خامساً: الأسعار والدفع</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">أ. التسعير</h3>
                  <p>تُحدَّد أسعار الخدمات في اتفاقية المشروع بناءً على نطاق العمل والمتطلبات التقنية. لا تشمل الأسعار أي رسوم حكومية أو ضرائب مُستحقة وفق القانون المصري، والتي تقع على عاتق العميل.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">ب. جدول الدفع</h3>
                  <p className="mb-2">يسري الجدول الآتي ما لم يُتفق على خلافه في اتفاقية المشروع:</p>
                  <ul className="list-disc list-inside space-y-2 mr-4">
                    <li><strong>دفعة البدء:</strong> ما لا يقل عن خمسين بالمئة (50%) من إجمالي قيمة المشروع قبل الشروع في الإنتاج.</li>
                    <li><strong>دفعة التسليم:</strong> الرصيد المتبقي قبل تسليم الملفات النهائية بتنسيقاتها الكاملة.</li>
                  </ul>
                  <p className="mt-2">يحق للاستديو تعليق العمل أو وقف التسليم في حال التأخر في سداد أي دفعة مستحقة، دون أن يُعدّ ذلك إخلالاً بالعقد.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">ج. التأخر في السداد</h3>
                  <p className="mb-2">في حال تأخر العميل عن سداد أي مبلغ مستحق لأكثر من أربعة عشر (14) يوماً من تاريخ الاستحقاق، يحق للاستديو:</p>
                  <ul className="list-disc list-inside space-y-2 mr-4">
                    <li>تعليق جميع الأعمال الجارية حتى تسوية المديونية.</li>
                    <li>احتجاز الملفات النهائية والمخرجات حتى اكتمال السداد.</li>
                    <li>إنهاء العقد مع الاحتفاظ بالدفعات المُسدَّدة تعويضاً عن العمل المُنجَز.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">د. سياسة الاسترداد</h3>
                  <p className="mb-2">نظراً للطبيعة الإبداعية والتقنية الخاصة للخدمات المُقدَّمة:</p>
                  <ul className="list-disc list-inside space-y-2 mr-4">
                    <li>الدفعات المُسدَّدة عن مراحل عمل مُنجَزة غير قابلة للاسترداد.</li>
                    <li>في حال إلغاء المشروع من قِبَل العميل بعد بدء الإنتاج، يُحتسب مقابل العمل المُنجَز فعلياً ويُخصم من الدفعات المُسدَّدة.</li>
                    <li>لا يُستحق أي استرداد بعد تسليم المنتج النهائي المعتمد للعميل.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--color-ivory)] mb-4">سادساً: التسليم والقبول</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">أ. التسليم</h3>
                  <p>يُسلَّم المنتج النهائي عبر القنوات الرقمية المتفق عليها في اتفاقية المشروع. يُعتبَر التسليم مكتملاً فور إتاحة الملفات للعميل لتنزيلها، أو إرسال رابط التنزيل إليه.</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">ب. مراجعة القبول</h3>
                  <p>يُمنح العميل مدة خمسة (5) أيام عمل من تاريخ التسليم لمراجعة المنتج النهائي وإبداء ملاحظاته الخطية. انقضاء هذه المدة دون اعتراض موثق يُعدّ قبولاً ضمنياً للمنتج.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">ج. جولات التعديل</h3>
                  <p>يشمل كل مشروع عدداً محدداً من جولات التعديل يُنص عليه في اتفاقية المشروع. تُعرَّف جولة التعديل بأنها مجموعة موحدة من الملاحظات تُقدَّم في طلب واحد. التعديلات التي تتجاوز العدد المتفق عليه، أو تلك التي تمس جوهر المفهوم الإبداعي الأصلي، تخضع لتسعير إضافي.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">د. تنسيقات التسليم</h3>
                  <p>تُسلَّم الملفات النهائية بالتنسيقات المتفق عليها في اتفاقية المشروع. لا يلتزم الاستديو بتوفير الملفات الخام أو مسارات العمل الوسيطة أو أكواد الإنتاج إلا إذا نُص صراحةً على ذلك في الاتفاقية.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--color-ivory)] mb-4">سابعاً: حقوق الملكية الفكرية</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">أ. ملكية أصول العميل</h3>
                  <p>يحتفظ العميل بالملكية الكاملة لجميع أصوله الأصلية التي يُقدِّمها للاستديو. يُقِرّ العميل بامتلاكه كافة الحقوق اللازمة لتقديم هذه الأصول واستخدامها في الإنتاج.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">ب. ملكية المنتج النهائي</h3>
                  <p>عقب استيفاء جميع الالتزامات المالية، يكتسب العميل حق الاستخدام التجاري الكامل للمنتج النهائي المسلَّم، ويشمل ذلك حق نشره وتوزيعه واستخدامه في الأغراض الإعلانية والترويجية المتفق عليها.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">ج. الأسرار التجارية للاستديو</h3>
                  <p>تظل الأوامر البرمجية (Prompts)، والمعلمات الخوارزمية، ومسارات العمل التقنية، وإعدادات الإنتاج الداخلية التي يستخدمها الاستديو في تنفيذ المشروع؛ ملكية فكرية حصرية للاستديو وأسراراً تجارية محمية. لا يمنح تسليم المنتج النهائي للعميل أي حق في الاطلاع عليها أو المطالبة بها.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">د. حق العرض في المحافظ الإبداعية</h3>
                  <p>يحق للاستديو استخدام أعمال العميل في محافظه الإبداعية (Portfolio) أو موادّه التسويقية دون الحصول على موافقة خطية صريحة من العميل في وثيقة منفصلة.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">هـ. ضمانات العميل بشأن الملكية الفكرية</h3>
                  <p className="mb-2">يُقِرّ العميل ويضمن:</p>
                  <ul className="list-disc list-inside space-y-2 mr-4">
                    <li>امتلاكه حقوقاً قانونية كاملة على جميع الأصول التي يُقدِّمها للاستديو.</li>
                    <li>أن استخدام هذه الأصول لا ينتهك حقوق أي طرف ثالث.</li>
                    <li>تحمُّله وحده المسؤولية القانونية عن أي ادعاء يتعلق بانتهاك حقوق الملكية الفكرية لأصوله.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--color-ivory)] mb-4">ثامناً: التزامات العميل</h2>
              <p className="mb-4">يلتزم العميل طوال مدة التعاقد بما يلي:</p>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">أ. تقديم المعلومات والأصول</h3>
                  <ul className="list-disc list-inside space-y-2 mr-4">
                    <li>تزويد الاستديو بجميع الأصول والمواد المطلوبة في المواعيد المتفق عليها.</li>
                    <li>التحقق من دقة وصحة جميع المعلومات والمواصفات المُقدَّمة.</li>
                    <li>إبلاغ الاستديو فوراً بأي تغيير جوهري في متطلبات المشروع.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">ب. التعاون والاستجابة</h3>
                  <ul className="list-disc list-inside space-y-2 mr-4">
                    <li>الاستجابة لطلبات التوضيح والموافقة خلال مدة لا تتجاوز ثلاثة (3) أيام عمل.</li>
                    <li>تعيين جهة اتصال مفوَّضة وصاحبة صلاحية اتخاذ القرار بشأن المشروع.</li>
                    <li>الالزام بالجداول الزمنية المتفق عليها والمُلاحَظ أن التأخر منه قد يؤدي إلى تأجيل مواعيد التسليم.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">ج. الاستخدام المشروع</h3>
                  <p className="mb-2">يلتزم العميل بعدم استخدام خدمات الاستديو أو المنتجات النهائية في:</p>
                  <ul className="list-disc list-inside space-y-2 mr-4">
                    <li>إنتاج محتوى يُشكِّل انتهاكاً للقانون المصري أو القوانين الدولية المعمول بها.</li>
                    <li>إنتاج محتوى مضلل أو يُروِّج لمعلومات زائفة بطريقة مقصودة.</li>
                    <li>إنتاج محتوى يمس الكرامة الإنسانية أو يُحرِّض على الكراهية أو العنصرية.</li>
                    <li>انتهاك حقوق الملكية الفكرية لأطراف ثالثة.</li>
                    <li>أي غرض تجاري يختلف اختلافاً جوهرياً عن الغرض المُصرَّح به في اتفاقية المشروع.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--color-ivory)] mb-4">تاسعاً: السرية</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">أ. التزامات الاستديو</h3>
                  <p>يلتزم الاستديو بالحفاظ على سرية جميع المعلومات الاستراتيجية والتجارية التي يُطلع عليها في سياق تقديم خدماته، ولا يُفصح عنها لأي طرف ثالث دون إذن خطي مسبق من العميل، باستثناء ما يقتضيه القانون.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">ب. التزامات العميل</h3>
                  <p className="mb-2">يلتزم العميل بالمقابل بالمحافظة على سرية:</p>
                  <ul className="list-disc list-inside space-y-2 mr-4">
                    <li>أسعار الخدمات والشروط التجارية الخاصة المتفق عليها.</li>
                    <li>المعلومات التقنية والإبداعية التي يطّلع عليها بشأن منهجية الاستديو.</li>
                    <li>بيانات التواصل الداخلية وإجراءات إدارة المشاريع.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">ج. استثناءات السرية</h3>
                  <p className="mb-2">لا تسري التزامات السرية على المعلومات التي:</p>
                  <ul className="list-disc list-inside space-y-2 mr-4">
                    <li>كانت معلومة للعموم قبل الإفصاح عنها بصورة مشروعة.</li>
                    <li>حصل عليها الطرف بصورة مستقلة ومشروعة من مصادر خارجية.</li>
                    <li>يُوجِب القانون أو قرار قضائي الإفصاح عنها.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--color-ivory)] mb-4">عاشراً: ضمانات الاستديو وحدود المسؤولية</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">أ. ضمانات الاستديو</h3>
                  <p className="mb-2">يضمن الاستديو:</p>
                  <ul className="list-disc list-inside space-y-2 mr-4">
                    <li>تنفيذ الخدمات وفق المواصفات المُحددة في اتفاقية المشروع.</li>
                    <li>امتلاكه الحق والأهلية القانونية لتقديم الخدمات المتعاقد عليها.</li>
                    <li>الحفاظ على سرية أصول العميل وعدم استخدامها خارج نطاق المشروع دون إذن.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">ب. إخلاء مسؤولية الضمانات الضمنية</h3>
                  <p>لا يُقدِّم الاستديو أي ضمانات ضمنية تتعلق بنتائج تجارية محددة ستتحقق من استخدام المنتج النهائي، أو بملاءمة المنتج لغرض مستقبلي لم يُنص عليه في اتفاقية المشروع.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">ج. حدود المسؤولية</h3>
                  <p className="mb-2">في جميع الأحوال، تقتصر المسؤولية القصوى للاستديو تجاه العميل عن أي خسائر أو أضرار ناجمة عن تنفيذ الخدمات على إجمالي المبالغ التي سدَّدها العميل فعلياً للاستديو عن المشروع المعني.</p>
                  <p>لا يتحمل الاستديو في أي حال مسؤولية الأضرار غير المباشرة أو التبعية أو المعنوية، أو خسارة الأرباح، أو الفرص التجارية الضائعة.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">د. القوة القاهرة</h3>
                  <p>لا يُعدّ الاستديو مُخِلاً بالتزاماته التعاقدية إذا كان التأخر أو الإخفاق في التنفيذ ناجماً عن ظروف خارجة عن إرادته بصورة معقولة، كالكوارث الطبيعية، أو الاضطرابات الأمنية الواسعة، أو انقطاع الخدمات التقنية الجوهرية لمزودي البنية التحتية. يلتزم الاستديو في هذه الحالة بإخطار العميل فوراً واقتراح ترتيبات بديلة.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--color-ivory)] mb-4">حادي عشر: الإنهاء والإلغاء</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">أ. حق العميل في الإلغاء</h3>
                  <p className="mb-2">يحق للعميل إلغاء المشروع في أي مرحلة بإشعار خطي. في هذه الحالة:</p>
                  <ul className="list-disc list-inside space-y-2 mr-4">
                    <li>تُخصَم من الدفعات المُسدَّدة تكاليف العمل المُنجَز فعلياً وفق معدلات التسعير المتفق عليها.</li>
                    <li>تُسلَّم للعميل المخرجات المُنجَزة حتى تاريخ الإلغاء عقب استيفاء أي رصيد مستحق.</li>
                    <li>لا يحق للعميل المطالبة بإعادة أي دفعة مُسدَّدة مقابل مراحل عمل مُنجَزة.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">ب. حق الاستديو في الإنهاء</h3>
                  <p className="mb-2">يحق للاستديو إنهاء العقد فوراً في حال:</p>
                  <ul className="list-disc list-inside space-y-2 mr-4">
                    <li>إخلال العميل الجسيم بأي من التزاماته المنصوص عليها في هذه الشروط.</li>
                    <li>التأخر في السداد لأكثر من ثلاثين (30) يوماً.</li>
                    <li>تقديم العميل لأصول أو معلومات مُضلِّلة أو منتهِكة لحقوق أطراف ثالثة.</li>
                    <li>طلب العميل إنتاج محتوى مخالف للقانون أو لهذه الشروط.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">ج. آثار الإنهاء</h3>
                  <p className="mb-2">عند إنهاء العقد لأي سبب:</p>
                  <ul className="list-disc list-inside space-y-2 mr-4">
                    <li>تتوقف جميع أعمال الإنتاج فوراً.</li>
                    <li>تُعاد أصول العميل إليه أو تُحذف من خوادم الاستديو وفق طلبه.</li>
                    <li>تظل بنود السرية وحقوق الملكية الفكرية والمسؤولية سارية بعد انتهاء العقد.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--color-ivory)] mb-4">ثاني عشر: حل النزاعات</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">أ. التسوية الودية</h3>
                  <p>في حال نشوء أي نزاع يتعلق بتفسير أو تطبيق هذه الشروط أو اتفاقية المشروع، يلتزم الطرفان بالسعي الجاد إلى التسوية الودية خلال ثلاثين (30) يوماً من تاريخ الإخطار بالنزاع عبر القنوات الرسمية.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">ب. الاختصاص القضائي</h3>
                  <p>إذا تعذَّرت التسوية الودية خلال المدة المذكورة، يختص بالنظر في النزاع والفصل فيه القضاء المصري وفق أحكام القانون المدني المصري والتشريعات ذات الصلة.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--color-ivory)] mb-4">ثالث عشر: التعديلات على الشروط</h2>
              <p className="mb-2">يحتفظ الاستديو بالحق في تعديل هذه الشروط دورياً. تُطبَّق في شأن الإشعار بالتعديلات الأحكام ذاتها المنصوص عليها في سياسة الخصوصية:</p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li><strong>التعديلات الجوهرية:</strong> يُشعَر العملاء النشطون قبل خمسة عشر (15) يوماً على الأقل من سريانها.</li>
                <li><strong>التعديلات التشغيلية والتقنية:</strong> تسري فور نشرها دون اشتراط إشعار مسبق.</li>
              </ul>
              <p className="mt-2">لا تسري أي تعديلات بأثر رجعي على المشاريع التي أُبرمت اتفاقياتها قبل تاريخ التعديل.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--color-ivory)] mb-4">رابع عشر: القانون الحاكم</h2>
              <p>تخضع هذه الشروط وتُفسَّر وفق أحكام القانون المصري. تختص محاكم جمهورية مصر العربية وحدها بالنظر في أي نزاع ينشأ بموجب هذه الشروط أو يتعلق بتطبيقها.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--color-ivory)] mb-4">خامس عشر: أحكام ختامية</h2>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li><strong>الاتفاقية الكاملة:</strong> تُمثِّل هذه الشروط مجتمعةً مع اتفاقية المشروع الاتفاق الكامل بين الطرفين، وتحلّ محل أي مراسلات أو تفاهمات سابقة تتعلق بالموضوع ذاته.</li>
                <li><strong>قابلية الفصل:</strong> إذا تبيَّن أن أي بند من هذه الشروط باطل أو غير قابل للتنفيذ، تظل بقية البنود سارية المفعول كاملةً.</li>
                <li><strong>التنازل:</strong> لا يجوز للعميل التنازل عن حقوقه أو التزاماته بموجب هذه الشروط لأي طرف ثالث دون موافقة خطية مسبقة من الاستديو.</li>
                <li><strong>التأخر في الإنفاذ:</strong> لا يُفسَّر تساهل أي من الطرفين في المطالبة بحق منصوص عليه في هذه الشروط تنازلاً عنه.</li>
                <li><strong>اللغة:</strong> في حال صدور هذه الشروط بلغتين، تكون النسخة العربية هي المرجع في حال أي تعارض في التفسير.</li>
              </ul>
            </section>

            <section className="bg-[var(--color-charcoal)]/30 p-8 rounded-2xl border border-[var(--color-gold)]/10 mt-12">
              <h2 className="text-2xl font-bold text-[var(--color-ivory)] mb-6 text-center">قنوات التواصل الرسمية</h2>
              <p className="mb-6 text-center">لأي استفسار أو مطالبة تتعلق بهذه الشروط، يُرجى التواصل عبر القنوات الآتية:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center md:text-right max-w-2xl mx-auto mb-8">
                <div className="p-4 bg-black/20 rounded-xl">
                  <p className="text-[var(--color-copper)] font-bold mb-1">الشؤون القانونية والعقود:</p>
                  <a href="mailto:legal@echonovastudio.com" className="hover:text-[var(--color-gold)] transition-colors">legal@echonovastudio.com</a>
                </div>
                <div className="p-4 bg-black/20 rounded-xl">
                  <p className="text-[var(--color-copper)] font-bold mb-1">العمليات الإنتاجية:</p>
                  <a href="mailto:production@echonovastudio.com" className="hover:text-[var(--color-gold)] transition-colors">production@echonovastudio.com</a>
                </div>
                <div className="p-4 bg-black/20 rounded-xl">
                  <p className="text-[var(--color-copper)] font-bold mb-1">الاستفسارات العامة:</p>
                  <a href="mailto:info@echonovastudio.com" className="hover:text-[var(--color-gold)] transition-colors">info@echonovastudio.com</a>
                </div>
                <div className="p-4 bg-black/20 rounded-xl">
                  <p className="text-[var(--color-copper)] font-bold mb-1">الموقع الرسمي:</p>
                  <a href="https://www.echonovastudio.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-gold)] transition-colors">www.echonovastudio.com</a>
                </div>
              </div>

              <p className="text-sm text-[var(--color-ivory)]/60 text-center">
                تُقدَّم جميع المطالبات والإشعارات الرسمية كتابةً عبر البريد الإلكتروني المؤسسي المسجل. لا يُعتد بالإشعارات الواردة عبر منصات التواصل الاجتماعي أو وسائل الاتصال غير الرسمية.
              </p>
              <p className="text-center mt-6 text-[var(--color-gold)] font-bold">
                إيكونوڤا ستديو | ECHONOVA STUDIO
              </p>
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
                TERMS OF SERVICE
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
            
            <div className="text-lg">
              <p>These Terms of Service constitute a legally binding agreement between Echonova Studio and its clients governing all production services provided by the Studio.</p>
              <p>Please read these Terms carefully before engaging any of our services or entering into any contractual relationship with the Studio.</p>
            </div>

            <section>
              <h2 className="text-2xl font-bold text-[var(--color-ivory)] mb-4">1. Definitions &amp; Interpretation</h2>
              <p className="mb-4">For the purposes of these Terms, the following expressions shall have the meanings assigned to them below:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>&quot;The Studio&quot;, &quot;we&quot;, &quot;us&quot; or &quot;our&quot;:</strong> refers to Echonova Studio (ECHONOVA STUDIO), the entity operating all services referenced in this document.</li>
                <li><strong>&quot;Client&quot; or &quot;you&quot;:</strong> any natural person or legal entity that engages the Studio to obtain its production services.</li>
                <li><strong>&quot;Services&quot;:</strong> all AI-driven creative and cinematic production services offered by the Studio, including video production, audio generation, and visual design.</li>
                <li><strong>&quot;Client Assets&quot;:</strong> all materials submitted by the Client to the Studio, including scripts, logos, audio files, reference footage, and brand identity materials.</li>
                <li><strong>&quot;Final Deliverable&quot;:</strong> the creative outputs delivered to the Client pursuant to the terms of the Project Agreement, including videos, audio tracks, and other production works.</li>
                <li><strong>&quot;Project Agreement&quot;:</strong> the project-specific contractual document setting out the scope of work, pricing, technical specifications, and delivery schedule for each engagement.</li>
                <li><strong>&quot;Trade Secrets&quot;:</strong> all programming commands, algorithmic workflows, and technical configurations developed and owned by the Studio.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--color-ivory)] mb-4">2. Acceptance &amp; Agreement</h2>
              <div className="space-y-4">
                <p>Submitting a service request, signing a Project Agreement, making any payment, or otherwise commencing use of the Studio&apos;s services in any form constitutes full and unconditional acceptance of all provisions of these Terms.</p>
                <p>In the event of any conflict between these Terms and a specific Project Agreement, the provisions of the Project Agreement shall prevail within its defined scope, and these Terms shall complement it in all matters not expressly addressed therein.</p>
                <p>No party may invoke ignorance of these Terms following the commencement of any dealings with the Studio.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--color-ivory)] mb-4">3. Description of Services</h2>
              <p className="mb-4">Echonova Studio provides comprehensive creative production services leveraging generative artificial intelligence engines, including but not limited to:</p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">A. Cinematic &amp; Visual Production</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Production of AI-driven promotional and advertising video content.</li>
                    <li>Image-to-Video conversion and reference footage processing.</li>
                    <li>Cinematic development of brand visual identities.</li>
                    <li>Production of narrative and entertainment visual content using AI technologies.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">B. Audio Production</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Voice-over generation and audio synchronisation (Voice-over &amp; Lip-Sync).</li>
                    <li>Reference audio processing and custom voice generation for production purposes.</li>
                    <li>Production of original scores and creative audio content.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">C. Creative Consultancy</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Development of creative concepts and production scripts.</li>
                    <li>Strategic consultancy in digital content production.</li>
                    <li>Review and editing of creative assets submitted by the Client.</li>
                  </ul>
                </div>
              </div>
              <p className="mt-4">The Studio reserves the right to introduce new services or modify the scope of existing services with reasonable notice, without constituting a breach of any existing agreement.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--color-ivory)] mb-4">4. Contracting &amp; Project Management</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">A. Discovery &amp; Briefing Phase</h3>
                  <p>Each project commences with a discovery session during which the scope of work and technical requirements are defined. This session does not obligate the Studio to carry out any production work unless a formal agreement is signed and an initial payment is received.</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">B. Project Agreement</h3>
                  <p className="mb-2">The commencement of any project requires the execution of a written, signed agreement specifying:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>A detailed scope of work and expected deliverables.</li>
                    <li>The delivery schedule and production milestones.</li>
                    <li>The payment structure and total project value.</li>
                    <li>The number of revision rounds included within the agreed price.</li>
                    <li>The Client&apos;s asset and reference material requirements.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">C. Scope Changes</h3>
                  <p>Any modification to the scope of work or project requirements following execution of the Project Agreement requires written consent from both parties and may necessitate a revision of the price and timeline. The Studio reserves the right to suspend production pending approval of any material changes.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--color-ivory)] mb-4">5. Pricing &amp; Payment</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">A. Pricing</h3>
                  <p>Service fees are determined in the Project Agreement based on the scope of work and technical requirements. Prices do not include any governmental fees or taxes applicable under Egyptian law, which shall be borne solely by the Client.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">B. Payment Schedule</h3>
                  <p className="mb-2">Unless otherwise agreed in the Project Agreement, the following schedule applies:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Commencement Payment:</strong> no less than fifty percent (50%) of the total project value, due prior to the commencement of production.</li>
                    <li><strong>Delivery Payment:</strong> the remaining balance, due prior to delivery of the final files in their complete formats.</li>
                  </ul>
                  <p className="mt-2">The Studio reserves the right to suspend work or withhold delivery in the event of any overdue payment, without such suspension constituting a breach of contract.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">C. Late Payment</h3>
                  <p className="mb-2">Should the Client fail to settle any amount due within fourteen (14) days of the due date, the Studio shall be entitled to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Suspend all ongoing work until the outstanding balance is settled.</li>
                    <li>Retain final files and deliverables until full payment is received.</li>
                    <li>Terminate the contract while retaining payments received as compensation for work completed.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">D. Refund Policy</h3>
                  <p className="mb-2">Given the bespoke creative and technical nature of the services provided:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Payments made in respect of completed production phases are non-refundable.</li>
                    <li>In the event of project cancellation by the Client following commencement of production, the cost of work completed to date shall be calculated and deducted from payments received.</li>
                    <li>No refund shall be due following delivery of the approved Final Deliverable to the Client.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--color-ivory)] mb-4">6. Delivery &amp; Acceptance</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">A. Delivery</h3>
                  <p>The Final Deliverable shall be delivered via the digital channels agreed upon in the Project Agreement. Delivery shall be deemed complete upon the files being made available to the Client for download, or upon the dispatch of a download link.</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">B. Acceptance Review</h3>
                  <p>The Client shall be granted five (5) business days from the date of delivery to review the Final Deliverable and submit written feedback. The expiry of this period without documented objection shall constitute implied acceptance of the deliverable.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">C. Revision Rounds</h3>
                  <p>Each project includes a specified number of revision rounds as set out in the Project Agreement. A revision round is defined as a consolidated set of feedback submitted in a single request. Revisions exceeding the agreed number, or those affecting the fundamental creative concept, shall be subject to additional fees.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">D. Delivery Formats</h3>
                  <p>Final files shall be delivered in the formats agreed upon in the Project Agreement. The Studio is not obligated to provide raw files, intermediate processing workflows, or production code unless expressly stipulated in the Agreement.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--color-ivory)] mb-4">7. Intellectual Property Rights</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">A. Ownership of Client Assets</h3>
                  <p>The Client retains full ownership of all original assets submitted to the Studio. The Client represents and warrants that it holds all necessary rights to submit such assets and to use them in the production process.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">B. Ownership of the Final Deliverable</h3>
                  <p>Upon fulfilment of all financial obligations, the Client acquires full commercial usage rights in the Final Deliverable, including the right to publish, distribute, and use it for the promotional and advertising purposes agreed upon.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">C. Studio Trade Secrets</h3>
                  <p>The programming commands (Prompts), algorithmic parameters, technical workflows, and internal production configurations employed by the Studio in executing the project remain the Studio&apos;s exclusive intellectual property and protected trade secrets. Delivery of the Final Deliverable does not confer upon the Client any right to access or claim such information.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">D. Portfolio Usage Rights</h3>
                  <p>The Studio shall have the right to use the Client&apos;s works in its creative portfolio or marketing materials without obtaining explicit written consent from the Client in a separate document.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">E. Client Intellectual Property Warranties</h3>
                  <p className="mb-2">The Client represents, warrants, and undertakes that:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>It holds full and valid legal rights over all assets submitted to the Studio.</li>
                    <li>The use of such assets does not infringe the rights of any third party.</li>
                    <li>It shall bear sole legal responsibility for any claim arising from intellectual property infringement relating to its assets.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--color-ivory)] mb-4">8. Client Obligations</h2>
              <p className="mb-4">Throughout the term of the engagement, the Client undertakes to:</p>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">A. Provision of Information &amp; Assets</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Provide the Studio with all required assets and materials by the agreed dates.</li>
                    <li>Verify the accuracy and completeness of all information and specifications submitted.</li>
                    <li>Notify the Studio promptly of any material change in project requirements.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">B. Cooperation &amp; Responsiveness</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Respond to requests for clarification or approval within three (3) business days.</li>
                    <li>Designate an authorised point of contact with decision-making authority for the project.</li>
                    <li>Adhere to agreed timelines, noting that delays attributable to the Client may result in revised delivery dates.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">C. Acceptable Use</h3>
                  <p className="mb-2">The Client undertakes not to use the Studio&apos;s services or the Final Deliverables for:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Producing content that violates Egyptian law or applicable international law.</li>
                    <li>Producing content that is deliberately misleading or promotes disinformation.</li>
                    <li>Producing content that infringes human dignity or incites hatred or discrimination.</li>
                    <li>Infringing the intellectual property rights of third parties.</li>
                    <li>Any commercial purpose materially different from that declared in the Project Agreement.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--color-ivory)] mb-4">9. Confidentiality</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">A. Studio&apos;s Obligations</h3>
                  <p>The Studio undertakes to maintain the confidentiality of all strategic and commercial information to which it gains access in the course of providing its services, and shall not disclose such information to any third party without prior written consent from the Client, except as required by law.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">B. Client&apos;s Obligations</h3>
                  <p className="mb-2">The Client undertakes in turn to maintain the confidentiality of:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Agreed service fees and bespoke commercial terms.</li>
                    <li>Technical and creative information relating to the Studio&apos;s methodology to which the Client gains access.</li>
                    <li>Internal communication data and project management procedures.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">C. Exceptions to Confidentiality</h3>
                  <p className="mb-2">Confidentiality obligations shall not apply to information that:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Was lawfully in the public domain prior to its disclosure.</li>
                    <li>Was independently and lawfully obtained by the receiving party from external sources.</li>
                    <li>Is required to be disclosed by law or court order.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--color-ivory)] mb-4">10. Studio Warranties &amp; Limitation of Liability</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">A. Studio&apos;s Warranties</h3>
                  <p className="mb-2">The Studio warrants that:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Services shall be performed in accordance with the specifications set out in the Project Agreement.</li>
                    <li>It holds the right and legal capacity to provide the contracted services.</li>
                    <li>Client Assets shall be kept confidential and shall not be used outside the scope of the project without authorisation.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">B. Disclaimer of Implied Warranties</h3>
                  <p>The Studio makes no implied warranties regarding specific commercial results to be achieved through use of the Final Deliverable, or its suitability for any future purpose not expressly addressed in the Project Agreement.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">C. Limitation of Liability</h3>
                  <p className="mb-2">In all circumstances, the Studio&apos;s maximum aggregate liability to the Client for any losses or damages arising from the performance of services shall be limited to the total amounts actually paid by the Client to the Studio in respect of the project in question.</p>
                  <p>The Studio shall not in any event be liable for indirect, consequential, or moral damages, loss of profits, or loss of business opportunities.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">D. Force Majeure</h3>
                  <p>The Studio shall not be considered in breach of its contractual obligations where any delay or failure in performance arises from circumstances reasonably beyond its control, including natural disasters, widespread security disruptions, or material outages affecting the infrastructure services of third-party providers. In such circumstances, the Studio undertakes to notify the Client promptly and to propose alternative arrangements.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--color-ivory)] mb-4">11. Termination &amp; Cancellation</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">A. Client&apos;s Right to Cancel</h3>
                  <p className="mb-2">The Client may cancel a project at any stage by written notice. In such event:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>The cost of work completed to date shall be deducted from payments received, calculated at the agreed pricing rates.</li>
                    <li>Deliverables completed up to the date of cancellation shall be handed over to the Client following settlement of any outstanding balance.</li>
                    <li>The Client shall have no entitlement to recover payments made in respect of completed production phases.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">B. Studio&apos;s Right to Terminate</h3>
                  <p className="mb-2">The Studio may terminate the contract with immediate effect in the event of:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Material breach by the Client of any of its obligations under these Terms.</li>
                    <li>Payment default exceeding thirty (30) days.</li>
                    <li>The Client submitting assets or information that are misleading or that infringe third-party rights.</li>
                    <li>The Client requesting the production of content that is unlawful or contrary to these Terms.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">C. Effects of Termination</h3>
                  <p className="mb-2">Upon termination of the contract for any reason:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>All production work shall cease immediately.</li>
                    <li>Client Assets shall be returned or deleted from Studio servers in accordance with the Client&apos;s instructions.</li>
                    <li>Provisions relating to confidentiality, intellectual property rights, and liability shall survive termination.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--color-ivory)] mb-4">12. Dispute Resolution</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">A. Amicable Resolution</h3>
                  <p>In the event of any dispute arising from the interpretation or application of these Terms or any Project Agreement, both parties undertake to make a genuine effort to resolve the matter amicably within thirty (30) days of formal written notice of the dispute through official channels.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--color-copper)] mb-2">B. Jurisdiction</h3>
                  <p>Should amicable resolution prove impossible within the stated period, the dispute shall be subject to the exclusive jurisdiction of the Egyptian courts, in accordance with the provisions of the Egyptian Civil Code and applicable legislation.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--color-ivory)] mb-4">13. Amendments to These Terms</h2>
              <p className="mb-2">The Studio reserves the right to amend these Terms periodically. The same notification provisions as those set out in the Privacy Policy shall apply:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Material amendments:</strong> Active clients shall be notified no less than fifteen (15) days prior to their entry into effect.</li>
                <li><strong>Operational and technical amendments:</strong> Shall take effect immediately upon publication, without requiring prior notice.</li>
              </ul>
              <p className="mt-2">No amendment shall have retroactive effect on projects whose agreements were executed prior to the date of amendment.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--color-ivory)] mb-4">14. Governing Law</h2>
              <p>These Terms are governed by and shall be construed in accordance with the laws of the Arab Republic of Egypt. The courts of the Arab Republic of Egypt shall have exclusive jurisdiction over any dispute arising under or in connection with these Terms.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--color-ivory)] mb-4">15. General Provisions</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Entire Agreement:</strong> These Terms, together with the Project Agreement, constitute the entire agreement between the parties and supersede all prior communications or understandings relating to the same subject matter.</li>
                <li><strong>Severability:</strong> If any provision of these Terms is found to be void or unenforceable, the remaining provisions shall continue in full force and effect.</li>
                <li><strong>Assignment:</strong> The Client may not assign its rights or obligations under these Terms to any third party without the Studio&apos;s prior written consent.</li>
                <li><strong>Waiver:</strong> The failure of either party to enforce any right under these Terms shall not be construed as a waiver of that right.</li>
                <li><strong>Language:</strong> Where these Terms are issued in two languages, the Arabic version shall serve as the reference in the event of any conflict of interpretation.</li>
              </ul>
            </section>

            <section className="bg-[var(--color-charcoal)]/30 p-8 rounded-2xl border border-[var(--color-gold)]/10 mt-12">
              <h2 className="text-2xl font-bold text-[var(--color-ivory)] mb-6 text-center">Official Contact Channels</h2>
              <p className="mb-6 text-center">For any enquiry or claim relating to these Terms, please contact us through the following channels:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center md:text-left max-w-2xl mx-auto mb-8">
                <div className="p-4 bg-black/20 rounded-xl">
                  <p className="text-[var(--color-copper)] font-bold mb-1">Legal Affairs &amp; Contracts:</p>
                  <a href="mailto:legal@echonovastudio.com" className="hover:text-[var(--color-gold)] transition-colors">legal@echonovastudio.com</a>
                </div>
                <div className="p-4 bg-black/20 rounded-xl">
                  <p className="text-[var(--color-copper)] font-bold mb-1">Production Operations:</p>
                  <a href="mailto:production@echonovastudio.com" className="hover:text-[var(--color-gold)] transition-colors">production@echonovastudio.com</a>
                </div>
                <div className="p-4 bg-black/20 rounded-xl">
                  <p className="text-[var(--color-copper)] font-bold mb-1">General Enquiries:</p>
                  <a href="mailto:info@echonovastudio.com" className="hover:text-[var(--color-gold)] transition-colors">info@echonovastudio.com</a>
                </div>
                <div className="p-4 bg-black/20 rounded-xl">
                  <p className="text-[var(--color-copper)] font-bold mb-1">Official Website:</p>
                  <a href="https://www.echonovastudio.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-gold)] transition-colors">www.echonovastudio.com</a>
                </div>
              </div>

              <p className="text-sm text-[var(--color-ivory)]/60 text-center">
                All formal claims and notices must be submitted in writing via the Client&apos;s official registered email address. Notices submitted via social media platforms or informal communication channels will not be recognised as valid.
              </p>
              <p className="text-center mt-6 text-[var(--color-gold)] font-bold">
                ECHONOVA STUDIO  |  إيكونوڤا ستديو
              </p>
            </section>

          </div>
        </>
      )}
    </div>
  );
}
