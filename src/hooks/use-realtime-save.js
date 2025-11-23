import { useCallback, useRef } from "react";
import { useSaveCheckoutDataMutation } from "src/redux/features/abandonedCheckout/abandonedCheckoutApi";
import { useSelector } from "react-redux";
import { getOrCreateSessionToken } from "@utils/sessionToken";

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

      try {
        await saveCheckoutData({
          sessionToken,
          cartContents: cart_products || [],
          customerName: formData.name || formData.firstName + " " + formData.lastName || null,
          customerAddress: formData.address || null,
          customerPhone: formData.contact || formData.phone || null,
          customerEmail: formData.email || null,
        }).unwrap();
      } catch (error) {
        // Silently handle errors - don't interrupt user experience
        console.error("Error saving checkout data:", error);
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

