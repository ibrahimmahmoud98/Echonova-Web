"use client";

import React from "react";

const FAQS = [
  {
    question: "ما هو الإنتاج المدعوم بالذكاء الاصطناعي؟",
    answer: "نستخدم أحدث تقنيات الذكاء الاصطناعي التوليدي لإنشاء محتوى بصري سينمائي (فيديو وصور) بجودة تضاهي الإنتاج التقليدي ولكن بتكلفة أقل وسرعة تنفيذ أعلى، مع إمكانية خلق عوالم خيالية يصعب تصويرها واقعياً."
  },
  {
    question: "هل تقدمون خدماتكم في الرياض فقط؟",
    answer: "مقرنا الرئيسي في الرياض، ولكن خدماتنا الرقمية عابرة للحدود. نخدم عملاء في جميع أنحاء المملكة ودول الخليج، حيث تتم عمليات الإنتاج والتواصل بشكل رقمي كامل."
  },
  {
    question: "ما هي خدمة 'الهوية الافتراضية' (NOVA AURA)؟",
    answer: "هي خدمة تصميم شخصيات رقمية (Virtual Influencers/Models) خاصة بعلامتك التجارية. نمتلك التكنولوجيا لضمان ثبات ملامح الشخصية بنسبة 100% في آلاف الصور والفيديوهات، لتصبح سفيراً دائماً لعلامتك."
  },
  {
    question: "كم تكلفة إنتاج إعلان سينمائي؟",
    answer: "تختلف التكلفة حسب مستوى التعقيد (NOVA LIFE, ACTION, MAGIC). لكن بشكل عام، نوفر ما بين 40% إلى 70% من تكلفة الإنتاج التقليدي لعدم الحاجة لمواقع تصوير، ممثلين، أو معدات ثقيلة."
  },
  {
    question: "هل يمكن دمج منتجات حقيقية في الفيديو؟",
    answer: "نعم، نستخدم تقنيات دمج متقدمة (Compositing & LoRA Fine-tuning) لإدراج منتجك الحقيقي داخل المشاهد المولدة بالذكاء الاصطناعي بدقة وواقعية عالية."
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
