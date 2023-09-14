const loginBtn = document.getElementById('loginBtn');
const passwordInput = document.getElementById('password');
const errorText = document.getElementById('errorText');

passwordInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    attemptLogin();
  }
});

loginBtn.addEventListener('click', () => {
  attemptLogin();
});

function clearError() {
  errorText.textContent = ''; // Limpa a mensagem de erro
}

function attemptLogin() {
  const username = document.getElementById('username').value;
  const password = passwordInput.value;

  if (username === 'admin' && password === 'admin') {
    window.location.href = 'index.html';
  } else {
    errorText.textContent = 'Credenciais inválidas. Tente novamente.';
    passwordInput.value = ''; // Limpa o campo de senha
  }
}
