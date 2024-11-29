import { fetchApi, isAuthenticated } from '../utils/api.mjs'

export async function renderListing(listingId) {
  try {
    const { data: listing } = await fetchApi(
      `auction/listings/${listingId}?_bids=true&_seller=true`,
    )
    const endsAtFormatted = new Date(listing.endsAt).toLocaleDateString()

    return `
    <div class="container mx-auto mt-20 p-4">
      <h1 class="text-3xl font-bold mb-6 text-center">${listing.title}</h1>
      <div class="card p-6 border rounded-lg shadow-lg bg-white">
        <img
          src="${listing.media[0]?.url || 'https://via.placeholder.com/150'}"
          alt="${listing.media[0]?.alt || 'Listing image'}"
          class="w-full h-60 object-cover rounded mb-4"
        />
        <p class="text-sm">${listing.description}</p>
        <p class="text-sm text-black">Ends At: ${endsAtFormatted}</p>
        <p class="text-sm text-black">Total Bids: ${listing._count.bids}</p>

        ${
          isAuthenticated()
            ? `
            <div class="mt-4">
              <input
                type="number"
                id="bid-input"
                placeholder="Enter your bid"
                class="w-full p-2 border rounded mb-2 bg-white text-black"
              />
              <button
                id="bid-button"
                class="bg-gray-500 text-white py-2 px-4 rounded w-full"
              >
                Place Bid
              </button>
            </div>
            `
            : `
            <p class="text-red-500 mt-4">Login to place a bid.</p>
            <button
              id="register-alert-button"
              class="bg-green-500 text-white py-2 px-4 rounded w-full mt-4"
            >
              Register Now
            </button>
            `
        }
      </div>
      <div class="mt-4">
        <h2 class="text-xl font-bold">Bids:</h2>
        ${
          listing.bids && listing.bids.length > 0
            ? `
          <ul>
            ${listing.bids
              .map(
                (bid) =>
                  `<li class="text-sm text-gray-600">Bid: $${bid.amount}</li>`,
              )
              .join('')}
          </ul>
        `
            : `<p>No bids yet.</p>`
        }
      </div>
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
