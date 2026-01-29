
import fs from 'fs';
import path from 'path';

// Define the new categories
const NEW_CATEGORIES = [
  "Feelings",
  "Fashion",
  "Male",
  "Female",
  "Fantasy",
  "Vibes",
  "AD",
  "Product",
  "Animal",
  "Food"
];

// Mapping logic
// Priority order matters. If an image matches multiple, the first one in this list (or custom logic) wins.
// Or we can score them.
// Let's use a keyword matching approach.

// Revised Keyword Map - Stricter
const KEYWORD_MAP: Record<string, string[]> = {
  "Food": ["food", "snacks", "coffee", "drinks", "dining", "fruit", "vegetable"],
  "Animal": ["animal", "birds", "flamingo", "whales", "horse", "falcon", "cat", "dog"],
  "Male": ["male", "man", "men"],
  "Female": ["female", "woman", "women", "girl"],
  "Fantasy": ["imaginary", "art", "surreal", "space", "scifi", "dragon"],
  "Fashion": ["fashion", "apparel", "clothing", "bags", "luxury", "sunglasses", "fashion_apparel"], // Removed "models"
  "Product": ["product", "gadget", "chair", "furniture", "perfume", "bottle"],
  "Feelings": ["anger", "sadness", "joy", "happy", "mood", "emotional", "portrait"],
  "Vibes": ["vibes", "lifestyle", "urban", "nature", "abstract", "cinematic"],
  "AD": ["commercial", "advertising", "promo"]
};

const DATA_PATH = path.join(process.cwd(), 'archive-data.json');

async function reclassify() {
  const rawData = fs.readFileSync(DATA_PATH, 'utf-8');
  const assets = JSON.parse(rawData);
  
  let updatedCount = 0;

  const updatedAssets = assets.map((asset: any) => {
    // We strictly look at tags now, as user emphasized "metadata Collection" (tags)
    const tags = (asset.tags || []).map((t: string) => t.toLowerCase());
    
    // We treat tags as the primary source.
    const keywords = tags.join(" "); // Only tags, ignore old service_type to avoid feedback loop
    
    let bestCategory = "Vibes"; // Default fallback
    let found = false;

    // Revised Priority based on Specificity
    // 1. Food/Animal/AD/Product are very distinct physical subjects
    // 2. Gender (Male/Female)
    // 3. Abstract/Style (Fantasy, Fashion, Vibes)
    
    // User requested order: feelings - fashion - male - female - fantasy - vibes - ad - product - animal - food
    // But for classification correctness, we must pick the most specific trait.
    // e.g. A "Female" model with "Snacks" -> User likely wants "Food"? Or "Female"?
    // "Snacks" implies the *context* is food. "Female" is just the subject.
    // Let's stick to Specific > Generic.

    const PRIORITY_ORDER = [
        "Food",      // snacks, dining
        "Animal",    // birds, etc
        "Product",   // gadgets, bottles (distinct from food?)
        "AD",        // commercial
        "Fantasy",   // imaginary, art
        "Fashion",   // fashion_apparel, bags
        "Feelings",  // specific emotions
        "Male",      // gender
        "Female",    // gender
        "Vibes"      // lifestyle, urban (broadest)
    ];

    for (const cat of PRIORITY_ORDER) {
        const matchWords = KEYWORD_MAP[cat];
        // Check for exact word match in tags (e.g. "fashion_apparel" matches "fashion" in includes check? No, keyword map has "fashion_apparel")
        // "keywords" string check includes partial matches, but the map has distinct tokens relative to tag usage.
        if (matchWords.some(w => keywords.includes(w))) {
             bestCategory = cat;
             found = true;
             break;
        }
    }
    
    // Override logic for specific overlaps if needed?
    // e.g. "portrait" -> Feelings. But if it also has "female"? 
    // "Feelings" is higher priority than "Female" in my list above.
    
    if (asset.service_type !== bestCategory) {
        asset.service_type = bestCategory; 
        updatedCount++;
    }
    
    return asset;
  });

  fs.writeFileSync(DATA_PATH, JSON.stringify(updatedAssets, null, 2));
  console.log(`Reclassification complete. Updated ${updatedCount} assets.`);
  
  // Also log distribution
  const distribution: Record<string, number> = {};
  updatedAssets.forEach((a: any) => {
      distribution[a.service_type] = (distribution[a.service_type] || 0) + 1;
  });
  console.log("New Distribution:", distribution);
}

reclassify();
