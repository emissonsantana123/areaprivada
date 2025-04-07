// Variáveis globais
let currentUser = null;

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

// Função para carregar as mensagens do localStorage
function loadMessages() {
    return JSON.parse(localStorage.getItem('messages')) || [];
}

// Função para salvar as mensagens no localStorage
function saveMessages(messages) {
    localStorage.setItem('messages', JSON.stringify(messages));
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
        currentUser = loginUsername;
        document.getElementById('signup-form').style.display = 'none';
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('chat-area').style.display = 'block';
        loadChatMessages();
    } else {
        alert('Nome de usuário ou senha incorretos.');
    }

    document.getElementById('loginForm').reset();
});

// Função para carregar as mensagens no chat
function loadChatMessages() {
    const messages = loadMessages();
    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML = '';

    messages.forEach(msg => {
        const messageElement = document.createElement('div');
        messageElement.textContent = `${msg.sender}: ${msg.text}`;
        messagesDiv.appendChild(messageElement);
    });
}

// Função para enviar mensagens
document.getElementById('sendMessage').addEventListener('click', function() {
    const messageInput = document.getElementById('messageInput');
    const messageText = messageInput.value.trim();

    if (!messageText) {
        alert('Por favor, digite uma mensagem.');
        return;
    }

    const messages = loadMessages();
    messages.push({ sender: currentUser, text: messageText });
    saveMessages(messages);

    messageInput.value = '';
    loadChatMessages();
});
