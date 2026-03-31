/**
 * Utility functions for currency conversion and formatting.
 */

export const currencies = [
  { code: "PKR", symbol: "Rs.", flag: "🇵🇰" },
  { code: "USD", symbol: "$", flag: "🇺🇸" },
  { code: "CNY", symbol: "¥", flag: "🇨🇳" },
  { code: "GBP", symbol: "£", flag: "🇬🇧" },
  { code: "EUR", symbol: "€", flag: "🇪🇺" },
];

/**
 * Converts a price from PKR to the target currency.
 * @param {number} amountInPKR - The price in PKR.
 * @param {string} targetCurrency - The currency code (USD, CNY, etc.).
 * @param {object} rates - The conversion rates from Redux.
 * @returns {number} - Converted and rounded price.
 */
export const convertPrice = (amountInPKR, targetCurrency, rates) => {
  if (!rates || !rates[targetCurrency]) return amountInPKR;
  const rate = rates[targetCurrency];
  return parseFloat((amountInPKR * rate).toFixed(2));
};

/**
 * Formats a converted price with its symbol.
 * @param {number} amount - The converted amount.
 * @param {string} currencyCode - The currency code.
 * @returns {string} - Formatted string (e.g., "$ 10.00").
 */
export const formatPrice = (amount, currencyCode) => {
  const currency = currencies.find((c) => c.code === currencyCode);
  const symbol = currency ? currency.symbol : currencyCode;
  
  return `${symbol} ${amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};
