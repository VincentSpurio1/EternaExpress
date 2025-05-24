if (!localStorage.getItem('isLoggedIn')) {
  window.location.href = 'login.html';
}


// Controlla se utente è loggato, altrimenti rimanda a login
if (!localStorage.getItem('isLoggedIn')) {
  window.location.href = 'login.html';
}

// Logout
const logoutBtn = document.getElementById('logout-btn');
logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('loggedUser');
  window.location.href = 'login.html';
});

// Form investitori: simulazione invio via mail
const investForm = document.getElementById('invest-form');
const investStatus = document.getElementById('invest-status');

investForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = investForm.name.value.trim();
  const email = investForm.email.value.trim();
  const message = investForm.message.value.trim();

  if (!name || !email || !message) {
    investStatus.style.color = '#f04e4e';
    investStatus.textContent = 'Compila tutti i campi.';
    return;
  }

  // Semplice validazione email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    investStatus.style.color = '#f04e4e';
    investStatus.textContent = 'Email non valida.';
    return;
  }

  investStatus.style.color = 'limegreen';
  investStatus.textContent = 'Richiesta inviata! Ti contatteremo presto.';

  investForm.reset();

  // Qui puoi aggiungere integrazione con backend o EmailJS
});
