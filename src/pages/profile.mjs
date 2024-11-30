import { fetchApi, isAuthenticated } from '../utils/api.mjs'

export async function renderProfile(name) {
  if (!isAuthenticated()) {
    return `<p class="text-red-500">Please log in to view your profile.</p>`
  }

  try {
    // Build the API URL using the username
    const { data: userData } = await fetchApi(
      `auction/profiles/${name}?_bids=true&_listings=true`,
    ) // Fetch user data with bids and listings

    const { data: userDataBids } = await fetchApi(
      `auction/profiles/${name}/bids?_listings=true`,
    ) // Fetch user data with bids and listings
    
    console.log("🚀 ~ renderProfile ~ userDataBids:", userDataBids)
      

    if (!userData) {
      return `<p class="text-red-500">User not found.</p>`
    }

    // Retrieve the user from localStorage
    const storedUser = localStorage.getItem('user') // Replace 'user' with the actual key you used in localStorage
    if (!storedUser) throw new Error('No user found in localStorage')

    // Parse the user data from JSON
    const user = JSON.parse(storedUser)
    const username = user.name // Ensure the object contains a 'name' property

    const isCurrentUser = name === username

    if (isCurrentUser && userData) {
      localStorage.setItem('user', JSON.stringify(userData))
    }

    return `
    <div class="min-h-screen bg-black text-white flex flex-col items-center p-4">
      <!-- Banner Section -->
      <div class="relative w-full max-w-6xl rounded-lg mb-12">
        <img
          src="${userData.banner?.url || 'https://via.placeholder.com/600x200'}"
          alt="${userData.banner?.alt || 'User banner'}"
          class="w-full h-64 object-cover rounded-lg"
        />
        <!-- Avatar -->
        <div class="absolute bottom-[-48px] left-1/2 transform -translate-x-1/2">
          <img
            src="${userData.avatar?.url || 'https://via.placeholder.com/150'}"
            alt="${userData.avatar?.alt || 'User avatar'}"
            class="w-32 h-32 rounded-full object-cover border-4 border-yellow-400 shadow-lg"
          />
        </div>
      </div>
    
      <!-- Profile Section -->
      <div class="flex justify-between items-center mt-4 w-full max-w-6xl mb-12">
        <!-- User Info -->
        <div class="space-y-1">
          <h1 class="text-5xl font-extrabold text-white mb-1">
            ${userData.name || 'User Name'}
          </h1>
          <p class="text-xl text-yellow-400">${userData.email || 'User Email'}</p>
        </div>
    
        <div class="flex items-center justify-end gap-2">
          <p
            class="px-4 py-2 text-sm font-medium rounded-lg shadow-md bg-gray-600 text-gray-200"
          >
            Total Listings: ${userData._count.listings || 0}
          </p>

          <p
            class="px-4 py-2 text-sm font-medium rounded-lg shadow-md bg-gray-600 text-gray-200"
          >
            Total Wins: ${userData._count.wins || 0}
          </p>

          <p
            class="px-4 py-2 text-sm font-medium rounded-lg shadow-md bg-gray-600 text-gray-200"
          >
            Credits: ${userData.credits || 0}
          </p>

          ${isCurrentUser ? `
            <button
              id="edit-avatar-button"
              class="px-4 py-2 text-sm font-medium rounded-lg shadow-md bg-blue-600 text-blue-100 hover:bg-blue-700 transition"
            >
              Edit avatar
            </button>
          ` : ''}
        </div>
      </div>

      <!-- Listings Section -->
      <div class="w-full max-w-6xl">
        <h2 class="text-3xl font-bold mb-6 text-center">Your Listings</h2>
        ${
          userData.listings && userData.listings.length > 0
            ? `
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              ${userData.listings
                .map(
                  (listing) => `
                  <div class="bg-gray-800 rounded-lg shadow-lg p-4">
                    <a href="/listings/${listing.id}" class="block">
                      <img
                        src="${listing.media?.[0]?.url || 'https://via.placeholder.com/300'}"
                        alt="${listing.media?.[0]?.alt || 'Listing image'}"
                        class="w-full h-48 object-cover rounded-lg mb-4"
                      />
                      <h3 class="text-xl font-bold mb-2">${listing.title}</h3>
                      <p class="text-sm text-gray-400 mb-4">
                        Ends At: ${new Date(listing.endsAt).toLocaleDateString()}
                      </p>
                    </a>
                  </div>
                `,
                )
                .join('')}
            </div>
          `
            : `
            <p class="text-gray-500 text-center">You haven't created any listings yet.</p>
          `
        }
        ${
          isCurrentUser ? `
          <div class="mt-4 text-center">
            <a
              href="/create/listing"
              class="inline-block bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-200"
            >
              Create Your First Listing
            </a>
          </div>
          ` : ''
        }
      </div>
    
      <!-- Wins Section -->
      <div class="w-full max-w-6xl mt-12">
        <h2 class="text-3xl font-bold mb-6 text-center">Wins</h2>
        ${
          userData.wins && userData.wins.length > 0
            ? `
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              ${userData.wins
                .map(
                  (win) => `
                  <div class="bg-gray-800 rounded-lg shadow-lg p-4">
                    <a href="/listings/${win.id}" class="block">
                      <img
                        src="${win.media?.[0]?.url || 'https://via.placeholder.com/300'}"
                        alt="${win.media?.[0]?.alt || 'Listing image'}"
                        class="w-full h-48 object-cover rounded-lg mb-4"
                      />
                      <h3 class="text-xl font-bold mb-2">${win.title}</h3>
                      <p class="text-sm text-gray-400 mb-4">
                        Won on: ${new Date(win.created).toLocaleDateString()}
                      </p>
                    </a>
                  </div>
                `,
                )
                .join('')}
            </div>
          `
            : `
            <p class="text-gray-500 text-center">No wins yet.</p>
          `
        }
      </div>
        
      <!-- Placeholder for Bids Section -->
      <div class="w-full max-w-6xl mt-12">
        <h2 class="text-3xl font-bold mb-6 text-center">Bids</h2>
        ${
          userDataBids && userDataBids.length > 0
            ? `
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              ${userDataBids
                .map(
                  (bid) => `
                  <a href="/listings/${bid.listing.id}" class="block">
                    <div class="bg-gray-800 rounded-lg shadow-lg p-4">
                      <!-- Listing Image -->
                      ${
                        bid.listing.media && bid.listing.media.length > 0
                          ? `
                        <img
                          src="${bid.listing.media[0].url}"
                          alt="${bid.listing.media[0].alt || 'Listing image'}"
                          class="w-full h-48 object-cover rounded-lg mb-4"
                        />
                        `
                          : ''
                      }
                      <!-- Listing Title -->
                      <h3 class="text-xl font-bold mb-2">${bid.listing.title}</h3>
                      <!-- Bid Amount -->
                       ${
                  isCurrentUser
                    ? `<p class="text-sm text-gray-400">You bid: $${bid.amount}</p>`
                    : `<p class="text-sm text-gray-400">Bid: $${bid.amount}</p>`
                }
                      <!-- Listing Ends At -->
                      <p class="text-sm text-gray-400">
                        Ends At: ${new Date(bid.listing.endsAt).toLocaleDateString()}
                      </p>
                    </div>
                  </a>
                `,
                )
                .join('')}
            </div>
            `
            : `
            <p class="text-gray-500 text-center">No bids to show yet.</p>
            `
        }
      </div>
    </div>
    `
  } catch (error) {
    console.error('Error fetching profile:', error)
    return `<p class="text-red-500">Failed to load profile. Please try again later.</p>`
  }
}

export function setupProfileHandlers() {
  const editAvatarButton = document.querySelector('#edit-avatar-button')
  console.log("🚀 ~ setupProfileHandlers ~ editAvatarButton:", editAvatarButton)

  if (editAvatarButton) {
    editAvatarButton.addEventListener('click', () => {
      const newAvatar = prompt('Enter the URL for your new avatar:')
      if (newAvatar) {
        updateAvatar(newAvatar)
      }
    })
  }
}

async function updateAvatar(newAvatar) {
  try {
    // Retrieve the user from localStorage
    const storedUser = localStorage.getItem('user') // Replace 'user' with the actual key you used in localStorage
    if (!storedUser) throw new Error('No user found in localStorage')

    // Parse the user data from JSON
    const user = JSON.parse(storedUser)
    const username = user.name // Ensure the object contains a 'name' property

    const userUpdated = await fetchApi(`social/profiles/${username}`, {
      method: 'PUT',
      body: JSON.stringify({ avatar: { url: newAvatar } }),
    })

    // set user
    localStorage.setItem('user', JSON.stringify(userUpdated.data))

    alert('Avatar updated successfully!')
    window.location.reload() // Reload the page to reflect the changes
  } catch (error) {
    console.error('Error updating avatar:', error)
    alert('Failed to update avatar. Please try again.')
  }
}

async function deleteListing(listingId) {
  try {
    const confirmDelete = confirm(
      'Are you sure you want to delete this listing?',
    )

    if (confirmDelete) {
      await fetchApi(`auction/listings/${listingId}`, { method: 'DELETE' })
      alert('Listing deleted successfully!')
      window.location.reload() // Reload the page to reflect the changes
    }
  } catch (error) {
    console.error('Error deleting listing:', error)
    alert('Failed to delete listing. Please try again.')
  }
}
