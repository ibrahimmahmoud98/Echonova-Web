
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

// Export the cloud images for use in Services Page (aura_section_images2)
export const AURA_SERVICES_IMAGES = [
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769481558/ECHONOVA_STUDIO_AURA_80_magqll.png",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769481553/ECHONOVA_STUDIO_AURA_34_pesjoe.png",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769481551/ECHONOVA_STUDIO_AURA_17_whvvsz.png",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769481549/ECHONOVA_STUDIO_AURA_12_eskfky.png",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769481544/ECHONOVA_STUDIO_AURA_178_e5qsnk.png",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769481542/ECHONOVA_STUDIO_AURA_195_lay8ks.png",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769481538/ECHONOVA_STUDIO_AURA_200_qcml8q.png",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769481533/ECHONOVA_STUDIO_AURA_197_uvkmeu.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769481532/ECHONOVA_STUDIO_AURA_164_g9mwas.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769481530/ECHONOVA_STUDIO_AURA_125_ahaspf.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769481524/ECHONOVA_STUDIO_AURA_35_vyzefr.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769481523/ECHONOVA_STUDIO_AURA_14_mezen7.png",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769481522/ECHONOVA_STUDIO_AURA_13_ncxqif.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769481518/ECHONOVA_STUDIO_AURA_3_gpf5fd.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769481517/ECHONOVA_STUDIO_AURA_2_yomfzk.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769481514/ECHONOVA_STUDIO_AURA_203_emz4lc.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769481512/ECHONOVA_STUDIO_AURA_170_mxrzkp.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769481510/ECHONOVA_STUDIO_AURA_167_rzyvpi.png",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769481508/ECHONOVA_STUDIO_AURA_154_qgitwu.png",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769481506/ECHONOVA_STUDIO_AURA_136_dd7swn.png",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769481503/ECHONOVA_STUDIO_AURA_130_zzi1ga.png",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769481502/ECHONOVA_STUDIO_AURA_123_zjsj2f.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769481500/ECHONOVA_STUDIO_AURA_111_pdrwoc.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769481499/ECHONOVA_STUDIO_AURA_102_cukbdo.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769481497/ECHONOVA_STUDIO_AURA_100_egzzih.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769481495/ECHONOVA_STUDIO_AURA_99_wauu5r.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769481494/ECHONOVA_STUDIO_AURA_90_qlfahx.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769481492/ECHONOVA_STUDIO_AURA_85_xn94lq.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769481491/ECHONOVA_STUDIO_AURA_54_ivdkqa.png",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769481490/ECHONOVA_STUDIO_AURA_68_jma4bt.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769481488/ECHONOVA_STUDIO_AURA_71_sgmrhd.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769481488/ECHONOVA_STUDIO_AURA_53_vhdd3n.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769481487/ECHONOVA_STUDIO_AURA_42_gwz73j.jpg"
];

// Export the cloud images for use in other components (e.g., Home Page Carousel)
export const AURA_IMAGES = [
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769476994/ECHONOVA_STUDIO_AURA_49_makl92.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769476995/ECHONOVA_STUDIO_AURA_63_b46szu.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769476995/ECHONOVA_STUDIO_AURA_65_lscbpw.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769476997/ECHONOVA_STUDIO_AURA_67_rbxj3n.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769476998/ECHONOVA_STUDIO_AURA_48_mi8ink.png",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769476998/ECHONOVA_STUDIO_AURA_74_t9ah52.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769477000/ECHONOVA_STUDIO_AURA_76_h72pac.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769477000/ECHONOVA_STUDIO_AURA_77_m0vyj7.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769477001/ECHONOVA_STUDIO_AURA_83_scst6o.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769477003/ECHONOVA_STUDIO_AURA_89_c5k24c.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769477004/ECHONOVA_STUDIO_AURA_103_sfbbit.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769477006/ECHONOVA_STUDIO_AURA_106_qpyepw.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769477007/ECHONOVA_STUDIO_AURA_109_qmig8r.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769477010/ECHONOVA_STUDIO_AURA_114_hwrbgt.png",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769477012/ECHONOVA_STUDIO_AURA_25_kctvg2.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769477013/ECHONOVA_STUDIO_AURA_120_vc1ph5.png",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769477013/ECHONOVA_STUDIO_AURA_124_mp3ky9.png",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769477013/ECHONOVA_STUDIO_AURA_126_irdmgq.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769477017/ECHONOVA_STUDIO_AURA_133_nlhkqd.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769477018/ECHONOVA_STUDIO_AURA_138_fdvpec.png",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769477022/ECHONOVA_STUDIO_AURA_147_kakb70.png",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769477023/ECHONOVA_STUDIO_AURA_149_dnzide.png",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769477023/ECHONOVA_STUDIO_AURA_155_yo0dpw.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769477028/ECHONOVA_STUDIO_AURA_158_qnzado.png",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769477028/ECHONOVA_STUDIO_AURA_160_wecp85.png",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769477029/ECHONOVA_STUDIO_AURA_161_lfszae.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769477034/ECHONOVA_STUDIO_AURA_165_wl1bwk.png",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769477034/ECHONOVA_STUDIO_AURA_203_aypvjb.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769477035/ECHONOVA_STUDIO_AURA_3_dnpm0o.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769477041/ECHONOVA_STUDIO_AURA_14_qkrrql.png",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769477043/ECHONOVA_STUDIO_AURA_21_svwcwc.png",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769477047/ECHONOVA_STUDIO_AURA_32_cumuum.png",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769477049/ECHONOVA_STUDIO_AURA_164_qiitqe.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769477053/ECHONOVA_STUDIO_AURA_169_hargsz.png",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769477057/ECHONOVA_STUDIO_AURA_191_edygtj.png",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769477058/ECHONOVA_STUDIO_AURA_171_mqobec.png",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769477062/ECHONOVA_STUDIO_AURA_8_ft03kr.png",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769477064/ECHONOVA_STUDIO_AURA_184_gq3z1i.png",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769477068/ECHONOVA_STUDIO_AURA_12_raqanc.png",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769477068/ECHONOVA_STUDIO_AURA_15_qrymbo.png"
];

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
  // Image Pool (Saudi Content - Cloudinary)
  const allImages = AURA_IMAGES;

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


