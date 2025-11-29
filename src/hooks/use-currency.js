import { useGetSettingsQuery } from "src/redux/features/settingsApi";

/**
 * Hook to get currency settings and format prices
 * @returns {Object} Currency settings and formatting functions
 */
export default function useCurrency() {
  const { data, isLoading } = useGetSettingsQuery();
  
  // Default currency settings
  const defaultSettings = {
    currency: "TND",
    currencySymbol: "TND",
    currencyPosition: "after",
  };
  
  // Merge API data with defaults, ensuring all required fields exist
  const apiSettings = data?.data || {};
  const settings = {
    currency: apiSettings.currency || defaultSettings.currency,
    currencySymbol: apiSettings.currencySymbol || defaultSettings.currencySymbol,
    currencyPosition: apiSettings.currencyPosition || defaultSettings.currencyPosition,
  };

  /**
   * Format a price with currency
   * @param {number} amount - The price amount
   * @param {number} decimals - Number of decimal places (default: 2)
   * @returns {string} Formatted price string
   */
  const formatPrice = (amount, decimals = 2) => {
    const formattedAmount = parseFloat(amount || 0).toFixed(decimals);
    const symbol = settings.currencySymbol || defaultSettings.currencySymbol;
    
    if (settings.currencyPosition === "before") {
      return `${symbol} ${formattedAmount}`;
    } else {
      return `${formattedAmount} ${symbol}`;
    }
  };

  return {
    currency: settings.currency,
    currencySymbol: settings.currencySymbol,
    currencyPosition: settings.currencyPosition,
    formatPrice,
    isLoading,
  };
}

