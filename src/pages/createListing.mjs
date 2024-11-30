import { fetchApi, isAuthenticated } from '../utils/api.mjs'

export async function renderCreateListing() {
  if (!isAuthenticated()) {
    return `<p class="text-red-500">Please log in to view your profile.</p>`
  }

  try {
    return `
      <div class="min-h-screen bg-black text-white flex flex-col items-center p-4">
        <div class="w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg p-6">
          <h1 class="text-3xl font-bold mb-4">Create a New Listing</h1>
          
          <!-- Listing Title -->
          <label for="listing-title" class="text-gray-300">Title:</label>
          <input type="text" id="listing-title" class="w-full p-2 mb-4 text-black rounded" placeholder="Enter listing title" required />

          <!-- Listing Description -->
          <label for="listing-description" class="text-gray-300">Description:</label>
          <textarea id="listing-description" class="w-full p-2 mb-4 text-black rounded" placeholder="Enter listing description" required></textarea>

          <!-- Listing Tags -->
          <label for="listing-tags" class="text-gray-300">Tags (comma separated):</label>
          <input type="text" id="listing-tags" class="w-full p-2 mb-4 text-black rounded" placeholder="Enter tags" />

          <!-- Listing Image URL -->
          <label for="listing-image" class="text-gray-300">Image URL:</label>
          <input type="text" id="listing-image" class="w-full p-2 mb-4 text-black rounded" placeholder="Enter image URL" />

          <!-- Listing End Time -->
          <label for="listing-end" class="text-gray-300">Ends At:</label>
          <input type="datetime-local" id="listing-end" class="w-full p-2 mb-4 text-black rounded" required />

          <!-- Create Button -->
          <button
            id="create-listing-button"
            class="bg-blue-600 text-white px-6 py-2 rounded mt-4"
          >
            Create Listing
          </button>
        </div>
      </div>
    `
  } catch (error) {
    console.error('Error rendering create listing page:', error)
    return `<p class="text-red-500">Failed to load the form. Please try again later.</p>`
  }
}

export async function setupNewListingHandlers() {
  const createListingButton = document.querySelector('#create-listing-button')

  const storedUser = localStorage.getItem('user'); // Replace 'user' with the actual key you used in localStorage
  if (!storedUser) throw new Error('No user found in localStorage');

  // Parse the user data from JSON
  const user = JSON.parse(storedUser);
  const username = user.name; // Ensure the object contains a 'name' property

  if (createListingButton) {
    createListingButton.addEventListener('click', async () => {
      try {
        const title = document.querySelector('#listing-title').value
        const description = document.querySelector('#listing-description').value
        const tags = document.querySelector('#listing-tags').value.split(',').map(tag => tag.trim())
        const imageUrl = document.querySelector('#listing-image').value
        const endsAt = document.querySelector('#listing-end').value

        // Validate form inputs
        if (!title || !description || !endsAt) {
          alert('Title, description, and end time are required.')
          return
        }

        // Prepare the data for the new listing
        const listingData = {
          title,
          description,
          tags,
          media: [
            {
              url: imageUrl,
              alt: 'Listing Image'
            }
          ],
          endsAt
        }

        // Make the API call to create the new listing
        const response = await fetchApi(`auction/listings`, {
          method: 'POST',
          body: JSON.stringify(listingData),
          headers: {
            'Content-Type': 'application/json'
          }
        })

        if (response?.data) {
          alert('Listing created successfully!')
          window.location.href = `/profile/${username}`
        } else {
          throw new Error('Failed to create listing')
        }
      } catch (error) {
        console.error('Error creating listing:', error)
        alert('Failed to create listing. Please try again later.')
      }
    })
  }
}
