import { fetchAPI } from '../utils/api.mjs'

export function renderLogin() {
  return `
    <div class="flex items-center justify-center h-screen">
      <form id="login-form" class="p-4 bg-white rounded shadow">
        <h1 class="text-2xl font-bold">Login</h1>
        <input type="text" email="username" placeholder="youremail@stud.noroff.no" class="border p-2 w-full mt-2" required />
        <input type="password" name="password" placeholder="Password" class="border p-2 w-full mt-2" required />
        <button type="submit" class="bg-gray-500 text-white p-2 w-full mt-2">Login</button>
      </form>
    </div>
    `
}

// fix endpoints and names fix names for functions as in documentation . https://docs.noroff.dev/docs/v2/auth/login

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
