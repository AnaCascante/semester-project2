import { fetchAPI, isAuthenticated } from '../utils/api.mjs'

export async function renderProduct(dataId) {
  const product = await fetchAPI(`/products/${dataId}`)
  return `
    <div class="p-4">
      <h1 class="text-2xl font-bold">${data.title}</h1>
      <p>${data.description}</p>
      <p>Starting Bid: $${data.startingBid}</p>
      ${
        isAuthenticated()
          ? `<form id="bid-form">
            <input type="number" name="bid" placeholder="Your Bid" class="border p-2" required />
            <button type="submit" class="bg-blue-500 text-white p-2">Place Bid</button>
           </form>`
          : `<p class="text-red-500">Login to place a bid.</p>`
      }
    </div>
  `
}

export function setupBidForm(dataId) {
  document
    .querySelector('#bid-form')
    ?.addEventListener('submit', async (event) => {
      event.preventDefault()
      const bid = event.target.bid.value
      await fetchAPI(`/auction/listings/${id}/bids`, {
        method: 'POST',
        body: JSON.stringify({ bid }),
      })
      alert('Bid placed successfully!')
      window.location.reload()
    })
}
