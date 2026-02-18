export default function cloudinaryLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  const params = ['f_auto', 'c_limit', `w_${width}`, `q_${quality || 'auto'}`];
  
  // If it's already a Cloudinary URL, inject params properly
  if (src.includes('res.cloudinary.com')) {
    const [baseUrl, imagePath] = src.split('/upload/');
    if (imagePath) {
        return `${baseUrl}/upload/${params.join(',')}/${imagePath}`;
    }
  }

  // Fallback or local images (though typically not used with this loader)
  return src;
}
