const API_KEY = import.meta.env.VITE_API_KEY
const API_URL = import.meta.env.VITE_API_URL

export async function fetchApi(endpoint, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
    ...options.headers,
  }

  const response = await fetch(`${API_URL}/${endpoint}`, {
    ...options,
    headers,
  })
  if (!response.ok) throw new Error(response.status)

  const data = await response.json()
  return data
}

export function isAuthenticated() {
  return !!localStorage.getItem('token')
}

export async function searchListings(query) {
  return await fetchApi(
    `auction/listings/search?q=${encodeURIComponent(query)}`,
  )
}

export async function fetchListings() {
  return await fetchApi('auction/listings')
}

export async function fetchListingById(id) {
  return await fetchApi(`auction/listings/${id}`)
}
