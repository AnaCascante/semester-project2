export async function renderLogout() {
  // Verifica si el usuario está autenticado
  const isLoggedIn = localStorage.getItem('user') !== null;

  if (isLoggedIn) {
    // Llama a la función de logout
    logoutUser();
  }

  return `
    <div class="flex justify-center items-center h-screen bg-gray-900 text-white">
      <div class="text-center">
        <h1 class="text-3xl font-bold mb-4">Sorry for the logout!</h1>
        <p class="text-lg">You are being redirected to the home page...</p>
      </div>
    </div>
  `;
}

// Función de logout que limpia el localStorage
function logoutUser() {
  localStorage.removeItem('user'); // Elimina el usuario del localStorage
  setTimeout(() => {
    window.location.href = '/';  // Redirige al home después de 2 segundos
  }, 2000);  // 2000ms = 2 segundos
}
