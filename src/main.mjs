import './style.css'
import { renderNavbar } from './components/navbar.mjs'
import { renderFooter } from './components/footer.mjs'

import { renderHome } from './pages/home.mjs'
import { renderListing, setupBidHandlers } from './pages/listing.mjs'
import { renderLogin } from './pages/login.mjs'
import { renderRegister } from './pages/register.mjs'
import { renderProfile, setupProfileHandlers } from './pages/profile.mjs'

const routes = {
  '/': renderHome,
  '/login': renderLogin,
  '/register': renderRegister,
  '/profile': renderProfile,
}

// Dynamic route handling for `/listing/:id`
function isDynamicRoute(path) {
  return path.startsWith('/listing/')
}

let isLoggedIn = false

async function renderRoute() {
  const path = window.location.pathname
  const root = document.getElementById('root')

  console.log('Current path:', path) // Debug
  console.log('Is dynamic route:', isDynamicRoute(path)) // Debug

  // Handle dynamic routes for `/listing/:id`
  if (isDynamicRoute(path)) {
    const listingId = path.split('/listing/')[1]
    root.innerHTML = await renderListing(listingId) // Render single listing
    setupBidHandlers(listingId) // Setup bid functionality
  } else if (path === '/profile') {
    // Handle profile page
    root.innerHTML = await renderProfile()
    setupProfileHandlers() // Attach handlers for profile-specific actions
  } else {
    // Handle static routes
    const route = routes[path]
    if (route) {
      root.innerHTML = await route() // Render static page
    } else {
      root.innerHTML = '<h1>404 - Page Not Found</h1>'
    }
  }
}

function addLinkEventListeners() {
  const links = document.querySelectorAll('nav a')
  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault()
      const href = event.currentTarget.getAttribute('href')

      if (href === '/logout') {
        isLoggedIn = false
      } else if (href === '/login') {
        isLoggedIn = true
      }

      window.history.pushState(null, '', href)
      document.querySelector('nav').remove()
      document.querySelector('footer').remove()
      document.body.insertAdjacentHTML('afterbegin', renderNavbar(isLoggedIn))
      document.body.insertAdjacentHTML('beforeend', renderFooter())
      renderRoute()
      addLinkEventListeners()
    })
  })
}

document.addEventListener('DOMContentLoaded', async () => {
  const body = document.querySelector('body')
  body.insertAdjacentHTML('afterbegin', renderNavbar(isLoggedIn))
  body.insertAdjacentHTML('beforeend', renderFooter())
  await renderRoute()
  addLinkEventListeners()
})

window.onpopstate = renderRoute
