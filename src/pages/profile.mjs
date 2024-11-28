export function renderProfile() {
  return `
    <h1>Profile</h1>
    <p>Welcome to the profile page!</p>
  `
}

import { fetchAPI } from '../utils/api.mjs'

export async function renderProfile() {
  const user = await fetchAPI('/auction/profiles/<name>')
  const ownListings = await fetchAPI('/auction/profiles/<name>/listings')
  const bids = await fetchAPI('/auction/profiles/<name>/bids')
  return `
    <div class="p-4">
      <h1 class="text-2xl font-bold">Welcome, ${user.name}</h1>
      <h2 class="text-xl mt-4">Your Bids:</h2>
      <ul>
        ${bids.map((bid) => `<li>${bid.dataTitle} - $${bid.amount}</li>`).join('')}
      </ul>
    </div>
  `
}
