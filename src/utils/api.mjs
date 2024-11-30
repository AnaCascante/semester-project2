const API_KEY = import.meta.env.VITE_API_KEY
const API_URL = import.meta.env.VITE_API_URL

export async function fetchApi(endpoint, options = {}) {
  const headers = {
    ...options.headers,
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
    'X-Noroff-API-Key': API_KEY,
  }

  const response = await fetch(`${API_URL}/${endpoint}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    let data = await response.json()

    return { message: data.errors[0].message, success: false, statusCode: data.statusCode }
  }

  const data = await response.json()

  return data
}

export function isAuthenticated() {
  return !!localStorage.getItem('token')
}

export async function searchListings(query) {
  const response = await fetchApi(`auction/listings/search?q=${query}`)
  return response
  console.log("🚀 ~ searchListings ~ response:", response)
}

export async function fetchListings() {
  return await fetchApi('auction/listings?_active=true')
}

export async function fetchListingById(id) {
  return await fetchApi(`auction/listings/${id}`)
}
