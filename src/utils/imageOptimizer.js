// Converts a raw Firebase Storage URL into a clean, SEO-friendly local URL.

export const getOptimizedImageUrl = (firebaseUrl) => {
  if (!firebaseUrl) return "";

  // if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
  //   return firebaseUrl;
  // }

  // if (!firebaseUrl.includes("firebasestorage.googleapis.com")) {
  //   return firebaseUrl;
  // }

  try {
    const urlObj = new URL(firebaseUrl);
    const path = urlObj.pathname.split("/o/")[1]; 
    
    return `/cdn/${path}`;
  } catch (error) {
    console.error("Error optimizing image URL:", error);
    return firebaseUrl; // Fallback to original
  }
};