import { fetchApi } from '../utils/api.mjs'

export function renderLogin() {
  console.log('Login page rendered')
  return `
     
      <div class="flex flex-col items-center justify-center h-screen">
       <h1 class="text-6xl text-yellow-500">Login</h1>
      <p class="text-2xl">make your bids!</p>

      <div class="p-4">
      <h1 class="text-2xl font-bold">Login</h1>
      <form id="login-form" class="mt-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
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
          class="bg-gray-600 text-white py-2 px-4 rounded w-full mb-4"
        >
          Login
        </button>
       <button type="button" onclick="window.location.href='/register'" class="bg-gray-600 text-white py-2 px-4 rounded w-full" > Register </button>
      </form>
    </div>
    </div>
    `
}

export function setupLoginHandlers() {
  document
    .querySelector('#login-form')
    .addEventListener('submit', async (event) => {
      event.preventDefault()

      const email = event.target.email.value
      const password = event.target.password.value

      try {
        const response = await fetchAPI('/auth/login', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
        })

        if (response.token) {
          localStorage.setItem('token', response.token)
          alert('Login successful!')
          window.location.href = '/profile' // Redirect to profile page
        } else {
          alert('Invalid credentials.')
        }
      } catch (error) {
        console.error('Login error:', error)
        alert('Something went wrong. Please try again.')
      }
    })
}
