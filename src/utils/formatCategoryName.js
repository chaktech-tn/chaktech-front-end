/**
 * Format category name to title case
 * Handles special cases like "&" and common words
 * @param {string} name - The category name to format
 * @returns {string} Formatted category name
 */
export function formatCategoryName(name) {
  if (!name) return '';
  
  // Convert to lowercase first and trim
  const lowercased = name.toLowerCase().trim();
  
  // Split by spaces and "&" separately, preserving them
  // This regex splits on spaces but keeps "&" as separate tokens
  const parts = lowercased.split(/(\s+|\s*&\s*)/);
  
  // Format each part
  const formatted = parts.map((part) => {
    const trimmed = part.trim();
    
    // Skip empty strings
    if (!trimmed) return part;
    
    // Keep "&" as is (with spaces around it)
    if (trimmed === '&') return ' & ';
    
    // Capitalize first letter of each word
    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
  });
  
  return formatted.join('').replace(/\s+/g, ' ').trim();
}

