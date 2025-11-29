import { useCallback, useRef } from "react";
import { useSelector } from "react-redux";

import { getOrCreateSessionToken } from "@utils/sessionToken";
import { useSaveCheckoutDataMutation } from "src/redux/features/abandonedCheckout/abandonedCheckoutApi";

// Debounce utility
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const useRealtimeSave = () => {
  const [saveCheckoutData] = useSaveCheckoutDataMutation();
  const { cart_products } = useSelector((state) => state.cart);
  const debouncedSaveRef = useRef(null);

  const saveCheckoutDataToServer = useCallback(
    async (formData) => {
      const sessionToken = getOrCreateSessionToken();

      if (!sessionToken) {
        return;
      }

      // Build customer name from firstName and lastName if name is not provided
      let customerName = formData.name || null;
      if (!customerName && formData.firstName && formData.lastName) {
        customerName = `${formData.firstName} ${formData.lastName}`;
      } else if (!customerName && formData.firstName) {
        customerName = formData.firstName;
      }

      try {
        await saveCheckoutData({
          sessionToken,
          cartContents: cart_products || [],
          customerName: customerName,
          customerAddress: formData.address || null,
          customerPhone: formData.contact || formData.phone || null,
          customerEmail: formData.email || null,
        }).unwrap();
      } catch (error) {
        // Silently handle errors - don't interrupt user experience
        // RTK Query errors have a specific structure
        const errorMessage = error?.data?.message || error?.message || "Unknown error";
        const errorStatus = error?.status || "N/A";
        
        // Only log in development to avoid console noise in production
        if (process.env.NODE_ENV === 'development') {
          console.error("Error saving checkout data:", {
            message: errorMessage,
            status: errorStatus,
            error: error
          });
        }
      }
    },
    [saveCheckoutData, cart_products]
  );

  // Create debounced save function
  if (!debouncedSaveRef.current) {
    debouncedSaveRef.current = debounce(saveCheckoutDataToServer, 1000); // 1 second debounce
  }

  return {
    saveCheckoutData: debouncedSaveRef.current,
  };
};

export default useRealtimeSave;

