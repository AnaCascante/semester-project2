/*import { fetchApi } from '../utils/api.mjs'

export function renderProfile() {
  const user = fetchApi('auction/profiles/<name>')
  console.log(user)
  const bids = fetchApi('auction/profiles/<name>/bids')
  const ownListings = fetchApi('auction/profiles/<name>/listings')
  return `
<header class="flex flex-col items-center justify-center h-screen">
      <h1 class="text-6xl">Profile</h1>
      <p class="text-2xl">${data.name}</p>
         <div class="p-4">
      <h1 class="text-2xl font-bold">Welcome, ${user.name}</h1>
      <h2 class="text-xl mt-4">Your Bids:</h2>
      <ul>
        ${bids.map((bid) => `<li>${bid.Title} - $${bid.amount}</li>`).join('')}
      </ul>
    </div>
    </header>
  `
}
*/
