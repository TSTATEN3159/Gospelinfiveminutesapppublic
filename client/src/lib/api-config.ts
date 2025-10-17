/**
 * API Configuration
 * Handles different API base URLs for development vs production (iOS app)
 */

// Get the API base URL from environment variable or use default
const getApiBaseUrl = (): string => {
  // In production (iOS app), use the deployed backend URL
  // In development (Replit), use relative URLs
  const productionUrl = import.meta.env.VITE_API_BASE_URL;
  
  if (productionUrl) {
    return productionUrl;
  }
  
  // Development: relative URLs work because frontend and backend are on same server
  return '';
};

export const API_BASE_URL = getApiBaseUrl();

/**
 * Helper function to create full API URLs
 * @param endpoint - The API endpoint (e.g., '/api/videos')
 * @returns Full URL for the API call
 */
export function apiUrl(endpoint: string): string {
  // Remove leading slash from endpoint if present to avoid double slashes
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  
  if (API_BASE_URL) {
    return `${API_BASE_URL}/${cleanEndpoint}`;
  }
  
  // In development, return relative URL
  return `/${cleanEndpoint}`;
}
