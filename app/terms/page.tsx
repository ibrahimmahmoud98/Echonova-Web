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

        {/* Content */}
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
              <p>يُمثّل تقديم أي طلب خدمة، أو توقيع اتفاقية مشروع، أو تسديد أي دفعة، أو الشروع في استخدام خدمات الاستديو بأي صورة؛ قبولاً كاملاً وغير مشروط لجميع بنود هذه الشروط.</p>
              <p>في حال التعارض بين بنود هذه الشروط وأي اتفاقية مشروع خاصة، تسود بنود اتفاقية المشروع في حدود نطاقها المحدد، وتكمّلها هذه الشروط فيما لم يرد فيها نص صريح.</p>
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
                  <li>الالتزام بالجداول الزمنية المتفق عليها والمُلاحَظ أن التأخر منه قد يؤدي إلى تأجيل مواعيد التسليم.</li>
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
      </div>
    </main>
  );
}
