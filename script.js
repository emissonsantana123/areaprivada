// Função para alternar entre formulários
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

// Função para carregar os usuários do localStorage
function loadUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

// Função para salvar os usuários no localStorage
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// Função para registrar um novo usuário
document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    let users = loadUsers();
    const userExists = users.some(user => user.username === username);

    if (userExists) {
        alert('Este nome de usuário já está em uso.');
        return;
    }

    users.push({ username, password });
    saveUsers(users);

    alert('Cadastro realizado com sucesso!');
    document.getElementById('registerForm').reset();
});

// Função para fazer login
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const loginUsername = document.getElementById('loginUsername').value;
    const loginPassword = document.getElementById('loginPassword').value;

    const users = loadUsers();
    const user = users.find(user => user.username === loginUsername && user.password === loginPassword);

    if (user) {
        document.getElementById('signup-form').style.display = 'none';
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('user-area').style.display = 'block';
        document.getElementById('welcomeUser').textContent = loginUsername;
    } else {
        alert('Nome de usuário ou senha incorretos.');
    }

    document.getElementById('loginForm').reset();
});

// Função para fazer logout
document.getElementById('logoutBtn').addEventListener('click', function() {
    document.getElementById('user-area').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
});