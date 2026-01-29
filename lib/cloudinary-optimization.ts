export const optimizeCloudinaryUrl = (url: string, width: number = 800) => {
  if (!url || !url.includes('cloudinary.com')) return url;
  
  // Split URL to inject transformations
  // format: https://res.cloudinary.com/<cloud_name>/image/upload/<transformations>/<version>/<public_id>
  // We want to insert 'f_auto,q_auto,w_<width>' before the version part
  
  try {
    const parts = url.split('/upload/');
    if (parts.length !== 2) return url;
    
    const baseUrl = parts[0] + '/upload';
    const rest = parts[1];
    
    // Check if there are already transformations (if rest doesn't start with v\d+)
    // But for simplicity, we just preach our optimizations.
    // Standard pattern is `f_auto,q_auto,w_${width}`
    
    return `${baseUrl}/f_auto,q_auto,w_${width}/${rest}`;
  } catch (e) {
    return url;
  }
};
