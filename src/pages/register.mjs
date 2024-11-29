import { fetchApi } from '../utils/api.mjs'

export function renderRegister() {
  return `
    <header class="flex flex-col items-center justify-center h-screen">
      <h1 class="text-6xl">Register </h1>
      <p class="text-2xl">Start biding!</p>
      <div class="p-4">
      <h1 class="text-2xl font-bold">Register</h1>
      <form id="register-form" class="mt-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          required
          class="block w-full p-2 mb-4 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          class="block w-full p-2 mb-4 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          class="block w-full p-2 mb-4 border rounded"
        />
        <button
          type="submit"
          class="bg-green-500 text-white py-2 px-4 rounded w-full"
        >
          Register
        </button>
      </form>
    </div>
    </header>
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
        const response = await fetchAPI('/auth/register', {
          method: 'POST',
          body: JSON.stringify({ name, email, password }),
        })

        if (response.id) {
          alert('Registration successful! You can now log in.')
          window.location.href = '/login' // Redirect to login page
        } else {
          alert('Registration failed. Please check your input.')
        }
      } catch (error) {
        console.error('Registration error:', error)
        alert('Something went wrong. Please try again.')
      }
    })
}
