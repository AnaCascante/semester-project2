export function renderListing() {
  return `
         <header class="flex flex-col items-center justify-center h-screen">
      <h1 class="text-6xl">Bideals</h1>
      <p class="text-2xl">Bid for the Best Deal</p>
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
    </header>
  `
}
