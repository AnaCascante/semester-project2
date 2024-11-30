import { fetchApi } from '../utils/api.mjs'

export function renderRegister() {
  return `
    <div class="flex flex-col items-center justify-center h-screen">
      <h1 class="text-6xl">Register</h1>
      <p class="text-2xl">Start bidding!</p>
      <div class="p-4">
        <h1 class="text-2xl font-bold">Register</h1>
        <form id="register-form" class="mt-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            class="block w-full p-2 mb-4 border rounded bg-white text-black"
          />
          <input
            type="email"
            name="email"
            placeholder="Email@stud.noroff.no"
            required
            class="block w-full p-2 mb-4 border rounded bg-white text-black"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            class="block w-full p-2 mb-4 border rounded bg-white text-black"
          />
          <button
            type="submit"
            class="bg-green-500 text-white py-2 px-4 rounded w-full"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  `
}

export function setupRegisterHandlers() {
  document
    .querySelector('#register-form')
    .addEventListener('submit', async (event) => {
      event.preventDefault()

      const name = event.target.name.value
      const email = event.target.email.value
      const password = event.target.password.value

      try {
        // Register the user
        const response = await fetchApi('auth/register', {
          method: 'POST',
          body: JSON.stringify({ name, email, password }),
        })

        console.log('Registration response:', response)

        if (!response?.statusCode) {
          localStorage.setItem('token', response.data.accessToken);
          alert('Registration successful!')
          window.location.href = '/login' // Redirect to profile page
        } else {
          alert(response.message);
        }
      } catch (error) {
        console.error('Error registering:', error)
        alert('An error occurred. Please try again.')
      }
    })
}
