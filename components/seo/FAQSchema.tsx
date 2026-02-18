"use client";

import React from "react";

const FAQS = [
  {
    question: "ما هو إيكونوڤا (ECHONOVA) وما هي رؤيته؟",
    answer: "إيكونوڤا ستوديو هو مختبر إبداعي رائد متخصص في دمج الفن السينمائي بتقنيات الذكاء الاصطناعي التوليدي. نهدف إلى إعادة تعريف صناعة المحتوى البصري من خلال إنتاج فيديوهات فائقة الجودة تجمع بين الدقة التقنية والعمق الدرامي، مثل مشاريعنا الرائدة Nova Saga و Nova Aura."
  },
  {
    question: "كيف يوظف ستوديو إيكونوڤا الذكاء الاصطناعي في الإنتاج الفني؟",
    answer: "نعتمد في إيكونوڤا على سير عمل (Workflow) هجين يدمج بين محركات الرندرة التقليدية ونماذج الانتشار (Diffusion Models) المتقدمة. يتيح لنا ذلك إنتاج لقطات سينمائية معقدة، وتوليد بيئات افتراضية، وتحريك شخصيات رقمية بدقة تضاهي الإنتاج الضخم ولكن بكفاءة زمنية وتقنية أعلى."
  },
  {
    question: "ما هي الخدمات التي يقدمها إيكونوڤا ستوديو للشركات والأفراد؟",
    answer: "نقدم حزمة متكاملة تشمل إنتاج الإعلانات التجارية السينمائية، صناعة المحتوى البصري لوسائل التواصل الاجتماعي، تطوير الأفلام القصيرة المعتمدة على AI، وتصميم الهويات البصرية المتحركة. نركز على تحويل الأفكار المجردة إلى واقع بصري مذهل يخدم أهداف التسويق والبراندنج."
  },
  {
    question: "ما الذي يميز الفيديوهات المنتجة بالذكاء الاصطناعي لدى إيكونوڤا عن غيرها؟",
    answer: "التميز يكمن في 'الجودة السينمائية' والتحكم الكامل في التفاصيل. نحن لا نعتمد على التوليد العشوائي، بل نستخدم تقنيات الـ ControlNet والـ Prompt Engineering الدقيق لضمان اتساق الشخصيات والحركات، مما يجعل المحتوى يبدو كأنه صُور بكاميرات احترافية في ستوديو حقيقي."
  },
  {
    question: "كيف يمكنني التعاون مع إيكونوڤا ستوديو لبدء مشروعي؟",
    answer: "يمكنكم التواصل معنا مباشرة عبر <a href='https://echonovastudio.com/contact'>الموقع الرسمي</a> أو من خلال منصات التواصل الاجتماعي المرتبطة (<a href='https://www.instagram.com/echonova_studio?igsh=MXgzbDEyMXV5N282dw%3D%3D&utm_source=qr'>Instagram</a>, <a href='https://x.com/echonovastudio?s=21'>X</a>, <a href='https://www.tiktok.com/@echonovastudio?_r=1&_t=ZS-93w0dbFWjDN'>TikTok</a>). فريقنا مستعد لمناقشة رؤيتكم الفنية وتقديم استشارات حول أفضل السبل لتنفيذها باستخدام أحدث تقنيات الـ AI Video Production."
  }
];

export function FAQSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
