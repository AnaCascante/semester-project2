import './style.css'
import { renderNavbar } from './components/navbar.mjs'
import { renderFooter } from './components/footer.mjs'

import { renderHome } from './pages/home.mjs'
import { renderListing } from './pages/listing.mjs'
import { renderLogin } from './pages/login.mjs'
import { renderRegister } from './pages/register.mjs'
import { renderProfile } from './pages/profile.mjs'

const routes = {
  '/': renderHome,
  '/listing': renderListing,
  '/login': renderLogin,
  '/register': renderRegister,
  '/profile': renderProfile,
}

let isLoggedIn = false

function renderRoute() {
  const path = window.location.pathname
  const [basePath, param] = path.split('/').filter(Boolean)
  const route = routes[`/${basePath}`] || routes[path]
  const root = document.getElementById('root')

  console.log('Current path:', path) // Debug
  console.log('Matched route:', route) // Debug

  if (route) {
    root.innerHTML = ''
    root.innerHTML = param ? route(param) : route() // Pass param if needed
  } else {
    root.innerHTML = '<h1>404 - Page Not Found</h1>'
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('body')
  body.insertAdjacentHTML('afterbegin', renderNavbar(isLoggedIn))
  body.insertAdjacentHTML('beforeend', renderFooter())
  renderRoute()

  document.body.addEventListener('click', (event) => {
    const link = event.target.closest('a')
    if (link && link.getAttribute('href')) {
      event.preventDefault()
      const href = link.getAttribute('href')

      if (href === '/logout') {
        isLoggedIn = false
      } else if (href === '/login') {
        isLoggedIn = true
      }

      window.history.pushState(null, '', href)
      renderNavbar(isLoggedIn)
      renderFooter()
      renderRoute()
    }
  })
})

window.onpopstate = renderRoute
