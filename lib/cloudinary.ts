import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export default cloudinary;

/**
 * Search/List assets from Cloudinary
 * @param query Search query or tag
 * @returns List of assets
 */
export async function searchAssets(query: string = "") {
  try {
    // Basic listing for now, can be enhanced with search API if enabled on plan
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: query, // basic filtering by prefix (folder/name)
      max_results: 10,
    });
    return result.resources;
  } catch (error) {
    console.error("Cloudinary Search Error:", error);
    throw error;
  }
}

/**
 * Get a specific asset by Public ID
 */
export function getAssetUrl(publicId: string) {
    return cloudinary.url(publicId, {
        fetch_format: 'auto',
        quality: 'auto'
    });
}
