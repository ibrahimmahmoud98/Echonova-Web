
import { CommercialLevelData, IdentityData, EntertainmentType } from "@/types/services";

export const SERVICES_DATA = {
  hero: {
    title: "مستقبل الترفيه الموجه",
    subtitle: "نحول العلامات التجارية إلى تجارب حية وقصص تروى",
    description: "في إيكونوڤا، لا نقدم مجرد خدمات إنتاجية، بل نصوغ عوالم متكاملة. من الإعلانات التجارية التي تخطف الأنفاس إلى السفراء الافتراضيين الذين يجسدون هوية علامتك، وصولاً إلى الأعمال الدرامية التي تدمج منتجك في قصة يعشقها الجمهور.",
  },
  commercials: {
    title: "Commercials",
    arTitle: "الإعلانات التجارية",
    description: "إعلانات سينمائية تتجاوز المألوف، مصممة لتترك انطباعاً يدوم.",
    image: "/images/service_action.png",
    altText: "مشهد إعلان سينمائي مليء بالحركة والإثارة من إنتاج إيكونوڤا ستديو",
    link: "/services/reels",
  },
  identity: {
    title: "Identity",
    arTitle: "الهوية الافتراضية",
    description: "شخصيات رقمية تمثل روح علامتك التجارية بدقة متناهية.",
    image: "/images/nova_aura_face.png",
    altText: "تصميم شخصية افتراضية واقعية (Virtual Influencer) تمثل الهوية البصرية للعلامة التجارية",
    link: "/services/aura",
  },
  entertainment: {
    title: "Entertainment",
    arTitle: "الترفيه الموجه",
    description: "نقل علامتك من إعلان يتم تخطيه إلى محتوى يتم البحث عنه.",
    image: "/images/nova_cinema_set.png",
    altText: "موقع تصوير سينمائي افتراضي لإنتاج محتوى ترفيهي موجه للعلامات التجارية",
    link: "/services/cinema",
  },
};

export const COMMERCIAL_LEVELS = [
  {
    id: "life",
    brandName: "NOVA LIFE",
    title: "Absolute Realism",
    arTitle: "الواقعية المطلقة",
    description: "البديل الذكي للتصوير التقليدي؛ نجسد واقعية مذهلة بمشاعر إنسانية دقيقة، لندمج منتجك في مشاهد درامية نابضة بالحياة تأسر القلوب وتمنح علامتك مصداقية بصرية كاملة، دون الحاجة لمواقع تصوير أو أطقم عمل ضخمة.",
    features: [
      "محاكاة واقعية 100%",
      "مشاعر إنسانية دقيقة",
      "بديل للتصوير الحي",
      "إضاءة طبيعية",
      "تكلفة إنتاج أقل"
    ],
    idealFor: "الإعلانات الدرامية، المشاهد التمثيلية، المحتوى الاجتماعي",
    valueProp: "واقعية مطلقة بدون تعقيدات الإنتاج التقليدي.",
    posterImage: "/images/service_life_v2.png",
    altText: "مشهد واقعي للغاية تم إنتاجه بواسطة الذكاء الاصطناعي يظهر مشاعر إنسانية دقيقة (NOVA LIFE)",
    videoPreview: "/videos/spark_preview.mp4",
    gallery: [
      "/images/service_life_v2.png",
      "/images/service_life.png",
      "/images/portfolio_1.png"
    ],
    colorTheme: "from-blue-400 to-cyan-300", 
    slogan: "Absolute Realism"
  },
  {
    id: "action",
    brandName: "NOVA ACTION",
    title: "Cinematic Action",
    arTitle: "نبض الأكشن",
    description: "عندما يتجاوز السيناريو حدود الواقع؛ ننتج مشاهد الأكشن المستحيلة بكثافة بصرية فائقة. نمنح علامتك إيقاعاً ومغامرة آمنة، محولين الإثارة السينمائية إلى أداة تسويقية جبارة بأعلى جودة وأقل تكاليف لوجستية.",
    features: [
      "فيزياء وتدمير واقعي",
      "مؤثرات بصرية (VFX) كثيفة",
      "حركة كاميرا ديناميكية",
      "تصميم صوتي سينمائي",
      "بيئات معقدة"
    ],
    idealFor: "إعلانات السيارات، المشروبات الرياضية، الألعاب",
    valueProp: "إثارة بصرية تحبس الأنفاس.",
    posterImage: "/images/service_action_v2.png",
    altText: "مشهد أكشن سينمائي عالي الجودة مع مؤثرات بصرية متقدمة (NOVA ACTION)",
    videoPreview: "/videos/pulse_preview.mp4",
    gallery: [
      "/images/service_action_v2.png",
      "/images/service_action.png",
      "/images/portfolio_2.png"
    ],
    colorTheme: "from-red-600 to-orange-500",
    slogan: "Cinematic Action"
  },
  {
    id: "magic",
    brandName: "NOVA MAGIC",
    title: "Beyond Reality",
    arTitle: "ما وراء الواقع",
    description: "جوهرة إيكونوڤا حيث نكسر قوانين الفيزياء لنجسد أحلام علامتك في عوالم من السحر والخيال العلمي. نحن نهندس الخيال لنحول رسائلكم الجريئة إلى مشاهد سينمائية مذهلة تمنح هويتك صورة الابتكار المستقبلي والريادة المطلقة.",
    features: [
      "خرق قوانين الفيزياء",
      "عوالم خيالية كاملة",
      "مخلوقات وشخصيات خيالية",
      "تجسيد الأحلام",
      "إبداع بلا حدود"
    ],
    idealFor: "العلامات التجارية الجريئة، العطور، التكنولوجيا المستقبلية",
    valueProp: "تحويل المستحيل إلى مشهد مرئي.",
    posterImage: "/images/service_magic_v2.png",
    altText: "مشهد خيالي سريالي يكسر قوانين الفيزياء ويعبر عن الإبداع اللامحدود (NOVA MAGIC)",
    videoPreview: "/videos/epic_preview.mp4",
    gallery: [
      "/images/service_magic_v2.png",
      "/images/service_magic.png",
      "/images/portfolio_3.png"
    ],
    colorTheme: "from-purple-600 to-pink-500",
    slogan: "Beyond Reality"
  }
];

export const IDENTITY_PAGE_CONTENT = {
  header: {
    title: "الهوية الافتراضية",
    subtitle: "NOVA AURA",
    tagline: "",
    image: "/images/nova_aura_face.png"
  },
  description: {
    text: "خدمة الموديلينج المتقدمة والحصرية. نحن لا نولد وجوهاً عشوائية، بل نخلق شخصيات (Models) فريدة تحمل الـ DNA الخاص بعلامتك التجارية. نضمن ثبات الملامح في كل الظروف، والأهم من ذلك، ننقل الـ Aura، والمشاعر، والأجواء العامة و الـ Vibes التي تريد إيصالها للجمهور بدقة متناهية."
  },
  valueProp: {
    title: "القيمة المضافة",
    text: "امتلاك وجه/وجوه إعلانية حصرية ومتحكم بها تماماً، تعبر عن هويتك باستمرار، وتخلق رابطاً نفسياً عميقاً ومستداماً مع جمهورك، بعيداً عن تقلبات ومخاطر المؤثرين البشر، وبأقل التكاليف وخيال لا محدود."
  }
};

export const ENTERTAINMENT_PAGE_CONTENT = {
  header: {
    title: "الإنتاج السينمائي",
    subtitle: "تسويق اللاوعي عبر الدراما",
    intro: "نحن ننتقل بعلامتك التجارية من \"المحتوى الدخيل\" الذي يحاول المشاهد تخطيه (Skip Ad)، إلى \"المحتوى الأصلي\" الذي يبحث عنه الجمهور ويستمتع بمشاهدته. في هذا المستوى، نستخدم الذكاء الاصطناعي لإنتاج أعمال فنية درامية متكاملة، الهدف منها \"غرس\" العلامة التجارية في العقل اللاواعي للمشاهد:"
  },
  services: [
    {
      id: "nova-cinema",
      title: "NOVA CINEMA",
      arTitle: "الافلام القصيرة",
      description: "نقدم خدمة إنتاج فيلم روائي قصير متكامل العناصر الفنية (سيناريو محكم، عقدة درامية، ذروة أحداث، ونهاية مؤثرة)، بجودة تضاهي الأفلام المشاركة في المهرجانات السينمائية.",
      mechanism: {
        title: "آلية \"الزرع الدرامي\" للعلامة التجارية",
        intro: "بدلاً من الإعلان المباشر المنفر، نقوم بدمج علامتك التجارية بذكاء داخل نسيج القصة عبر عدة أساليب:",
        points: [
          {
            title: "الدمج المكاني",
            description: "أن تدور أحداث الفيلم أو جزء رئيسي منها داخل مقر الشركة، أو فرع المطعم، أو معرض العلامة التجارية، ليظهر المكان كبيئة حاضنة للأبطال."
          },
          {
            title: "الدمج الوظيفي",
            description: "أن يكون منتجك أو خدمتك هو \"الأداة\" التي يستخدمها البطل لحل المشكلة أو تجاوز العقبة في الفيلم (مثلاً: تطبيق بنكي ينقذ البطل من مأزق مالي في لحظة حاسمة، أو سيارة تتحمل الظروف الصعبة لتوصيل الأمانة)."
          },
          {
            title: "الدمج البصري",
            description: "ظهور شعار العلامة التجارية وألوانها كجزء طبيعي من خلفية الأحداث وديكورات المشهد، مما يرسخ الصورة الذهنية دون إقحام."
          }
        ]
      },
      value: {
        title: "القيمة للعميل",
        description: "ربط علامتك التجارية بمشاعر \"البطولة\" و\"الحل\"، وكسب تعاطف الجمهور مع قصتك، مما يخلق ولاءً عاطفياً أعمق بمراحل من الإعلان التقليدي."
      }
    },
    {
      id: "nova-saga",
      title: "NOVA SAGA",
      arTitle: "المسلسلات القصيرة",
      description: "إنتاج مسلسل درامي مكون من سلسلة حلقات مترابطة (Mini-Series)، تتميز ببناء درامي طويل النفس، وتطور في شخصيات الأبطال، واعتماد أسلوب \"الترقب\" في نهاية كل حلقة لضمان عودة المشاهد.",
      mechanism: {
        title: "آلية \"الولاء التراكمي\"",
        intro: "", 
        points: [
          {
            title: "المرافقة اليومية",
            description: "تحويل علامتك التجارية إلى \"رفيق\" يومي للمشاهد من خلال متابعته للحلقات، مما يزرع الوعي بالعلامة بشكل تدريجي وراسخ."
          },
          {
            title: "تجسيد القيم",
            description: "نستخدم حلقات المسلسل ليس فقط لعرض المنتجات، بل لعكس \"قيم العلامة التجارية\" (Brand Values). إذا كانت قيمتك هي \"الجسارة\"، سيكون بطل المسلسل جسوراً. وإذا كانت \"العائلة\"، ستدور الأحداث في إطار عائلي دافئ."
          },
          {
            title: "تفاعل الجمهور",
            description: "خلق مجتمع من المتابعين يناقشون توقعاتهم للحلقة القادمة، مما يزيد من التفاعل الطبيعي (Organic Reach) لاسم علامتك التجارية على منصات التواصل."
          }
        ]
      },
      value: {
        title: "القيمة للعميل",
        description: "بناء علاقة طويلة الأمد مع الجمهور، وتحويل المشاهدين من \"زبائن محتملين\" إلى \"جمهور وفي\" ينتظر محتواك بشغف."
      }
    }
  ]
};

// Keeping these for backward compatibility if other components use them
export const VIRTUAL_IDENTITY: IdentityData = {
    brandName: "NOVA AURA",
    description: IDENTITY_PAGE_CONTENT.description.text,
    stats: [
        { label: "ثبات الملامح", value: 100, suffix: "%" },
        { label: "حصرية الملكية", value: 100, suffix: "%" }
    ],
    features: [
        { title: "بصمة فريدة", description: "جينات رقمية خاصة بعلامتك فقط" },
        { title: "سفراء العلامة", description: "شخصيات تمثلك في كل المحافل الرقمية" },
        { title: "ارتباط عاطفي", description: "بناء علاقة دائمة مع الجمهور" },
        { title: "تحكم كامل", description: "مرونة في التعديل والتوجيه" },
    ]
};

export const ENTERTAINMENT_DATA: EntertainmentType[] = [
    {
        id: 'cinema',
        brandName: "NOVA CINEMA",
        title: "فيلم قصير",
        posterImage: "https://res.cloudinary.com/da1dtiu2x/image/upload/v1781285045/Echonova_Assets/services/posters/nova_cinema_sada_poster.jpg",
        scriptExcerpt: "المشهد داخلي: ممر رخامي طويل ذو إضاءة خافتة، صوت خطوات البطل يتردد كصدى غامض بين الجدران بينما يبحث عن الحقيقة المفقودة خلف الأبواب المغلقة...",
        integrationMethods: [
            { title: "الدمج المكاني", description: "أن تدور أحداث الفيلم داخل مقر الشركة أو معرضها." },
            { title: "الدمج الوظيفي", description: "المنتج هو الأداة التي تنقذ البطل." }
        ]
    },
    {
        id: 'saga',
        brandName: "NOVA SAGA",
        title: "مسلسل درامي",
        posterImage: "https://res.cloudinary.com/da1dtiu2x/image/upload/v1781285039/Echonova_Assets/services/posters/nova_saga_matab_poster.jpg",
        scriptExcerpt: "الحلقة الأولى: لقطة مقربة لعجلة القيادة بينما تنحرف السيارة فجأة لتتفادى مطباً غير متوقع على طريق جبلي وعر، لتبدأ رحلة مليئة بالمفاجآت والقرارات المصيرية...",
        integrationMethods: [
            { title: "المرافقة اليومية", description: "تحويل العلامة إلى رفيق يومي للمشاهد." },
            { title: "تجسيد القيم", description: "قيم العلامة تنعكس في تصرفات الأبطال." }
        ]
    }
];

export const AUDIO_PRODUCTION_PAGE_CONTENT = {
  header: {
    title: "الإنتاج الموسيقي والصوتي",
    subtitle: "هندسة المشاعر",
    intro: "لا تنتهي التجربة الرائدة عند الصورة. نترجم الكلمات إلى إحساس بشري طبيعي يلامس الوجدان بأدق اللهجات والمقامات، مع تثبيت البصمة الصوتية لهويتكم بنقاء تام."
  },
  services: [
    {
      id: "nova-whisper",
      title: "NOVA WHISPER",
      arTitle: "صدى المشاعر",
      description: "خدمة الإنتاج الموسيقي والتوزيع المتقدم التي تقضي على التوليد الآلي العشوائي عبر هندسة صوتية صارمة. نترجم الكلمات إلى إحساس بشري طبيعي يلامس الوجدان بأدق اللهجات والمقامات، مع تثبيت البصمة الصوتية لهويتكم بنقاء تام وخلو مطلق من الهلوسات الترددية.",
      mechanism: {
        title: "آلية البناء الوجداني",
        intro: "نخلق ارتباطاً عاطفياً فورياً عبر المزايا التالية:",
        points: [
          { title: "الارتباط الوجداني", description: "خلق ارتباط عاطفي فوري ومستدام عبر بناء هوية سمعية حصرية تلامس جمهور علامتكم التجارية." },
          { title: "السيادة التجارية", description: "توفير أصول موسيقية مضبوطة إيقاعياً بحقوق تجارية كاملة متوافقة مع التوزيع الرقمي لتجاوز أنظمة (Content ID) بأمان." },
          { title: "التحرر اللوجستي", description: "القضاء على التكاليف الباهظة واللوجستيات المعقدة المرتبطة باستوديوهات التسجيل التقليدية، الملحنين، والموزعين." },
          { title: "النقاء الهندسي", description: "ضمان خلو المخرجات من التشوهات الآلية (AI Artifacts) والهلوسات، مع التزام صارم بوضوح مخارج الحروف والمقامات." }
        ]
      },
      value: {
        title: "القيمة للعميل",
        description: "ارتباط قوي وراسخ بعلامتك عبر بصمة صوتية تلمس المشاعر مباشرة وتثبت هويتها بموثوقية عالية."
      }
    }
  ]
};

export const AUDIO_PRODUCTION_DATA: EntertainmentType[] = [
    {
        id: 'whisper',
        brandName: "NOVA WHISPER",
        title: "هندسة صوتية متقدمة",
        posterImage: "/images/nova_whisper_gear.png",
        scriptExcerpt: "خدمة الإنتاج الموسيقي والتوزيع المتقدم التي تقضي على التوليد الآلي العشوائي عبر هندسة صوتية صارمة.",
        integrationMethods: [
            { title: "الارتباط الوجداني", description: "خلق ارتباط عاطفي فوري ومستدام عبر بناء هوية سمعية حصرية تلامس جمهور علامتكم التجارية." },
            { title: "التوزيع الرقمي الآمن", description: "تجاوز أنظمة (Content ID) بأمان تام." }
        ]
    }
];

export const WHY_US_DATA = [
    {
        id: '01',
        title: "اقتصاديات ذكية",
        description: "إنتاجات ضخمة بميزانيات منطقية. نوفر تكاليف الديكورات والسفر والمعدات الثقيلة.",
        icon_name: "Wallet"
    },
    {
        id: '02',
        title: "خيال بلا سقف",
        description: "من الدراما الواقعية إلى عوالم السحر والفضاء، نجسد أي سيناريو مهما كان معقداً.",
        icon_name: "Rocket"
    },
    {
        id: '03',
        title: "هوية ثابتة",
        description: "نحافظ على اتساق ملامح وهوية علامتك التجارية، بل وحتى المشاعر والأجواء المميزة.",
        icon_name: "Fingerprint"
    },
    {
        id: '04',
        title: "جودة سينمائية",
        description: "نحن لسنا تقنيين فقط، نحن صناع أفلام نستخدم الكود بدلاً من العدسة.",
        icon_name: "Film"
    }
];

// ============================================
// CINEMATIC SHOWCASE DATA (SSOT for CinematicShowcase.tsx)
// ============================================

export const CINEMATIC_SHOWCASE_DATA = {
  saga: {
    mode: 'saga' as const,
    title: "مسلسلات قصيرة",
    description: "نحن لا ننتج إعلاناً، بل نصنع مسلسلاً درامياً متكاملاً يُبنى سياقه من الصفر ليحتضن علامتك التجارية كجزء طبيعي من واقع الشخصيات. القصة والسيناريو يُصاغان باحترافية سينمائية تضمن ظهور منتجاتك في مشاهد عفوية (مثل زي يرتديه البطل، أو مكان يرتاده، أو مشروب في لقطة عابرة) تخدم الدراما أولاً. هذا الدمج الذكي يستهدف اللاوعي، حيث يبني 'ألفة بصرية' وجدانية تجعل المشاهد يرتبط بمنتجك تلقائياً نتيجة إعجابه بالعمل وبنمط حياة أبطاله، دون أن يشعر للحظة أنه أمام مادة ترويجية.",
    ctaText: "اصنع إرثك بالدراما",
    features: [
      { title: "تأثير تراكمي ذكي", description: "تحويل علامتك التجارية إلى 'رفيق' يومي يزرع الوعي بالعلامة بشكل راسخ.", icon_name: "Layers" },
      { title: "محاكاة نمط الحياة", description: "الأبطال يجسدون قيم علامتك. إذا كانت قيمتك 'الجسارة'، فالبطل سيكون جسوراً.", icon_name: "Activity" },
      { title: "كسر مقاومة الإعلان", description: "خلق مجتمع يترقب الأحداث، مما يزيد التفاعل الطبيعي والوصول لشرائح جديدة.", icon_name: "Shield" },
      { title: "ارتباط شعوري مستمر", description: "بناء علاقة عاطفية طويلة الأمد مع الجمهور.", icon_name: "Heart" },
      { title: "ألفة بصرية دائمة", description: "ترسيخ صورة المنتج في ذهن المشاهد كجزء من حياته اليومية.", icon_name: "Eye" },
      { title: "بناء ولاء تلقائي", description: "تحويل المشاهدين إلى محامين عن العلامة التجارية.", icon_name: "Users" }
    ],
    images: [
      "https://res.cloudinary.com/da1dtiu2x/image/upload/v1781263023/Echonova_Assets/page_cinema/saga/saga_desert_spaceship.jpg",
      "https://res.cloudinary.com/da1dtiu2x/image/upload/v1781263027/Echonova_Assets/page_cinema/saga/saga_astronaut_spacestation.jpg",
      "https://res.cloudinary.com/da1dtiu2x/image/upload/v1781263031/Echonova_Assets/page_cinema/saga/saga_detective_argument.jpg",
      "https://res.cloudinary.com/da1dtiu2x/image/upload/v1781263035/Echonova_Assets/page_cinema/saga/saga_majlis_confrontation.jpg",
      "https://res.cloudinary.com/da1dtiu2x/image/upload/v1781263039/Echonova_Assets/page_cinema/saga/saga_desert_campfire.jpg"
    ],
    imageAlts: [
      "مشهد سينمائي لرجل خليجي في الصحراء يتطلع إلى مركبة فضائية تهبط من السماء",
      "رائد فضاء في محطة فضائية دولية يتأمل لوح طاقة غذائي يطفو في انعدام الجاذبية",
      "محققان سعوديان في نقاش حاد داخل مكتب تحقيق مغلق مع ظهور طبيعي لمنتج محلي",
      "لقطة سينمائية واسعة لمجلس سعودي تقليدي يشهد مواجهة درامية ساخنة بين الحضور",
      "مجموعة من الرجال في جلسة تفكر وتسامر حول شبة نار في قلب الكثبان الرملية عند الغروب"
    ],
    // Short captions shown as overlay on thumbnail hover/active.
    // Kept punchy and Arabic-first to match brand language.
    captions: [
      "سريالي فضائي",
      "خيال علمي",
      "حبكة درامية",
      "دراما اجتماعية",
      "حكاية الصحراء"
    ]
  },
  cinema: {
    mode: 'cinema' as const,
    title: "أفلام قصيرة",
    description: "نمنح علامتك التجارية 'هيبة فنية' عبر إنتاج أفلام قصيرة تُصمم خصيصاً لخدمة أهدافك بأسلوب غير مباشر. نقوم بإنتاج العمل الفني ليظهر منتجك فيه كعنصر حقيقي وواقعي داخل المشهد، تماماً كما تظهر العلامات العالمية في أفلام هوليوود. التركيز هنا يكون على 'الحالة الشعورية' والإبهار البصري؛ حيث نربط منتجك بلحظات القوة أو الجمال أو التأثير داخل الفيلم، مما يرسخ العلامة في ذاكرة الجمهور كرمز للتميز، ويخلق لديهم رغبة تلقائية في المحاكاة والاقتناء بمجرد رؤية المنتج في الواقع.",
    ctaText: "حوّل علامتك إلى أيقونة",
    features: [
      { title: "هيبة فنية راقية", description: "منح المنتج صبغة فنية راقية ترفع من قيمته المدركة.", icon_name: "Award" },
      { title: "أثر وجداني مكثف", description: "ربط العلامة بمشاعر قوية ومؤثرة تخلد في الذاكرة.", icon_name: "Heart" },
      { title: "إيحاء بصري ساحر", description: "استخدام جماليات السينما لإظهار المنتج في أبهى صورة.", icon_name: "Sparkles" },
      { title: "إقناع صامت وعميق", description: "التأثير على المشاهد دون كلمات مباشرة.", icon_name: "Volume2" },
      { title: "خيال بصري مطلق", description: "خلق عوالم بصرية مدهشة تخدم فكرة العلامة.", icon_name: "Globe" },
      { title: "ارتباط ذهني خاطف", description: "ربط المنتج بلحظات أيقونية لا تنسى.", icon_name: "Zap" }
    ],
    images: [
      "https://res.cloudinary.com/da1dtiu2x/image/upload/v1781263044/Echonova_Assets/page_cinema/cinema/cinema_luxury_car_watch.jpg",
      "https://res.cloudinary.com/da1dtiu2x/image/upload/v1781263048/Echonova_Assets/page_cinema/cinema/cinema_luxury_perfume.jpg",
      "https://res.cloudinary.com/da1dtiu2x/image/upload/v1781263053/Echonova_Assets/page_cinema/cinema/cinema_architect_workspace.jpg",
      "https://res.cloudinary.com/da1dtiu2x/image/upload/v1781263058/Echonova_Assets/page_cinema/cinema/cinema_doctor_hospital.jpg",
      "https://res.cloudinary.com/da1dtiu2x/image/upload/v1781263062/Echonova_Assets/page_cinema/cinema/cinema_detective_noir.jpg"
    ],
    imageAlts: [
      "لقطة قريبة تبرز اندماج ساعة يد فاخرة وحقيبة جلدية داخل سيارة رياضية فارهة",
      "رجل سعودي أمام مرآة يضع عطر عود فاخر في لقطة سينمائية تبرز جمالية تصميم زجاجة العطر",
      "مهندسة معمارية ترتدي الحجاب تدرس مخططات هندسية ليلاً برفقة كوب قهوة دافئ في بيئة عمل عصرية",
      "طبيب سعودي يسير في ممر المستشفى حاملاً زجاجة مياه معدنية بلقطة تتبع سينمائية انسيابية",
      "لقطة سينمائية بأسلوب سينما النوار (Noir) لمحقق يقرأ ملفاً سرياً داخل سيارة تحت المطر"
    ],
    captions: [
      "هيبة الفخامة",
      "أناقة العطر",
      "شغف العمل",
      "إشراقة الأمل",
      "غموض الليل"
    ]
  },
  whisper: {
    mode: 'whisper' as const,
    title: "صدى المشاعر",
    description: "خدمة الإنتاج الموسيقي والتوزيع المتقدم التي تقضي على التوليد الآلي العشوائي عبر هندسة صوتية صارمة. نترجم الكلمات إلى إحساس بشري طبيعي يلامس الوجدان بأدق اللهجات والمقامات، مع تثبيت البصمة الصوتية لهويتكم بنقاء تام وخلو مطلق من الهلوسات الترددية.",
    ctaText: "ابدأ التوزيع الصوتي",
    features: [
      { title: "الارتباط الوجداني", description: "خلق ارتباط عاطفي فوري ومستدام عبر بناء هوية سمعية حصرية تلامس جمهور علامتكم التجارية.", icon_name: "Heart" },
      { title: "السيادة التجارية", description: "توفير أصول موسيقية مضبوطة إيقاعياً بحقوق تجارية كاملة متوافقة مع التوزيع الرقمي لتجاوز أنظمة (Content ID) بأمان.", icon_name: "Shield" },
      { title: "التحرر اللوجستي", description: "القضاء على التكاليف الباهظة واللوجستيات المعقدة المرتبطة باستوديوهات التسجيل التقليدية، الملحنين، والموزعين.", icon_name: "Globe" },
      { title: "النقاء الهندسي", description: "ضمان خلو المخرجات من التشوهات الآلية (AI Artifacts) والهلوسات، مع التزام صارم بوضوح مخارج الحروف والمقامات.", icon_name: "Activity" }
    ],
    images: [
      "/images/nova_whisper_sound_1_new.png",
      "/images/nova_whisper_gear.png",
      "/images/nova_whisper_void.png",
      "/images/nova_whisper_sound_1_new.png",
      "/images/nova_whisper_gear.png"
    ],
    imageAlts: [
      "هندسة صوتية صارمة",
      "ارتباط وجداني عبر الصوت",
      "إستوديو رقمي للتوزيع الموسيقي",
      "نقاء هندسي بدون تشوهات آلية",
      "تثبيت البصمة الصوتية للهوية"
    ],
    captions: [
      "هندسة الصوت",
      "نشيد البراند",
      "استوديو رقمي",
      "نقاء مطلق",
      "بصمة صوتية"
    ]
  }
};
