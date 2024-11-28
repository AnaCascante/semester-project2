const API_KEY = import.meta.env.VITE_API_KEY
const API_URL = import.meta.env.VITE_API_URL

export async function fetchAPI(endpoint, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
    ...options.headers,
  }

  const response = await fetch(`${API_URL}${endpoint}`, { ...options, headers })
  if (!response.ok) throw new Error(`Error: ${response.status}`)
  return response.json()
}

export function isAuthenticated() {
  return !!localStorage.getItem('token')
}
