// Switch tab
const loginTab = document.getElementById('login-tab');
const registerTab = document.getElementById('register-tab');
const loginPanel = document.getElementById('login-panel');
const registerPanel = document.getElementById('register-panel');

loginTab.addEventListener('click', () => {
  loginTab.classList.add('active');
  loginTab.setAttribute('aria-selected', 'true');
  registerTab.classList.remove('active');
  registerTab.setAttribute('aria-selected', 'false');
  loginPanel.hidden = false;
  registerPanel.hidden = true;
});

registerTab.addEventListener('click', () => {
  registerTab.classList.add('active');
  registerTab.setAttribute('aria-selected', 'true');
  loginTab.classList.remove('active');
  loginTab.setAttribute('aria-selected', 'false');
  registerPanel.hidden = false;
  loginPanel.hidden = true;
});

// Helper: validate email format
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// LOGIN FORM
const loginForm = document.getElementById('login-form');
const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');
const loginEmailError = document.getElementById('login-email-error');
const loginPasswordError = document.getElementById('login-password-error');
const loginStatus = document.getElementById('login-status');

loginForm.addEventListener('submit', e => {
  e.preventDefault();
  let valid = true;

  if (!loginEmail.value.trim()) {
    loginEmailError.textContent = 'Email obbligatoria.';
    valid = false;
  } else if (!isValidEmail(loginEmail.value.trim())) {
    loginEmailError.textContent = 'Email non valida.';
    valid = false;
  } else {
    loginEmailError.textContent = '';
  }

  if (!loginPassword.value.trim()) {
    loginPasswordError.textContent = 'Password obbligatoria.';
    valid = false;
  } else {
    loginPasswordError.textContent = '';
  }

  if (!valid) {
    loginStatus.textContent = 'Correggi gli errori.';
    loginStatus.style.color = 'red';
    return;
  }

  // Controlla utenti in localStorage
  const users = JSON.parse(localStorage.getItem('users') || '{}');
  const email = loginEmail.value.trim();
  const pass = loginPassword.value.trim();

  if (!users[email]) {
    loginStatus.textContent = 'Account non trovato.';
    loginStatus.style.color = 'red';
    return;
  }
  if (users[email] !== pass) {
    loginStatus.textContent = 'Password errata.';
    loginStatus.style.color = 'red';
    return;
  }

  // Login OK
  localStorage.setItem('isLoggedIn', 'true');
  localStorage.setItem('loggedUser', email);
  loginStatus.textContent = 'Login effettuato, reindirizzamento...';
  loginStatus.style.color = 'green';

  setTimeout(() => {
    window.location.href = 'index.html'; // cambia con la tua pagina protetta
  }, 1200);
});

// REGISTER FORM
const registerForm = document.getElementById('register-form');
const registerEmail = document.getElementById('register-email');
const registerPassword = document.getElementById('register-password');
const registerPasswordConfirm = document.getElementById('register-password-confirm');
const registerEmailError = document.getElementById('register-email-error');
const registerPasswordError = document.getElementById('register-password-error');
const registerPasswordConfirmError = document.getElementById('register-password-confirm-error');
const registerStatus = document.getElementById('register-status');

registerForm.addEventListener('submit', e => {
  e.preventDefault();
  let valid = true;

  if (!registerEmail.value.trim()) {
    registerEmailError.textContent = 'Email obbligatoria.';
    valid = false;
  } else if (!isValidEmail(registerEmail.value.trim())) {
    registerEmailError.textContent = 'Email non valida.';
    valid = false;
  } else {
    registerEmailError.textContent = '';
  }

  if (!registerPassword.value.trim()) {
    registerPasswordError.textContent = 'Password obbligatoria.';
    valid = false;
  } else if (registerPassword.value.trim().length < 6) {
    registerPasswordError.textContent = 'Almeno 6 caratteri richiesti.';
    valid = false;
  } else {
    registerPasswordError.textContent = '';
  }

  if (registerPasswordConfirm.value.trim() !== registerPassword.value.trim()) {
    registerPasswordConfirmError.textContent = 'Le password non coincidono.';
    valid = false;
  } else {
    registerPasswordConfirmError.textContent = '';
  }

  if (!valid) {
    registerStatus.textContent = 'Correggi gli errori.';
    registerStatus.style.color = 'red';
    return;
  }

  // Salva utente
  const users = JSON.parse(localStorage.getItem('users') || '{}');
  const email = registerEmail.value.trim();
  if (users[email]) {
    registerStatus.textContent = 'Email già registrata.';
    registerStatus.style.color = 'red';
    return;
  }

  users[email] = registerPassword.value.trim();
  localStorage.setItem('users', JSON.stringify(users));
  registerStatus.textContent = 'Registrazione avvenuta, ora puoi accedere.';
  registerStatus.style.color = 'green';

  setTimeout(() => {
    registerForm.reset();
    registerStatus.textContent = '';
    // Torna al tab login
    loginTab.click();
  }, 1500);
});
