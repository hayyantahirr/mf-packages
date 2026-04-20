/**
 * Calculates the base unit price based on the selected quantity.
 * 
 * Logic:
 * 1. If useTieredPricing is enabled and a manual price exists for the quantity, use it.
 * 2. Otherwise, fall back to the legacy hardcoded logic:
 *    - Quantity 50: price + 2
 *    - Quantity 500: price - 2
 *    - Quantity 1000: price - 3
 *    - Default (100 or others): original price
 * 
 * @param {number} quantity - The selected quantity
 * @param {number} originalPrice - The base original price
 * @param {boolean} useTieredPricing - Whether manual tiered pricing is enabled
 * @param {Object} tieredPrices - Manual tiered prices map { "50": X, "100": Y, "500": Z, "1000": A }
 * @returns {number} The calculated unit price
 */
export const calculateTieredPrice = (quantity, originalPrice, useTieredPricing = false, tieredPrices = null) => {
  const price = parseFloat(originalPrice) || 0;
  const qty = parseInt(quantity) || 0;

  // 1. Check for manual tiered pricing override
  if (useTieredPricing && tieredPrices) {
    const manualPrice = tieredPrices[qty] || tieredPrices[qty.toString()];
    if (manualPrice !== undefined && manualPrice !== null && manualPrice !== 0) {
      return parseFloat(manualPrice);
    }
  }

  // 2. Fallback to legacy hardcoded logic
  if (qty === 50) {
    return price + 2;
  } else if (qty === 500) {
    return price - 2;
  } else if (qty === 1000) {
    return price - 3;
  }
  
  // Default for 100 or any other quantity
  return price;
};
