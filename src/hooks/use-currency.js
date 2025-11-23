import { useGetSettingsQuery } from "src/redux/features/settingsApi";

/**
 * Hook to get currency settings and format prices
 * @returns {Object} Currency settings and formatting functions
 */
export default function useCurrency() {
  const { data, isLoading, isError } = useGetSettingsQuery();
  
  // Fallback to default TND if API fails or is loading
  const settings = data?.data || {
    currency: "TND",
    currencySymbol: "TND",
    currencyPosition: "after",
  };

  /**
   * Format a price with currency
   * @param {number} amount - The price amount
   * @param {number} decimals - Number of decimal places (default: 2)
   * @returns {string} Formatted price string
   */
  const formatPrice = (amount, decimals = 2) => {
    const formattedAmount = parseFloat(amount || 0).toFixed(decimals);
    
    if (settings.currencyPosition === "before") {
      return `${settings.currencySymbol} ${formattedAmount}`;
    } else {
      return `${formattedAmount} ${settings.currencySymbol}`;
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

