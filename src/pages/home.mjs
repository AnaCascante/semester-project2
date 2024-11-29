import { fetchApi } from '../utils/api.mjs'

export function renderHome() {
  const data = fetchApi('auction/listings')
  console.log(data)
  return `
    <div class="flex flex-col items-center justify-center h-screen">
      <h1 class="text-6xl">Bideals</h1>
      <p class="text-2xl">Bid for the Best Deal</p>
        
    </div>
    
  
  `
}

/* this has to go inside the return <div class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      ${data
        .map(
          (data) => `
        <div class="card bg-white p-4 rounded shadow">
          <h2 class="font-bold">${data.title}</h2>
          <p>${data.description}</p>
          <a href="/product/${data.id}" class="text-blue-500">View More</a>
        </div>
      `,
        )
        .join('')}
    </div> */
