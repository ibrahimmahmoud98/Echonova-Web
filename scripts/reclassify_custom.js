const fs = require('fs');
const path = require('path');

const ARCHIVE_PATH = path.join(__dirname, '../archive-data.json');

const CATEGORIES = {
    "Food": ["food", "snacks", "coffee", "drinks", "dining", "fruit", "vegetable"],
    "Animals": ["animal", "birds", "flamingo", "whales", "horse", "falcon", "cat", "dog"],
    "Ads": ["commercial", "advertising", "promo", "ad", "advertisement"],
    "Products": ["product", "gadget", "chair", "furniture", "perfume", "bottle"],
    "Fashion": ["fashion", "apparel", "clothing", "bags", "luxury", "sunglasses", "fashion_apparel"],
    "Fantasy": ["imaginary", "art", "surreal", "space", "scifi", "dragon"],
    "Feelings": ["anger", "sadness", "joy", "happy", "mood", "emotional", "portrait"],
    "Male": ["male", "man", "men"],
    "Female": ["female", "woman", "women", "girl"],
    "Vibes": ["vibes", "lifestyle", "urban", "nature", "abstract", "cinematic"] // Catch-all-ish
};

// Priority Order (check distinct ones first)
const PRIORITY = [
    "Feelings", // User requested to rely on metadata "as is"
    "Ads",      // User requested to include "advertisement"
    "Food",
    "Animals",
    "Products",
    "Fashion",
    "Fantasy",
    "Female",
    "Male",
    "Vibes"
];

function reclassify() {
    console.log(`Reading archive data from ${ARCHIVE_PATH}...`);
    
    if (!fs.existsSync(ARCHIVE_PATH)) {
        console.error("Archive file not found!");
        return;
    }

    const data = JSON.parse(fs.readFileSync(ARCHIVE_PATH, 'utf-8'));
    let changes = 0;

    const updatedData = data.map(asset => {
        const tags = (asset.tags || []).map(t => t.toLowerCase());
        let newCategory = "Vibes"; // Default

        // 1. RESPECT METADATA: If 'feelings' or 'vibes' is in tags from Cloudinary, prioritizing them as requested.
        // User explicitly said: "Feelings and Vibes exist in metadata... rely on them as they are".
        // Use strict check for these specific known metadata values.
        if (tags.includes('feelings')) {
             newCategory = 'Feelings';
        } else if (tags.includes('vibes') && !tags.some(t => ['male','female'].includes(t))) {
             // 'vibes' is often a secondary tag. If it's ALONE or with non-gender tags, keep it. 
             // But if it has gender, usually gender wins in normal flow.
             // However, user said "rely on them as they are". 
             // Let's stick to the priority list but ensure 'Vibes' and 'Feelings' tags are caught if they are the INTENDED primary.
             // Actually, if 'Feelings' is present, it should likely win.
             // If 'Vibes' is present, it's the catch-all, but let's see.
             newCategory = 'Vibes';
        }

        // 2. Standard Priority Logic (Overwrites defaults if a higher priority match is found)
        // We iterate through priority list. 
        for (const cat of PRIORITY) {
             // Specialized check for ADs to include 'advertisement' exact match case or substring if needed
             const keywords = CATEGORIES[cat];
             
             // If we already established it's Feelings (high priority in user mind), do we let it be overwritten?
             // 'Feelings' is in the priority list. So the loop will handle it naturally IF we order it right.
             // The loop below will find the *first* matching category in PRIORITY order.
             
             if (tags.some(tag => keywords.some(k => {
                const parts = tag.split(/[\s_-]+/);
                return parts.includes(k);
            }))) {
                newCategory = cat;
                break;
            }
        }

        if (asset.service_type !== newCategory) {
            console.log(`[${asset.public_id}] Changed: ${asset.service_type} -> ${newCategory} (Tags: ${tags.join(', ')})`);
            asset.service_type = newCategory;
            changes++;
        }

        return asset;
    });

    console.log(`\nReclassification complete. ${changes} assets updated.`);
    
    fs.writeFileSync(ARCHIVE_PATH, JSON.stringify(updatedData, null, 2));
    console.log("Archive data saved.");
}

reclassify();
