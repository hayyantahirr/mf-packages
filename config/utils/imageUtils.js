/**
 * Utility functions for optimizing images.
 * Offloads transformation and modern format delivery (AVIF/WebP, quality compression)
 * to Cloudinary CDN without using Vercel Image Optimization compute/limits.
 */

/**
 * Injects f_auto,q_auto transformation into Cloudinary delivery URLs.
 * Leaves local assets (e.g. /logo.webp) and non-Cloudinary URLs untouched.
 *
 * @param {string} url - Image source URL
 * @param {object} [options] - Optional width or crop settings
 * @param {number} [options.width] - Optional max width constraint (e.g. 800)
 * @returns {string} - Optimized URL or original URL
 */
export function getOptimizedImageUrl(url, options = {}) {
  if (!url || typeof url !== "string") return url;

  // Only transform Cloudinary URLs
  if (!url.includes("res.cloudinary.com") || !url.includes("/image/upload/")) {
    return url;
  }

  const uploadMarker = "/image/upload/";
  const uploadIndex = url.indexOf(uploadMarker);
  const prefix = url.slice(0, uploadIndex + uploadMarker.length);
  const suffix = url.slice(uploadIndex + uploadMarker.length);

  // If already transformed with f_auto or q_auto, don't duplicate
  if (suffix.startsWith("f_auto") || suffix.startsWith("q_auto")) {
    return url;
  }

  const transforms = ["f_auto", "q_auto"];
  if (options.width) {
    transforms.push(`w_${options.width}`, "c_limit");
  }

  return `${prefix}${transforms.join(",")}/${suffix}`;
}

/**
 * Maps an array of image URLs through getOptimizedImageUrl.
 *
 * @param {string[]} urls - Array of image URLs
 * @param {object} [options] - Transformation options
 * @returns {string[]} - Array of optimized URLs
 */
export function getOptimizedImageUrls(urls = [], options = {}) {
  if (!Array.isArray(urls)) return [];
  return urls.map((u) => getOptimizedImageUrl(u, options));
}
