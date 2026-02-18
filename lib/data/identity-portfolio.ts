import archiveData from './archive-data.json';

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
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769574756/ECHONOVA_STUDIO_AURA_17_jvqkbs.png",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769574786/ECHONOVA_STUDIO_AURA_178_i0q1bl.png",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769574791/ECHONOVA_STUDIO_AURA_195_wubd7c.png",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769574750/ECHONOVA_STUDIO_AURA_200_rzxb2d.png",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769574778/ECHONOVA_STUDIO_AURA_197_u2wevh.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769574741/ECHONOVA_STUDIO_AURA_164_xlpefd.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769574792/ECHONOVA_STUDIO_AURA_125_aeqwbm.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769574672/ECHONOVA_STUDIO_AURA_35_v85px8.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769574726/ECHONOVA_STUDIO_AURA_14_yyutb7.png",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769574530/ECHONOVA_STUDIO_AURA_13_gcdi15.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769574504/ECHONOVA_STUDIO_AURA_3_nvrehc.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769574639/ECHONOVA_STUDIO_AURA_2_njydor.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769574636/ECHONOVA_STUDIO_AURA_203_bwzl04.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769574617/ECHONOVA_STUDIO_AURA_170_tavjhc.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769574688/ECHONOVA_STUDIO_AURA_167_ad6hhg.png",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769574501/ECHONOVA_STUDIO_AURA_154_yq7jzx.png",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769574731/ECHONOVA_STUDIO_AURA_136_oy183m.png",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769574727/ECHONOVA_STUDIO_AURA_130_suidry.png",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769574578/ECHONOVA_STUDIO_AURA_123_uzakdd.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769574518/ECHONOVA_STUDIO_AURA_111_jastns.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769574577/ECHONOVA_STUDIO_AURA_102_yolfri.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769574659/ECHONOVA_STUDIO_AURA_100_bmnbad.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769574658/ECHONOVA_STUDIO_AURA_99_a1kuhh.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769574650/ECHONOVA_STUDIO_AURA_90_uopun9.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769574545/ECHONOVA_STUDIO_AURA_85_mmv08v.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769574731/ECHONOVA_STUDIO_AURA_54_jrf3i1.png",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769574653/ECHONOVA_STUDIO_AURA_68_uxtee5.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769574517/ECHONOVA_STUDIO_AURA_71_avq6z0.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769574495/ECHONOVA_STUDIO_AURA_53_mqdzjh.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769574520/ECHONOVA_STUDIO_AURA_42_sqsd9v.jpg"
];

// Export the cloud images for use in other components (e.g., Home Page Carousel)
export const AURA_IMAGES = [
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769574494/ECHONOVA_STUDIO_AURA_49_iqsffa.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769574553/ECHONOVA_STUDIO_AURA_63_z5uwl1.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769574556/ECHONOVA_STUDIO_AURA_65_zqnjwm.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769574559/ECHONOVA_STUDIO_AURA_67_qkureo.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769574688/ECHONOVA_STUDIO_AURA_48_jljx30.png",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769574586/ECHONOVA_STUDIO_AURA_74_iytgao.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769574589/ECHONOVA_STUDIO_AURA_76_cvbogo.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769574590/ECHONOVA_STUDIO_AURA_77_o53gnn.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769574648/ECHONOVA_STUDIO_AURA_83_ybvkbl.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769574497/ECHONOVA_STUDIO_AURA_103_td7qxw.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769574663/ECHONOVA_STUDIO_AURA_106_pveodj.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769574698/ECHONOVA_STUDIO_AURA_114_r9crgx.png",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769574762/ECHONOVA_STUDIO_AURA_25_pxcelg.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769574706/ECHONOVA_STUDIO_AURA_120_lfj2sy.png",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769574714/ECHONOVA_STUDIO_AURA_124_npfpr8.png",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769574580/ECHONOVA_STUDIO_AURA_126_k13dvh.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769574664/ECHONOVA_STUDIO_AURA_133_is0pnr.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769574499/ECHONOVA_STUDIO_AURA_138_qsaypy.png",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769574755/ECHONOVA_STUDIO_AURA_147_cxaife.png",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769574719/ECHONOVA_STUDIO_AURA_149_ggrej6.png",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769574608/ECHONOVA_STUDIO_AURA_155_gqkn6p.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769574718/ECHONOVA_STUDIO_AURA_158_gwdenc.png",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769574689/ECHONOVA_STUDIO_AURA_160_psedhb.png",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769574613/ECHONOVA_STUDIO_AURA_161_qyslyq.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769574710/ECHONOVA_STUDIO_AURA_165_wyplj2.png",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769574636/ECHONOVA_STUDIO_AURA_203_bwzl04.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769574504/ECHONOVA_STUDIO_AURA_3_nvrehc.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769574726/ECHONOVA_STUDIO_AURA_14_yyutb7.png",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769574527/ECHONOVA_STUDIO_AURA_21_n7km2k.png",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769574810/ECHONOVA_STUDIO_AURA_32_dvgmvk.png",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769574741/ECHONOVA_STUDIO_AURA_164_xlpefd.jpg",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769574515/ECHONOVA_STUDIO_AURA_169_tdsjal.png",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769574757/ECHONOVA_STUDIO_AURA_191_wrw4xb.png",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769574812/ECHONOVA_STUDIO_AURA_171_rl88c7.png",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769574519/ECHONOVA_STUDIO_AURA_8_u20zwm.png",
    "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769574522/ECHONOVA_STUDIO_AURA_184_gputhq.png"
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

  // Use imported JSON data from archive-data.json
  const archiveImages = archiveData as string[];

  // Generate 207 Single Items
  archiveImages.forEach((img, index) => {
    // Deterministic random category
    const cat = categories[index % categories.length];
    
    // Deterministic random description
    const desc = descriptions[index % descriptions.length];

    items.push({
      id: `archive-${index + 1}`,
      title: `Identity Series ${index + 1}`,
      type: 'single', // Simplified to singles for the archive
      thumbnail: img,
      items: [
        { type: 'image', url: img, caption: `Display ${index + 1}` },
      ],
      tags: [cat, 'Digital Archive', 'Aura'],
      category: cat,
      description: desc
    });
  });

  return items;
};

export const portfolioItems = generateMockData();
