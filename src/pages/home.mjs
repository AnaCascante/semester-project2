export function renderHome() {
  return `
     <div class="flex flex-col items-center justify-center h-screen">
      <h1 class="text-6xl">Bideals</h1>
      <p class="text-2xl">Bid for the Best Deal</p>
      <div class="p-4">
      <h1 class="text-2xl font-bold mb-4">Search Listings</h1>
      <div class="mb-4">
        <input
          type="text"
          id="search-input"
          placeholder="Search by title or description"
          class="w-full p-2 border rounded mb-2 bg-white text-black"
        />
        <button
          id="search-button"
          class="bg-blue-500 text-white py-2 px-4 rounded w-full"
        >
          Search
        </button>
      </div>

    </div>
  `
}

/*  this has to be added after the search input and button- its the function that will render the listings
 <div id="listings" class="grid grid-cols-1 md:grid-cols-3 gap-4">
${listings.map(renderListingCard).join('')}
</div> */

function renderListingCard(listing) {
  return `
    <div class="card p-4 border rounded shadow">
      <h2 class="font-bold">${listing.title}</h2>
      <p>${listing.description}</p>
      <a href="/listing/${listing.id}" class="text-blue-500">View More</a>
    </div>
  `
}

export function setupSearchHandlers() {
  const searchInput = document.querySelector('#search-input')
  const searchButton = document.querySelector('#search-button')
  const listingsContainer = document.querySelector('#listings')

  const handleSearch = async () => {
    const query = searchInput.value.trim()
    if (!query) {
      alert('Please enter a search query.')
      return
    }

    try {
      const searchResults = await fetchAPI(
        `/auction/listings/search?q=${query}`,
      )
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
