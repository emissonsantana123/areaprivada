document.addEventListener('DOMContentLoaded', function() {
    // Alternar entre abas de login e cadastro
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove a classe active de todas as abas e conteúdos
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            // Adiciona a classe active na aba e conteúdo selecionados
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Formulário de login
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
        
        const user = db.getUser(username);
        
        if (user && user.password === password) {
            // Login bem-sucedido
            db.addOnlineUser(username);
            localStorage.setItem('currentUser', username);
            window.location.href = 'chat.html';
        } else {
            // Login falhou
            document.getElementById('loginError').textContent = 'Usuário ou senha incorretos';
        }
    });

    // Formulário de cadastro
    const registerForm = document.getElementById('registerForm');
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('registerUsername').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (password !== confirmPassword) {
            document.getElementById('registerError').textContent = 'As senhas não coincidem';
            return;
        }
        
        if (db.userExists(username)) {
            document.getElementById('registerError').textContent = 'Usuário já existe';
            return;
        }
        
        db.addUser(username, password);
        db.addOnlineUser(username);
        localStorage.setItem('currentUser', username);
        window.location.href = 'chat.html';
    });

    // Redirecionar para o chat se já estiver logado
    if (localStorage.getItem('currentUser')) {
        window.location.href = 'chat.html';
    }
});