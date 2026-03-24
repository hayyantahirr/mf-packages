/**
 * Calculates the base unit price based on the selected quantity.
 * 
 * Tiers:
 * - Tier 1 (Quantity < 100): Original Price
 * - Tier 2 (100 ≤ Quantity < 500): Original Price - 2
 * - Tier 3 (500 ≤ Quantity < 1000): Original Price - 3
 * - Tier 4 (Quantity ≥ 1000): Original Price - 3 (Same as Tier 3)
 * 
 * @param {number} quantity - The selected quantity
 * @param {number} originalPrice - The base original price before discounts
 * @returns {number} The calculated tiered price
 */
export const calculateTieredPrice = (quantity, originalPrice) => {
  const price = parseFloat(originalPrice) || 0;
  const qty = parseInt(quantity) || 0;

  if (qty <=   100) {
    return price;
  } else if (qty <= 500) {
    return price - 2;
  } else {
    // 500 and above get the Tier 3 discount
    return price - 3;
  }
};
