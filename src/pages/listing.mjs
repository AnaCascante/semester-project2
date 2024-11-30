import { fetchApi, isAuthenticated } from '../utils/api.mjs'

export async function renderListing(listingId) {
  try {
    const { data: listing } = await fetchApi(
      `auction/listings/${listingId}?_bids=true&_seller=true`,
    )

    if (!listing) {
      throw new Error('Listing not found')
    }

    const endsAtFormatted = new Date(listing.endsAt).toLocaleDateString()

    const storedUser = localStorage.getItem('user') // Replace 'user' with the actual key you used in localStorage
    if (!storedUser) throw new Error('No user found in localStorage')

    // Parse the user data from JSON
    const user = JSON.parse(storedUser)
    const username = user.name // Ensure the object contains a 'name' property

    // Check if the logged-in user is the seller of the listing
    const isSeller = listing.seller.name === username

    return `
     <div class="container mx-auto mt-16 p-6">
        <div class="flex justify-center">
          <div class="w-full max-w-3xl bg-gray-900 text-white shadow-lg rounded-lg p-6">
            <h1 class="text-4xl font-extrabold text-center mb-6">${listing.title}</h1>
            
            <img
              src="${listing.media[0]?.url || 'https://via.placeholder.com/600x400'}"
              alt="${listing.media[0]?.alt || 'Listing image'}"
              class="w-full h-80 object-cover rounded-xl mb-6"
            />
            
            <div class="space-y-4">
              <p class="text-lg">${listing.description}</p>
              <div class="flex justify-between text-sm text-gray-400">
                <p><strong>Ends At:</strong> ${endsAtFormatted}</p>
                <p><strong>Total Bids:</strong> ${listing._count.bids}</p>
              </div>
            </div>

            <div class="mt-6">
              ${isAuthenticated() ? `
                <!-- Show bid input and button if user is authenticated and not the seller -->
                ${!isSeller ? `
                  <div class="space-y-4">
                    <input
                      type="number"
                      id="bid-input"
                      placeholder="Enter your bid"
                      class="w-full p-3 text-black border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      id="bid-button"
                      class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-200"
                    >
                      Place Bid
                    </button>
                  </div>
                ` : `
                  <p class="text-gray-500 text-center">You cannot bid on your own listing.</p>
                `}
              ` : `
                <p class="text-red-600 text-center">Please log in to place a bid.</p>
                <button
                  id="register-alert-button"
                  class="w-full mt-4 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 transition ease-in-out duration-200"
                >
                  Register Now
                </button>
              `}
            </div>
          </div>
        </div>

        <!-- Bids Section - only visible if user is not the seller and is logged in -->
        ${ 
          !isSeller && isAuthenticated() 
            ? `
              <div class="mt-12 max-w-3xl mx-auto">
                <h2 class="text-2xl font-semibold text-gray-100 mb-4">Bids:</h2>
                ${listing.bids && listing.bids.length > 0 ? `
                  <ul class="space-y-3">
                    ${listing.bids.map(bid => `
                      <li class="flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow-md">
                        <!-- Bid amount -->
                        <span class="text-gray-300 text-sm">Bid: $${bid.amount}</span>
        
                        <!-- Bidder's name with a link to their profile -->
                        <a href="/profile/${bid.bidder.name}" class="text-blue-500 text-sm hover:underline">
                          ${bid.bidder.name}
                        </a>
        
                        <!-- Created date formatted -->
                        <span class="text-gray-500 text-xs">${new Date(bid.created).toLocaleString()}</span>
                      </li>
                    `).join('')}
                  </ul>
                ` : `
                  <p class="text-center text-gray-500">No bids yet.</p>
                `}
              </div>
            `
            : ''
        }        
      </div>
    `
  } catch (error) {
    console.error('Error fetching listing:', error)
    return `<p class="text-red-500">Failed to load listing. Please try again later.</p>`
  }
}

export function setupBidHandlers(listingId) {
  const bidButton = document.querySelector('#bid-button')
  const registerAlertButton = document.querySelector('#register-alert-button')

  if (bidButton) {
    // Bid handler for logged-in users
    bidButton.addEventListener('click', async () => {
      const bidInput = document.querySelector('#bid-input')
      const bidAmount = bidInput.value.trim()

      if (!bidAmount || isNaN(bidAmount) || bidAmount <= 0) {
        alert('Please enter a valid bid amount.')
        return
      }

      try {
        await fetchApi(`auction/listings/${listingId}/bids`, {
          method: 'POST',
          body: JSON.stringify({ amount: parseFloat(bidAmount) }),
        })
        alert('Bid placed successfully!')
        window.location.reload() // Reload the page to show the updated bids
      } catch (error) {
        console.error('Error placing bid:', error)
        alert('Failed to place bid. Please try again.')
      }
    })
  }

  if (registerAlertButton) {
    // Alert and redirect for unauthenticated users
    registerAlertButton.addEventListener('click', () => {
      alert(
        'You need to register to place a bid. Click OK to go to the registration page.',
      )
      window.location.href = '/register'
    })
  }
}
