// Função para alternar entre os formulários de cadastro e login
function toggleForms() {
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');

    if (signupForm.style.display === 'none') {
        signupForm.style.display = 'block';
        loginForm.style.display = 'none';
    } else {
        signupForm.style.display = 'none';
        loginForm.style.display = 'block';
    }
}

// Função para registrar um novo usuário
document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o comportamento padrão do formulário

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Verifica se o usuário já existe no localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(user => user.username === username);

    if (userExists) {
        alert('Este nome de usuário já está em uso.');
        return;
    }

    // Adiciona o novo usuário ao localStorage
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));

    alert('Cadastro realizado com sucesso!');
    document.getElementById('registerForm').reset();
});

// Função para fazer login
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o comportamento padrão do formulário

    const loginUsername = document.getElementById('loginUsername').value;
    const loginPassword = document.getElementById('loginPassword').value;

    // Verifica se o usuário existe no localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === loginUsername && user.password === loginPassword);

    if (user) {
        alert('Login bem-sucedido!');
    } else {
        alert('Nome de usuário ou senha incorretos.');
    }

    document.getElementById('loginForm').reset();
});