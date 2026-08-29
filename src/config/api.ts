/**
 * Central API Configuration & Production Deployment Router
 * 
 * Supports seamless deployment on Vercel + Render:
 * - Local Development: Requests to '/api/...' are routed via Vite dev proxy to http://localhost:5000
 * - Production on Vercel: Set VITE_API_BASE_URL in Vercel Environment Variables to your Render backend URL (e.g. https://goldfin-api.onrender.com)
 */

export const API_BASE_URL: string = (
  typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE_URL
    ? import.meta.env.VITE_API_BASE_URL
    : ''
).replace(/\/$/, '')

/**
 * Automatically prefixes '/api/...' endpoints with the Render backend URL in production
 */
if (typeof window !== 'undefined' && API_BASE_URL) {
  const originalFetch = window.fetch
  window.fetch = function (input: RequestInfo | URL, init?: RequestInit) {
    if (typeof input === 'string' && input.startsWith('/api/')) {
      input = `${API_BASE_URL}${input}`
    } else if (typeof input === 'string' && input.startsWith('/api')) {
      input = `${API_BASE_URL}${input}`
    }
    return originalFetch.call(this, input, init)
  }
  console.log(`[API Gateway] Connected to backend: ${API_BASE_URL}`)
}

export function getApiUrl(endpoint: string): string {
  const clean = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  return API_BASE_URL ? `${API_BASE_URL}${clean}` : clean
}
