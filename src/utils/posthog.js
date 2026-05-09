/**
 * PostHog Analytics Utility
 * 
 * Centralized PostHog configuration and tracking functions for e-commerce events.
 * This module handles client-side initialization, user identification, and event tracking.
 * 
 * @module utils/posthog
 */

import posthogJs from 'posthog-js';

let posthogInitialized = false;

/**
 * Initialize PostHog on the client-side
 * Should only be called once when the app loads
 * 
 * @returns {void}
 */
export const initPostHog = () => {
  // Only initialize on client-side
  if (typeof window === 'undefined') {
    return;
  }

  // Prevent double initialization
  if (posthogInitialized) {
    return;
  }

  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';

  // Only initialize if API key is provided
  if (!posthogKey) {
    console.warn('PostHog: API key not found. Analytics will not be initialized.');
    return;
  }

  try {
    posthogJs.init(posthogKey, {
      api_host: posthogHost,
      loaded: () => {
        if (process.env.NODE_ENV === 'development') {
          // console.log('PostHog initialized successfully');
        }
      },
      // Enable Session Replay
      session_recording: {
        maskAllInputs: true,
        maskTextSelector: '[data-mask-text]',
        recordCrossOriginIframes: false,
      },
      // Capture pageviews automatically
      capture_pageview: true,
      // Capture pageleave automatically
      capture_pageleave: true,
    });

    posthogInitialized = true;
  } catch (error) {
    console.error('PostHog initialization error:', error);
  }
};

/**
 * Identify a user in PostHog
 * Call this when a user logs in
 * 
 * @param {Object} userData - User data object
 * @param {string} userData.email - User email address
 * @param {string} userData.name - User name
 * @param {string} userData._id - User ID (internal)
 * @returns {void}
 */
export const identifyUser = (userData) => {
  if (typeof window === 'undefined' || !posthogInitialized) {
    return;
  }

  try {
    const { email, name, _id } = userData || {};
    
    if (!_id && !email) {
      console.warn('PostHog: User identification requires at least email or _id');
      return;
    }

    posthogJs.identify(_id || email, {
      email,
      name,
      userId: _id,
    });
  } catch (error) {
    console.error('PostHog identify error:', error);
  }
};

/**
 * Reset user identification in PostHog
 * Call this when a user logs out
 * 
 * @returns {void}
 */
export const resetUser = () => {
  if (typeof window === 'undefined' || !posthogInitialized) {
    return;
  }

  try {
    posthogJs.reset();
  } catch (error) {
    console.error('PostHog reset error:', error);
  }
};

/**
 * Track Product Viewed event
 * Triggered when a single product page loads
 * 
 * @param {Object} product - Product object
 * @param {string} product._id - Product ID
 * @param {string} product.title - Product name
 * @param {number} product.originalPrice - Product price
 * @param {string} product.category - Product category name or object
 * @returns {void}
 */
export const trackProductViewed = (product) => {
  if (typeof window === 'undefined' || !posthogInitialized || !product) {
    return;
  }

  try {
    const categoryName = product.category?.name || product.category || null;
    const currency = 'TND'; // Default, can be updated based on settings

    posthogJs.capture('product_viewed', {
      product_id: product._id,
      product_name: product.title,
      price: product.originalPrice || product.price || 0,
      currency: currency,
      category: categoryName,
      sku: product.sku || null,
      brand: product.brand?.name || null,
      slug: product.slug || null,
    });
  } catch (error) {
    console.error('PostHog trackProductViewed error:', error);
  }
};

/**
 * Track Add to Cart event
 * Triggered when the "Add to Cart" button is clicked
 * 
 * @param {Object} product - Product object
 * @param {string} product._id - Product ID
 * @param {string} product.title - Product name
 * @param {number} product.originalPrice - Product price
 * @param {string} product.category - Product category name or object
 * @param {number} quantity - Quantity added to cart
 * @returns {void}
 */
export const trackAddToCart = (product, quantity = 1) => {
  if (typeof window === 'undefined' || !posthogInitialized || !product) {
    return;
  }

  try {
    const categoryName = product.category?.name || product.category || null;
    const currency = 'TND'; // Default, can be updated based on settings
    const price = product.originalPrice || product.price || 0;

    posthogJs.capture('add_to_cart', {
      product_id: product._id,
      product_name: product.title,
      price: price,
      currency: currency,
      category: categoryName,
      quantity: quantity,
      value: price * quantity,
      sku: product.sku || null,
      brand: product.brand?.name || null,
    });
  } catch (error) {
    console.error('PostHog trackAddToCart error:', error);
  }
};

/**
 * Track View Cart event
 * Triggered when the cart drawer or page is opened
 * 
 * @param {Array} cartItems - Array of cart items
 * @param {number} cartTotal - Total cart value
 * @returns {void}
 */
export const trackViewCart = (cartItems = [], cartTotal = 0) => {
  if (typeof window === 'undefined' || !posthogInitialized) {
    return;
  }

  try {
    const currency = 'TND'; // Default, can be updated based on settings
    const items = cartItems.map(item => ({
      product_id: item._id,
      product_name: item.title,
      price: item.originalPrice || item.price || 0,
      quantity: item.orderQuantity || 1,
      category: item.category?.name || item.category || null,
    }));

    posthogJs.capture('view_cart', {
      items: items,
      total_value: cartTotal,
      currency: currency,
      item_count: cartItems.length,
      total_quantity: cartItems.reduce((sum, item) => sum + (item.orderQuantity || 1), 0),
    });
  } catch (error) {
    console.error('PostHog trackViewCart error:', error);
  }
};

/**
 * Track Begin Checkout event
 * Triggered when the user clicks "Checkout"
 * 
 * @param {Array} cartItems - Array of cart items
 * @param {number} cartTotal - Total cart value
 * @param {string} source - Checkout flow source: 'standard_page' or 'popup' (default: 'standard_page')
 * @returns {void}
 */
export const trackBeginCheckout = (cartItems = [], cartTotal = 0, source = 'standard_page') => {
  if (typeof window === 'undefined' || !posthogInitialized) {
    return;
  }

  try {
    const currency = 'TND'; // Default, can be updated based on settings
    const items = cartItems.map(item => ({
      product_id: item._id,
      product_name: item.title,
      price: item.originalPrice || item.price || 0,
      quantity: item.orderQuantity || 1,
      category: item.category?.name || item.category || null,
    }));

    posthogJs.capture('begin_checkout', {
      items: items,
      total_value: cartTotal,
      currency: currency,
      item_count: cartItems.length,
      total_quantity: cartItems.reduce((sum, item) => sum + (item.orderQuantity || 1), 0),
      checkout_flow: source, // 'standard_page' or 'popup'
    });
  } catch (error) {
    console.error('PostHog trackBeginCheckout error:', error);
  }
};

/**
 * Track Order Completed event (CRITICAL)
 * Triggered after a successful payment
 * MUST include revenue property for income tracking
 * 
 * @param {Object} orderData - Order data object
 * @param {string} orderData._id - Order ID
 * @param {Array} orderData.cart - Cart items array
 * @param {number} orderData.totalAmount - Total order amount (revenue)
 * @param {number} orderData.shippingCost - Shipping cost
 * @param {number} orderData.discount - Discount amount
 * @param {number} orderData.subTotal - Subtotal
 * @param {string} orderData.event_id - Event ID for deduplication reference (same as Meta Pixel/CAPI)
 * @param {string} source - Checkout flow source: 'standard_page' or 'popup' (default: 'standard_page')
 * @returns {void}
 */
export const trackOrderCompleted = (orderData, source = 'standard_page') => {
  if (typeof window === 'undefined' || !posthogInitialized || !orderData) {
    return;
  }

  try {
    const currency = 'TND'; // Default, can be updated based on settings
    const cartItems = orderData.cart || [];
    const items = cartItems.map(item => ({
      product_id: item._id,
      product_name: item.title,
      price: item.originalPrice || item.price || 0,
      quantity: item.orderQuantity || 1,
      category: item.category?.name || item.category || null,
    }));

    // CRITICAL: revenue property is required for income tracking
    const revenue = orderData.totalAmount || orderData.cartTotal || 0;

    // Build event properties
    const eventProperties = {
      order_id: orderData._id || orderData.orderId,
      revenue: revenue, // CRITICAL: Required for income tracking
      currency: currency,
      items: items,
      item_count: cartItems.length,
      total_quantity: cartItems.reduce((sum, item) => sum + (item.orderQuantity || 1), 0),
      shipping_cost: orderData.shippingCost || 0,
      discount: orderData.discount || 0,
      total_amount: revenue,
      subtotal: orderData.subTotal || 0,
      payment_method: orderData.paymentMethod || 'unknown',
      checkout_flow: source, // 'standard_page' or 'popup'
    };

    // Add event_id if provided (for reference/debugging - PostHog doesn't deduplicate, but useful for cross-platform tracking)
    if (orderData.event_id) {
      eventProperties.event_id = orderData.event_id;
    }

    posthogJs.capture('order_completed', eventProperties);
  } catch (error) {
    console.error('PostHog trackOrderCompleted error:', error);
  }
};

/**
 * Track Checkout Step (Granular Funnel Tracking)
 * Track progress inside the checkout form when a user completes specific sections
 * 
 * @param {string} stepName - Name of the checkout step (e.g., 'contact_info_filled', 'shipping_method_selected', 'payment_info_filled')
 * @param {string} source - Checkout flow source: 'standard_page' or 'popup' (default: 'standard_page')
 * @param {Object} additionalData - Optional additional data to include with the event
 * @returns {void}
 */
export const trackCheckoutStep = (stepName, source = 'standard_page', additionalData = {}) => {
  if (typeof window === 'undefined' || !posthogInitialized || !stepName) {
    return;
  }

  try {
    posthogJs.capture('checkout_step_completed', {
      step_name: stepName,
      checkout_flow: source,
      ...additionalData,
    });
  } catch (error) {
    console.error('PostHog trackCheckoutStep error:', error);
  }
};

/**
 * Track Form Error
 * Track validation errors in the checkout form to identify conversion blockers
 * 
 * @param {string} errorMessage - Error message text
 * @param {string} fieldName - Name of the field that caused the error
 * @param {string} source - Checkout flow source: 'standard_page' or 'popup' (default: 'standard_page')
 * @param {Object} additionalData - Optional additional data to include with the event
 * @returns {void}
 */
export const trackFormError = (errorMessage, fieldName, source = 'standard_page', additionalData = {}) => {
  if (typeof window === 'undefined' || !posthogInitialized || !errorMessage) {
    return;
  }

  try {
    posthogJs.capture('checkout_form_error', {
      error_message: errorMessage,
      field_name: fieldName || 'unknown',
      checkout_flow: source,
      ...additionalData,
    });
  } catch (error) {
    console.error('PostHog trackFormError error:', error);
  }
};

/**
 * Get PostHog instance (for advanced usage)
 * 
 * @returns {Object|null} PostHog instance or null
 */
export const getPostHog = () => {
  if (typeof window === 'undefined' || !posthogInitialized) {
    return null;
  }
  return posthogJs;
};

