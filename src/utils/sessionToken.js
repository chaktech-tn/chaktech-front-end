// Generate unique session token for abandoned checkout tracking
export const generateSessionToken = () => {
  // Use crypto.randomUUID if available (modern browsers)
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  
  // Fallback for older browsers
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

// Get or create session token from localStorage
export const getOrCreateSessionToken = () => {
  if (typeof window === 'undefined') {
    return null;
  }
  
  let sessionToken = localStorage.getItem('checkout_session_token');
  
  if (!sessionToken) {
    sessionToken = generateSessionToken();
    localStorage.setItem('checkout_session_token', sessionToken);
  }
  
  return sessionToken;
};

// Clear session token
export const clearSessionToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('checkout_session_token');
  }
};

