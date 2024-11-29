import { fetchApi, isAuthenticated } from '../utils/api.mjs'

export async function renderProfile() {
  if (!isAuthenticated()) {
    return `<p class="text-red-500">Please log in to view your profile.</p>`
  }

  try {
    const userData = await fetchApi('users/me?_bids=true&_listings=true') // Fetch user data with bids and created listings

    return `
    <div class="p-4 container mx-auto">
      <!-- User Profile Section -->
      <div class="profile-header flex items-center gap-4 mb-6">
        <img
          src="${userData.avatar || 'https://via.placeholder.com/150'}"
          alt="User Avatar"
          class="w-24 h-24 rounded-full object-cover"
        />
        <div>
          <h1 class="text-3xl font-bold">${userData.username}</h1>
          <p class="text-sm text-gray-500">${userData.email}</p>
          <p class="text-green-500 font-bold mt-2">Credits: ${userData.credits || 1000}</p>
          <button
            id="edit-avatar-button"
            class="bg-blue-500 text-white px-4 py-2 rounded mt-2"
          >
            Edit Avatar
          </button>
        </div>
      </div>

      <!-- User Bids Section -->
      <div class="user-bids mb-6">
        <h2 class="text-2xl font-bold mb-4">Your Bids</h2>
        ${
          userData.bids && userData.bids.length > 0
            ? `
          <ul class="space-y-2">
            ${userData.bids
              .map(
                (bid) =>
                  `<li class="border p-4 rounded bg-gray-100">
                    <p class="font-bold">Listing: ${bid.listingTitle}</p>
                    <p class="text-sm text-gray-600">Bid Amount: $${bid.amount}</p>
                  </li>`,
              )
              .join('')}
          </ul>
        `
            : `<p class="text-gray-500">You haven't placed any bids yet.</p>`
        }
      </div>

      <!-- User Created Listings Section -->
      <div class="user-listings mb-6">
        <h2 class="text-2xl font-bold mb-4">Your Created Listings</h2>
        ${
          userData.listings && userData.listings.length > 0
            ? `
          <ul class="space-y-2">
            ${userData.listings
              .map(
                (listing) =>
                  `<li class="border p-4 rounded bg-gray-100">
                    <p class="font-bold">${listing.title}</p>
                    <p class="text-sm text-gray-600">Ends At: ${new Date(
                      listing.endsAt,
                    ).toLocaleDateString()}</p>
                    <button
                      class="bg-red-500 text-white px-4 py-2 rounded mt-2"
                      data-listing-id="${listing.id}"
                      onclick="deleteListing('${listing.id}')"
                    >
                      Delete Listing
                    </button>
                  </li>`,
              )
              .join('')}
          </ul>
        `
            : `<p class="text-gray-500">You haven't created any listings yet.</p>`
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
    await fetchApi('users/me/avatar', {
      method: 'PUT',
      body: JSON.stringify({ avatar: newAvatar }),
    })
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
      await fetchApi(`listings/${listingId}`, { method: 'DELETE' })
      alert('Listing deleted successfully!')
      window.location.reload() // Reload the page to reflect the changes
    }
  } catch (error) {
    console.error('Error deleting listing:', error)
    alert('Failed to delete listing. Please try again.')
  }
}
