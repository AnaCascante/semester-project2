import './style.css'
import { renderNavbar } from './components/navbar.mjs'
import { renderFooter } from './components/footer.mjs'

import { renderHome, setupSearchHandlers } from './pages/home.mjs'
import { renderListing, setupBidHandlers } from './pages/listing.mjs'
import { renderLogin, setupLoginHandlers } from './pages/login.mjs'
import { renderRegister, setupRegisterHandlers } from './pages/register.mjs'
import { renderProfile, setupProfileHandlers } from './pages/profile.mjs'
import {
  renderCreateListing,
  setupNewListingHandlers,
} from './pages/createListing.mjs'
import { renderLogout } from './pages/logout.mjs'

const routes = {
  '/': { render: renderHome, extra: setupSearchHandlers },
  '/login': { render: renderLogin, extra: setupLoginHandlers },
  '/register': { render: renderRegister, extra: setupRegisterHandlers },
  '/profile': { render: renderProfile, extra: setupProfileHandlers },
  '/listings': { render: renderListing },
  '/create/listing': {
    render: renderCreateListing,
    extra: setupNewListingHandlers,
  },
  '/logout': { render: renderLogout },
}

// Dynamic route handling for `/listing/:id`
function isDynamicRoute(path) {
  return path.startsWith('/listings/')
}

function isDynamicProfileRoute(path) {
  return path.startsWith('/profile/')
}

let isLoggedIn = false
async function renderRoute() {
  const path = window.location.pathname
  const root = document.getElementById('root')

  console.log('Current path:', path) // Debug
  console.log('Is dynamic route:', isDynamicRoute(path)) // Debug

  // Handle dynamic routes for `/listing/:id`
  if (isDynamicRoute(path)) {
    const listingId = path.split('/listings/')[1]
    root.innerHTML = await renderListing(listingId) // Render single listing
    setupBidHandlers(listingId) // Setup bid functionality
  } else if (isDynamicProfileRoute(path)) {
    const name = path.split('/profile/')[1]
    root.innerHTML = await renderProfile(name) // Render single listing
    setupProfileHandlers()
  } else {
    // Handle static routes
    const route = routes[path]
    if (route) {
      root.innerHTML = await route.render() // Render static page
      if (route.extra) route.extra() // Execute extra function if available
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
