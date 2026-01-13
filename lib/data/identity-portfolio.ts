
export interface PortfolioItem {
  id: string;
  title: string;
  type: 'single' | 'collection';
  thumbnail: string;
  items: Array<{ type: 'image' | 'video', url: string, caption?: string }>;
  tags: string[];
  category: string;
  description: string;
}

// Helper to generate mock data
const generateMockData = (): PortfolioItem[] => {
  const items: PortfolioItem[] = [];
  const categories = ['Corporate', 'Creative', 'Futuristic', 'Minimalist', 'Abstract'];
  
  const descriptions = [
     "تصميم هوية بصرية متكاملة تعكس الطموح والرؤية المستقبلية، مع التركيز على البساطة والأناقة.",
     "تجربة رقمية غامرة تعيد تعريف مفهوم الهوية في العالم الافتراضي، مستوحاة من الطبيعة والتكنولوجيا.",
     "هوية تجارية عصرية للشركات الناشئة، تتميز بألوان جريئة وخطوط حادة تعبر عن القوة والابتكار.",
     "مشروع فني يستكشف حدود التعبير الرقمي من خلال دمج العناصر الثلاثية الأبعاد مع النصوص المتحركة.",
     "إعادة ابتكار للعلامة التجارية التقليدية بلمسة مستقبلية، تناسب العصر الرقمي الجديد."
  ];

  // Image Pool (Saudi Content)
  // Image Pool (Saudi Content)
  const allImages = [
    '/images/portfolio/A_bright_daytime_2k_202512270312.jpeg',
    '/images/portfolio/A_bright_daytime_2k_202512270313.jpeg',
    '/images/portfolio/A_cinematic_shot_2k_202512270312.jpeg',
    '/images/portfolio/A_closeup_cinematic_2k_202512270313 (1).jpeg',
    '/images/portfolio/A_closeup_cinematic_2k_202512270313.jpeg',
    '/images/portfolio/A_nighttime_interior_2k_202512270313.jpeg',
    '/images/portfolio/A_nighttime_interior_2k_202512270402.jpeg',
    '/images/portfolio/A_saudi_architect_2k_202512272258.jpeg',
    '/images/portfolio/A_saudi_woman_2k_202512272240.jpeg',
    '/images/portfolio/A_very_closeup_2k_202512270312 (1).jpeg',
    '/images/portfolio/A_very_closeup_2k_202512270312.jpeg',
    '/images/portfolio/A_warm_cinematic_2k_202512270308.jpeg',
    '/images/portfolio/A_warm_cinematic_2k_202512270309 (1).jpeg',
    '/images/portfolio/A_warm_cinematic_2k_202512270309 (2).jpeg',
    '/images/portfolio/A_warm_cinematic_2k_202512270309.jpeg',
    '/images/portfolio/A_young_saudi_2k_202512272205 (1).jpeg',
    '/images/portfolio/A_young_saudi_2k_202512272205 (2).jpeg',
    '/images/portfolio/A_young_saudi_2k_202512272205 (3).jpeg',
    '/images/portfolio/A_young_saudi_2k_202512272205.jpeg',
    '/images/portfolio/Delete_the_text_2k_202512272308.jpeg',
    '/images/portfolio/In_a_modern_2k_202512272307 (1).jpeg',
    '/images/portfolio/In_a_modern_2k_202512272307.jpeg',
    '/images/portfolio/In_a_very_2k_202512272228 (1).jpeg',
    '/images/portfolio/In_a_very_2k_202512272228 (2).jpeg',
    '/images/portfolio/In_a_very_2k_202512272228 (3).jpeg',
    '/images/portfolio/In_a_very_2k_202512272228.jpeg',
    '/images/portfolio/In_the_middle_2k_202512272205 (1).jpeg',
    '/images/portfolio/In_the_middle_2k_202512272205 (2).jpeg',
    '/images/portfolio/In_the_middle_2k_202512272205.jpeg',
    '/images/portfolio/In_the_middle_2k_202512272206.jpeg',
    '/images/portfolio/In_the_middle_2k_202512272223.jpeg',
    '/images/portfolio/Inside_a_simple_2k_202512270313.jpeg',
    '/images/portfolio/Inside_an_art_2k_202512272313 (1).jpeg',
    '/images/portfolio/Inside_an_art_2k_202512272313.jpeg',
    '/images/portfolio/Inside_the_lobby_2k_202512272305 (1).jpeg',
    '/images/portfolio/Inside_the_lobby_2k_202512272305 (2).jpeg',
    '/images/portfolio/Inside_the_lobby_2k_202512272305.jpeg',
    '/images/portfolio/Make_the_colors_2k_202512272224.jpeg',
    '/images/portfolio/Make_the_colors_2k_202512272226 (1).jpeg',
    '/images/portfolio/Make_the_colors_2k_202512272226.jpeg',
    '/images/portfolio/Remove_the_chair_2k_202512270311.jpeg',
    '/images/portfolio/Scene_a_medium_2k_202512270313.jpeg',
    '/images/portfolio/The_image_is_2k_202512272206 (1).jpeg',
    '/images/portfolio/The_image_is_2k_202512272206.jpeg',
    '/images/portfolio/saudi_ad_coffee.png',
    '/images/portfolio/saudi_ad_perfume.png',
    '/images/portfolio/saudi_ad_tech_vr.png',
    '/images/portfolio/saudi_model_man_casual.png',
    '/images/portfolio/saudi_model_man_professional.png',
    '/images/portfolio/saudi_model_woman_creative.png'
  ];

  // 10 Collections
  for (let i = 1; i <= 10; i++) {
    const cat = categories[i % categories.length];
    // Use modulo to cycle through images deterministically
    const mainImg = allImages[i % allImages.length];
    const subImg1 = allImages[(i + 1) % allImages.length];
    const subImg2 = allImages[(i + 2) % allImages.length];
    const subImg3 = allImages[(i + 3) % allImages.length];

    items.push({
      id: `col-${i}`,
      title: `Identity Series ${i}`,
      type: 'collection',
      thumbnail: mainImg,
      items: [
        { type: 'image', url: subImg1, caption: 'Primary Variant' },
        { type: 'image', url: subImg2, caption: 'Secondary Variant' },
        { type: 'image', url: subImg3, caption: 'Wireframe View' },
      ],
      tags: [cat, 'Collection'],
      category: cat,
      description: descriptions[i % descriptions.length]
    });
  }

  // 40 Single Items
  for (let i = 1; i <= 40; i++) {
    const cat = categories[i % categories.length];
    const img = allImages[(i * 3) % allImages.length]; // Different stride to vary order

    items.push({
      id: `single-${i}`,
      title: `Digital Persona ${i}`,
      type: 'single',
      thumbnail: img,
      items: [
        { type: 'image', url: img, caption: 'Final Render' },
      ],
      tags: [cat],
      category: cat,
      description: descriptions[i % descriptions.length]
    });
  }

  // 10 Video Items
  for (let i = 1; i <= 10; i++) {
     const cat = 'Motion';
    items.push({
      id: `vid-${i}`,
      title: `Motion Identity ${i}`,
      type: 'single',
      thumbnail: `https://picsum.photos/seed/vid${i}/400/600`, // Using image as placeholder for video thumb
      items: [
        { type: 'video', url: `https://www.w3schools.com/html/mov_bbb.mp4`, caption: 'Motion Capture Preview' },
      ],
      tags: [cat, 'Animation'],
      category: cat,
      description: "عرض متحرك للهوية البصرية يظهر تفاعل العناصر مع البيئة المحيطة."
    });
  }

  return items;
};

export const portfolioItems = generateMockData();
