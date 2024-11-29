export function renderNavbar(isLoggedIn) {
  return `
      <nav
        class="fixed left-0 top-0 z-50 flex h-20 w-full items-center border-b-4 border-grey-500 bg-black px-4 text-yellow-50 md:px-16 lg:px-24"
      >
        <!-- Logo Section -->
        <div class="flex items-center mr-auto space-x-4">
          <img
            src="/src/assets/logo.jpg"
            alt="Logo"
            class="h-12 w-12 object-contain rounded-full"
          />
          <div class="">Bideals</div>
        </div>
  
        <!-- Navigation Items -->
        <ul class="flex items-center space-x-8">
          <!-- Home Icon -->
          <li>
            <a href="/" class="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-6 w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
            </a>
          </li>
  
          <!-- Login/Logout Button -->
          <li>
            <a href="${isLoggedIn ? '/logout' : '/login'}">
              <button
                onclick="window.location.href='${isLoggedIn ? '/logout' : '/login'}'"
                class="hover:text-indigo-400 transition"
              >
                ${isLoggedIn ? 'Log out' : 'Log in'}
              </button>
            </a>
          </li>
  
          <!-- Profile Icon -->
          ${
            isLoggedIn
              ? `
          <li>
            <a href="/profile" class="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-6 w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </a>
          </li>`
              : ''
          }
        </ul>
      </nav>
    `
}

export function setupNavbar() {
  document.querySelector('#logout-btn')?.addEventListener('click', () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  })
}
