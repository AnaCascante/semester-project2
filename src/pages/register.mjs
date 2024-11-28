import { fetchAPI } from '../utils/api.mjs'

export async function renderRegister() {
  return `
    <div class="p-4">
      <h1 class="text-2xl font-bold">Register</h1>
      <form id="register-form">
        <input type="text" name="name" placeholder="Your Name" class="border p-2" required />
        <input type="email" name="email" placeholder="Your Email" class="border p-2" required />
        <input type="password" name="password" placeholder="Your Password" class="border p-2" required />
        <button type="submit" class="bg-blue-500 text-white p-2">Register</button>
      </form>
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
        const response = await fetchAPI('/auth/register', {
          method: 'POST',
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        })

        if (response.token) {
          localStorage.setItem('token', response.token)
          alert('Registration successful!')
          window.location.href = '/login' // Redirect to login page
        } else {
          alert('Invalid credentials.')
        }
      } catch (error) {
        console.error('Registration error:', error)
        alert('Something went wrong. Please try again.')
      }
    })
}
