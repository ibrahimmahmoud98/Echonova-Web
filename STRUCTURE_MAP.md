# خريطة هيكلية المشروع (STRUCTURE_MAP)

> **استخدام الخريطة:** قبل تعديل أي ملف، ابحث عن "الوصف بالعربية" للحصول على "المسار الصحيح".

---

## الصفحات (Pages)

| الوصف بالعربية | المسار | ملاحظات |
|---------------|--------|---------|
| الصفحة الرئيسية | `app/page.tsx` | تستخدم sections من `components/sections/` |
| صفحة من نحن | `app/about/page.tsx` | |
| صفحة خدماتنا (القائمة) | `app/services/page.tsx` | تستخدم features من `components/features/` |
| صفحة خدمة الريلز | `app/services/reels/page.tsx` | كانت: commercials |
| صفحة خدمة أورا | `app/services/aura/page.tsx` | كانت: identity |
| صفحة الانتاج السينمائي | `app/services/cinema/page.tsx` | كانت: entertainment |
| صفحة تواصل معنا | `app/contact/page.tsx` | ✅ موجودة |

---

## أقسام الصفحة الرئيسية (Home Sections)

| السكشن | الملف | ملاحظات |
|-------|-------|---------|
| سكشن Hero | `components/sections/Hero.tsx` | |
| سكشن القصة | `components/sections/Story.tsx` | |
| سكشن الخدمات (تابات NOVA) | `components/sections/HomeServicesSection.tsx` | كان: Services.tsx |
| سكشن الأعمال | `components/sections/Portfolio.tsx` | |
| سكشن المنهجية | `components/sections/Methodology.tsx` | |
| سكشن التواصل (في الرئيسية) | `components/sections/Contact.tsx` | سكشن وليس صفحة |

---

## مكونات الخدمات (Features)

| الخدمة | المجلد | المكونات الرئيسية |
|-------|--------|------------------|
| مكونات الريلز | `components/features/reels/` | `ReelsImmersive.tsx`, `ReelsSection.tsx` |
| مكونات أورا | `components/features/aura/` | `IdentitySection.tsx`, `IdentityCarousel.tsx` |
| ↳ مكونات الكاروسيل | `components/features/aura/showcase/` | `CarouselSlide.tsx`, `CarouselControls.tsx`, `carouselUtils.ts` |
| مكونات السينما | `components/features/cinema/` | `EntertainmentSection.tsx`, `Poster3D.tsx` |
| Hero الخدمات | `components/features/hero/` | `ServicesHero.tsx` |
| مكونات لماذا نحن | `components/features/why-us/` | `WhyUsSection.tsx` |

---

## مصادر البيانات (SSOT)

| الوصف | الملف | الصادرات الرئيسية |
|-------|-------|------------------|
| بيانات الخدمات | `lib/data/services-content.ts` | `COMMERCIAL_LEVELS`, `CINEMATIC_SHOWCASE_DATA`, `SERVICES_DATA` |
| بيانات الهوية | `lib/data/identity-portfolio.ts` | `IDENTITY_PORTFOLIO` |
| بيانات من نحن | `lib/data/about-content.ts` | `ABOUT_CONTENT` |

---

## قاعدة ذهبية

> **سكشن في الرئيسية** = `components/sections/*`
> **صفحة فرعية** = `app/*/page.tsx` + `components/features/*`
> **البيانات** = `lib/data/*` (مصدر موحد - SSOT)
