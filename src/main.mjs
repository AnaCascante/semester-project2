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
  const route = routes[path]
  const root = document.getElementById('root')

  console.log('Current path:', path) // Debug
  console.log('Matched route:', route) // Debug

  if (route) {
    root.innerHTML = ''
    root.innerHTML = route()
  } else {
    root.innerHTML = '<h1>404 - Page Not Found</h1>'
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

document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('body')
  body.insertAdjacentHTML('afterbegin', renderNavbar(isLoggedIn))
  body.insertAdjacentHTML('beforeend', renderFooter())
  renderRoute()
  addLinkEventListeners()
})

window.onpopstate = renderRoute
