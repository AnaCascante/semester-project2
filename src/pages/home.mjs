import { fetchListings, searchListings } from '../utils/api.mjs'

export async function renderHome() {
  try {
    const { data: listings } = await fetchListings()
    return `
 <div class="p-4 mt-20">
        <h1 class="text-6xl font-bold text-center mb-4 ">Bideals</h1>
        <p class="text-lg text-center mb-6">Bid for the Best Deal</p>
        
        <!-- Search Section -->
        <div class="mb-6">
          <h2 class="text-2xl font-bold mb-4">Search Listings</h2>
          <div class="flex items-center gap-2 mb-4">
            <input
              type="text"
              id="search-input"
              placeholder="Search by title or description"
              class="flex-grow p-2 border rounded bg-white text-black"
            />
            <button
              id="search-button"
              class="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Search
            </button>
          </div>
        </div>

        <!-- Listings Section -->
        <div>
          <h2 class="text-2xl font-bold mb-4">Available Listings</h2>
          <div id="listings" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            ${listings.map(renderListingCard).join('')}
          </div>
        </div>
      </div>
      `
  } catch (error) {
    console.error(error)
    return '<h1>Error fetching listings</h1>'
  }
}

function renderListingCard(listing) {
  const endsAtFormatted = new Date(listing.endsAt).toLocaleDateString()

  return `
    <div class="card p-4 border rounded shadow bg-white text-black">
      <img
        src="${listing.media[0]?.url || 'https://via.placeholder.com/150'}"
        alt="${listing.media[0]?.alt || 'Listing image'}"
        class="w-full h-40 object-cover rounded mb-4"
      />
      <h3 class="font-bold text-lg">${listing.title}</h3>
      <p class="text-sm text-gray-600">Ends: ${endsAtFormatted}</p>
      <p class="text-sm text-gray-600">Bids: ${listing._count.bids}</p>
      <a
        href="/listings/${listing.id}"
        class="text-blue-500 underline mt-2 block text-2xl font-bold"
      >
        View Details
      </a>
    </div>
  `
}

export function setupSearchHandlers() {
  const searchInput = document.querySelector('#search-input')
  const searchButton = document.querySelector('#search-button')
  const listingsContainer = document.querySelector('#listings')

  if (!searchInput || !searchButton || !listingsContainer) {
    console.error('Missing search elements.')
    return
  }

  const handleSearch = async () => {
    const query = searchInput.value.trim()
    if (!query) {
      alert('Please enter a search query.')
      return
    }

    try {
      const { data: searchResults } = await searchListings(query)
      listingsContainer.innerHTML = searchResults
        .map(renderListingCard)
        .join('')
    } catch (error) {
      console.error('Error fetching search results:', error)
      listingsContainer.innerHTML =
        '<p class="text-red-500">Failed to load search results.</p>'
    }
  }

  searchButton.addEventListener('click', handleSearch)

  searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  })
}
