document.addEventListener('DOMContentLoaded', () => {
  // Controllo login: se non loggato, vai a login.html
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  if (isLoggedIn !== 'true') {
    window.location.href = 'login.html';
    return;
  }

  // LOGOUT
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('loggedUser');
      window.location.href = 'login.html';
    });
  }

  // FORM INVESTITORI
  const investForm = document.getElementById('invest-form');
  const investStatus = document.getElementById('invest-status');

  if (investForm) {
    investForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('invest-name').value.trim();
      const email = document.getElementById('invest-email').value.trim();
      const message = document.getElementById('invest-message').value.trim();

      // Semplice validazione
      if (!name || !email || !message) {
        investStatus.style.color = '#f04e4e';
        investStatus.textContent = 'Per favore compila tutti i campi.';
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        investStatus.style.color = '#f04e4e';
        investStatus.textContent = 'Email non valida.';
        return;
      }

      // Qui puoi inserire il codice per inviare email o inviare a un server
      // Per ora simuliamo successo:
      investStatus.style.color = 'limegreen';
      investStatus.textContent = 'Richiesta inviata con successo! Ti contatteremo presto.';

      investForm.reset();

      setTimeout(() => {
        investStatus.textContent = '';
      }, 5000);
    });
  }
});

// Controlla se utente è loggato: se no, rimanda a login.html
if (!localStorage.getItem('isLoggedIn')) {
  window.location.href = 'login.html';
}

// Gestione logout
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loggedUser');
    window.location.href = 'login.html';
  });
}
