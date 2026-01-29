const fs = require('fs');
const path = require('path');

const data = JSON.parse(fs.readFileSync('archive-data.json', 'utf-8'));

const maleAssets = data.filter(a => a.service_type === 'Male');
const femaleInMale = maleAssets.filter(a => {
    const tags = (a.tags || []).join(' ').toLowerCase();
    return tags.includes('female');
});

console.log(`Total Male Assets: ${maleAssets.length}`);
console.log(`Male assets with 'female' tag: ${femaleInMale.length}`);

if (femaleInMale.length > 0) {
    console.log("Found suspects:");
    femaleInMale.forEach(a => {
        console.log(`- ${a.public_id} [${a.tags.join(', ')}]`);
    });
} else {
    console.log("CLEAN: No 'female' tags found in Male category.");
}
